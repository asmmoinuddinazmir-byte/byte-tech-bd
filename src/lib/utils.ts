import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('BDT', '৳');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getDiscountPercentage(price: number, discountedPrice: number): number {
  return Math.round(((price - discountedPrice) / price) * 100);
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getConditionBadgeColor(condition: string): string {
  const colors: Record<string, string> = {
    new: 'bg-green-100 text-green-800',
    used: 'bg-amber-100 text-amber-800',
    refurbished: 'bg-blue-100 text-blue-800',
  };
  return colors[condition] || 'bg-gray-100 text-gray-800';
}

export function getConditionGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    'A+': 'text-green-600',
    'A': 'text-green-500',
    'B+': 'text-yellow-600',
    'B': 'text-yellow-500',
    'C': 'text-orange-500',
  };
  return colors[grade] || 'text-gray-500';
}

export function isValidBDPhone(phone: string): boolean {
  const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  return bdPhoneRegex.test(phone.replace(/[\s-]/g, ''));
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return path;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`;
}
