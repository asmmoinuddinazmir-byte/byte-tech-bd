import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts } from '@/lib/actions/products';
import { ProductCard } from '@/components/storefront/ProductCard';
import { ProductDetailClient } from './ProductDetailClient';
import { 
  ShieldCheck, Truck, RotateCcw, BatteryCharging, 
  CheckCircle, AlertCircle, Cpu, HelpCircle 
} from 'lucide-react';
import { formatPrice, getDiscountPercentage, getConditionBadgeColor, getConditionGradeColor } from '@/lib/utils';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found | Byte Tech BD' };

  return {
    title: `${product.name} Price in Bangladesh | Byte Tech BD`,
    description: product.short_description || product.description?.slice(0, 160) || 'Buy from Byte Tech BD',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category_id);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-teal-600 transition-colors">Products</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/products?category=${product.category.slug}`} className="hover:text-teal-600 transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Client Interactive Area (Gallery, Quantity, Cart, Buy Now) */}
        <ProductDetailClient product={product} />

        {/* Technical Specifications Section */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-xl md:text-2xl font-black text-navy-950 flex items-center gap-2">
              <Cpu className="text-teal-500" />
              <span>Technical Specifications & Hardware Details</span>
            </h2>
          </div>

          {product.specifications && product.specifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {product.specifications.map((spec) => (
                <div
                  key={spec.id || spec.spec_key}
                  className="flex justify-between py-2.5 border-b border-slate-100 text-sm"
                >
                  <span className="font-semibold text-slate-600 w-1/3 shrink-0">{spec.spec_key}</span>
                  <span className="text-navy-950 font-medium text-right w-2/3">{spec.spec_value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 py-4">
              Standard manufacturer specifications apply. Contact our live sales desk for custom upgrade inquiries.
            </p>
          )}

          {/* Description Section */}
          {product.description && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-navy-950 mb-3">Product Overview</h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                {product.description}
              </div>
            </div>
          )}

          {/* Used Device Diagnostic Report if used */}
          {product.condition === 'used' && (
            <div className="mt-8 p-5 rounded-xl bg-amber-50/70 border border-amber-200">
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-700" /> Certified Used Device Transparency Report
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-amber-800/80 font-medium block">Condition Grade</span>
                  <span className="text-sm font-bold text-amber-950">
                    Grade {product.condition_grade || 'A'}
                  </span>
                </div>
                <div>
                  <span className="text-amber-800/80 font-medium block">Battery Diagnostics</span>
                  <span className="text-sm font-bold text-amber-950">
                    {product.battery_health || '80%+ Tested'}
                  </span>
                </div>
                <div>
                  <span className="text-amber-800/80 font-medium block">Disclosed Defects</span>
                  <span className="text-sm font-bold text-amber-950">
                    {product.defects || 'None (Normal cosmetic wear)'}
                  </span>
                </div>
                <div>
                  <span className="text-amber-800/80 font-medium block">Quality Benchmark</span>
                  <span className="text-sm font-bold text-emerald-700">
                    Passed 30-Point Test
                  </span>
                </div>
              </div>
              {product.testing_notes && (
                <div className="mt-3 pt-3 border-t border-amber-200/80 text-xs text-amber-900">
                  <span className="font-semibold">Technician Notes: </span>
                  {product.testing_notes}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-navy-950 mb-6">
              You May Also Consider
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
