'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, ArrowRight, Laptop, Sparkles } from 'lucide-react';
import type { Banner } from '@/lib/types';

interface HeroBannerProps {
  banners?: Banner[];
}

export function HeroBanner({ banners = [] }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback rich slides when database banners are not populated
  const defaultSlides = [
    {
      title: 'Certified Pre-Owned & Used Laptops',
      highlight: 'With 100% Quality Check',
      subtitle: 'Premium ThinkPads, EliteBooks, MacBooks & Latitudes thoroughly inspected with up to 1-Year Byte Tech BD Warranty.',
      tag: '🔥 Best Value in Bangladesh',
      ctaText: 'Browse Used Laptops',
      ctaLink: '/products?category=used-laptops',
      accentColor: 'from-teal-500 to-emerald-400',
    },
    {
      title: 'High-Performance Custom Gaming PCs',
      highlight: 'Built for Maximum FPS',
      subtitle: 'Powered by latest Intel 14th Gen, AMD Ryzen 7000/9000 & RTX 40-Series. Free professional cable management & benchmark testing.',
      tag: '⚡ 1440p & 4K Ready',
      ctaText: 'Explore Gaming PCs',
      ctaLink: '/products?category=gaming-pcs',
      accentColor: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Brand New Laptops with Official Warranty',
      highlight: 'Dell, HP, Lenovo & ASUS',
      subtitle: 'Official distributor warranty, genuine Windows 11 pre-installed, and instant delivery all over Bangladesh.',
      tag: '✨ 100% Authentic Products',
      ctaText: 'Shop New Laptops',
      ctaLink: '/products?category=new-laptops',
      accentColor: 'from-teal-400 to-indigo-400',
    },
  ];

  const slides = banners.length > 0
    ? banners.map((b) => ({
        title: b.title,
        highlight: '',
        subtitle: b.subtitle || 'Discover premium computing hardware at Byte Tech BD.',
        tag: 'Featured Deal',
        ctaText: 'Shop Now',
        ctaLink: b.link_url || '/products',
        accentColor: 'from-teal-400 to-teal-600',
      }))
    : defaultSlides;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white">
      {/* Decorative Background Tech Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1eb8a5_1px,transparent_1px),linear-gradient(to_bottom,#1eb8a5_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={13} className="text-teal-400" />
              <span>{slide.tag}</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {slide.title}
              </h1>
              {slide.highlight && (
                <p className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${slide.accentColor}`}>
                  {slide.highlight}
                </p>
              )}
            </div>

            {/* Subtitle */}
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={slide.ctaLink}
                className="btn-primary text-base px-6 py-3 shadow-lg shadow-teal-500/20 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="btn-outline border-slate-700 bg-navy-900/60 text-white hover:bg-navy-800 hover:border-slate-500 text-base px-6 py-3"
              >
                View All Catalog
              </Link>
            </div>

            {/* Key trust bullets */}
            <div className="pt-6 border-t border-navy-800/80 flex flex-wrap gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-teal-400" />
                <span>3 to 12 Months Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-teal-400" />
                <span>Ready Stock in Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop size={16} className="text-teal-400" />
                <span>Original Battery Health Disclosed</span>
              </div>
            </div>
          </div>

          {/* Side Graphic Card */}
          <div className="hidden lg:flex lg:col-span-4 justify-center">
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-navy-800/80 to-navy-900/90 border border-slate-700/60 shadow-2xl backdrop-blur-sm w-full max-w-sm">
              <div className="flex items-center justify-between pb-4 border-b border-navy-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono text-teal-400">ByteTechBD Verified</span>
              </div>

              <div className="py-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400">Component Health</span>
                    <span className="text-emerald-400 font-bold">100% Tested</span>
                  </div>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-full rounded-full" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400">Battery Diagnostics</span>
                    <span className="text-teal-400 font-bold">Health A+ Grade</span>
                  </div>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full w-[90%] rounded-full" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400">Cash on Delivery</span>
                    <span className="text-teal-300 font-bold">All BD Districts</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Open box check available upon courier receipt</p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link href="/products?condition=used" className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                  View Tested Used Laptops →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators & arrows */}
        {slides.length > 1 && (
          <div className="flex items-center justify-between pt-10">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-teal-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full bg-navy-900 border border-navy-700 text-slate-300 hover:text-white hover:bg-navy-800 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full bg-navy-900 border border-navy-700 text-slate-300 hover:text-white hover:bg-navy-800 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
