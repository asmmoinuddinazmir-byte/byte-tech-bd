import { type NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { validateSSLCommerzIPN } from '@/lib/payments/sslcommerz';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const tranId = formData.get('tran_id') as string;
    const valId = formData.get('val_id') as string;

    if (!tranId || !valId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

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

      return NextResponse.json({ success: true, message: 'IPN processed successfully' });
    }

    return NextResponse.json({ error: 'Invalid transaction' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
