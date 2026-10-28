'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, PackageCheck, Clock, CheckCircle2, 
  Truck, Check, AlertCircle, ShoppingBag 
} from 'lucide-react';
import { getOrderByNumber } from '@/lib/actions/orders';
import { formatPrice, formatDateTime, getOrderStatusColor } from '@/lib/utils';
import type { Order } from '@/lib/types';
import Link from 'next/link';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') || '');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const orderParam = searchParams.get('order');
    if (orderParam) {
      setOrderNumber(orderParam);
      setLoading(true);
      setSearched(true);
      getOrderByNumber(orderParam.trim())
        .then((data) => setOrder(data))
        .catch(() => setOrder(null))
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  const handleTrack = async (numToTrack?: string) => {
    const target = (numToTrack || orderNumber).trim();
    if (!target) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await getOrderByNumber(target);
      setOrder(data);
    } catch (e) {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Packaging' },
    { key: 'shipped', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' },
  ];

  const getStepIndex = (status: string) => {
    if (status === 'cancelled') return -1;
    return steps.findIndex((s) => s.key === status);
  };

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
          <PackageCheck size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Track Your Byte Tech BD Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Enter your order reference number (e.g. BTB-20261028-00001) sent to your mobile SMS or email.
        </p>
      </div>

      {/* Tracking Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrack();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter Order Number (e.g. BTB-20261028-00001)"
              className="input-field py-3 font-mono text-sm uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !orderNumber.trim()}
            className="btn-primary py-3 px-6 text-sm font-bold shrink-0 disabled:opacity-50"
          >
            {loading ? 'Locating...' : 'Track Order'}
          </button>
        </form>
      </div>

      {/* Order Details Display */}
      {order ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-md space-y-6 animate-fade-in">
          {/* Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">
                Order Number
              </span>
              <span className="text-lg font-black font-mono text-teal-600">
                {order.order_number}
              </span>
            </div>
            <div className="text-right">
              <span className={`badge ${getOrderStatusColor(order.status)} text-xs px-3 py-1 font-bold capitalize`}>
                {order.status}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                Placed on {formatDateTime(order.created_at)}
              </span>
            </div>
          </div>

          {/* Stepper Visual (if not cancelled) */}
          {order.status !== 'cancelled' ? (
            <div className="py-6">
              <div className="relative flex justify-between">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${Math.max(0, (currentStep / (steps.length - 1)) * 100)}%` }}
                />

                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={step.key} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-teal-500 text-white ring-4 ring-teal-100'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isDone ? <Check size={14} /> : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] font-semibold mt-2 text-center max-w-[70px] ${
                          isCurrent ? 'text-teal-600 font-bold' : isDone ? 'text-navy-950' : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle size={16} /> Order Cancelled
              </p>
              <p className="text-xs text-rose-600 mt-1">
                This order was cancelled. Reason: {order.cancellation_reason || 'Customer request or stock adjustment.'}
              </p>
            </div>
          )}

          {/* Recipient & Shipping Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <div>
              <span className="font-bold text-navy-950 block mb-1">Customer Details</span>
              <p>Name: <strong className="text-navy-950">{order.customer_name}</strong></p>
              <p>Phone: <strong className="text-navy-950">{order.customer_phone}</strong></p>
              {order.customer_email && <p>Email: {order.customer_email}</p>}
            </div>
            <div>
              <span className="font-bold text-navy-950 block mb-1">Shipping Destination</span>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_district}</p>
              <p className="text-teal-600 font-semibold mt-1">Payment: {order.payment_method.toUpperCase()} ({order.payment_status})</p>
            </div>
          </div>

          {/* Items summary */}
          {order.items && order.items.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Ordered Items ({order.items.length})
              </h3>
              <div className="space-y-2 border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                {order.items.map((it) => (
                  <div key={it.id} className="p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-navy-950 block">{it.product_name}</span>
                      <span className="text-slate-400 block">Quantity: {it.quantity} x {formatPrice(it.unit_price)}</span>
                    </div>
                    <span className="font-black text-navy-950">{formatPrice(it.total_price)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-600">Total Payable:</span>
                <span className="text-xl font-black text-navy-950">{formatPrice(order.total)}</span>
              </div>
            </div>
          )}
        </div>
      ) : searched && !loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto">
          <AlertCircle size={36} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-navy-950 mb-1">Order Not Found</h3>
          <p className="text-xs text-slate-500 mb-4">
            We couldn&apos;t find an order with reference &quot;{orderNumber}&quot;. Please double check the ID or contact customer support.
          </p>
          <p className="text-xs text-teal-600 font-semibold">
            Need assistance? Call +880 1700-000000
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <div className="py-8 md:py-16">
      <Suspense fallback={<div className="py-16 text-center text-sm text-slate-500">Loading order tracker...</div>}>
        <OrderTrackingContent />
      </Suspense>
    </div>
  );
}
