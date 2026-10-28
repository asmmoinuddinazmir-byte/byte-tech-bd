'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, X, ShoppingCart, User, Search, Phone, 
  MapPin, ShieldCheck, ChevronDown, PackageCheck, Laptop, Cpu, Monitor, Gamepad2, Mouse
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/constants';
import { useCart } from '@/hooks/use-cart';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<Profile | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const itemCount = useCart((s) => s.getItemCount());

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    async function getUser() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
          setUser(profile);
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    getUser();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full z-40 bg-white">
      {/* Top Banner */}
      <div className="bg-navy-950 text-slate-300 text-xs py-2 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} className="text-teal-400" />
              <span>+880 1700-000000</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin size={13} className="text-teal-400" />
              <span>Dhaka, Bangladesh</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-teal-300 font-medium">
              <ShieldCheck size={14} />
              <span>100% Genuine & Quality Tested Warranty</span>
            </span>
            <span className="hidden sm:inline text-navy-600">|</span>
            <Link href="/order-tracking" className="hover:text-teal-400 transition-colors flex items-center gap-1">
              <PackageCheck size={13} />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`transition-all duration-200 border-b border-slate-200 ${isScrolled ? 'sticky top-0 shadow-md bg-white/95 backdrop-blur-sm z-50' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <Logo />

          {/* Search Box - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops, gaming PCs, processors, graphics cards..."
                className="w-full pl-4 pr-11 py-2.5 rounded-full border border-slate-300 bg-slate-50 focus:bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Search size={15} />
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            {/* User Account / Admin */}
            {user ? (
              <div className="relative group">
                <Link
                  href={user.role === 'admin' ? '/admin' : '/account'}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-navy-900 transition-colors text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                    {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs text-slate-500 leading-none">Hello,</p>
                    <p className="text-sm font-semibold text-navy-950 truncate max-w-[100px]">
                      {user.full_name?.split(' ')[0] || 'Account'}
                    </p>
                  </div>
                  <ChevronDown size={14} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                </Link>

                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-bold text-navy-900 truncate">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 font-semibold">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/account" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      My Profile
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      My Orders
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <form action="/api/auth/signout" method="POST">
                        <button type="submit" className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
                          Sign Out
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-navy-900 hover:text-teal-600 hover:bg-slate-100 transition-colors"
              >
                <User size={18} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-teal-50 text-navy-900 hover:text-teal-600 transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center animate-pulse">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-sm font-semibold">Cart</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search for Mobile */}
        <div className="lg:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laptops, PCs, components..."
              className="w-full pl-4 pr-10 py-2 rounded-full border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600">
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Links - Desktop Category Ribbon */}
      <nav className="hidden lg:block bg-navy-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2.5 font-medium hover:bg-navy-800 hover:text-teal-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
            <Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
            <span className="text-navy-700">•</span>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact Support</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto flex flex-col shadow-2xl animate-fade-in">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <Logo size="sm" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shop Categories</p>
              <div className="space-y-1 mb-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Care</p>
              <div className="space-y-1">
                <Link
                  href="/order-tracking"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-navy-900"
                >
                  Track Order
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-navy-900"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-navy-900"
                >
                  Contact & Store Location
                </Link>
                <Link
                  href="/policies/shipping"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-navy-900"
                >
                  Shipping Policy
                </Link>
                <Link
                  href="/policies/returns"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-navy-900"
                >
                  Return & Refund
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Byte Tech BD Support</p>
              <p>Hotline: +880 1700-000000</p>
              <p>Email: info@bytetechbd.com</p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
