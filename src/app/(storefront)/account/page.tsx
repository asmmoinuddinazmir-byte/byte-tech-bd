import { getCurrentUser, updateProfile } from '@/lib/actions/auth';
import { getUserOrders } from '@/lib/actions/orders';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Package, MapPin, Shield, Clock, ExternalLink } from 'lucide-react';
import { formatPrice, formatDateTime, getOrderStatusColor } from '@/lib/utils';

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?redirect=/account');
  }

  const orders = await getUserOrders();

  async function handleUpdateProfile(formData: FormData) {
    'use server';
    await updateProfile(formData);
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              My Customer Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your personal profile, review recent purchases, and track deliveries.
            </p>
          </div>

          {user.role === 'admin' && (
            <Link href="/admin" className="btn-secondary text-xs font-bold py-2 px-4">
              Enter Admin Portal →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* User Profile Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-teal-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <h2 className="font-bold text-base text-navy-950 truncate">
                  {user.full_name || 'Customer'}
                </h2>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <span className="badge bg-teal-50 text-teal-700 text-[10px] mt-1 capitalize">
                  {user.role} Member
                </span>
              </div>
            </div>

            <form action={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  defaultValue={user.full_name || ''}
                  className="input-field text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={user.phone || ''}
                  className="input-field text-sm font-mono"
                />
              </div>

              <button type="submit" className="btn-outline w-full text-xs font-bold py-2.5">
                Save Profile Changes
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="w-full text-center text-xs font-bold text-rose-600 hover:underline py-1">
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {/* Orders History (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h2 className="text-lg font-black text-navy-950 flex items-center gap-2">
                  <Package className="text-teal-500" size={20} />
                  <span>Recent Orders ({orders.length})</span>
                </h2>
                <Link href="/order-tracking" className="text-xs font-bold text-teal-600 hover:underline">
                  Track by Order Number →
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 transition-colors bg-slate-50/50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 text-xs">
                        <div>
                          <span className="font-mono font-bold text-teal-600 text-sm">
                            {ord.order_number}
                          </span>
                          <span className="text-slate-400 block text-[11px]">
                            {formatDateTime(ord.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`badge ${getOrderStatusColor(ord.status)} capitalize text-xs`}>
                            {ord.status}
                          </span>
                          <span className="font-black text-navy-950 text-sm">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="py-2 text-xs space-y-1">
                        {ord.items?.map((it) => (
                          <div key={it.id} className="flex justify-between text-slate-600">
                            <span>{it.quantity}x {it.product_name}</span>
                            <span className="font-medium text-navy-950">{formatPrice(it.total_price)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
                        <span className="text-slate-500">
                          Ship to: {ord.shipping_city}, {ord.shipping_district}
                        </span>
                        <Link
                          href={`/order-tracking?order=${encodeURIComponent(ord.order_number)}`}
                          className="font-bold text-teal-600 hover:underline flex items-center gap-1"
                        >
                          <span>Live Progress</span>
                          <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-sm">
                  <Package size={36} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-bold text-navy-950">No orders yet</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    Your placed orders will show up here along with live courier status.
                  </p>
                  <Link href="/products" className="btn-primary text-xs font-bold">
                    Browse Catalog
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
