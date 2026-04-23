'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import { testimonials } from './home-data';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < testimonials.length - 1;

  return (
    <section className="container py-10">
      <SectionReveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Why it feels different"
            title="Client feedback that now moves like a proper testimonial slider"
            copy="Instead of a static three-card block, this section now spotlights one customer story at a time with simple slider controls."
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
              disabled={!canPrev}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                canPrev
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'cursor-not-allowed border-stone-200 text-stone-300'
              }`}
              aria-label="Show previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.min(testimonials.length - 1, current + 1))}
              disabled={!canNext}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                canNext
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'cursor-not-allowed border-stone-200 text-stone-300'
              }`}
              aria-label="Show next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-panel rounded-[30px] p-6 md:p-8">
            <Quote size={30} className="text-primary/25" />
            <p className="mt-5 text-xl leading-9 text-stone-700 md:text-2xl">
              {activeTestimonial.text}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <img
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="h-16 w-16 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-stone-900">{activeTestimonial.name}</p>
                <p className="text-sm text-stone-500">{activeTestimonial.role}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-[26px] border p-5 text-left transition ${
                  index === activeIndex
                    ? 'border-primary bg-mist'
                    : 'border-stone-200 bg-white hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-600">{testimonial.text}</p>
              </button>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
