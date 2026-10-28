export const metadata = {
  title: 'Privacy Policy | Byte Tech BD',
  description: 'Byte Tech BD privacy policy regarding customer personal data and order security.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h1 className="text-3xl font-black text-navy-950 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: January 2026</p>
          </div>

          <p>
            At <strong>Byte Tech BD</strong>, your privacy and personal information security are our top priorities. This Privacy Policy details how we collect, store, and utilize your personal information when you use our website or place orders.
          </p>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">1. Information We Collect</h2>
            <p>
              When you purchase products or register an account, we collect your name, email address, delivery street address, phone number, and order preferences. We do not store sensitive payment card details on our local servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">2. How Your Information is Used</h2>
            <p>
              Your contact details are solely used to process and deliver your tech purchases, verify delivery through courier dispatch, provide order tracking updates, and provide warranty support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">3. Data Protection & Security</h2>
            <p>
              All customer sessions and data submissions are encrypted via Industry Standard Transport Layer Security (HTTPS/TLS) and protected with Row-Level Security (RLS) on our database servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-navy-950">4. Contact Privacy Officer</h2>
            <p>
              For inquiries regarding personal data deletion or updates, please email privacy@bytetechbd.com or call our hotline +880 1700-000000.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
