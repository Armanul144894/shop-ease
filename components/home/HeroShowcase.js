'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, MoveRight, Sparkles } from 'lucide-react';
import BrandLogo from '../catalog/BrandLogo';
import { brands, heroMetrics, heroSlides } from './home-data';

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[active];

  return (
    <section className="container py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-panel relative overflow-hidden rounded-[34px] p-8 md:p-10">
          <div className="absolute inset-0 bg-hero-radial opacity-80" />
          <div className="relative">
            <span className="section-kicker">{slide.eyebrow}</span>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.34em] text-stone-500">
              Editorial commerce for fashion, home, beauty, and design-led tech.
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-stone-900 md:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 w-full text-base leading-8 text-stone-600 md:w-[34rem]">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Shop the drop
                <ArrowRight size={16} />
              </Link>
              <Link href="/brands" className="btn-secondary">
                Meet the brands
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="metric-chip">
                  <p className="text-3xl font-extrabold text-stone-900">{metric.value}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroSlides.map((item, index) => (
                <button
                  key={item.eyebrow}
                  onClick={() => setActive(index)}
                  className={`rounded-[24px] border px-4 py-4 text-left transition ${
                    index === active
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-white/70 text-stone-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${
                      index === active ? 'text-white/60' : 'text-stone-400'
                    }`}
                  >
                    {item.eyebrow}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{item.shortTitle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-stone-200 shadow-soft">
            <div className="aspect-[4/4.3] md:aspect-[4/3.7]">
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/65">{slide.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{slide.spotlightTitle}</h3>
              <p className="mt-3 w-full text-sm leading-7 text-white/75 md:w-[22rem]">{slide.spotlightText}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-panel rounded-[28px] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Styled weekly edits</p>
                  <p className="mt-1 text-sm text-stone-500">A tighter assortment, updated like a seasonal magazine issue.</p>
                </div>
              </div>
            </div>

            <div className="surface-panel rounded-[28px] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Current roster</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {brands.slice(0, 4).map((brand) => (
                  <Link
                    key={brand.name}
                    href={`/${brand.slug}`}
                    className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
                  >
                    <BrandLogo
                      brand={brand}
                      wrapperClassName="h-6 w-10 rounded-full border-0 bg-transparent px-0"
                      imageClassName="p-0"
                      textClassName="text-[8px] tracking-[0.18em]"
                    />
                    <span>{brand.name}</span>
                  </Link>
                ))}
              </div>
              <Link href="/brands" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View all brand partners
                <MoveRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
