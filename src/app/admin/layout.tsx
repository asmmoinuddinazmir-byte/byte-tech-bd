'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingBag, FolderTree, 
  Tag, Users, Ticket, Image as ImageIcon, Settings, 
  BarChart3, LogOut, ExternalLink, Menu, X, ShieldAlert 
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Brands', href: '/admin/brands', icon: Tag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Discount Codes', href: '/admin/coupons', icon: Ticket },
    { name: 'Sales & Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-navy-950 text-white p-4 flex items-center justify-between z-30">
        <Logo size="sm" isLight />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:bg-navy-900"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-navy-950 text-slate-300 flex flex-col transition-transform duration-200 shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-navy-800">
          <Logo size="md" isLight />
          <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>Admin Management</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-teal-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-navy-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-navy-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-navy-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={15} />
              <span>View Storefront</span>
            </span>
            <span className="text-[10px] text-teal-400 font-mono">Live</span>
          </Link>

          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors text-left"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
