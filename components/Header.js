'use client';

import { useEffect, useState } from 'react';
import { Heart, MapPin, Menu, Search, ShoppingBag, Sparkles, User, X } from 'lucide-react';

const navigation = [
  { label: 'New In', href: '#new-arrivals' },
  { label: 'Brands', href: '#brands' },
  { label: 'Collections', href: '#collections' },
  { label: 'Flash Sale', href: '#flash-sale' },
  { label: 'Journal', href: '#journal' },
];

const quickFilters = ['Resort edit', 'Studio tech', 'Home mood'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="border-b border-stone-200/70 bg-white/80 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3 text-xs text-stone-600">
          <div className="flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            <Sparkles size={12} className="text-accent" />
            Fresh spring edit live now
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-primary" />
              Shipping across 40+ cities
            </span>
            <span>Free returns within 14 days</span>
            <span className="font-semibold text-stone-800">Concierge support every day</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-stone-200/70 bg-white/75 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'shadow-[0_18px_45px_rgba(15,23,42,0.08)]' : ''
        }`}
      >
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <a href="#" className="flex shrink-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <span className="font-display text-2xl font-bold leading-none">S</span>
              </div>
              <div>
                <p className="font-display text-3xl font-bold leading-none text-stone-900">ShopEase</p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">Studio store</p>
              </div>
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-stone-600 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
              <label className="flex min-w-[250px] items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-500 transition focus-within:border-primary focus-within:bg-white">
                <Search size={16} className="text-stone-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products, brands, collections..."
                  className="w-full bg-transparent outline-none placeholder:text-stone-400"
                />
              </label>
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-primary hover:text-primary">
                <Heart size={18} />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-primary hover:text-primary">
                <ShoppingBag size={18} />
              </button>
              <button className="hidden items-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary lg:inline-flex">
                <User size={16} />
                Account
              </button>
            </div>

            <button
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 md:hidden"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div className="mt-4 hidden flex-wrap items-center gap-2 md:flex">
            {quickFilters.map((filter) => (
              <a
                key={filter}
                href="#collections"
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 transition hover:border-primary hover:text-primary"
              >
                {filter}
              </a>
            ))}
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-stone-200/70 bg-white md:hidden">
            <div className="container py-4">
              <label className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-500">
                <Search size={16} className="text-stone-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent outline-none placeholder:text-stone-400"
                />
              </label>
              <div className="mt-4 flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {quickFilters.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
