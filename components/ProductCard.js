'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { useStorefront } from './storefront/StorefrontProvider';

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart, cartItems, updateCartQuantity } = useStorefront();
  const [wished, setWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const productHref = product.path ?? (product.slug ? `/${product.slug}` : '/products');
  const brandHref = product.brandSlug ? `/${product.brandSlug}` : '/brands';
  const categoryHref = product.categorySlug ? `/${product.categorySlug}` : '/categories';
  const cartItem = cartItems.find((item) => item.slug === product.slug);
  const cartQuantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className="card-lift group relative overflow-hidden rounded-[24px] border border-stone-200/70 bg-white shadow-soft"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {product.badge && (
          <span className="rounded-full bg-stone-900/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.26em] text-white backdrop-blur">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.26em] text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
        <button
          onClick={() => setWished(!wished)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md backdrop-blur transition hover:scale-105"
          aria-label="Save product"
        >
          <Heart size={14} className={wished ? 'fill-accent text-accent' : 'text-stone-500'} />
        </button>
        <Link
          href={productHref}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md backdrop-blur transition hover:scale-105"
          aria-label="Quick view"
        >
          <Eye size={14} className="text-stone-500" />
        </Link>
      </div>

      <div className="relative overflow-hidden bg-stone-100">
        <Link href={productHref} className="block">
          <div className="aspect-[4/3]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {product.stock <= 5 && (
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-stone-900 backdrop-blur">
              Only {product.stock} left
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={brandHref} className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500 transition hover:text-primary">
                {product.brand}
              </Link>
              <Link href={categoryHref} className="rounded-full bg-stone-100 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-stone-600 transition hover:bg-mist hover:text-primary">
                {product.category}
              </Link>
            </div>
            <Link href={productHref} className="mt-2 block text-base font-semibold leading-tight text-stone-900 transition hover:text-primary">
              {product.name}
            </Link>
          </div>
        </div>

        <p className="text-clamp-2 text-xs leading-5 text-stone-600">{product.description}</p>

        <div className="flex items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={12}
                  className={index < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}
                />
              ))}
            </div>
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>
          <span className="font-semibold uppercase tracking-[0.16em] text-primary">In stock</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-stone-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              {cartQuantity > 0 ? `${cartQuantity} in cart` : 'Quick add product'}
            </p>
          </div>

          {cartQuantity > 0 ? (
            <div className="inline-flex h-10 shrink-0 items-center rounded-full border border-primary/20 bg-mist p-1 text-primary">
              <button
                type="button"
                onClick={() => updateCartQuantity(product.slug, cartQuantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white"
                aria-label={`Decrease quantity for ${product.name}`}
                title="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-[2rem] text-center text-xs font-extrabold" aria-live="polite">
                {cartQuantity}
              </span>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white"
                aria-label={`Add more ${product.name}`}
                title="Add more"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-xs font-bold uppercase tracking-[0.2em] transition ${
                addedToCart
                  ? 'bg-primary text-white'
                  : 'border border-stone-200 bg-stone-50 text-stone-900 hover:border-primary hover:bg-primary hover:text-white'
              }`}
            >
              <ShoppingBag size={14} />
              {addedToCart ? 'Added' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
