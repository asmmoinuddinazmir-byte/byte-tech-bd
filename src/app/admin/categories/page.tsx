import { adminGetCategories } from '@/lib/actions/admin';
import { CategoriesClient } from './CategoriesClient';

export default async function AdminCategoriesPage() {
  const categories = await adminGetCategories();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Product Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Organize storefront navigation and product grouping.
        </p>
      </div>

      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
