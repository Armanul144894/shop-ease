'use client';

import { useMemo, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import ProductCard from '../ProductCard';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import {
  newArrivalHighlights,
  newArrivals,
  newArrivalTabs,
} from './home-data';

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState('All');

  const displayProducts = useMemo(() => {
    if (activeTab === 'All') {
      return newArrivals.slice(0, 6);
    }

    const filtered = newArrivals.filter((product) => product.category === activeTab);
    const fallback = newArrivals.filter((product) => product.category !== activeTab);

    return [...filtered, ...fallback].slice(0, 6);
  }, [activeTab]);

  return (
    <section id="new-arrivals" className="container py-10">
      <SectionReveal>
        <SectionHeading
          eyebrow="New arrivals"
          title="Fresh arrivals with smaller cards and a denser product mix"
          copy="The homepage now shows more products at once, so shoppers can browse faster without the layout feeling overloaded."
        />

        <div className="mt-8 surface-panel rounded-[32px] p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">This week</p>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-none text-stone-900">
                Pieces selected to work together across outfits, desks, and rooms
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                Use the tabs to lead the assortment while still keeping a full six-card layout on screen.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {newArrivalTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] border border-stone-200 bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Current filter</p>
                <p className="mt-3 text-2xl font-semibold text-stone-900">{activeTab === 'All' ? 'Whole storefront' : `${activeTab} picks`}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Smaller cards leave room for more browsing, so even focused filters still feel substantial.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {newArrivalHighlights.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BadgeCheck size={15} />
                    </div>
                    <p className="text-sm leading-6 text-stone-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {displayProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} delay={index * 70} />
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
