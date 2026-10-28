import { getFeaturedProducts, getNewArrivals, getSpecialOffers, getCategories, getBanners } from '@/lib/actions/products';
import { HeroBanner } from '@/components/storefront/HeroBanner';
import { CategoryNav } from '@/components/storefront/CategoryNav';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const revalidate = 60; // ISR cache for 1 minute

export default async function HomePage() {
  const [featuredProducts, newArrivals, specialOffers, categories, banners] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getSpecialOffers(),
    getCategories(),
    getBanners(),
  ]);

  return (
    <div className="space-y-4">
      {/* Hero Banner Section */}
      <HeroBanner banners={banners} />

      {/* Hardware Categories Grid */}
      <CategoryNav categories={categories} />

      {/* Featured Hardware Section */}
      <ProductGrid
        products={featuredProducts}
        tag="Handpicked Recommendations"
        title="Featured Hardware & Systems"
        subtitle="Our top picks of the week — factory sealed and certified tested devices."
        viewAllHref="/products"
      />

      {/* Used Laptop Quality Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-navy-700">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#1eb8a5_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} /> Byte Tech Certified Pre-Owned
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Why Buy Used Laptops From Byte Tech BD?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We eliminate the risk of buying used electronics in Bangladesh. Every device passes our strict 30-point hardware checklist including thermals, motherboard, screen, battery health, and original ports.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                <span>Transparent Grade A/A+ ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                <span>Exact battery health % disclosed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                <span>Up to 1-Year service warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                <span>7 Days direct replacement guarantee</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/products?category=used-laptops"
                className="btn-primary text-sm px-6 py-2.5 font-bold shadow-lg shadow-teal-500/20"
              >
                Explore Certified Used Laptops
              </Link>
              <Link
                href="/about"
                className="btn-outline border-slate-600 bg-navy-900/50 text-white hover:bg-navy-800 text-sm px-5 py-2.5"
              >
                Our 30-Point Testing Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {specialOffers.length > 0 && (
        <ProductGrid
          products={specialOffers}
          tag="Limited Time Deals"
          title="Special Discount Offers"
          subtitle="Save big on top laptops and gaming gear before stocks run out."
          viewAllHref="/products"
          className="bg-slate-100/60"
        />
      )}

      {/* New Arrivals Section */}
      <ProductGrid
        products={newArrivals}
        tag="Fresh Inventory"
        title="New Arrivals in Store"
        subtitle="The latest arrivals straight from official tech distributors and importers."
        viewAllHref="/products"
      />
    </div>
  );
}
