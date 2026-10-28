'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Check, Shield, BatteryMedium, Cpu } from 'lucide-react';
import { formatPrice, getDiscountPercentage, getConditionBadgeColor, getConditionGradeColor } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const effectivePrice = product.discounted_price || product.price;
  const hasDiscount = product.discounted_price && product.discounted_price < product.price;
  const isOutOfStock = product.stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem(product, 1);
    setAdded(true);
    toast.success(`Added ${product.name} to cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  // Find primary image or fallback SVG
  const imageUrl = product.images?.[0]?.url;

  return (
    <div className="card group overflow-hidden flex flex-col h-full bg-white border border-slate-200 hover:border-teal-400 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/5">
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">
        {/* Product Visual Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-tr from-slate-100 to-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
              <Cpu size={48} className="text-teal-600/40 group-hover:scale-110 transition-transform mb-2" />
              <span className="text-[11px] font-mono font-medium text-slate-400">Byte Tech BD</span>
            </div>
          )}

          {/* Badges on Top Corners */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
            {/* Condition badge */}
            <span className={`badge ${getConditionBadgeColor(product.condition)} shadow-xs`}>
              {product.condition === 'new' ? 'Brand New' : 'Used Certified'}
              {product.condition_grade && ` • Grade ${product.condition_grade}`}
            </span>

            {/* Discount badge */}
            {hasDiscount && (
              <span className="badge bg-rose-500 text-white shadow-xs">
                -{getDiscountPercentage(product.price, product.discounted_price!)}% OFF
              </span>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 z-10">
            {isOutOfStock ? (
              <span className="badge bg-slate-800 text-white">Out of Stock</span>
            ) : product.stock_quantity < 5 ? (
              <span className="badge bg-amber-500 text-white animate-pulse">Low Stock</span>
            ) : null}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          {/* Brand & Category line */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-teal-600 uppercase tracking-wider text-[11px]">
              {product.category?.name || 'Hardware'}
            </span>
            {product.brand?.name && (
              <span className="text-slate-500 font-medium">{product.brand.name}</span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm md:text-base text-navy-950 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Specs / Highlights */}
          {product.short_description ? (
            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
              {product.short_description}
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.battery_health && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <BatteryMedium size={12} /> Battery: {product.battery_health}
                </span>
              )}
              {product.warranty_info && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  <Shield size={12} className="text-teal-600" /> {product.warranty_info}
                </span>
              )}
            </div>
          )}

          {/* Pricing & Cart Action at Bottom */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-slate-400 font-medium">Price</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg md:text-xl font-black text-navy-950">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`p-2.5 rounded-lg font-medium transition-all duration-150 flex items-center justify-center shrink-0 ${
                added
                  ? 'bg-emerald-500 text-white'
                  : isOutOfStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-navy-900 text-white hover:bg-teal-500 active:scale-95'
              }`}
              title={isOutOfStock ? 'Currently Out of Stock' : 'Add to Cart'}
              aria-label="Add to cart"
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
