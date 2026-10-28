import { adminGetCategories, adminGetBrands } from '@/lib/actions/admin';
import { CreateProductForm } from './CreateProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    adminGetCategories(),
    adminGetBrands(),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-200"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-navy-950 tracking-tight">
            Add New Hardware Product
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure new laptop, gaming PC, or computer accessory for the Byte Tech BD catalog.
          </p>
        </div>
      </div>

      <CreateProductForm categories={categories} brands={brands} />
    </div>
  );
}
