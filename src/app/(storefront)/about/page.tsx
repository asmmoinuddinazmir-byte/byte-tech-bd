import { ShieldCheck, Truck, Wrench, Award, CheckCircle, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Byte Tech BD - Bangladesh Leading Tech Store',
  description: 'Learn about Byte Tech BD, our 30-point laptop diagnostic certification, custom gaming PC builds, and warranty in Bangladesh.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="badge bg-teal-50 text-teal-700 text-xs uppercase tracking-wider font-bold">
            Empowering Bangladesh Tech Enthusiasts
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            About Byte Tech BD
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Founded with a passion for genuine computer hardware and transparent pricing, 
            <strong> Byte Tech BD</strong> has emerged as Bangladesh&apos;s reliable destination for brand-new laptops, certified used laptops, custom desktop rigs, and high-performance gaming components.
          </p>
        </div>

        {/* Pillars of Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <ShieldCheck size={26} />
            </div>
            <h3 className="text-lg font-bold text-navy-950">100% Genuine Guaranteed</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We never compromise on authenticity. Every brand new product comes with official distributor serial numbers and warranty coverage.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Wrench size={26} />
            </div>
            <h3 className="text-lg font-bold text-navy-950">30-Point Used Device Check</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every certified used device is thoroughly inspected: motherboard stress tests, thermal pastes, real battery health, keyboard matrix, and zero dead-pixel verification.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Truck size={26} />
            </div>
            <h3 className="text-lg font-bold text-navy-950">Island-Wide Cash on Delivery</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Whether you are located in Dhaka, Chattogram, Sylhet, Rajshahi, or any of Bangladesh&apos;s 64 districts, we deliver safely to your doorstep with inspection privileges.
            </p>
          </div>
        </div>

        {/* Diagnostic Process Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-black text-navy-950">
            Our Certified Used Laptop Testing Standard
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The biggest hesitation customers have when buying pre-owned laptops in Bangladesh is fear of undisclosed hardware faults. At Byte Tech BD, we solve this with 100% transparency:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <CheckCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block">Battery Cycle & Health Diagnostic</strong>
                <span className="text-slate-500 text-xs">We disclose the exact battery capacity percentage so you know exactly what runtime to expect.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <CheckCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block">Thermal & Fan Stress Testing</strong>
                <span className="text-slate-500 text-xs">Full CPU & GPU stress testing to guarantee no overheating or thermal throttling issues.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <CheckCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block">Display Matrix & Backlight Check</strong>
                <span className="text-slate-500 text-xs">Tested with pure color backgrounds to verify zero dead pixels, no pressure spots, or screen bleeding.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <CheckCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block">Port, Wi-Fi & Camera Verification</strong>
                <span className="text-slate-500 text-xs">All USB Type-C, Thunderbolt, HDMI, webcam, and audio jack connections are physically plugged and verified.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 p-8 text-white text-center space-y-4">
          <h2 className="text-2xl font-black">Looking for your next computer upgrade?</h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Browse our full catalog or contact our hardware engineers for a customized PC building quotation.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary text-sm font-bold px-6 py-3">
              Explore Products
            </Link>
            <Link href="/contact" className="btn-outline border-slate-700 text-white hover:bg-navy-800 text-sm font-bold px-6 py-3">
              Contact Sales Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
