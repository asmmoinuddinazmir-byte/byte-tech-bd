'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, Zap, Shield, Check, Truck, 
  RotateCcw, BatteryCharging, Minus, Plus, Heart, Share2, CheckCircle2, Laptop 
} from 'lucide-react';
import { formatPrice, getDiscountPercentage, getConditionBadgeColor } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { toast } from 'sonner';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0]?.url || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
  );

  const effectivePrice = product.discounted_price || product.price;
  const hasDiscount = product.discounted_price && product.discounted_price < product.price;
  const isOutOfStock = product.stock_quantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    toast.success(`Added ${quantity}x ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    router.push('/checkout');
  };

  const images = product.images && product.images.length > 0
    ? product.images.map((img) => img.url)
    : [selectedImage];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      {/* Product Image Gallery Column (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        {/* Main Display Image */}
        <div className="relative aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center p-6 overflow-hidden">
          {selectedImage && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selectedImage}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <div className="w-20 h-20 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-3">
                <Laptop size={40} />
              </div>
              <span className="text-sm font-bold text-navy-950">{product.name}</span>
              <span className="text-xs font-mono text-teal-600 font-semibold mt-1">Byte Tech BD Verified</span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className={`badge ${getConditionBadgeColor(product.condition)} shadow-sm`}>
              {product.condition === 'new' ? 'Brand New' : 'Certified Used'}
              {product.condition_grade && ` • Grade ${product.condition_grade}`}
            </span>
            {hasDiscount && (
              <span className="badge bg-rose-500 text-white shadow-sm">
                -{getDiscountPercentage(product.price, product.discounted_price!)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-16 h-16 rounded-lg border-2 p-1 bg-slate-50 shrink-0 transition-all ${
                  selectedImage === imgUrl ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information Column (7 cols) */}
      <div className="lg:col-span-7 flex flex-col">
        {/* Brand & SKU */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          {product.brand?.name ? (
            <span className="font-bold text-teal-600 uppercase tracking-wider">
              {product.brand.name}
            </span>
          ) : (
            <span className="font-bold text-slate-400 uppercase tracking-wider">
              Genuine Hardware
            </span>
          )}
          {product.sku && <span className="font-mono text-slate-400">SKU: {product.sku}</span>}
        </div>

        {/* Product Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-navy-950 leading-snug mb-3">
          {product.name}
        </h1>

        {/* Short Highlights */}
        {product.short_description && (
          <p className="text-sm text-slate-600 mb-4 pb-4 border-b border-slate-100">
            {product.short_description}
          </p>
        )}

        {/* Price Tag Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider mb-0.5">
              Special Offer Price
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-navy-950">
                {formatPrice(effectivePrice)}
              </span>
              {hasDiscount && (
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider mb-0.5">
              Availability
            </span>
            {isOutOfStock ? (
              <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                Out of Stock
              </span>
            ) : (
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 size={14} /> In Stock ({product.stock_quantity} available)
              </span>
            )}
          </div>
        </div>

        {/* Hardware Status Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-slate-700">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
            <Shield className="text-teal-500 shrink-0" size={18} />
            <div>
              <span className="font-bold text-navy-900 block">Warranty Coverage</span>
              <span className="text-slate-500">{product.warranty_info || 'Byte Tech BD Standard Warranty'}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
            <Truck className="text-teal-500 shrink-0" size={18} />
            <div>
              <span className="font-bold text-navy-900 block">Delivery Time</span>
              <span className="text-slate-500">Dhaka: 24h • All BD: 48-72h</span>
            </div>
          </div>

          {product.battery_health && (
            <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center gap-2.5 sm:col-span-2">
              <BatteryCharging className="text-emerald-600 shrink-0" size={18} />
              <div>
                <span className="font-bold text-emerald-900 block">Original Battery Diagnostics</span>
                <span className="text-emerald-700">{product.battery_health} tested holding load properly.</span>
              </div>
            </div>
          )}
        </div>

        {/* Quantity and Actions */}
        <div className="mt-auto space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || isOutOfStock}
                className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <Minus size={15} />
              </button>
              <span className="px-4 py-1.5 font-bold text-sm text-navy-950 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                disabled={quantity >= product.stock_quantity || isOutOfStock}
                className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn-outline border-navy-900 text-navy-950 hover:bg-navy-900 hover:text-white py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <Zap size={18} />
              <span>Buy Now (Cash on Delivery)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
