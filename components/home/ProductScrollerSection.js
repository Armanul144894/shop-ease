'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';
import SectionReveal from './SectionReveal';

export default function ProductScrollerSection({
  id,
  eyebrow,
  title,
  copy,
  products,
  icon,
}) {
  const [start, setStart] = useState(0);
  const visible = 4;
  const canPrev = start > 0;
  const canNext = start + visible < products.length;

  return (
    <section id={id} className="container py-10">
      <SectionReveal>
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">{eyebrow}</span>
            <div className="mt-5 flex items-center gap-3">
              {icon ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {icon}
                </div>
              ) : null}
              <h2 className="font-display text-4xl font-semibold leading-none text-stone-900 md:text-5xl">
                {title}
              </h2>
            </div>
            {copy ? (
              <p className="mt-4 w-full text-sm leading-7 text-stone-600 md:w-[36rem]">
                {copy}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStart((current) => Math.max(0, current - 1))}
              disabled={!canPrev}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                canPrev
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'cursor-not-allowed border-stone-200 text-stone-300'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setStart((current) => Math.min(products.length - visible, current + 1))}
              disabled={!canNext}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                canNext
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'cursor-not-allowed border-stone-200 text-stone-300'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(start, start + visible).map((product, index) => (
            <ProductCard key={product.id} product={product} delay={index * 70} />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
