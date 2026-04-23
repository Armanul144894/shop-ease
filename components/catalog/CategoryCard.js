import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="card-lift block overflow-hidden rounded-[30px] border border-stone-200/70 bg-white shadow-soft"
    >
      <div className="aspect-[4/2.8]">
        <img src={category.heroImage} alt={category.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <span className="section-kicker">{category.name}</span>
        <p className="mt-5 font-display text-3xl font-semibold text-stone-900">{category.note}</p>
        <p className="mt-3 text-sm leading-7 text-stone-600">{category.description}</p>
        <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
          <span>{category.productCount} products</span>
          <span className="inline-flex items-center gap-2">
            View category
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
