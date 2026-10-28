'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminCreateProduct } from '@/lib/actions/admin';
import type { Category, Brand } from '@/lib/types';
import { CONDITION_GRADES, PRODUCT_CONDITIONS } from '@/lib/constants';
import { toast } from 'sonner';
import { Save, Image as ImageIcon } from 'lucide-react';

interface Props {
  categories: Category[];
  brands: Brand[];
}

export function CreateProductForm({ categories, brands }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState<'new' | 'used' | 'refurbished'>('new');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await adminCreateProduct(formData);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Product created successfully and published!');
        router.push('/admin/products');
        router.refresh();
      }
    } catch (err) {
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100">
          General Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Dell Latitude 5420 (Core i5 11th Gen)"
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select name="category_id" className="input-field text-sm">
              <option value="">Select Category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Brand
            </label>
            <select name="brand_id" className="input-field text-sm">
              <option value="">Select Brand...</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Key Features (One line)
            </label>
            <input
              type="text"
              name="short_description"
              placeholder="e.g. Core i5-1135G7 | 16GB DDR4 | 512GB NVMe | 14.0' FHD IPS"
              className="input-field text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Product Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Provide complete hardware overview, port connectivity, display color gamut..."
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      {/* Pricing and Stock */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100">
          Pricing & Inventory
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Regular Price (৳ BDT) *
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="e.g. 45000"
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Discounted / Sale Price (৳ BDT)
            </label>
            <input
              type="number"
              name="discounted_price"
              min="0"
              placeholder="e.g. 42000"
              className="input-field text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock_quantity"
              required
              min="0"
              defaultValue="5"
              className="input-field text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Condition & Diagnostic Transparency */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100">
          Device Condition & Diagnostics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Condition
            </label>
            <select
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value as any)}
              className="input-field text-sm"
            >
              {PRODUCT_CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {condition !== 'new' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cosmetic Grade
                </label>
                <select name="condition_grade" className="input-field text-sm">
                  {CONDITION_GRADES.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Battery Health %
                </label>
                <input
                  type="text"
                  name="battery_health"
                  placeholder="e.g. 88% Original Capacity"
                  className="input-field text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Disclosed Defects / Wear
                </label>
                <input
                  type="text"
                  name="defects"
                  placeholder="e.g. Tiny cosmetic scratch on bottom base, zero display flaws"
                  className="input-field text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Technician Benchmark Notes
                </label>
                <input
                  type="text"
                  name="testing_notes"
                  placeholder="e.g. Passed 30-point diagnostics. Dual fans cleaned, new thermal paste applied."
                  className="input-field text-sm"
                />
              </div>
            </>
          )}

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Warranty Coverage Information
            </label>
            <input
              type="text"
              name="warranty_info"
              defaultValue={condition === 'new' ? '2 Years Official Warranty' : '1 Month Replacement + 1 Year Service Warranty'}
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      {/* Product Image & Flags */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100">
          Media & Publishing
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Primary Image URL (Supabase Storage or Web URL)
          </label>
          <input
            type="url"
            name="image_url"
            placeholder="https://images.unsplash.com/photo-1593642632823-8f785ba67e45..."
            defaultValue="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
            className="input-field text-sm font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
            <input
              type="checkbox"
              name="is_published"
              value="true"
              defaultChecked
              className="w-4 h-4 text-teal-600 rounded"
            />
            <span>Publish Immediately to Live Storefront</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
            <input
              type="checkbox"
              name="is_featured"
              value="true"
              className="w-4 h-4 text-teal-600 rounded"
            />
            <span>Showcase in Homepage Featured Section</span>
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary text-sm font-bold shadow-md shadow-teal-500/20 disabled:opacity-50"
        >
          {loading ? 'Saving Product...' : 'Save & Publish Product'}
        </button>
      </div>
    </form>
  );
}
