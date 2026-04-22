'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Clock3, ShoppingBag, Sparkles } from 'lucide-react';

function TimeBox({ value, label }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-center">
      <div className="text-3xl font-extrabold text-white">{String(value).padStart(2, '0')}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">{label}</div>
    </div>
  );
}

const flashProducts = [
  {
    id: 1,
    name: 'Studio Audio Set',
    brand: 'Sony',
    price: 189,
    originalPrice: 269,
    note: 'Clean desk setup, immersive sound',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Scarlet Runner',
    brand: 'Nike',
    price: 129,
    originalPrice: 180,
    note: 'Lightweight build for everyday wear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Creator Camera',
    brand: 'Fujifilm',
    price: 649,
    originalPrice: 799,
    note: 'Sharp travel shots in a compact body',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Glow Skin Ritual',
    brand: 'Aesop',
    price: 72,
    originalPrice: 98,
    note: 'Bathroom shelf styling with real function',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
  },
];

function FlashProduct({ product, addedId, onAdd }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-white/6">
      <div className="relative">
        <div className="aspect-[4/3.2]">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
          {discount}% off
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">{product.brand}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-white/65">{product.note}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white">${product.price}</span>
          <span className="text-sm text-white/40 line-through">${product.originalPrice}</span>
        </div>
        <button
          onClick={() => onAdd(product.id)}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition ${
            addedId === product.id
              ? 'bg-white text-[#10211d]'
              : 'bg-white/10 text-white hover:bg-white hover:text-[#10211d]'
          }`}
        >
          <ShoppingBag size={16} />
          {addedId === product.id ? 'Added to bag' : 'Add to bag'}
        </button>
      </div>
    </article>
  );
}

export default function FlashSale() {
  const [time, setTime] = useState({ h: 12, m: 45, s: 18 });
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;

        if (s < 0) {
          s = 59;
          m--;
        }

        if (m < 0) {
          m = 59;
          h--;
        }

        if (h < 0) {
          h = 12;
          m = 45;
          s = 18;
        }

        return { h, m, s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAdd = (id) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="flash-sale" className="py-14">
      <div className="container">
        <div className="overflow-hidden rounded-[34px] bg-[#10211d] p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  <Sparkles size={14} />
                  Limited-time event
                </span>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-white md:text-5xl">
                  Flash sale with more than just one hero deal
                </h2>
                <p className="mt-4 w-full text-sm leading-7 text-white/65 md:w-[28rem]">
                  A tighter selection of fashion, studio tech, and grooming pieces marked down for the day.
                </p>
              </div>

              <div>
                <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/70">
                  <Clock3 size={16} />
                  Ends in
                </div>
                <div className="grid grid-cols-3 gap-3 sm:w-[18rem]">
                  <TimeBox value={time.h} label="hrs" />
                  <TimeBox value={time.m} label="min" />
                  <TimeBox value={time.s} label="sec" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[30px] border border-white/10">
                <div className="aspect-[4/4.2]">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                    alt="Curated fashion look"
                    className="h-full w-full object-cover opacity-85"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Today only</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Private-client pricing on the seasonal edit</h3>
                  <a href="#new-arrivals" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Shop current picks
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {flashProducts.map((product) => (
                <FlashProduct key={product.id} product={product} addedId={addedId} onAdd={handleAdd} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
