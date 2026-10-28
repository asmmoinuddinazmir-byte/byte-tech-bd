import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Bangladesh's Leading Computer & Laptop Store`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'laptop price in bangladesh',
    'used laptop bd',
    'gaming pc build bangladesh',
    'computer accessories dhaka',
    'byte tech bd',
    'new laptop warranty bd'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
