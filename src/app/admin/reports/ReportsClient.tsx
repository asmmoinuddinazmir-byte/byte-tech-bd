'use client';

import { useState } from 'react';
import type { Order } from '@/lib/types';
import { Download, BarChart3, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  orders: Order[];
}

export function ReportsClient({ orders }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === selectedStatus);

  const totalSales = filteredOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const averageOrderValue = filteredOrders.length > 0
    ? totalSales / filteredOrders.length
    : 0;

  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      toast.error('No orders available to export');
      return;
    }

    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Phone',
      'District',
      'Address',
      'Status',
      'Payment Method',
      'Subtotal',
      'Delivery Charge',
      'Discount',
      'Total (BDT)'
    ];

    const rows = filteredOrders.map((o) => [
      `"${o.order_number}"`,
      `"${new Date(o.created_at).toLocaleDateString()}"`,
      `"${o.customer_name}"`,
      `"${o.customer_phone}"`,
      `"${o.shipping_district}"`,
      `"${o.shipping_address.replace(/"/g, '""')}"`,
      `"${o.status}"`,
      `"${o.payment_method}"`,
      o.subtotal,
      o.delivery_charge,
      o.discount_amount,
      o.total,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `byte-tech-orders-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Orders exported as CSV file');
  };

  return (
    <div className="space-y-6">
      {/* Metric summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Filter Period Volume
          </span>
          <span className="text-2xl font-black text-navy-950 mt-1 block">
            {formatPrice(totalSales)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across {filteredOrders.length} order(s)
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Average Order Value (AOV)
          </span>
          <span className="text-2xl font-black text-navy-950 mt-1 block">
            {formatPrice(averageOrderValue)}
          </span>
          <span className="text-[11px] text-teal-600 font-semibold mt-1 block">
            High-ticket laptop & PC hardware
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Data Export
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Generate spreadsheet compatible CSV
            </span>
          </div>
          <button
            onClick={handleExportCSV}
            className="btn-primary text-xs font-bold py-2 px-4 shadow-sm inline-flex items-center gap-1.5 mt-3 self-start"
          >
            <Download size={14} />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Filter by status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filter by Status:
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field text-xs py-1.5 w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <span className="text-xs text-slate-500">
          Showing <strong className="text-navy-950">{filteredOrders.length}</strong> records
        </span>
      </div>

      {/* Orders Table preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Order Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-600">{o.order_number}</td>
                  <td className="py-3 px-3 text-slate-500">{formatDateTime(o.created_at)}</td>
                  <td className="py-3 px-3 font-semibold text-navy-950">{o.customer_name}</td>
                  <td className="py-3 px-3">{o.shipping_district}</td>
                  <td className="py-3 px-3 capitalize">
                    <span className="badge bg-slate-100 text-slate-700 text-[10px]">{o.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-navy-950">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
