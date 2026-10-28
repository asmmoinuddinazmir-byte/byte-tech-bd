'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import type { Category, Brand } from '@/lib/types';
import { PRODUCT_CONDITIONS } from '@/lib/constants';

interface ProductFiltersProps {
  categories?: Category[];
  brands?: Brand[];
  totalCount?: number;
}

export function ProductFilters({ categories = [], brands = [], totalCount }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentCondition = searchParams.get('condition') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentSearch = searchParams.get('search') || '';

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // Reset to page 1
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAllFilters = () => {
    router.push('/products');
  };

  const hasActiveFilters = Boolean(
    currentCategory || currentBrand || currentCondition || currentMinPrice || currentMaxPrice || currentSearch
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-8 shadow-xs">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn-outline text-xs sm:text-sm py-2 px-3.5 flex items-center gap-2"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            )}
          </button>

          {totalCount !== undefined && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Found <span className="font-bold text-navy-950">{totalCount}</span> products
            </p>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-semibold uppercase tracking-wider hidden sm:inline">
            Sort:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="text-xs sm:text-sm rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High (৳)</option>
              <option value="price_desc">Price: High to Low (৳)</option>
              <option value="popular">Most Popular</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Active:</span>

          {currentSearch && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              Search: &quot;{currentSearch}&quot;
              <button onClick={() => updateFilter('search', '')} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          )}

          {currentCategory && (
            <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">
              Category: {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}
              <button onClick={() => updateFilter('category', '')} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          )}

          {currentBrand && (
            <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">
              Brand: {brands.find((b) => b.slug === currentBrand)?.name || currentBrand}
              <button onClick={() => updateFilter('brand', '')} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          )}

          {currentCondition && (
            <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-medium">
              Condition: {currentCondition}
              <button onClick={() => updateFilter('condition', '')} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          )}

          {(currentMinPrice || currentMaxPrice) && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              Price: ৳{currentMinPrice || '0'} - {currentMaxPrice ? `৳${currentMaxPrice}` : 'Max'}
              <button
                onClick={() => {
                  updateFilter('minPrice', '');
                  updateFilter('maxPrice', '');
                }}
                className="hover:text-rose-600"
              >
                <X size={12} />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Expandable Filter Details */}
      <div className={`${isOpen ? 'block' : 'hidden'} mt-5 pt-4 border-t border-slate-200 animate-fade-in`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={currentCategory}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Brand
            </label>
            <select
              value={currentBrand}
              onChange={(e) => updateFilter('brand', e.target.value)}
              className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.slug}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Condition
            </label>
            <select
              value={currentCondition}
              onChange={(e) => updateFilter('condition', e.target.value)}
              className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Conditions</option>
              {PRODUCT_CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Price Range (৳ BDT)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={currentMinPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                placeholder="Min"
                className="w-1/2 text-xs sm:text-sm rounded-lg border border-slate-300 p-2 bg-slate-50 focus:bg-white"
              />
              <span className="text-slate-400">-</span>
              <input
                type="number"
                value={currentMaxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                placeholder="Max"
                className="w-1/2 text-xs sm:text-sm rounded-lg border border-slate-300 p-2 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
