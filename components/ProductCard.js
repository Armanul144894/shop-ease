'use client';

import { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product, delay = 0 }) {
  const [wished, setWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className="card-lift group relative overflow-hidden rounded-[28px] border border-stone-200/70 bg-white shadow-soft"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {product.badge && (
          <span className="rounded-full bg-stone-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white backdrop-blur">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="absolute right-4 top-4 z-10 flex gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
        <button
          onClick={() => setWished(!wished)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md backdrop-blur transition hover:scale-105"
          aria-label="Save product"
        >
          <Heart size={15} className={wished ? 'fill-accent text-accent' : 'text-stone-500'} />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md backdrop-blur transition hover:scale-105"
          aria-label="Quick view"
        >
          <Eye size={15} className="text-stone-500" />
        </button>
      </div>

      <div className="relative overflow-hidden bg-stone-100">
        <div className="aspect-[4/4.6]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {product.stock <= 5 && (
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-stone-900 backdrop-blur">
              Only {product.stock} left
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">{product.brand}</p>
            <h3 className="mt-1 text-lg font-semibold leading-tight text-stone-900">{product.name}</h3>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-600">
            {product.category}
          </span>
        </div>

        <p className="text-sm leading-6 text-stone-600">{product.description}</p>

        <div className="flex items-center gap-2 text-sm text-stone-500">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={13}
                className={index < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}
              />
            ))}
          </div>
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-stone-300">/</span>
          <span>{product.reviews} reviews</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-stone-900">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">In stock</span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition ${
            addedToCart
              ? 'bg-primary text-white'
              : 'border border-stone-200 bg-stone-50 text-stone-900 hover:border-primary hover:bg-primary hover:text-white'
          }`}
        >
          <ShoppingBag size={16} />
          {addedToCart ? 'Added to bag' : 'Add to bag'}
        </button>
      </div>
    </article>
  );
}
