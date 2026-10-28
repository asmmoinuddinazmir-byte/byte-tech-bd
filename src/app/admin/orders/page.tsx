import { adminGetOrders } from '@/lib/actions/admin';
import { OrdersClientTable } from './OrdersClientTable';

interface AdminOrdersPageProps {
  searchParams: {
    status?: string;
    search?: string;
    page?: string;
  };
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const status = searchParams.status || '';
  const search = searchParams.search || '';

  const { orders, total } = await adminGetOrders(page, status, search, 50);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Order Fulfillment & Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track customer deliveries, update order statuses, and verify Cash on Delivery payments.
          </p>
        </div>
      </div>

      <OrdersClientTable
        initialOrders={orders}
        total={total}
        initialStatus={status}
        initialSearch={search}
      />
    </div>
  );
}
