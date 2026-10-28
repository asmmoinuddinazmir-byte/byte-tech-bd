import { getDashboardStats } from '@/lib/actions/admin';
import Link from 'next/link';
import { 
  ShoppingBag, Banknote, Package, Users, 
  AlertTriangle, Clock, ArrowRight, CheckCircle2, TrendingUp 
} from 'lucide-react';
import { formatPrice, formatDateTime, getOrderStatusColor } from '@/lib/utils';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Admin Overview & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time sales, order fulfillment, and inventory analytics for Byte Tech BD.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products/new" className="btn-primary text-xs font-bold py-2.5 px-4 shadow-sm">
            + Add New Product
          </Link>
          <Link href="/admin/orders" className="btn-secondary text-xs font-bold py-2.5 px-4 shadow-sm">
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Revenue
            </span>
            <span className="text-2xl font-black text-navy-950 mt-1 block">
              {formatPrice(stats.totalRevenue)}
            </span>
            <span className="text-[11px] text-teal-600 font-semibold mt-1 inline-flex items-center gap-1">
              <TrendingUp size={12} /> Confirmed Sales
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Banknote size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Orders
            </span>
            <span className="text-2xl font-black text-navy-950 mt-1 block">
              {stats.totalOrders}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              {stats.pendingOrders} awaiting fulfillment
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Catalog Products
            </span>
            <span className="text-2xl font-black text-navy-950 mt-1 block">
              {stats.totalProducts}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              Active in storefront
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Package size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Low Stock Alerts
            </span>
            <span className={`text-2xl font-black mt-1 block ${stats.lowStockProducts > 0 ? 'text-amber-600' : 'text-navy-950'}`}>
              {stats.lowStockProducts}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              Items under 5 units
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-navy-950">Recent Customer Orders</h2>
            <p className="text-xs text-slate-500">Latest orders placed on Byte Tech BD</p>
          </div>
          <Link href="/admin/orders" className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
            <span>View All Orders</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {stats.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-2 font-bold">Order ID</th>
                  <th className="py-3 px-2 font-bold">Customer</th>
                  <th className="py-3 px-2 font-bold">Phone</th>
                  <th className="py-3 px-2 font-bold">District</th>
                  <th className="py-3 px-2 font-bold">Total</th>
                  <th className="py-3 px-2 font-bold">Status</th>
                  <th className="py-3 px-2 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {stats.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-2 font-mono font-bold text-teal-600">
                      {ord.order_number}
                    </td>
                    <td className="py-3 px-2 font-semibold text-navy-950">
                      {ord.customer_name}
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-500">
                      {ord.customer_phone}
                    </td>
                    <td className="py-3 px-2">
                      {ord.shipping_district}
                    </td>
                    <td className="py-3 px-2 font-bold text-navy-950">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`badge ${getOrderStatusColor(ord.status)} capitalize text-[10px]`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        href={`/admin/orders`}
                        className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-6 text-center">No orders placed yet.</p>
        )}
      </div>

      {/* Quick Setup Notice */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
        <h3 className="font-bold text-sm text-navy-950 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-teal-600" />
          <span>Production Ready Supabase Integration</span>
        </h3>
        <p className="leading-relaxed">
          Byte Tech BD is connected with real database CRUD server actions. All products added or modified in this admin portal are validated server-side, stored securely with Row Level Security (RLS), and instantly rendered on the live customer storefront.
        </p>
      </div>
    </div>
  );
}
