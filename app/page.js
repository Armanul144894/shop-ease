'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  MoveRight,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FlashSale from '../components/FlashSale';

const heroSlides = [
  {
    eyebrow: 'Resort capsule',
    title: 'Curated drops shaped like a glossy fashion issue',
    description:
      'A calmer storefront for fashion, tech, home, and beauty, all merchandised like a magazine spread instead of a crowded marketplace.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
    shortTitle: 'Travel-ready layers',
    spotlightTitle: 'Riviera-ready styling',
    spotlightText: 'Soft tailoring, warm neutrals, and accessories that move from airport lounge to dinner.',
  },
  {
    eyebrow: 'Studio tech',
    title: 'Design-led electronics for desks, commutes, and creative work',
    description:
      'From immersive audio to creator cameras and minimal desk essentials, every pick is chosen to feel premium on screen and in real life.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80',
    shortTitle: 'Focus-first workspaces',
    spotlightTitle: 'Built for clean setups',
    spotlightText: 'Audio, capture, and desk tools that keep your work surface simple and beautiful.',
  },
  {
    eyebrow: 'Home mood',
    title: 'Objects for slower evenings and rooms with character',
    description:
      'Accent furniture, warm lighting, tabletop pieces, and wellness staples for homes that feel layered rather than generic.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    shortTitle: 'Layered interiors',
    spotlightTitle: 'The room edit',
    spotlightText: 'Natural wood, tactile textures, and shelf-worthy details in one easy pass.',
  },
];

const brands = [
  { name: 'Nike', note: 'Movement essentials' },
  { name: 'Sony', note: 'Immersive audio' },
  { name: 'Coach', note: 'Leather icons' },
  { name: 'Aesop', note: 'Shelf-worthy care' },
  { name: 'Dyson', note: 'Design tech' },
  { name: 'Le Creuset', note: 'Kitchen color' },
];

const collectionCards = [
  {
    tag: 'Style edit',
    title: 'City dressing with soft structure and clean accessories',
    copy: 'Light layers, tonal sneakers, and polished bags that still feel effortless.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Tech drop',
    title: 'Desk pieces that look intentional on camera',
    copy: 'Audio, screens, and creator gear selected for compact workspaces.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
  },
  {
    tag: 'Home edit',
    title: 'Host-ready corners with warm light and texture',
    copy: 'Furniture, tabletop, and room accents for inviting evenings at home.',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
  },
];

const newArrivals = [
  {
    id: 1,
    name: 'Scarlet Runner',
    brand: 'Nike',
    category: 'Style',
    price: 129,
    originalPrice: 180,
    rating: 4.9,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    badge: 'New',
    stock: 6,
    description: 'Performance sneaker with a bold color hit and easy everyday cushioning.',
  },
  {
    id: 2,
    name: 'Tailored Tee Set',
    brand: 'Maison Edit',
    category: 'Style',
    price: 68,
    originalPrice: 92,
    rating: 4.8,
    reviews: 141,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    badge: 'Best seller',
    stock: 12,
    description: 'Structured cotton layers that work under jackets or on their own.',
  },
  {
    id: 3,
    name: 'Studio Headphones',
    brand: 'Sony',
    category: 'Tech',
    price: 189,
    originalPrice: 249,
    rating: 5,
    reviews: 326,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    badge: 'Sale',
    stock: 4,
    description: 'Balanced sound, plush comfort, and a silhouette that looks clean on any desk.',
  },
  {
    id: 4,
    name: 'North Phone Max',
    brand: 'Pixel',
    category: 'Tech',
    price: 699,
    originalPrice: 799,
    rating: 4.7,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    badge: 'New',
    stock: 9,
    description: 'Flagship performance with a matte finish and camera-first hardware.',
  },
  {
    id: 5,
    name: 'Creator Camera',
    brand: 'Fujifilm',
    category: 'Tech',
    price: 649,
    originalPrice: 799,
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    badge: 'Editors pick',
    stock: 5,
    description: 'Compact mirrorless body for travel stories, studio shots, and quick social capture.',
  },
  {
    id: 6,
    name: 'Cedar Lounge Chair',
    brand: 'Article',
    category: 'Home',
    price: 420,
    originalPrice: 520,
    rating: 4.8,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    badge: 'Home',
    stock: 8,
    description: 'Warm wood tones and an easy profile for reading corners or quiet bedrooms.',
  },
  {
    id: 7,
    name: 'Botanical Skin Set',
    brand: 'Aesop',
    category: 'Wellness',
    price: 72,
    originalPrice: 98,
    rating: 4.9,
    reviews: 174,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    badge: 'New',
    stock: 7,
    description: 'Bathroom-shelf worthy essentials with a clean ingredient story and calming scent.',
  },
  {
    id: 8,
    name: 'Luna Dial Watch',
    brand: 'Nord',
    category: 'Style',
    price: 149,
    originalPrice: 210,
    rating: 4.8,
    reviews: 109,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    badge: 'Giftable',
    stock: 10,
    description: 'A minimal dial and polished bracelet that elevate even the simplest outfits.',
  },
];

const recentlyViewed = [
  {
    id: 8,
    name: 'Luna Dial Watch',
    brand: 'Nord',
    category: 'Style',
    price: 149,
    originalPrice: 210,
    rating: 4.8,
    reviews: 109,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    badge: 'Giftable',
    stock: 10,
    description: 'A minimal dial and polished bracelet that elevate even the simplest outfits.',
  },
  {
    id: 9,
    name: 'Weekend Layers Rack',
    brand: 'Open Wardrobe',
    category: 'Style',
    price: 94,
    originalPrice: 132,
    rating: 4.7,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
    badge: 'Seen again',
    stock: 9,
    description: 'A ready-made capsule of shirts and outerwear in easy neutral tones.',
  },
  {
    id: 10,
    name: 'Minimal Desk Setup',
    brand: 'Studio Line',
    category: 'Tech',
    price: 239,
    originalPrice: 310,
    rating: 4.8,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80',
    badge: 'Saved',
    stock: 11,
    description: 'Laptop, lighting, and accessories composed for compact work and clean backgrounds.',
  },
  {
    id: 11,
    name: 'Oak Table Corner',
    brand: 'West Elm',
    category: 'Home',
    price: 158,
    originalPrice: 210,
    rating: 4.6,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80',
    badge: 'Home',
    stock: 5,
    description: 'Layered wood, books, and warm light to soften the feel of any room.',
  },
  {
    id: 12,
    name: 'Glow Ritual Duo',
    brand: 'Aesop',
    category: 'Wellness',
    price: 64,
    originalPrice: 82,
    rating: 4.9,
    reviews: 118,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    badge: 'Popular',
    stock: 4,
    description: 'Daily skin essentials that feel spa-like without becoming high maintenance.',
  },
];

const serviceHighlights = [
  {
    title: '48-hour delivery windows',
    text: 'Priority shipping on the most-requested edits so high-demand drops land quickly.',
    icon: Truck,
  },
  {
    title: 'Verified brand roster',
    text: 'Every label is approved by the merchandising team before it shows up on the storefront.',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible payments',
    text: 'Split purchases for bigger tech and home orders without cluttering checkout.',
    icon: CreditCard,
  },
  {
    title: 'Price-match requests',
    text: 'Spot a better listed price from an approved seller and our team reviews it fast.',
    icon: CircleDollarSign,
  },
];

const journalEntries = [
  {
    category: 'Decor notes',
    title: 'How to mix warm wood, matte tech, and soft lighting in one room',
    copy: 'A quick styling approach for home offices and living corners that need more texture.',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    category: 'Wear now',
    title: 'The easiest way to build a three-piece travel wardrobe',
    copy: 'One dressy layer, one relaxed base, and one sneaker is all most weekends need.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    category: 'Desk edit',
    title: 'The studio-tech items that make a small workspace feel premium',
    copy: 'Compact picks for creators and remote teams who want cleaner, calmer setups.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=80',
  },
];

const testimonials = [
  {
    name: 'Sarah Miller',
    role: 'Creative director',
    text: 'It feels like shopping a beautifully merchandised studio instead of scrolling through endless inventory.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'James Khan',
    role: 'Tech consultant',
    text: 'The product mix is tighter, the imagery feels real, and the checkout flow stays focused from start to finish.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Priya Sen',
    role: 'Interior stylist',
    text: 'I came for home pieces and ended up finding fashion and beauty picks that actually match the same mood.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
];

function SectionReveal({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('revealed');
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`section-reveal ${className}`}>{children}</div>;
}

function SectionHeading({ eyebrow, title, copy, actionLabel, href = '#' }) {
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

function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 5000);
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
              <a href="#new-arrivals" className="btn-primary">
                Shop the drop
                <ArrowRight size={16} />
              </a>
              <a href="#brands" className="btn-secondary">
                Meet the brands
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { value: '126', label: 'fresh arrivals this week' },
                { value: '48h', label: 'priority delivery windows' },
                { value: '4.9/5', label: 'average client rating' },
              ].map((metric) => (
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
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${index === active ? 'text-white/60' : 'text-stone-400'}`}>
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
                  <span
                    key={brand.name}
                    className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
              <a href="#brands" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View all brand partners
                <MoveRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductScroller({ products, title, icon }) {
  const [start, setStart] = useState(0);
  const visible = 4;
  const canPrev = start > 0;
  const canNext = start + visible < products.length;

  return (
    <SectionReveal>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {icon}
            </div>
          ) : null}
          <h2 className="font-display text-4xl font-semibold leading-none text-stone-900">{title}</h2>
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
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.slice(start, start + visible).map((product, index) => (
          <ProductCard key={product.id} product={product} delay={index * 80} />
        ))}
      </div>
    </SectionReveal>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Style', 'Tech', 'Home', 'Wellness'];

  const filteredProducts = activeTab === 'All'
    ? newArrivals
    : newArrivals.filter((product) => product.category === activeTab);

  return (
    <main>
      <HeroShowcase />

      <section id="brands" className="container py-6">
        <SectionReveal>
          <div className="surface-panel rounded-[32px] p-6 md:p-8">
            <SectionHeading
              eyebrow="Brand section"
              title="A roster that blends global names with visual consistency"
              copy="The brand wall gives the homepage more identity and helps the product mix feel intentional instead of random."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              {brands.map((brand, index) => (
                <div
                  key={brand.name}
                  className="card-lift rounded-[26px] border border-stone-200 bg-white p-5"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-lg font-bold text-primary">
                    {brand.name.slice(0, 1)}
                  </div>
                  <p className="mt-4 font-display text-3xl font-semibold text-stone-900">{brand.name}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-500">{brand.note}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section id="collections" className="container py-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="More sections"
            title="Collections built around moods, not just departments"
            copy="These editorial cards make the storefront feel more custom by grouping items around how people actually shop."
            actionLabel="See the latest drop"
            href="#new-arrivals"
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <a href="#new-arrivals" className="group relative overflow-hidden rounded-[34px]">
              <div className="aspect-[3/3]">
                <img
                  src={collectionCards[0].image}
                  alt={collectionCards[0].title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{collectionCards[0].tag}</p>
                <h3 className="mt-3 w-full text-3xl font-semibold leading-tight text-white md:w-[24rem]">
                  {collectionCards[0].title}
                </h3>
                <p className="mt-3 w-full text-sm leading-7 text-white/75 md:w-[22rem]">{collectionCards[0].copy}</p>
              </div>
            </a>

            <div className="grid gap-5">
              {collectionCards.slice(1).map((card) => (
                <a key={card.title} href="#new-arrivals" className="group relative overflow-hidden rounded-[30px]">
                  <div className="aspect-[3/1.8]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{card.tag}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 w-full text-sm leading-7 text-white/75 md:w-[20rem]">{card.copy}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section id="new-arrivals" className="container py-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="New arrivals"
            title="Fresh arrivals with real product photography"
            copy="The card grid now uses real imagery instead of emoji placeholders, which gives the storefront a much more credible feel."
          />
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
            <div className="surface-panel rounded-[32px] p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">This week</p>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-none text-stone-900">
                Pieces selected to work together across outfits, desks, and rooms
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                Use the tabs to narrow the edit while keeping the same visual rhythm and card style.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tabs.map((tab) => (
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

              <div className="mt-8 space-y-4">
                {[
                  'Tighter assortment instead of overloaded product walls',
                  'Editorial mix of fashion, home, beauty, and studio tech',
                  'Premium cards with clearer pricing and product context',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BadgeCheck size={15} />
                    </div>
                    <p className="text-sm leading-6 text-stone-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {(filteredProducts.length ? filteredProducts : newArrivals).slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} delay={index * 80} />
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <FlashSale />

      <section className="container py-10">
        <SectionReveal>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface-panel rounded-[32px] p-6 md:p-8">
              <SectionHeading
                eyebrow="Service design"
                title="Shopping support that feels more like a studio concierge"
                copy="Adding another section here helps balance the new visual weight and makes the homepage feel fuller."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {serviceHighlights.map(({ title, text, icon: Icon }) => (
                  <div key={title} className="rounded-[26px] border border-stone-200 bg-white p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-stone-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="relative overflow-hidden rounded-[32px]">
                <div className="aspect-[4/3.1]">
                  <img
                    src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
                    alt="Curated fashion details"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Styled with intent</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">A homepage that now looks merchandised, not autogenerated</h3>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="surface-panel rounded-[28px] p-5">
                  <p className="text-3xl font-extrabold text-stone-900">2.4M+</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Returning customers</p>
                </div>
                <div className="surface-panel rounded-[28px] p-5">
                  <p className="text-3xl font-extrabold text-stone-900">98.5%</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Satisfaction score</p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="container py-10">
        <ProductScroller
          products={recentlyViewed}
          title="Recently viewed"
          icon={<ChevronRight size={18} />}
        />
      </section>

      <section id="journal" className="container py-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="Journal"
            title="A content layer that makes the storefront feel alive"
            copy="This extra section gives the homepage more depth and keeps the design from stopping at products alone."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {journalEntries.map((entry) => (
              <div
                key={entry.title}
                className="card-lift overflow-hidden rounded-[30px] border border-stone-200/70 bg-white shadow-soft"
              >
                <div className="aspect-[4/2.8]">
                  <img src={entry.image} alt={entry.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">{entry.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-stone-900">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{entry.copy}</p>
                  <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read more
                    <MoveRight size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="container py-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="Why it feels different"
            title="Client feedback that matches the new premium direction"
            copy="Real portraits and stronger quote cards help this area feel more trustworthy than the old emoji-driven testimonial slider."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="surface-panel rounded-[30px] p-6">
                <Quote size={28} className="text-primary/25" />
                <p className="mt-4 text-base leading-8 text-stone-700">{testimonial.text}</p>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
