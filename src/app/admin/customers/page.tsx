import { adminGetCustomers } from '@/lib/actions/admin';
import { Users, Mail, Phone, Calendar } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface Props {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function AdminCustomersPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || '1', 10);
  const search = searchParams.search || '';

  const { customers, total } = await adminGetCustomers(page, search, 50);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Customer Accounts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Registered customer profiles, phone numbers, and join dates.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-sm text-navy-950">Registered Users ({total})</h2>
        </div>

        {customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Mobile Contact</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-4 text-right">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-950">
                      {c.full_name || 'Anonymous Customer'}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 flex items-center gap-1.5">
                      <Mail size={13} className="text-slate-400" />
                      <span>{c.email}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">
                      {c.phone ? (
                        <span className="flex items-center gap-1">
                          <Phone size={13} className="text-teal-500" />
                          <span>{c.phone}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="badge bg-teal-50 text-teal-800 text-[10px] capitalize">
                        {c.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400 text-[11px]">
                      {c.created_at ? formatDateTime(c.created_at) : 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-8 text-center text-slate-400 text-xs">No registered customers yet.</p>
        )}
      </div>
    </div>
  );
}
