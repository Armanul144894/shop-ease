import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, copy, actionLabel, href = '#' }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="section-kicker">{eyebrow}</span>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-stone-900 md:text-5xl">
          {title}
        </h2>
        {copy ? (
          <p className="mt-4 w-full text-sm leading-7 text-stone-600 md:w-[36rem]">
            {copy}
          </p>
        ) : null}
      </div>
      {actionLabel ? (
        <a href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {actionLabel}
          <ArrowRight size={15} />
        </a>
      ) : null}
    </div>
  );
}
