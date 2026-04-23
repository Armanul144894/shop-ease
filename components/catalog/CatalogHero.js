import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CatalogHero({
  eyebrow,
  title,
  copy,
  stats = [],
  primaryLink,
  secondaryLink,
  image,
  imageAlt,
}) {
  return (
    <section className="container py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="surface-panel relative overflow-hidden rounded-[34px] p-8 md:p-10">
          <div className="absolute inset-0 bg-hero-radial opacity-80" />
          <div className="relative">
            <span className="section-kicker">{eyebrow}</span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-7xl">
              {title}
            </h1>
            <p className="mt-5 w-full text-base leading-8 text-stone-600 md:w-[36rem]">
              {copy}
            </p>

            {(primaryLink || secondaryLink) ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryLink ? (
                  <Link href={primaryLink.href} className="btn-primary">
                    {primaryLink.label}
                    <ArrowRight size={16} />
                  </Link>
                ) : null}
                {secondaryLink ? (
                  <Link href={secondaryLink.href} className="btn-secondary">
                    {secondaryLink.label}
                  </Link>
                ) : null}
              </div>
            ) : null}

            {stats.length ? (
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="metric-chip">
                    <p className="text-3xl font-extrabold text-stone-900">{stat.value}</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-stone-200 shadow-soft">
          <div className="aspect-[4/4.2] md:aspect-[4/3.7]">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/65">{eyebrow}</p>
            <p className="mt-3 w-full text-sm leading-7 text-white/75 md:w-[22rem]">
              Browse design-led products, discover focused edits, and move between brands, categories, and products from clean single-slug URLs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
