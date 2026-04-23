'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BrandLogo from '../catalog/BrandLogo';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import { brands } from './home-data';
import useResponsiveSlides from './useResponsiveSlides';

export default function BrandsSection() {
  const [start, setStart] = useState(0);
  const visible = useResponsiveSlides(2, 4, 6);
  const maxStart = Math.max(0, brands.length - visible);
  const canPrev = start > 0;
  const canNext = start + visible < brands.length;

  useEffect(() => {
    setStart((current) => Math.min(current, maxStart));
  }, [maxStart]);

  return (
    <section id="brands" className="container py-6">
      <SectionReveal>
        <div className="surface-panel rounded-[32px] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Brand section"
              title="A roster that blends global names with visual consistency"
              copy="The brand wall now moves like a slider, so the homepage can feature more brands without turning into a static logo strip."
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStart((current) => Math.max(0, current - 1))}
                disabled={!canPrev}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  canPrev
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'cursor-not-allowed border-stone-200 text-stone-300'
                }`}
                aria-label="Show previous brands"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setStart((current) => Math.min(maxStart, current + 1))}
                disabled={!canNext}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                  canNext
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'cursor-not-allowed border-stone-200 text-stone-300'
                }`}
                aria-label="Show next brands"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {brands.slice(start, start + visible).map((brand, index) => (
              <Link
                key={brand.name}
                href={`/${brand.slug}`}
                className="card-lift rounded-[26px] border border-stone-200 bg-white p-5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <BrandLogo
                  brand={brand}
                  wrapperClassName="h-14 w-full rounded-[20px] bg-stone-50 px-3"
                  imageClassName="p-3"
                  textClassName="text-[10px]"
                />
                <p className="mt-4 font-display text-3xl font-semibold text-stone-900">{brand.name}</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">{brand.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
