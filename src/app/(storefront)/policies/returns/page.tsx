import { RotateCcw, ShieldCheck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Return and Refund Policy | Byte Tech BD',
  description: 'Understand the return, replacement, and warranty coverage policies of Byte Tech BD.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xs space-y-8">
          <div>
            <span className="badge bg-teal-50 text-teal-700 text-xs uppercase tracking-wider font-bold mb-2">
              Buyer Assurance
            </span>
            <h1 className="text-3xl font-black text-navy-950 tracking-tight">
              Return, Refund & Warranty Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Byte Tech BD Customer Protection Framework
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-navy-950 block">7-Day Replacement</span>
              <p className="text-xs text-slate-500 mt-1">Direct hardware replacement for manufacturing defects discovered after purchase.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-navy-950 block">Up to 3-Year Warranty</span>
              <p className="text-xs text-slate-500 mt-1">Official manufacturer warranty on new laptops and PC components.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-navy-950 block">Used Device Warranty</span>
              <p className="text-xs text-slate-500 mt-1">1 Month replacement + 1 Year free service warranty on tested used laptops.</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">1. Eligibility for Return or Replacement</h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Item delivered is damaged or physically defective upon delivery.</li>
                <li>Item specifications do not match the order invoice or website description.</li>
                <li>Device suffers from internal manufacturing defects within 7 days of delivery.</li>
                <li>Original packaging, boxes, manuals, and warranty stickers must remain intact.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">2. Refund Timeline</h2>
              <p>
                If a replacement unit is unavailable in stock, Byte Tech BD will issue a full refund through bKash, Nagad, or direct bank transfer within <strong>3 to 5 business days</strong> after receiving the returned merchandise.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">3. Non-Eligible Items</h2>
              <p>
                Warranty and return coverage does not apply to accidental liquid spills, burnt ICs caused by electrical short-circuits or non-grounded sockets, or cracked screens after delivery acceptance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
