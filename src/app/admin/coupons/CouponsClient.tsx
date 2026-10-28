'use client';

import { useState } from 'react';
import { adminCreateCoupon, adminDeleteCoupon } from '@/lib/actions/admin';
import type { Coupon } from '@/lib/types';
import { Trash2, Plus, Ticket, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  initialCoupons: Coupon[];
}

export function CouponsClient({ initialCoupons }: Props) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) return;

    setLoading(true);
    const fd = new FormData();
    fd.append('code', code.trim().toUpperCase());
    fd.append('discount_type', discountType);
    fd.append('discount_value', discountValue);
    if (description.trim()) fd.append('description', description.trim());
    if (minOrder.trim()) fd.append('min_order_amount', minOrder.trim());

    try {
      await adminCreateCoupon(fd);
      setCoupons((prev) => [
        {
          id: `cp-${Date.now()}`,
          code: code.trim().toUpperCase(),
          description: description.trim() || null,
          discount_type: discountType,
          discount_value: parseFloat(discountValue),
          min_order_amount: minOrder ? parseFloat(minOrder) : 0,
          max_discount_amount: null,
          usage_limit: 100,
          used_count: 0,
          starts_at: null,
          expires_at: null,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setCode('');
      setDescription('');
      setDiscountValue('');
      setMinOrder('');
      toast.success('Coupon created successfully!');
    } catch (err) {
      toast.error('Failed to create coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, couponCode: string) => {
    if (!confirm(`Delete coupon "${couponCode}"?`)) return;

    try {
      await adminDeleteCoupon(id);
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      toast.success(`Deleted coupon ${couponCode}`);
    } catch (err) {
      toast.error('Failed to delete coupon');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Create form (4 cols) */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Plus size={16} className="text-teal-500" />
          <span>Create Coupon Code</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Voucher Code *
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. SUMMER500"
              className="input-field text-sm font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Discount Type *
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value as any)}
              className="input-field text-sm"
            >
              <option value="percentage">Percentage (%) Off</option>
              <option value="fixed">Fixed BDT (৳) Amount Off</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Discount Value ({discountType === 'percentage' ? '%' : '৳ BDT'}) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder={discountType === 'percentage' ? '10' : '500'}
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Minimum Order Subtotal (৳ BDT)
            </label>
            <input
              type="number"
              min="0"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              placeholder="e.g. 2000"
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 10% off for laptop buyers"
              className="input-field text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim() || !discountValue}
            className="btn-primary w-full py-2.5 text-xs font-bold shadow-md shadow-teal-500/20 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Generate Coupon'}
          </button>
        </form>
      </div>

      {/* List (8 cols) */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-sm text-navy-950">Active Promo Codes ({coupons.length})</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {coupons.map((c) => (
            <div key={c.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                    {c.code}
                  </span>
                  <span className="badge bg-slate-100 text-slate-700 text-[10px]">
                    {c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `৳${c.discount_value} OFF`}
                  </span>
                </div>
                {c.description && <p className="text-xs text-slate-500">{c.description}</p>}
                <p className="text-[11px] text-slate-400">
                  Min spend: {formatPrice(c.min_order_amount || 0)} • Used {c.used_count || 0} times
                </p>
              </div>

              <button
                onClick={() => handleDelete(c.id, c.code)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                title="Delete Coupon"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
