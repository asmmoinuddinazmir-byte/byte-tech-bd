'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Eye, CheckCircle2, Truck, 
  Clock, Package, XCircle, Phone, MapPin, ChevronDown 
} from 'lucide-react';
import { adminUpdateOrderStatus } from '@/lib/actions/admin';
import { formatPrice, formatDateTime, getOrderStatusColor } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/constants';
import type { Order } from '@/lib/types';
import { toast } from 'sonner';

interface Props {
  initialOrders: Order[];
  total: number;
  initialStatus: string;
  initialSearch: string;
}

export function OrdersClientTable({ initialOrders, total, initialStatus, initialSearch }: Props) {
  const router = useRouter();
  const [orders, setProducts] = useState<Order[]>(initialOrders);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [search, setSearch] = useState(initialSearch);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleFilterStatus = (status: string) => {
    setCurrentStatus(status);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (currentStatus) params.set('status', currentStatus);
    if (search) params.set('search', search);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await adminUpdateOrderStatus(orderId, newStatus);
      setProducts((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus as any });
      }
      toast.success(`Order status updated to "${newStatus}"`);
    } catch (err) {
      toast.error('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusTabs = [
    { value: '', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-4">
      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterStatus(tab.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              currentStatus === tab.value
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name, or phone..."
            className="input-field text-xs py-2 pl-9"
          />
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="py-3 px-4">Order ID & Date</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Total Payable</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Order ID */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-teal-600 block">
                        {ord.order_number}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {formatDateTime(ord.created_at)}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3 px-3">
                      <span className="font-bold text-navy-950 block">
                        {ord.customer_name}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                        <Phone size={11} className="text-slate-400" />
                        {ord.customer_phone}
                      </span>
                    </td>

                    {/* Destination */}
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800 block">
                        {ord.shipping_district}
                      </span>
                      <span className="text-slate-400 text-[11px] truncate max-w-[150px] block">
                        {ord.shipping_city}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 font-bold text-navy-950">
                      {formatPrice(ord.total)}
                      <span className="text-[10px] text-slate-400 font-normal block">
                        (incl. ৳{ord.delivery_charge} delivery)
                      </span>
                    </td>

                    {/* Payment Mode */}
                    <td className="py-3 px-3">
                      <span className="badge bg-slate-100 text-slate-700 text-[10px] uppercase font-mono">
                        {ord.payment_method}
                      </span>
                    </td>

                    {/* Status updater */}
                    <td className="py-3 px-3">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        disabled={updatingId === ord.id}
                        className={`text-[11px] font-bold rounded-lg border px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : ord.status === 'cancelled'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-white text-navy-950 border-slate-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* View details action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn-outline text-[11px] py-1.5 px-2.5 inline-flex items-center gap-1"
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <Package size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-navy-950">No orders match criteria</p>
            <p className="text-xs text-slate-400 mt-1">Select another status tab or clear search filter.</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fade-in space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-mono block">Order Reference</span>
                <h3 className="font-mono font-bold text-lg text-teal-600">
                  {selectedOrder.order_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
                <p><strong>Contact Phone:</strong> {selectedOrder.customer_phone}</p>
                <p><strong>Shipping Address:</strong> {selectedOrder.shipping_address}, {selectedOrder.shipping_city}, {selectedOrder.shipping_district}</p>
                {selectedOrder.order_notes && (
                  <p><strong>Customer Note:</strong> {selectedOrder.order_notes}</p>
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Purchased Items ({selectedOrder.items?.length || 0})
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2.5">
                  {selectedOrder.items?.map((it) => (
                    <div key={it.id} className="flex justify-between items-center py-1">
                      <div>
                        <span className="font-bold text-navy-950 block">{it.product_name}</span>
                        <span className="text-slate-400 text-[11px]">{it.quantity} x {formatPrice(it.unit_price)}</span>
                      </div>
                      <span className="font-bold text-navy-950">{formatPrice(it.total_price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-sm">
                <span className="font-bold text-navy-950">Total Amount:</span>
                <span className="text-xl font-black text-teal-600">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn-primary text-xs py-2 px-4"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
