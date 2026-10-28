'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Product, ProductFilters, PaginatedResponse, Category, Brand, Banner } from '@/lib/types';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import { DEMO_PRODUCTS, DEMO_CATEGORIES, DEMO_BRANDS } from '@/lib/demo-data';

export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<Product>> {
  const {
    category,
    brand,
    condition,
    minPrice,
    maxPrice,
    search,
    sort = 'newest',
    page = 1,
    limit = ITEMS_PER_PAGE,
  } = filters;

  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        brand:brands(*),
        images:product_images(*),
        specifications:product_specifications(*)
      `,
        { count: 'exact' }
      )
      .eq('is_published', true);

    if (category) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      if (cat) query = query.eq('category_id', cat.id);
    }

    if (brand) {
      const { data: br } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', brand)
        .single();
      if (br) query = query.eq('brand_id', br.id);
    }

    if (condition) query = query.eq('condition', condition);
    if (minPrice !== undefined) query = query.gte('price', minPrice);
    if (maxPrice !== undefined) query = query.lte('price', maxPrice);

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%,short_description.ilike.%${search}%`
      );
    }

    switch (sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'name_asc':
        query = query.order('name', { ascending: true });
        break;
      case 'popular':
        query = query.order('views', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (!error && data && data.length > 0) {
      return {
        data: data as Product[],
        total: count || data.length,
        page,
        limit,
        totalPages: Math.ceil((count || data.length) / limit),
      };
    }
  } catch (e) {
    // Graceful fallback to demo data
  }

  // Filter in-memory demo data
  let filtered = [...DEMO_PRODUCTS];

  if (category) {
    filtered = filtered.filter((p) => p.category?.slug === category);
  }

  if (brand) {
    filtered = filtered.filter((p) => p.brand?.slug === brand);
  }

  if (condition) {
    filtered = filtered.filter((p) => p.condition === condition);
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => (p.discounted_price || p.price) >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => (p.discounted_price || p.price) <= maxPrice);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.short_description && p.short_description.toLowerCase().includes(q))
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    const priceA = a.discounted_price || a.price;
    const priceB = b.discounted_price || b.price;
    if (sort === 'price_asc') return priceA - priceB;
    if (sort === 'price_desc') return priceB - priceA;
    if (sort === 'name_asc') return a.name.localeCompare(b.name);
    if (sort === 'popular') return (b.views || 0) - (a.views || 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    data: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        brand:brands(*),
        images:product_images(*),
        specifications:product_specifications(*)
      `
      )
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (!error && data) {
      // Async view count bump
      try {
        await supabase
          .from('products')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id);
      } catch (err) {
        // Ignore view count update error
      }
      return data as Product;
    }
  } catch (e) {
    // Fallback
  }

  const found = DEMO_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        brand:brands(*),
        images:product_images(*)
      `
      )
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(8);

    if (!error && data && data.length > 0) {
      return data as Product[];
    }
  } catch (e) {
    // Fallback
  }

  return DEMO_PRODUCTS.filter((p) => p.is_featured);
}

export async function getNewArrivals(): Promise<Product[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        brand:brands(*),
        images:product_images(*)
      `
      )
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(8);

    if (!error && data && data.length > 0) {
      return data as Product[];
    }
  } catch (e) {
    // Fallback
  }

  return DEMO_PRODUCTS.slice(0, 6);
}

export async function getSpecialOffers(): Promise<Product[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        brand:brands(*),
        images:product_images(*)
      `
      )
      .eq('is_published', true)
      .not('discounted_price', 'is', null)
      .order('created_at', { ascending: false })
      .limit(8);

    if (!error && data && data.length > 0) {
      return data as Product[];
    }
  } catch (e) {
    // Fallback
  }

  return DEMO_PRODUCTS.filter((p) => p.discounted_price && p.discounted_price < p.price);
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string | null
): Promise<Product[]> {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        brand:brands(*),
        images:product_images(*)
      `
      )
      .eq('is_published', true)
      .neq('id', productId)
      .limit(4);

    if (categoryId) query = query.eq('category_id', categoryId);

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as Product[];
    }
  } catch (e) {
    // Fallback
  }

  return DEMO_PRODUCTS.filter((p) => p.id !== productId).slice(0, 4);
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Category[];
    }
  } catch (e) {
    // Fallback
  }

  return DEMO_CATEGORIES;
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Brand[];
    }
  } catch (e) {
    // Fallback
  }

  return DEMO_BRANDS;
}

export async function getBanners(): Promise<Banner[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Banner[];
    }
  } catch (e) {
    // Fallback
  }

  return [];
}

export async function getStoreSettings(): Promise<Record<string, string>> {
  const defaults: Record<string, string> = {
    store_name: 'Byte Tech BD',
    store_email: 'info@bytetechbd.com',
    store_phone: '+880 1700-000000',
    store_address: 'Multiplan Center, Dhaka, Bangladesh',
    delivery_charge_dhaka: '80',
    delivery_charge_outside: '150',
    currency: 'BDT',
    currency_symbol: '৳',
  };

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from('store_settings').select('key, value');

    if (!error && data && data.length > 0) {
      data.forEach((s) => {
        defaults[s.key] = s.value;
      });
    }
  } catch (e) {
    // Fallback
  }

  return defaults;
}
