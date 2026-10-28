'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { signIn } from '@/lib/actions/auth';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillAdmin = () => {
    setEmail('admin@bytetechbd.com');
    setPassword('ByteTechAdmin2026!');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const result = await signIn(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Signed in successfully!');
        if (result.isAdmin || email.toLowerCase().includes('admin')) {
          router.push(redirect !== '/' ? redirect : '/admin');
        } else {
          router.push(redirect);
        }
        router.refresh();
      }
    } catch (err) {
      toast.error('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-md">
      {/* Demo Admin Quick Helper Box */}
      <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
            <ShieldCheck size={16} className="text-teal-600" />
            <span>Admin Demo Credentials</span>
          </div>
          <button
            type="button"
            onClick={fillAdmin}
            className="text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-white hover:bg-teal-100 border border-teal-300 px-2.5 py-1 rounded-md transition-colors"
          >
            Auto-fill
          </button>
        </div>
        <div className="text-[11px] text-teal-800 space-y-0.5 font-mono">
          <div><strong className="font-sans font-semibold text-teal-950">Email:</strong> admin@bytetechbd.com</div>
          <div><strong className="font-sans font-semibold text-teal-950">Password:</strong> ByteTechAdmin2026!</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-field text-sm pl-10"
            />
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field text-sm pl-10"
            />
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-sm font-bold shadow-md shadow-teal-500/20 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Sign In to Account</span>
              <ArrowRight size={16} />
            </span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-100 text-center space-y-2">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link href={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-teal-600 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
        <p className="text-xs text-slate-500">
          Direct Admin Access:{' '}
          <Link href="/admin" className="text-navy-900 font-bold hover:text-teal-600 hover:underline">
            Go to Admin Dashboard &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Logo size="lg" className="justify-center mb-4" />
        <h2 className="text-2xl font-black text-navy-950 tracking-tight">
          Welcome Back to Byte Tech BD
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Sign in to access your order history, saved addresses, and quotes.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
