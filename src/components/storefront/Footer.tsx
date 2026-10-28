import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { FOOTER_LINKS, SITE_NAME } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 mt-auto border-t border-navy-800">
      {/* Value Proposition Highlights */}
      <div className="border-b border-navy-800/80 bg-navy-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Fast Island-wide Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">Dhaka 24-48h, Outside Dhaka 48-72h</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Tested & Guaranteed</h4>
                <p className="text-xs text-slate-400 mt-0.5">Comprehensive testing on all used devices</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">7-Day Replacement</h4>
                <p className="text-xs text-slate-400 mt-0.5">Peace of mind warranty for every product</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Expert Tech Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">Direct consultation with hardware experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" isLight />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Byte Tech BD is Bangladesh’s trusted retail destination for brand-new laptops, certified pre-owned laptops, custom desktop rigs, esports gaming machines, and genuine components.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-teal-400 shrink-0" />
                <span>Multiplan Center & IDB Bhaban Partner Network, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-teal-400 shrink-0" />
                <span>Hotline: +880 1700-000000 / +880 1900-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-teal-400 shrink-0" />
                <span>sales@bytetechbd.com | info@bytetechbd.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-teal-400 shrink-0" />
                <span>Sat - Thu: 10:00 AM - 8:30 PM (Friday Closed)</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Shop Hardware</h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Payment Info */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Terms & Policies</h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-navy-800">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Accepted Payments</h4>
              <p className="text-xs text-slate-400">
                Cash on Delivery (All 64 districts), bKash, Nagad, Rocket, Bank Transfer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-navy-900 bg-navy-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved. Made for Bangladesh tech enthusiasts.</p>
          <p className="text-[11px] text-slate-600">Prices in Bangladeshi Taka (BDT ৳) inclusive of applicable taxes.</p>
        </div>
      </div>
    </footer>
  );
}
