// ============================================
// Database Types for Byte Tech BD
// ============================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'customer' | 'admin';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  short_description: string | null;
  category_id: string | null;
  brand_id: string | null;
  price: number;
  discounted_price: number | null;
  stock_quantity: number;
  condition: 'new' | 'used' | 'refurbished';
  condition_grade: string | null;
  condition_notes: string | null;
  battery_health: string | null;
  testing_notes: string | null;
  warranty_info: string | null;
  defects: string | null;
  is_featured: boolean;
  is_published: boolean;
  meta_title: string | null;
  meta_description: string | null;
  views: number;
  created_at: string;
  updated_at: string;
  // Joined relations
  category?: Category | null;
  brand?: Brand | null;
  images?: ProductImage[];
  specifications?: ProductSpecification[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_key: string;
  spec_value: string;
  sort_order: number;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  district: string;
  postal_code: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  delivery_charge: number;
  discount_amount: number;
  total: number;
  coupon_id: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_postal_code: string | null;
  order_notes: string | null;
  tracking_number: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StoreSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

// ============================================
// Enums and Helper Types
// ============================================

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'sslcommerz' | 'bkash' | 'nagad';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partially_refunded';
export type ProductCondition = 'new' | 'used' | 'refurbished';

export interface CartItem {
  product_id: string;
  product: Product;
  quantity: number;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  condition?: ProductCondition;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'name_asc' | 'name_desc' | 'popular';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockProducts: number;
  recentOrders: Order[];
  monthlyRevenue: { month: string; revenue: number }[];
}

export interface CheckoutFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_postal_code: string;
  order_notes: string;
  payment_method: PaymentMethod;
  coupon_code?: string;
}
