import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const tranId = formData.get('tran_id') as string;
  return NextResponse.redirect(new URL(`/order-tracking?order=${encodeURIComponent(tranId || '')}&payment=cancelled`, req.url));
}
