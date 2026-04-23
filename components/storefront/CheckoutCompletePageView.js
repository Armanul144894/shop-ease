'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Package, Truck } from 'lucide-react';
import Breadcrumbs from '../catalog/Breadcrumbs';
import { useStorefront } from './StorefrontProvider';

function formatCurrency(value) {
  return `$${value}`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CheckoutCompletePageView() {
  const { lastOrder } = useStorefront();

  if (!lastOrder) {
    return (
      <main className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Checkout complete' }]} />
        <section className="mt-6 surface-panel rounded-[34px] p-8 text-center md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
            <Package size={28} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            No recent order yet
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Once an order is placed, this completion page will show the confirmation summary and delivery details.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/checkout" className="btn-primary">
              Return to checkout
              <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn-secondary">Browse products</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Checkout', href: '/checkout' }, { label: 'Complete' }]} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="surface-panel rounded-[34px] p-8 md:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
            <CheckCircle2 size={28} />
          </div>
          <span className="section-kicker mt-6">Order confirmed</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            Thank you for your order
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Your checkout flow is complete. We saved the order to your account and created a full
            confirmation section with payment, delivery, and line item details.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Order ID</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{lastOrder.id}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Placed on</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{formatDate(lastOrder.placedAt)}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Payment</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{lastOrder.paymentMethod}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Total</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{formatCurrency(lastOrder.total)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/account" className="btn-primary">
              Open account
              <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn-secondary">Continue shopping</Link>
          </div>
        </section>

        <section className="space-y-6">
          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-primary">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-stone-900">Delivery summary</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {lastOrder.shippingAddress.line1}
                  {lastOrder.shippingAddress.line2 ? `, ${lastOrder.shippingAddress.line2}` : ''}
                  <br />
                  {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.region} {lastOrder.shippingAddress.postalCode}
                  <br />
                  {lastOrder.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Ordered items</p>
            <div className="mt-6 space-y-4">
              {lastOrder.items.map((item) => (
                <div key={`${lastOrder.id}-${item.slug}`} className="flex items-center gap-4 rounded-[24px] border border-stone-200 bg-white p-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-[20px] object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-900">{item.name}</p>
                    <p className="mt-1 text-sm text-stone-500">
                      {item.brand} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-stone-900">{formatCurrency(item.lineTotal)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
