import Link from 'next/link';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  tag?: string;
  viewAllHref?: string;
  className?: string;
}

export function ProductGrid({
  products,
  title,
  subtitle,
  tag,
  viewAllHref,
  className = '',
}: ProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(title || viewAllHref) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200/80 pb-4">
            <div>
              {tag && (
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                  {tag}
                </span>
              )}
              {title && (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-slate-500 mt-1 max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>

            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 group shrink-0"
              >
                <span>View All Products</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}

        {/* Responsive Grid: 1 col on mobile xs, 2 on sm, 3 on md, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
