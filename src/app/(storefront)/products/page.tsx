import { getProducts, getCategories, getBrands } from '@/lib/actions/products';
import { ProductCard } from '@/components/storefront/ProductCard';
import { ProductFilters } from '@/components/storefront/ProductFilters';
import { Pagination } from '@/components/storefront/Pagination';
import type { ProductCondition } from '@/lib/types';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    brand?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: 'price_asc' | 'price_desc' | 'newest' | 'name_asc' | 'popular';
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const condition = (searchParams.condition as ProductCondition) || undefined;

  const [productsData, categories, brands] = await Promise.all([
    getProducts({
      category: searchParams.category,
      brand: searchParams.brand,
      condition,
      minPrice,
      maxPrice,
      search: searchParams.search,
      sort: searchParams.sort || 'newest',
      page,
      limit: 12,
    }),
    getCategories(),
    getBrands(),
  ]);

  const categoryName = searchParams.category
    ? categories.find((c) => c.slug === searchParams.category)?.name
    : null;

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <span className="text-navy-950 font-medium">Products</span>
            {categoryName && (
              <>
                <span>/</span>
                <span className="text-teal-600 font-semibold">{categoryName}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            {categoryName || (searchParams.search ? `Search results for "${searchParams.search}"` : 'All Computer Products')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse genuine laptops, desktops, components, and gear available for delivery across Bangladesh.
          </p>
        </div>

        {/* Filter Controls Component */}
        <ProductFilters
          categories={categories}
          brands={brands}
          totalCount={productsData.total}
        />

        {/* Products Grid */}
        {productsData.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {productsData.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={productsData.page}
              totalPages={productsData.totalPages}
              basePath="/products"
            />
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <SearchX size={28} />
            </div>
            <h3 className="text-lg font-bold text-navy-950 mb-1">No products found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn&apos;t find any products matching your selected filters. Try broadening your criteria or reset filters.
            </p>
            <Link href="/products" className="btn-primary text-sm">
              Reset All Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
