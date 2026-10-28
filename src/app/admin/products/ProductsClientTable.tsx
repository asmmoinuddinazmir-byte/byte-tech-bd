'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, Trash2, Edit, Eye, EyeOff, 
  ExternalLink, Check, AlertCircle, Cpu, BatteryMedium 
} from 'lucide-react';
import { adminToggleProductPublish, adminDeleteProduct } from '@/lib/actions/admin';
import { formatPrice, getConditionBadgeColor } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { toast } from 'sonner';

interface Props {
  initialProducts: Product[];
  total: number;
  initialSearch: string;
}

export function ProductsClientTable({ initialProducts, total, initialSearch }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState(initialSearch);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/products?search=${encodeURIComponent(search)}`);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    setLoadingId(id);
    try {
      await adminToggleProductPublish(id, !current);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_published: !current } : p))
      );
      toast.success(`Product ${!current ? 'Published to Store' : 'Unpublished'}`);
    } catch (err) {
      toast.error('Failed to update publish state');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      return;
    }

    setLoadingId(id);
    try {
      await adminDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Deleted ${name}`);
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product title or SKU..."
            className="input-field text-xs py-2 pl-9"
          />
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </form>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Showing <strong className="text-navy-950">{products.length}</strong> items
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Condition</th>
                  <th className="py-3 px-3">Price (BDT)</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {products.map((p) => {
                  const img = p.images?.[0]?.url;
                  const price = p.discounted_price || p.price;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Item Visual & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            {img ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={img} alt={p.name} className="w-full h-full object-contain" />
                            ) : (
                              <Cpu size={20} className="text-slate-400" />
                            )}
                          </div>
                          <div className="truncate max-w-[240px]">
                            <span className="font-bold text-navy-950 text-xs block truncate">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-teal-600 font-semibold block">
                              {p.category?.name || 'Uncategorized'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                        {p.sku || 'N/A'}
                      </td>

                      {/* Condition & Grade */}
                      <td className="py-3 px-3">
                        <span className={`badge ${getConditionBadgeColor(p.condition)} text-[10px]`}>
                          {p.condition}
                          {p.condition_grade && ` • ${p.condition_grade}`}
                        </span>
                      </td>

                      {/* Price in BDT */}
                      <td className="py-3 px-3 font-bold text-navy-950">
                        {formatPrice(price)}
                        {p.discounted_price && (
                          <span className="text-[10px] text-slate-400 line-through block font-normal">
                            {formatPrice(p.price)}
                          </span>
                        )}
                      </td>

                      {/* Stock Quantity */}
                      <td className="py-3 px-3">
                        <span
                          className={`font-bold ${
                            p.stock_quantity <= 0
                              ? 'text-rose-600'
                              : p.stock_quantity < 5
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {p.stock_quantity} in stock
                        </span>
                      </td>

                      {/* Publish Switch */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleTogglePublish(p.id, p.is_published)}
                          disabled={loadingId === p.id}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
                            p.is_published
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                          title="Toggle live storefront visibility"
                        >
                          {p.is_published ? (
                            <>
                              <Eye size={12} /> Published
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} /> Draft
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100"
                            title="View on Storefront"
                          >
                            <ExternalLink size={15} />
                          </Link>

                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            disabled={loadingId === p.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete Product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <Cpu size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-navy-950">No products found</p>
            <p className="text-xs text-slate-400 mt-1">Try another search or add a new hardware product.</p>
          </div>
        )}
      </div>
    </div>
  );
}
