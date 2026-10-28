import { adminGetBrands } from '@/lib/actions/admin';
import { BrandsClient } from './BrandsClient';

export default async function AdminBrandsPage() {
  const brands = await adminGetBrands();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Brand Partners & Manufacturers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage hardware brands (Dell, HP, Lenovo, ASUS, MSI, Apple, etc.)
        </p>
      </div>

      <BrandsClient initialBrands={brands} />
    </div>
  );
}
