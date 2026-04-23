'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, CreditCard, Package, ShieldCheck, Truck } from 'lucide-react';
import Breadcrumbs from '../catalog/Breadcrumbs';
import { useStorefront } from './StorefrontProvider';

function formatCurrency(value) {
  return `$${value}`;
}

const paymentOptions = [
  'Card ending in 2048',
  'Apple Pay',
  'Cash on delivery',
];

export default function CheckoutPageView() {
  const router = useRouter();
  const {
    cartItems,
    cartSubtotal,
    shippingTotal,
    taxTotal,
    cartTotal,
    completeCheckout,
    isAuthenticated,
    user,
  } = useStorefront();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: paymentOptions[0],
    deliveryNote: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm((current) => ({
      ...current,
      name: user.name,
      email: user.email,
      phone: user.phone,
      line1: user.address?.line1 ?? '',
      line2: user.address?.line2 ?? '',
      city: user.address?.city ?? '',
      region: user.address?.region ?? '',
      postalCode: user.address?.postalCode ?? '',
      country: user.address?.country ?? 'United States',
    }));
  }, [user]);

  if (!cartItems.length) {
    return (
      <main className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Checkout' }]} />
        <section className="mt-6 surface-panel rounded-[34px] p-8 text-center md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
            <Package size={28} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            Checkout needs products first
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Add items into the cart, then come back here to finish shipping, payment, and order review.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Browse products
              <ArrowRight size={16} />
            </Link>
            <Link href="/cart" className="btn-secondary">Open cart</Link>
          </div>
        </section>
      </main>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.line1 || !form.city || !form.region || !form.postalCode) {
      setError('Complete the delivery form before placing your order.');
      return;
    }

    const result = completeCheckout({
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      shippingAddress: {
        label: 'Delivery address',
        line1: form.line1,
        line2: form.line2,
        city: form.city,
        region: form.region,
        postalCode: form.postalCode,
        country: form.country,
      },
      paymentMethod: form.paymentMethod,
      deliveryNote: form.deliveryNote,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError('');
    router.push('/checkout/complete');
  };

  return (
    <main className="container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="section-kicker">Checkout</span>
                <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
                  Complete your order
                </h1>
              </div>
              {!isAuthenticated ? (
                <Link href="/login" className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-primary">
                  Login for saved details
                </Link>
              ) : null}
            </div>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
              Finish delivery, payment, and account details in one place. If you are not signed in, the
              checkout will still create a usable customer profile for the account page.
            </p>
          </section>

          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-primary" />
              <p className="text-lg font-semibold text-stone-900">Delivery details</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-stone-700">
                Full name
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
              <label className="text-sm font-semibold text-stone-700">
                Email address
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
              <label className="text-sm font-semibold text-stone-700">
                Phone number
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
              <label className="text-sm font-semibold text-stone-700">
                Country
                <input
                  type="text"
                  value={form.country}
                  onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block text-sm font-semibold text-stone-700">
                Address line 1
                <input
                  type="text"
                  value={form.line1}
                  onChange={(event) => setForm((current) => ({ ...current, line1: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
              <label className="block text-sm font-semibold text-stone-700">
                Address line 2
                <input
                  type="text"
                  value={form.line2}
                  onChange={(event) => setForm((current) => ({ ...current, line2: event.target.value }))}
                  placeholder="Apartment, suite, or landmark"
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="text-sm font-semibold text-stone-700">
                City
                <input
                  type="text"
                  value={form.city}
                  onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
              <label className="text-sm font-semibold text-stone-700">
                State / region
                <input
                  type="text"
                  value={form.region}
                  onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
              <label className="text-sm font-semibold text-stone-700">
                Postal code
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(event) => setForm((current) => ({ ...current, postalCode: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>
            </div>
          </section>

          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-primary" />
              <p className="text-lg font-semibold text-stone-900">Payment</p>
            </div>

            <div className="mt-6 grid gap-3">
              {paymentOptions.map((option) => (
                <label
                  key={option}
                  className={`rounded-[24px] border px-5 py-4 text-sm font-semibold transition ${
                    form.paymentMethod === option
                      ? 'border-primary bg-mist text-primary'
                      : 'border-stone-200 bg-white text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option}
                    checked={form.paymentMethod === option}
                    onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value }))}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>

            <label className="mt-5 block text-sm font-semibold text-stone-700">
              Delivery note
              <textarea
                value={form.deliveryNote}
                onChange={(event) => setForm((current) => ({ ...current, deliveryNote: event.target.value }))}
                rows={4}
                placeholder="Entry code, concierge note, or preferred delivery window"
                className="mt-2 w-full rounded-[24px] border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            {error ? <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-700">{error}</p> : null}
          </section>
        </form>

        <aside className="space-y-6">
          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Order review</p>
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.slug} className="flex items-center gap-4 rounded-[24px] border border-stone-200 bg-white p-4">
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

            <div className="mt-6 space-y-4 text-sm text-stone-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shippingTotal === 0 ? 'Free' : formatCurrency(shippingTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span className="font-semibold text-stone-900">{formatCurrency(taxTotal)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-600">Total</span>
                <span className="text-3xl font-extrabold text-stone-900">{formatCurrency(cartTotal)}</span>
              </div>
            </div>

          </section>

          <section className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-stone-900">Checkout coverage</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  This page now covers shipping, payment selection, and final order confirmation in the
                  same storefront flow.
                </p>
              </div>
            </div>
            <button type="submit" form="checkout-form" className="btn-primary mt-6 w-full">
              Place order
              <ArrowRight size={16} />
            </button>
            <Link href="/cart" className="btn-secondary mt-3 w-full">Back to cart</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
