import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  } catch (e) {
    // Graceful
  }

  revalidatePath('/', 'layout');
  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url, { status: 302 });
}
