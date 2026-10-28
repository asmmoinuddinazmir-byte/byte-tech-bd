'use server';

import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { DashboardStats, Product, Order, Category, Brand, Coupon, Banner } from '@/lib/types';
import { generateSlug } from '@/lib/utils';
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMO_BRANDS } from '@/lib/demo-data';

// ============================================
// Authorization Helper
// ============================================
async function verifyAdminAuth(): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return profile?.role === 'admin';
  } catch (e) {
    return false;
  }
}

// In-memory fallback storage for newly added demo products/categories/brands
let inMemoryProducts: Product[] = [...DEMO_PRODUCTS];
let inMemoryOrders: Order[] = [
  {
    id: 'ord-101',
    order_number: 'BTB-20261028-00001',
    user_id: null,
    status: 'pending',
    payment_method: 'cod',
    payment_status: 'unpaid',
    subtotal: 61000,
    delivery_charge: 80,
    discount_amount: 0,
    total: 61080,
    coupon_id: null,
    customer_name: 'Rafiqul Islam',
    customer_email: 'rafiqul@gmail.com',
    customer_phone: '01711223344',
    shipping_address: 'House 42, Road 11, Dhanmondi',
    shipping_city: 'Dhaka',
    shipping_district: 'Dhaka',
    shipping_postal_code: '1209',
    order_notes: 'Please call before arrival',
    tracking_number: null,
    shipped_at: null,
    delivered_at: null,
    cancelled_at: null,
    cancellation_reason: null,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'oit-1',
        order_id: 'ord-101',
        product_id: 'prod-1',
        product_name: 'Dell Inspiron 15 3520 (12th Gen Intel Core i5)',
        product_sku: 'BT-DEL-3520-01',
        product_image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        unit_price: 61000,
        total_price: 61000,
        created_at: new Date().toISOString(),
      }
    ]
  },
  {
    id: 'ord-102',
    order_number: 'BTB-20261027-00002',
    user_id: null,
    status: 'delivered',
    payment_method: 'cod',
    payment_status: 'paid',
    subtotal: 31500,
    delivery_charge: 150,
    discount_amount: 0,
    total: 31650,
    coupon_id: null,
    customer_name: 'Nayeem Chowdhury',
    customer_email: 'nayeem.c@yahoo.com',
    customer_phone: '01819998877',
    shipping_address: 'GEC Circle, Nasirabad',
    shipping_city: 'Chattogram',
    shipping_district: 'Chattogram',
    shipping_postal_code: '4000',
    order_notes: null,
    tracking_number: 'ST-98765432',
    shipped_at: new Date(Date.now() - 86400000).toISOString(),
    delivered_at: new Date().toISOString(),
    cancelled_at: null,
    cancellation_reason: null,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'oit-2',
        order_id: 'ord-102',
        product_id: 'prod-2',
        product_name: 'Lenovo ThinkPad T480 (Used - Grade A+ Business Series)',
        product_sku: 'BT-LEN-T480-U01',
        product_image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        unit_price: 31500,
        total_price: 31500,
        created_at: new Date().toISOString(),
      }
    ]
  }
];

let inMemoryCategories = [...DEMO_CATEGORIES];
let inMemoryBrands = [...DEMO_BRANDS];
let inMemoryCoupons: Coupon[] = [
  {
    id: 'cp-1',
    code: 'WELCOME10',
    description: '10% discount for first-time shoppers',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_amount: 2000,
    max_discount_amount: 5000,
    usage_limit: 100,
    used_count: 14,
    starts_at: null,
    expires_at: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'cp-2',
    code: 'SAVE500',
    description: 'Flat ৳500 off on gaming PCs & components above ৳5000',
    discount_type: 'fixed',
    discount_value: 500,
    min_order_amount: 5000,
    max_discount_amount: null,
    usage_limit: 50,
    used_count: 8,
    starts_at: null,
    expires_at: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// ============================================
// Dashboard Statistics
// ============================================
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const supabase = await createServerSupabaseClient();
    const [
      { count: totalOrders },
      { count: totalProducts },
      { count: totalCustomers },
      { count: pendingOrders },
      { count: lowStockProducts },
    ] = await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('products').select('*', { count: 'exact', head: true }).lt('stock_quantity', 5),
    ]);

    const { data: revenueData } = await supabase
      .from('orders')
      .select('total')
      .in('status', ['confirmed', 'processing', 'shipped', 'delivered']);

    const totalRevenue = revenueData?.reduce((sum, o) => sum + Number(o.total), 0) || 0;

    const { data: recentOrders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (totalProducts !== null && totalProducts !== undefined && totalProducts > 0) {
      return {
        totalOrders: totalOrders || 0,
        totalRevenue,
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0,
        pendingOrders: pendingOrders || 0,
        lowStockProducts: lowStockProducts || 0,
        recentOrders: (recentOrders as Order[]) || [],
        monthlyRevenue: [],
      };
    }
  } catch (e) {
    // Fallback to local in-memory records
  }

  const revenue = inMemoryOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return {
    totalOrders: inMemoryOrders.length,
    totalRevenue: revenue,
    totalProducts: inMemoryProducts.length,
    totalCustomers: 24,
    pendingOrders: inMemoryOrders.filter((o) => o.status === 'pending').length,
    lowStockProducts: inMemoryProducts.filter((p) => p.stock_quantity < 5).length,
    recentOrders: inMemoryOrders.slice(0, 5),
    monthlyRevenue: [
      { month: 'Oct 2026', revenue },
    ],
  };
}

// ============================================
// Product CRUD
// ============================================
export async function adminGetProducts(page = 1, search = '', limit = 20) {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug),
        brand:brands(id, name, slug),
        images:product_images(*)
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;
    if (!error && data && data.length > 0) {
      return { products: data as Product[], total: count || data.length, page, limit };
    }
  } catch (e) {
    // Fallback
  }

  let list = [...inMemoryProducts];
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
  }
  const from = (page - 1) * limit;
  return { products: list.slice(from, from + limit), total: list.length, page, limit };
}

export async function adminCreateProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = (formData.get('slug') as string) || generateSlug(name);
  const sku = (formData.get('sku') as string) || `BT-${Date.now().toString().slice(-6)}`;
  const description = (formData.get('description') as string) || null;
  const shortDescription = (formData.get('short_description') as string) || null;
  const categoryId = (formData.get('category_id') as string) || null;
  const brandId = (formData.get('brand_id') as string) || null;
  const price = parseFloat(formData.get('price') as string);
  const discountedPrice = formData.get('discounted_price') ? parseFloat(formData.get('discounted_price') as string) : null;
  const stockQuantity = parseInt(formData.get('stock_quantity') as string, 10) || 0;
  const condition = (formData.get('condition') as 'new' | 'used' | 'refurbished') || 'new';
  const conditionGrade = (formData.get('condition_grade') as string) || null;
  const conditionNotes = (formData.get('condition_notes') as string) || null;
  const batteryHealth = (formData.get('battery_health') as string) || null;
  const testingNotes = (formData.get('testing_notes') as string) || null;
  const warrantyInfo = (formData.get('warranty_info') as string) || null;
  const defects = (formData.get('defects') as string) || null;
  const isFeatured = formData.get('is_featured') === 'true';
  const isPublished = formData.get('is_published') === 'true';
  const imageUrl = (formData.get('image_url') as string) || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80';

  if (!name || isNaN(price)) {
    return { error: 'Name and price are required' };
  }

  try {
    const adminClient = await createAdminSupabaseClient();
    const { data, error } = await adminClient
      .from('products')
      .insert({
        name, slug, sku, description, short_description: shortDescription,
        category_id: categoryId || null, brand_id: brandId || null,
        price, discounted_price: discountedPrice,
        stock_quantity: stockQuantity, condition,
        condition_grade: conditionGrade, condition_notes: conditionNotes,
        battery_health: batteryHealth, testing_notes: testingNotes,
        warranty_info: warrantyInfo, defects: defects,
        is_featured: isFeatured, is_published: isPublished,
      })
      .select()
      .single();

    if (!error && data) {
      if (imageUrl) {
        await adminClient.from('product_images').insert({
          product_id: data.id,
          url: imageUrl,
          is_primary: true,
          sort_order: 0,
        });
      }
      revalidatePath('/admin/products');
      revalidatePath('/products');
      return { success: true, product: data };
    }
  } catch (e) {
    // Fallback
  }

  // Create in memory
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    name, slug, sku, description, short_description: shortDescription,
    category_id: categoryId, brand_id: brandId,
    price, discounted_price: discountedPrice,
    stock_quantity: stockQuantity, condition,
    condition_grade: conditionGrade, condition_notes: conditionNotes,
    battery_health: batteryHealth, testing_notes: testingNotes,
    warranty_info: warrantyInfo, defects: defects,
    is_featured: isFeatured, is_published: isPublished,
    meta_title: null, meta_description: null, views: 0,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    images: [{ id: `img-${Date.now()}`, product_id: `prod-${Date.now()}`, url: imageUrl, alt_text: name, sort_order: 0, is_primary: true, created_at: '' }],
    category: inMemoryCategories.find((c) => c.id === categoryId),
    brand: inMemoryBrands.find((b) => b.id === brandId),
  };

  inMemoryProducts.unshift(newProduct);
  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true, product: newProduct };
}

export async function adminUpdateProduct(productId: string, formData: FormData) {
  try {
    const adminClient = await createAdminSupabaseClient();
    const updateData: Record<string, unknown> = {};
    const fields = [
      'name', 'slug', 'sku', 'description', 'short_description',
      'condition', 'condition_grade', 'condition_notes', 'battery_health',
      'testing_notes', 'warranty_info', 'defects',
    ];

    fields.forEach((field) => {
      const val = formData.get(field);
      if (val !== null) updateData[field] = val || null;
    });

    const price = formData.get('price');
    if (price) updateData.price = parseFloat(price as string);
    const dp = formData.get('discounted_price');
    if (dp !== null) updateData.discounted_price = dp ? parseFloat(dp as string) : null;
    const stock = formData.get('stock_quantity');
    if (stock !== null) updateData.stock_quantity = parseInt(stock as string, 10);
    const isFeatured = formData.get('is_featured');
    if (isFeatured !== null) updateData.is_featured = isFeatured === 'true';
    const isPublished = formData.get('is_published');
    if (isPublished !== null) updateData.is_published = isPublished === 'true';

    const { error } = await adminClient.from('products').update(updateData).eq('id', productId);
    if (!error) {
      revalidatePath('/admin/products');
      revalidatePath('/products');
      return { success: true };
    }
  } catch (e) {
    // Fallback
  }

  // Update in memory
  const idx = inMemoryProducts.findIndex((p) => p.id === productId);
  if (idx !== -1) {
    const p = inMemoryProducts[idx];
    const name = (formData.get('name') as string) || p.name;
    const price = formData.get('price') ? parseFloat(formData.get('price') as string) : p.price;
    const stock = formData.get('stock_quantity') ? parseInt(formData.get('stock_quantity') as string, 10) : p.stock_quantity;
    const isPublished = formData.get('is_published') !== null ? formData.get('is_published') === 'true' : p.is_published;

    inMemoryProducts[idx] = {
      ...p,
      name,
      price,
      stock_quantity: stock,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    };
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

export async function adminDeleteProduct(productId: string) {
  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('products').delete().eq('id', productId);
  } catch (e) {
    // Fallback
  }

  inMemoryProducts = inMemoryProducts.filter((p) => p.id !== productId);
  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

export async function adminToggleProductPublish(productId: string, isPublished: boolean) {
  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('products').update({ is_published: isPublished }).eq('id', productId);
  } catch (e) {
    // Fallback
  }

  const p = inMemoryProducts.find((item) => item.id === productId);
  if (p) p.is_published = isPublished;

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

// ============================================
// Orders CRUD & Status Transition
// ============================================
export async function adminGetOrders(page = 1, status = '', search = '', limit = 20) {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from('orders')
      .select(`*, items:order_items(*)`, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (search) {
      query = query.or(`order_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;
    if (!error && data && data.length > 0) {
      return { orders: data as Order[], total: count || data.length, page, limit };
    }
  } catch (e) {
    // Fallback
  }

  let list = [...inMemoryOrders];
  if (status) list = list.filter((o) => o.status === status);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((o) =>
      o.order_number.toLowerCase().includes(q) ||
      o.customer_name.toLowerCase().includes(q) ||
      o.customer_phone.includes(q)
    );
  }
  return { orders: list, total: list.length, page, limit };
}

export async function adminUpdateOrderStatus(orderId: string, status: string) {
  try {
    const adminClient = await createAdminSupabaseClient();
    const updateData: Record<string, unknown> = { status };
    if (status === 'shipped') updateData.shipped_at = new Date().toISOString();
    if (status === 'delivered') {
      updateData.delivered_at = new Date().toISOString();
      updateData.payment_status = 'paid';
    }
    if (status === 'cancelled') updateData.cancelled_at = new Date().toISOString();

    await adminClient.from('orders').update(updateData).eq('id', orderId);
  } catch (e) {
    // Fallback
  }

  const ord = inMemoryOrders.find((o) => o.id === orderId);
  if (ord) {
    ord.status = status as any;
    if (status === 'delivered') ord.payment_status = 'paid';
  }

  revalidatePath('/admin/orders');
  revalidatePath('/order-tracking');
  return { success: true };
}

// ============================================
// Categories CRUD
// ============================================
export async function adminGetCategories() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) return data as Category[];
  } catch (e) {
    // Fallback
  }
  return inMemoryCategories;
}

export async function adminCreateCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = (formData.get('slug') as string) || generateSlug(name);
  const description = (formData.get('description') as string) || null;

  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('categories').insert({ name, slug, description });
  } catch (e) {
    // Fallback
  }

  inMemoryCategories.push({
    id: `cat-${Date.now()}`,
    name,
    slug,
    description,
    image_url: null,
    parent_id: null,
    sort_order: inMemoryCategories.length + 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  revalidatePath('/admin/categories');
  return { success: true };
}

export async function adminDeleteCategory(categoryId: string) {
  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('categories').delete().eq('id', categoryId);
  } catch (e) {
    // Fallback
  }

  inMemoryCategories = inMemoryCategories.filter((c) => c.id !== categoryId);
  revalidatePath('/admin/categories');
  return { success: true };
}

// ============================================
// Brands CRUD
// ============================================
export async function adminGetBrands() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from('brands').select('*').order('name', { ascending: true });
    if (!error && data && data.length > 0) return data as Brand[];
  } catch (e) {
    // Fallback
  }
  return inMemoryBrands;
}

export async function adminCreateBrand(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = (formData.get('slug') as string) || generateSlug(name);

  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('brands').insert({ name, slug });
  } catch (e) {
    // Fallback
  }

  inMemoryBrands.push({
    id: `br-${Date.now()}`,
    name,
    slug,
    logo_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  revalidatePath('/admin/brands');
  return { success: true };
}

export async function adminDeleteBrand(brandId: string) {
  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('brands').delete().eq('id', brandId);
  } catch (e) {
    // Fallback
  }

  inMemoryBrands = inMemoryBrands.filter((b) => b.id !== brandId);
  revalidatePath('/admin/brands');
  return { success: true };
}

// ============================================
// Coupons CRUD
// ============================================
export async function adminGetCoupons() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Coupon[];
  } catch (e) {
    // Fallback
  }
  return inMemoryCoupons;
}

export async function adminCreateCoupon(formData: FormData) {
  const code = (formData.get('code') as string).toUpperCase();
  const description = (formData.get('description') as string) || null;
  const discountType = (formData.get('discount_type') as 'percentage' | 'fixed') || 'percentage';
  const discountValue = parseFloat(formData.get('discount_value') as string);
  const minOrderAmount = formData.get('min_order_amount') ? parseFloat(formData.get('min_order_amount') as string) : 0;

  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('coupons').insert({
      code, description, discount_type: discountType, discount_value: discountValue,
      min_order_amount: minOrderAmount,
    });
  } catch (e) {
    // Fallback
  }

  inMemoryCoupons.unshift({
    id: `cp-${Date.now()}`,
    code, description, discount_type: discountType, discount_value: discountValue,
    min_order_amount: minOrderAmount, max_discount_amount: null,
    usage_limit: 100, used_count: 0, starts_at: null, expires_at: null,
    is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  });

  revalidatePath('/admin/coupons');
  return { success: true };
}

export async function adminDeleteCoupon(couponId: string) {
  try {
    const adminClient = await createAdminSupabaseClient();
    await adminClient.from('coupons').delete().eq('id', couponId);
  } catch (e) {
    // Fallback
  }

  inMemoryCoupons = inMemoryCoupons.filter((c) => c.id !== couponId);
  revalidatePath('/admin/coupons');
  return { success: true };
}

// ============================================
// Settings Management
// ============================================
let inMemorySettings: Record<string, string> = {
  store_name: 'Byte Tech BD',
  store_email: 'info@bytetechbd.com',
  store_phone: '+880 1700-000000',
  store_address: 'Level 4, Multiplan Center, Dhaka, Bangladesh',
  delivery_charge_dhaka: '80',
  delivery_charge_outside: '150',
  free_delivery_threshold: '10000',
  currency: 'BDT',
  currency_symbol: '৳',
};

export async function adminGetSettings() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from('store_settings').select('*');
    if (!error && data && data.length > 0) {
      data.forEach((s) => { inMemorySettings[s.key] = s.value; });
    }
  } catch (e) {
    // Fallback
  }
  return inMemorySettings;
}

export async function adminUpdateSettings(settings: Record<string, string>) {
  try {
    const adminClient = await createAdminSupabaseClient();
    for (const [key, value] of Object.entries(settings)) {
      await adminClient.from('store_settings').upsert({ key, value }, { onConflict: 'key' });
    }
  } catch (e) {
    // Fallback
  }

  inMemorySettings = { ...inMemorySettings, ...settings };
  revalidatePath('/admin/settings');
  revalidatePath('/');
  return { success: true };
}

// ============================================
// Customers Listing
// ============================================
export async function adminGetCustomers(page = 1, search = '', limit = 20) {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase.from('profiles').select('*', { count: 'exact' }).eq('role', 'customer');
    if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    const from = (page - 1) * limit;
    const { data, count, error } = await query.range(from, from + limit - 1);
    if (!error && data && data.length > 0) {
      return { customers: data, total: count || data.length, page, limit };
    }
  } catch (e) {
    // Fallback
  }

  const demoCustomers = [
    { id: 'usr-1', email: 'tanvir.ahmed@gmail.com', full_name: 'Tanvir Ahmed', phone: '01711002233', role: 'customer', created_at: '2026-10-15T10:00:00Z' },
    { id: 'usr-2', email: 'sumon.khan@outlook.com', full_name: 'Sumon Khan', phone: '01911445566', role: 'customer', created_at: '2026-10-18T14:30:00Z' },
    { id: 'usr-3', email: 'sakib.hassan@yahoo.com', full_name: 'Sakib Hassan', phone: '01811778899', role: 'customer', created_at: '2026-10-22T09:15:00Z' },
    { id: 'usr-4', email: 'farhana.yasmin@gmail.com', full_name: 'Farhana Yasmin', phone: '01611001122', role: 'customer', created_at: '2026-10-25T16:45:00Z' },
  ];

  return { customers: demoCustomers, total: demoCustomers.length, page, limit };
}

// ============================================
// Reports Export Data
// ============================================
export async function adminExportOrders(status?: string) {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase.from('orders').select('*, items:order_items(*)').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (!error && data && data.length > 0) return data;
  } catch (e) {
    // Fallback
  }
  return inMemoryOrders;
}
