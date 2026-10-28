import { adminGetCoupons } from '@/lib/actions/admin';
import { CouponsClient } from './CouponsClient';

export default async function AdminCouponsPage() {
  const coupons = await adminGetCoupons();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
          Discount Codes & Promotions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Create promotional vouchers for checkout discounts (percentage or fixed amount in BDT).
        </p>
      </div>

      <CouponsClient initialCoupons={coupons} />
    </div>
  );
}
