import Link from 'next/link';
import { adminGetProducts } from '@/lib/actions/admin';
import { ProductsClientTable } from './ProductsClientTable';
import { Plus, Package, Search } from 'lucide-react';

interface ProductsAdminPageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: ProductsAdminPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const search = searchParams.search || '';

  const { products, total } = await adminGetProducts(page, search, 50);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Product Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total of <strong className="text-navy-950">{total}</strong> products configured in catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="btn-primary text-xs font-bold py-2.5 px-4 shadow-sm inline-flex items-center gap-1.5 shrink-0"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Client Table Component */}
      <ProductsClientTable initialProducts={products} total={total} initialSearch={search} />
    </div>
  );
}
