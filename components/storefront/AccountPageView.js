'use client';

import Link from 'next/link';
import { ArrowRight, LogOut, MapPin, Package, ShieldCheck, User } from 'lucide-react';
import Breadcrumbs from '../catalog/Breadcrumbs';
import { useStorefront } from './StorefrontProvider';

function formatMoney(value) {
  return `$${value}`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AccountPageView() {
  const { cartCount, isAuthenticated, logout, orders, user } = useStorefront();

  if (!isAuthenticated || !user) {
    return (
      <main className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
        <section className="mt-6 surface-panel rounded-[34px] p-8 text-center md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-primary">
            <User size={28} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            Account access starts with login
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Sign in with OTP or password to unlock saved details, order history, and checkout shortcuts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="btn-primary">
              Login now
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
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="surface-panel rounded-[34px] p-8 md:p-10">
          <span className="section-kicker">Account</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            {user.name}
          </h1>
          <p className="mt-5 text-base leading-8 text-stone-600">
            Your customer account is connected to the storefront cart and checkout, with login support
            for both OTP and password access.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Email</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{user.email}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Phone</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{user.phone}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Login method</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{user.loginMethod}</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Open cart items</p>
              <p className="mt-3 text-lg font-semibold text-stone-900">{cartCount}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cart" className="btn-primary">
              Open cart
              <ArrowRight size={16} />
            </Link>
            <Link href="/checkout" className="btn-secondary">Checkout</Link>
            <button type="button" onClick={logout} className="btn-secondary">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Saved address</p>
            <div className="mt-5 rounded-[28px] border border-stone-200 bg-white p-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-mist text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-stone-900">{user.address.label}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    {user.address.line1}
                    {user.address.line2 ? `, ${user.address.line2}` : ''}
                    <br />
                    {user.address.city}, {user.address.region} {user.address.postalCode}
                    <br />
                    {user.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Order history</p>
                <h2 className="mt-3 text-3xl font-semibold text-stone-900">Recent orders</h2>
              </div>
              <div className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-primary">
                {orders.length} orders
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <article key={order.id} className="rounded-[28px] border border-stone-200 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{order.id}</p>
                      <p className="mt-2 text-sm text-stone-500">Placed {formatDate(order.placedAt)}</p>
                    </div>
                    <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[22px] bg-stone-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Items</p>
                      <p className="mt-3 text-lg font-semibold text-stone-900">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                    </div>
                    <div className="rounded-[22px] bg-stone-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Payment</p>
                      <p className="mt-3 text-lg font-semibold text-stone-900">{order.paymentMethod}</p>
                    </div>
                    <div className="rounded-[22px] bg-stone-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">Total</p>
                      <p className="mt-3 text-lg font-semibold text-stone-900">{formatMoney(order.total)}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.slug}`} className="flex items-center gap-3 rounded-[20px] border border-stone-200 px-4 py-3">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-2xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-stone-900">{item.name}</p>
                          <p className="mt-1 text-sm text-stone-500">
                            {item.brand} x {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-stone-900">{formatMoney(item.lineTotal)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-stone-900">Storefront profile status</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  Member since {user.memberSince}, currently in the {user.loyaltyTier} tier with login,
                  cart, and checkout details synced in one place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
