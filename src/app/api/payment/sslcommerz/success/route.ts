import { type NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { validateSSLCommerzIPN } from '@/lib/payments/sslcommerz';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const tranId = formData.get('tran_id') as string;
    const valId = formData.get('val_id') as string;

    if (!tranId || !valId) {
      return NextResponse.redirect(new URL('/checkout?error=invalid_payload', req.url));
    }

    // Verify with SSLCommerz server
    const validation = await validateSSLCommerzIPN(valId);

    if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
      const adminClient = await createAdminSupabaseClient();
      await adminClient
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
        })
        .eq('order_number', tranId);

      return NextResponse.redirect(new URL(`/order-tracking?order=${encodeURIComponent(tranId)}&payment=success`, req.url));
    }

    return NextResponse.redirect(new URL(`/checkout?error=payment_validation_failed`, req.url));
  } catch (e: any) {
    return NextResponse.redirect(new URL(`/checkout?error=${encodeURIComponent(e.message || 'payment_failed')}`, req.url));
  }
}
