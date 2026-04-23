'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, KeyRound, ShieldCheck, Smartphone } from 'lucide-react';
import Breadcrumbs from '../catalog/Breadcrumbs';
import { useStorefront } from './StorefrontProvider';

const benefits = [
  'Save addresses and checkout faster',
  'Track orders from your account page',
  'Switch between OTP and password login any time',
];

export default function LoginPageView() {
  const router = useRouter();
  const {
    demoOtp,
    isAuthenticated,
    pendingOtpTarget,
    sendOtp,
    loginWithOtp,
    loginWithPassword,
    user,
  } = useStorefront();
  const [mode, setMode] = useState('otp');
  const [otpForm, setOtpForm] = useState({
    name: '',
    identifier: pendingOtpTarget,
    otp: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    const result = sendOtp(otpForm.identifier);

    if (!result.ok) {
      setError(result.error);
      setMessage('');
      return;
    }

    setError('');
    setMessage(`OTP sent to ${otpForm.identifier}. Use demo code ${demoOtp}.`);
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    const result = loginWithOtp(otpForm);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError('');
    setMessage('');
    router.push('/account');
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const result = loginWithPassword(passwordForm);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError('');
    setMessage('');
    router.push('/account');
  };

  if (isAuthenticated && user) {
    return (
      <main className="container py-8 md:py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account', href: '/account' }, { label: 'Login' }]} />
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="surface-panel rounded-[34px] p-8 md:p-10">
            <span className="section-kicker">Signed in</span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
              Welcome back, {user.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
              Your account is active with {user.loginMethod.toLowerCase()}. You can review orders,
              head to the cart, or finish checkout from here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/account" className="btn-primary">
                Go to account
                <ArrowRight size={16} />
              </Link>
              <Link href="/cart" className="btn-secondary">View cart</Link>
              <Link href="/checkout" className="btn-secondary">Checkout</Link>
            </div>
          </section>

          <section className="surface-panel rounded-[34px] p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">Account status</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Email</p>
                <p className="mt-3 text-lg font-semibold text-stone-900">{user.email}</p>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">Phone</p>
                <p className="mt-3 text-lg font-semibold text-stone-900">{user.phone}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Login' }]} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="surface-panel rounded-[34px] p-8 md:p-10">
          <span className="section-kicker">Customer access</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none text-stone-900 md:text-6xl">
            Login with OTP or your password
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
            This storefront now includes both quick OTP access and a classic email/password login,
            so customers can enter the cart, account, and checkout flow from a real sign-in page.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck size={15} />
                </div>
                <p className="text-sm leading-6 text-stone-600">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-panel rounded-[34px] p-5 md:p-6">
          <div className="grid grid-cols-2 gap-2 rounded-[24px] bg-stone-100 p-2">
            <button
              type="button"
              onClick={() => {
                setMode('otp');
                setError('');
              }}
              className={`rounded-[18px] px-4 py-3 text-sm font-semibold transition ${
                mode === 'otp' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Smartphone size={15} />
                OTP login
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('password');
                setError('');
              }}
              className={`rounded-[18px] px-4 py-3 text-sm font-semibold transition ${
                mode === 'password' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <KeyRound size={15} />
                Password
              </span>
            </button>
          </div>

          {mode === 'otp' ? (
            <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4 rounded-[28px] border border-stone-200 bg-white p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-stone-700">
                  Full name
                  <input
                    type="text"
                    value={otpForm.name}
                    onChange={(event) => setOtpForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Avery Hart"
                    className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                  />
                </label>
                <label className="text-sm font-semibold text-stone-700">
                  Phone or email
                  <input
                    type="text"
                    value={otpForm.identifier}
                    onChange={(event) => setOtpForm((current) => ({ ...current, identifier: event.target.value }))}
                    placeholder="+1 800 555 0199"
                    className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <label className="text-sm font-semibold text-stone-700">
                  OTP code
                  <input
                    type="text"
                    value={otpForm.otp}
                    onChange={(event) => setOtpForm((current) => ({ ...current, otp: event.target.value }))}
                    placeholder="123456"
                    className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                  />
                </label>
                <button type="button" onClick={handleSendOtp} className="btn-secondary self-end">
                  Send OTP
                </button>
              </div>

              {message ? <p className="rounded-2xl bg-mist px-4 py-3 text-sm text-primary">{message}</p> : null}
              {error ? <p className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-700">{error}</p> : null}

              <button type="submit" className="btn-primary w-full">
                Continue with OTP
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4 rounded-[28px] border border-stone-200 bg-white p-6">
              <label className="block text-sm font-semibold text-stone-700">
                Email address
                <input
                  type="email"
                  value={passwordForm.email}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="you@shopease.com"
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <label className="block text-sm font-semibold text-stone-700">
                Password
                <input
                  type="password"
                  value={passwordForm.password}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="minimum 6 characters"
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <p className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-600">
                Demo password login accepts any email and a password with at least 6 characters.
              </p>
              {error ? <p className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-700">{error}</p> : null}

              <button type="submit" className="btn-primary w-full">
                Continue with password
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
