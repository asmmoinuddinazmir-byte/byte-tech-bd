'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, Truck, CheckCircle2, AlertCircle, 
  Banknote, CreditCard, Lock, ArrowLeft, PackageCheck
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { createOrder, validateCoupon } from '@/lib/actions/orders';
import { formatPrice, isValidBDPhone } from '@/lib/utils';
import { BD_DISTRICTS } from '@/lib/constants';
import { toast } from 'sonner';
import type { CheckoutFormData, PaymentMethod } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, getTotal, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: 'Dhaka',
    shipping_district: 'Dhaka',
    shipping_postal_code: '',
    order_notes: '',
    payment_method: 'cod',
    coupon_code: '',
  });

  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; description?: string | null } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500">Preparing checkout...</p>
      </div>
    );
  }

  // If order was just placed successfully
  if (orderSuccess) {
    return (
      <div className="py-16 md:py-24">
        <div className="max-w-xl mx-auto px-4 text-center bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-lg animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <span className="badge bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            Order Placed Successfully!
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 mb-2">
            Thank You For Your Order
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            We have received your order and our logistics team will call your phone to verify delivery.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-mono font-bold text-teal-600">{orderSuccess}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recipient Name:</span>
              <span className="font-semibold text-navy-950">{formData.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact Phone:</span>
              <span className="font-semibold text-navy-950">{formData.customer_phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-bold text-navy-950">Cash on Delivery</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-medium text-navy-950 text-right max-w-xs truncate">
                {formData.shipping_address}, {formData.shipping_district}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/order-tracking?order=${encodeURIComponent(orderSuccess)}`}
              className="btn-primary flex-1 text-sm font-bold py-3 flex items-center justify-center gap-2"
            >
              <PackageCheck size={16} />
              <span>Track Order Status</span>
            </Link>
            <Link
              href="/"
              className="btn-outline flex-1 text-sm font-bold py-3"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">Your cart is empty</h2>
        <p className="text-sm text-slate-500 mb-6">Add products before proceeding to checkout.</p>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  // Delivery calculations
  const deliveryCharge = subtotal >= 10000 ? 0 : deliveryArea === 'dhaka' ? 80 : 150;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal + deliveryCharge - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    try {
      const result = await validateCoupon(couponCode.trim(), subtotal);
      if (result.valid) {
        setAppliedCoupon({
          code: couponCode.trim().toUpperCase(),
          discount: result.discount || 0,
          description: result.description,
        });
        toast.success(`Coupon applied: -৳${result.discount || 0}`);
      } else {
        toast.error(result.error || 'Invalid coupon code');
      }
    } catch (err) {
      toast.error('Failed to validate coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.customer_name.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!formData.customer_phone.trim()) {
      toast.error('Please enter your mobile phone number');
      return;
    }

    if (!isValidBDPhone(formData.customer_phone)) {
      toast.error('Please enter a valid Bangladeshi mobile number (e.g. 01700000000)');
      return;
    }

    if (!formData.shipping_address.trim()) {
      toast.error('Please enter your complete delivery address');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createOrder(
        formData,
        items,
        deliveryCharge,
        discountAmount
      );

      if (result.success && result.order_number) {
        clearCart();
        setOrderSuccess(result.order_number);
        toast.success('Your order has been confirmed!');
      } else {
        toast.error(result.error || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 mb-2">
            <ArrowLeft size={14} /> Return to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Checkout & Order Confirmation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete your delivery details. Cash on Delivery is available all over Bangladesh.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Customer Details Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Contact Info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-navy-950 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span>1. Contact & Recipient Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="e.g. Tanvir Ahmed"
                      className="input-field text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number (BD Mobile) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      placeholder="e.g. 017XXXXXXXX"
                      className="input-field text-sm font-mono"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Our courier will contact this number before delivery.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.customer_email || ''}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      placeholder="e.g. tanvir@gmail.com"
                      className="input-field text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-navy-950 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span>2. Delivery Address</span>
                </h2>

                {/* Delivery Area Selection */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryArea('dhaka');
                      setFormData({ ...formData, shipping_district: 'Dhaka', shipping_city: 'Dhaka' });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryArea === 'dhaka'
                        ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-navy-950 block">Inside Dhaka City</span>
                    <span className="text-xs text-teal-600 font-semibold">Delivery: ৳80 (24-48 Hours)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryArea('outside');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryArea === 'outside'
                        ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-navy-950 block">Outside Dhaka (All BD)</span>
                    <span className="text-xs text-teal-600 font-semibold">Delivery: ৳150 (48-72 Hours)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      District *
                    </label>
                    <select
                      value={formData.shipping_district}
                      onChange={(e) => setFormData({ ...formData, shipping_district: e.target.value })}
                      className="input-field text-sm"
                    >
                      {BD_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Thana / Area / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shipping_city}
                      onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })}
                      placeholder="e.g. Dhanmondi, Mirpur, Uttara"
                      className="input-field text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Street Address / House / Road *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.shipping_address}
                      onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                      placeholder="e.g. House #14, Road #5, Block C, Mirpur-2"
                      className="input-field text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Delivery Instructions / Special Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.order_notes || ''}
                      onChange={(e) => setFormData({ ...formData, order_notes: e.target.value })}
                      placeholder="e.g. Please deliver after 3:00 PM / Call before arrival"
                      className="input-field text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-navy-950 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span>3. Payment Method</span>
                </h2>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-teal-500 bg-teal-50/40 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_method"
                      value="cod"
                      checked={formData.payment_method === 'cod'}
                      onChange={() => setFormData({ ...formData, payment_method: 'cod' })}
                      className="mt-1 text-teal-500 focus:ring-teal-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="text-teal-600" size={18} />
                        <span className="font-bold text-sm text-navy-950">Cash on Delivery (COD)</span>
                        <span className="badge bg-emerald-100 text-emerald-800 text-[10px]">Recommended</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Pay with cash upon receipt. You can inspect the packaging with the courier rider.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed">
                    <input
                      type="radio"
                      name="payment_method"
                      disabled
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="text-slate-500" size={18} />
                        <span className="font-bold text-sm text-slate-700">Online Gateway (SSLCommerz / bKash / Cards)</span>
                        <span className="badge bg-slate-200 text-slate-600 text-[10px]">Configurable</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Online payment gateway activates once merchant credentials are provided in .env.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Review & Coupon (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h2 className="text-lg font-black text-navy-950 pb-3 border-b border-slate-100">
                  Order Summary ({items.length} Items)
                </h2>

                {/* Items summary */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => {
                    const price = item.product.discounted_price || item.product.price;
                    return (
                      <div key={item.product_id} className="flex justify-between items-center text-xs">
                        <div className="truncate max-w-[200px]">
                          <span className="font-bold text-navy-950">{item.product.name}</span>
                          <span className="text-slate-400 block">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-bold text-navy-950">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Input */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      className="input-field text-xs py-2 uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="btn-outline text-xs py-2 px-3 shrink-0"
                    >
                      {couponLoading ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-xs text-emerald-600 font-semibold mt-1">
                      ✓ {appliedCoupon.code} applied (-৳{appliedCoupon.discount})
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-navy-950">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Charge ({deliveryArea === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                    <span>
                      {deliveryCharge === 0 ? (
                        <strong className="text-emerald-600 font-bold">FREE</strong>
                      ) : (
                        <strong className="text-navy-950">{formatPrice(deliveryCharge)}</strong>
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
                    <span className="font-black text-navy-950">Total Payable:</span>
                    <span className="text-2xl font-black text-teal-600">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-base font-bold shadow-lg shadow-teal-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Confirming Order...
                    </span>
                  ) : (
                    <span>Confirm Order (Cash on Delivery)</span>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  By clicking Confirm Order, you agree to Byte Tech BD&apos;s Terms & Shipping Policy.
                </p>
              </div>

              {/* Safety notice */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2 font-bold text-navy-950">
                  <ShieldCheck size={16} className="text-teal-600" />
                  <span>Buyer Protection Guarantee</span>
                </div>
                <p>
                  Every order includes tracking and 7 days return privilege in case of any manufacturing defects.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
