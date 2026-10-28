import { adminExportOrders } from '@/lib/actions/admin';
import { ReportsClient } from './ReportsClient';

export default async function AdminReportsPage() {
  const orders = await adminExportOrders();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Sales Reports & Export
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review sales turnover, analyze performance by payment mode, and export order records to CSV.
        </p>
      </div>

      <ReportsClient orders={orders} />
    </div>
  );
}
