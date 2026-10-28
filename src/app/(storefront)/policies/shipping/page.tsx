import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | Byte Tech BD',
  description: 'Learn about Byte Tech BD delivery charges, delivery timelines across Dhaka and 64 districts in Bangladesh.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xs space-y-8">
          <div>
            <span className="badge bg-teal-50 text-teal-700 text-xs uppercase tracking-wider font-bold mb-2">
              Delivery Logistics
            </span>
            <h1 className="text-3xl font-black text-navy-950 tracking-tight">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: January 2026 • Nationwide Bangladesh Delivery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-navy-950 block">Inside Dhaka City</span>
              <p className="text-teal-600 font-extrabold text-lg">৳80 BDT</p>
              <p className="text-xs text-slate-500">Delivered within 24 to 48 hours via dedicated courier.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-navy-950 block">Outside Dhaka (All 64 Districts)</span>
              <p className="text-teal-600 font-extrabold text-lg">৳150 BDT</p>
              <p className="text-xs text-slate-500">Delivered within 48 to 72 hours via Steadfast / RedX / SA Paribahan.</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">1. Free Shipping Threshold</h2>
              <p>
                Orders with a subtotal of <strong>৳10,000 or higher</strong> qualify for 100% Free Shipping anywhere within Bangladesh.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">2. Order Verification Call</h2>
              <p>
                Before dispatching high-value electronics such as laptops, graphic cards, or desktop rigs, our customer representative will call the mobile phone number specified during checkout to confirm order items and exact destination.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">3. Inspection on Delivery (Cash on Delivery)</h2>
              <p>
                For Cash on Delivery orders, you are encouraged to check the outer parcel seal and physical integrity in front of the courier delivery executive before completing payment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-950">4. Safe Packaging</h2>
              <p>
                All fragile components such as monitors, tempered glass casings, and laptops are packaged with industrial air-cushion bubble wrap and security seal tape to prevent transit damage.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
