'use client';

import { useState } from 'react';
import { adminCreateCategory, adminDeleteCategory } from '@/lib/actions/admin';
import type { Category } from '@/lib/types';
import { Trash2, Plus, FolderTree } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  initialCategories: Category[];
}

export function CategoriesClient({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const fd = new FormData();
    fd.append('name', name.trim());
    if (description.trim()) fd.append('description', description.trim());

    try {
      await adminCreateCategory(fd);
      setCategories((prev) => [
        ...prev,
        {
          id: `cat-${Date.now()}`,
          name: name.trim(),
          slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
          description: description.trim() || null,
          image_url: null,
          parent_id: null,
          sort_order: prev.length + 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      setName('');
      setDescription('');
      toast.success('Category created successfully!');
    } catch (err) {
      toast.error('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Delete category "${catName}"?`)) return;

    try {
      await adminDeleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success(`Deleted ${catName}`);
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Create form (4 cols) */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Plus size={16} className="text-teal-500" />
          <span>Add New Category</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Monitors & Displays"
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Gaming monitors, IPS color accurate displays..."
              className="input-field text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="btn-primary w-full py-2.5 text-xs font-bold shadow-md shadow-teal-500/20 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      </div>

      {/* List (8 cols) */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-sm text-navy-950">Active Categories ({categories.length})</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-navy-950 block">{cat.name}</span>
                <span className="text-[11px] font-mono text-teal-600 block">slug: /{cat.slug}</span>
                {cat.description && (
                  <p className="text-xs text-slate-500 line-clamp-1">{cat.description}</p>
                )}
              </div>

              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete Category"
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
