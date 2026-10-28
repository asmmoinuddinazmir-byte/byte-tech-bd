import Link from 'next/link';
import { Laptop, Monitor, Gamepad2, Cpu, Mouse, RefreshCw, HardDrive, Keyboard } from 'lucide-react';
import type { Category } from '@/lib/types';

interface CategoryNavProps {
  categories?: Category[];
}

export function CategoryNav({ categories = [] }: CategoryNavProps) {
  // Default Bangladesh tech store categories
  const defaultCategories = [
    { name: 'New Laptops', slug: 'new-laptops', icon: Laptop, count: 'Brand New', color: 'from-blue-500 to-indigo-600' },
    { name: 'Used Laptops', slug: 'used-laptops', icon: RefreshCw, count: 'Tested & Graded', color: 'from-teal-500 to-emerald-600' },
    { name: 'Desktop PCs', slug: 'desktop-pcs', icon: Monitor, count: 'Custom & Pre-built', color: 'from-violet-500 to-purple-600' },
    { name: 'Gaming PCs', slug: 'gaming-pcs', icon: Gamepad2, count: 'RTX & High FPS', color: 'from-rose-500 to-red-600' },
    { name: 'PC Components', slug: 'pc-components', icon: Cpu, count: 'CPU, GPU, RAM', color: 'from-amber-500 to-orange-600' },
    { name: 'Accessories', slug: 'accessories', icon: Mouse, count: 'Keyboards & Mice', color: 'from-cyan-500 to-teal-600' },
  ];

  const items = categories.length > 0
    ? categories.map((cat, i) => ({
        name: cat.name,
        slug: cat.slug,
        icon: defaultCategories[i % defaultCategories.length].icon,
        count: 'Browse All',
        color: defaultCategories[i % defaultCategories.length].color,
      }))
    : defaultCategories;

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              <span>Explore Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Browse by Hardware Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/products?category=${item.slug}`}
                className="group relative p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-200 flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-sm text-navy-900 group-hover:text-teal-600 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  {item.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
