export const metadata = {
  title: 'Terms and Conditions | Byte Tech BD',
  description: 'Terms of service, pricing, and purchase conditions at Byte Tech BD.',
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h1 className="text-3xl font-black text-navy-950 tracking-tight">Terms and Conditions</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: January 2026</p>
          </div>

          <p>
            Welcome to Byte Tech BD. By using this website, creating a customer account, or placing orders for products, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">1. Product Pricing & Currency</h2>
            <p>
              All prices shown on Byte Tech BD are denominated in Bangladeshi Taka (BDT ৳). While we strive for absolute accuracy, in the rare event an item is listed with an erroneous price or incorrect specifications, Byte Tech BD reserves the right to decline or cancel the affected order prior to dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">2. Condition Grades for Used Devices</h2>
            <p>
              Pre-owned and certified used devices are marked with clear cosmetic condition grades (Grade A+, Grade A, Grade B+). Disclosed defects and battery health percentages represent accurate benchmarks tested by our technicians.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">3. Stock Availability & Order Confirmation</h2>
            <p>
              Placing an order creates a purchase intent subject to stock verification. An order becomes legally binding upon confirmation via phone call or courier shipment dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">4. Applicable Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
