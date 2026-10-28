'use client';

import { useState } from 'react';
import { adminCreateBrand, adminDeleteBrand } from '@/lib/actions/admin';
import type { Brand } from '@/lib/types';
import { Trash2, Plus, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  initialBrands: Brand[];
}

export function BrandsClient({ initialBrands }: Props) {
  const [brands, setBrands] = useState(initialBrands);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const fd = new FormData();
    fd.append('name', name.trim());

    try {
      await adminCreateBrand(fd);
      setBrands((prev) => [
        ...prev,
        {
          id: `br-${Date.now()}`,
          name: name.trim(),
          slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
          logo_url: null,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      setName('');
      toast.success('Brand added successfully!');
    } catch (err) {
      toast.error('Failed to add brand');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, brandName: string) => {
    if (!confirm(`Delete brand "${brandName}"?`)) return;

    try {
      await adminDeleteBrand(id);
      setBrands((prev) => prev.filter((b) => b.id !== id));
      toast.success(`Deleted ${brandName}`);
    } catch (err) {
      toast.error('Failed to delete brand');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Create form (4 cols) */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Plus size={16} className="text-teal-500" />
          <span>Add New Brand</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Brand Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gigabyte, Razer, Western Digital"
              className="input-field text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="btn-primary w-full py-2.5 text-xs font-bold shadow-md shadow-teal-500/20 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Brand'}
          </button>
        </form>
      </div>

      {/* List (8 cols) */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-sm text-navy-950">Active Brands ({brands.length})</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="divide-y divide-slate-100">
            {brands.slice(0, Math.ceil(brands.length / 2)).map((b) => (
              <div key={b.id} className="p-3.5 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                <div>
                  <span className="font-bold text-sm text-navy-950">{b.name}</span>
                  <span className="text-[11px] font-mono text-slate-400 block">slug: {b.slug}</span>
                </div>
                <button
                  onClick={() => handleDelete(b.id, b.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="divide-y divide-slate-100">
            {brands.slice(Math.ceil(brands.length / 2)).map((b) => (
              <div key={b.id} className="p-3.5 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                <div>
                  <span className="font-bold text-sm text-navy-950">{b.name}</span>
                  <span className="text-[11px] font-mono text-slate-400 block">slug: {b.slug}</span>
                </div>
                <button
                  onClick={() => handleDelete(b.id, b.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
