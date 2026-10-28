'use server';

import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabase/server';
import type { CheckoutFormData, CartItem, Order } from '@/lib/types';
import { revalidatePath } from 'next/cache';

interface CreateOrderResult {
  success: boolean;
  order_number?: string;
  error?: string;
}

export async function createOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[],
  deliveryCharge: number,
  discountAmount: number
): Promise<CreateOrderResult> {
  const supabase = await createServerSupabaseClient();

  try {
    // 1. Validate cart is not empty
    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    // 2. Server-side price and stock validation
    const productIds = cartItems.map((item) => item.product_id);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, slug, sku, price, discounted_price, stock_quantity, is_published')
      .in('id', productIds);

    if (productsError || !products) {
      return { success: false, error: 'Failed to validate products' };
    }

    // 3. Verify each product
    for (const cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.product_id);
      if (!product) {
        return { success: false, error: `Product not found: ${cartItem.product.name}` };
      }
      if (!product.is_published) {
        return { success: false, error: `Product unavailable: ${product.name}` };
      }
      if (product.stock_quantity < cartItem.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`,
        };
      }
    }

    // 4. Calculate server-side totals (never trust client prices)
    let subtotal = 0;
    const orderItems = cartItems.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product_id)!;
      const unitPrice = product.discounted_price || product.price;
      const totalPrice = unitPrice * cartItem.quantity;
      subtotal += totalPrice;

      return {
        product_id: product.id,
        product_name: product.name,
        product_sku: product.sku,
        product_image: cartItem.product.images?.[0]?.url || null,
        quantity: cartItem.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
    });

    const total = subtotal + deliveryCharge - discountAmount;

    // 5. Get current user (optional - guest checkout allowed)
    const { data: { user } } = await supabase.auth.getUser();

    // 6. Create order using admin client for stock updates
    const adminClient = await createAdminSupabaseClient();

    // Create the order
    const { data: order, error: orderError } = await adminClient
      .from('orders')
      .insert({
        user_id: user?.id || null,
        status: 'pending',
        payment_method: formData.payment_method,
        payment_status: formData.payment_method === 'cod' ? 'unpaid' : 'unpaid',
        subtotal,
        delivery_charge: deliveryCharge,
        discount_amount: discountAmount,
        total,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email || null,
        customer_phone: formData.customer_phone,
        shipping_address: formData.shipping_address,
        shipping_city: formData.shipping_city,
        shipping_district: formData.shipping_district,
        shipping_postal_code: formData.shipping_postal_code || null,
        order_notes: formData.order_notes || null,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return { success: false, error: 'Failed to create order. Please try again.' };
    }

    // 7. Create order items
    const itemsToInsert = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await adminClient
      .from('order_items')
      .insert(itemsToInsert);

    if (itemsError) {
      console.error('Order items error:', itemsError);
      // Rollback: delete the order
      await adminClient.from('orders').delete().eq('id', order.id);
      return { success: false, error: 'Failed to create order items. Please try again.' };
    }

    // 8. Update stock quantities
    for (const cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.product_id)!;
      const newStock = product.stock_quantity - cartItem.quantity;

      const { error: stockError } = await adminClient
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', product.id);

      if (stockError) {
        console.error('Stock update error:', stockError);
      }
    }

    revalidatePath('/admin/orders');
    revalidatePath('/admin');

    return { success: true, order_number: order.order_number };
  } catch (error) {
    console.error('Order creation exception:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('order_number', orderNumber)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data as Order;
}

export async function getUserOrders(): Promise<Order[]> {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }

  return (data as Order[]) || [];
}

export async function validateCoupon(code: string, subtotal: number) {
  const supabase = await createServerSupabaseClient();

  const { data: coupon, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single();

  if (error || !coupon) {
    return { valid: false, error: 'Invalid coupon code' };
  }

  // Check expiration
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { valid: false, error: 'This coupon has expired' };
  }

  // Check start date
  if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
    return { valid: false, error: 'This coupon is not yet active' };
  }

  // Check usage limit
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, error: 'This coupon has reached its usage limit' };
  }

  // Check minimum order amount
  if (coupon.min_order_amount && subtotal < coupon.min_order_amount) {
    return {
      valid: false,
      error: `Minimum order amount of ৳${coupon.min_order_amount} required`,
    };
  }

  // Calculate discount
  let discount = 0;
  if (coupon.discount_type === 'percentage') {
    discount = (subtotal * coupon.discount_value) / 100;
    if (coupon.max_discount_amount) {
      discount = Math.min(discount, coupon.max_discount_amount);
    }
  } else {
    discount = coupon.discount_value;
  }

  return {
    valid: true,
    discount,
    coupon_id: coupon.id,
    description: coupon.description,
  };
}
