import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function BrandCard({ brand }) {
  return (
    <Link
      href={`/${brand.slug}`}
      className="card-lift block rounded-[28px] border border-stone-200/70 bg-white p-6 shadow-soft"
    >
      <BrandLogo
        brand={brand}
        wrapperClassName="h-16 w-full rounded-[22px] bg-stone-50 px-4"
        imageClassName="p-3"
        textClassName="text-xs"
      />
      <p className="mt-4 font-display text-3xl font-semibold text-stone-900">{brand.name}</p>
      <p className="mt-2 text-sm leading-6 text-stone-600">{brand.note}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {brand.categories.slice(0, 2).map((category) => (
          <span
            key={category.slug}
            className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500"
          >
            {category.name}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
        <span>{brand.productCount} products</span>
        <span className="inline-flex items-center gap-2">
          View brand
          <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
