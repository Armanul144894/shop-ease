'use client';

import Link from 'next/link';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Breadcrumbs from '../catalog/Breadcrumbs';
import { useStorefront } from './StorefrontProvider';

function formatCurrency(value) {
  return `$${value}`;
}

export default function CartPageView() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    cartSavings,
    shippingTotal,
    taxTotal,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
  } = useStorefront();

  if (!cartItems.length) {
    return (
      <main className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
        <section className="mt-6 surface-panel rounded-[34px] p-8 text-center md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
            <ShoppingBag size={28} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            Your cart is empty
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Add products from any product card or product detail page, then come back here to review
            quantities before checkout.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Browse products
              <ArrowRight size={16} />
            </Link>
            <Link href="/brands" className="btn-secondary">Explore brands</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="surface-panel rounded-[34px] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="section-kicker">Cart</span>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
                {cartCount} items ready
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-stone-600">
              Update quantities, remove anything you are unsure about, and keep your checkout clean.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.slug}
                className="grid gap-5 rounded-[28px] border border-stone-200 bg-white p-5 md:grid-cols-[140px_1fr_auto]"
              >
                <Link href={item.path ?? `/${item.slug}`} className="overflow-hidden rounded-[22px] bg-stone-100">
                  <div className="aspect-[4/3]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                </Link>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/${item.brandSlug}`} className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 transition hover:text-primary">
                      {item.brand}
                    </Link>
                    <Link href={`/${item.categorySlug}`} className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                      {item.category}
                    </Link>
                  </div>
                  <Link href={item.path ?? `/${item.slug}`} className="mt-3 block text-xl font-semibold text-stone-900 transition hover:text-primary">
                    {item.name}
                  </Link>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.slug, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-white hover:text-primary"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.slug, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-white hover:text-primary"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.slug)}
                      className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-between gap-4 md:items-end">
                  <div className="text-left md:text-right">
                    <p className="text-2xl font-extrabold text-stone-900">{formatCurrency(item.lineTotal)}</p>
                    <p className="mt-1 text-sm text-stone-400 line-through">
                      {formatCurrency(item.lineOriginalTotal)}
                    </p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    {item.shipping}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Order summary</p>
            <div className="mt-6 space-y-4 text-sm text-stone-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Savings</span>
                <span className="font-semibold text-primary">-{formatCurrency(cartSavings)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shippingTotal === 0 ? 'Free' : formatCurrency(shippingTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated tax</span>
                <span className="font-semibold text-stone-900">{formatCurrency(taxTotal)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-600">Total</span>
                <span className="text-3xl font-extrabold text-stone-900">{formatCurrency(cartTotal)}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-500">
                Shipping becomes free automatically once your product subtotal reaches $250.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/checkout" className="btn-primary w-full">
                Continue to checkout
                <ArrowRight size={16} />
              </Link>
              <Link href="/products" className="btn-secondary w-full">Add more products</Link>
            </div>
          </section>

          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Need before checkout?</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
              <p>Use the login page if you want OTP or password access before you place the order.</p>
              <p>Account details and recent orders will be available automatically after checkout too.</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-primary">
                Login
              </Link>
              <Link href="/account" className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                Account
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
