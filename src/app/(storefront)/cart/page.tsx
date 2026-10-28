'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trash2, Plus, Minus, ArrowRight, ShoppingBag, 
  ShieldCheck, Truck, ArrowLeft 
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500">Loading your shopping cart...</p>
      </div>
    );
  }

  const subtotal = getTotal();
  const estimatedDelivery = subtotal >= 10000 ? 0 : 80; // Free over 10k
  const grandTotal = subtotal + estimatedDelivery;

  if (items.length === 0) {
    return (
      <div className="py-16 md:py-24">
        <div className="max-w-md mx-auto text-center px-4 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-2xl font-black text-navy-950 mb-2">Your Cart is Empty</h1>
          <p className="text-sm text-slate-500 mb-6">
            Looks like you haven&apos;t added any laptops, gaming PCs, or components yet.
          </p>
          <Link href="/products" className="btn-primary w-full text-sm font-bold py-3 shadow-md">
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              You have <span className="font-bold text-navy-950">{items.length}</span> item(s) in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const product = item.product;
              const unitPrice = product.discounted_price || product.price;
              const lineTotal = unitPrice * item.quantity;
              const imageUrl = product.images?.[0]?.url;

              return (
                <div
                  key={item.product_id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-slate-300 transition-colors"
                >
                  {/* Product visual & details */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-2 shrink-0">
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ShoppingBag size={24} className="text-slate-400" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-bold text-sm text-navy-950 hover:text-teal-600 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="capitalize text-slate-500 font-medium">
                          Condition: <strong className="text-navy-950">{product.condition}</strong>
                        </span>
                        {product.condition_grade && (
                          <span className="badge bg-teal-50 text-teal-700 text-[10px]">
                            Grade {product.condition_grade}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {formatPrice(unitPrice)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity controls and Line total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 py-1 font-bold text-xs text-navy-950 min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="text-sm font-black text-navy-950 block">
                        {formatPrice(lineTotal)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                <ArrowLeft size={14} /> Continue Browsing Products
              </Link>
            </div>
          </div>

          {/* Order Summary Box (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-lg font-black text-navy-950 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-navy-950">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Delivery</span>
                <span>
                  {estimatedDelivery === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE (Over ৳10,000)</span>
                  ) : (
                    <span className="font-bold text-navy-950">{formatPrice(estimatedDelivery)}</span>
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-black text-navy-950 block">Total Amount</span>
                  <span className="text-[11px] text-slate-400">Cash on Delivery available</span>
                </div>
                <span className="text-2xl font-black text-navy-950">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-teal-600 shrink-0" />
                <span>Delivery across 64 Districts in Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-teal-600 shrink-0" />
                <span>Pay only after receiving & inspecting your parcel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
