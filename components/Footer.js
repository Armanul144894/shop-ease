'use client';

import { useState } from 'react';
import { ArrowRight, Instagram, Linkedin, Mail, MapPin, Phone, Send, Youtube } from 'lucide-react';

const footerLinks = {
  Explore: ['New arrivals', 'Brands', 'Home edit', 'Gift ideas', 'Flash sale'],
  Company: ['About ShopEase', 'Journal', 'Careers', 'Press room', 'Partnerships'],
  Service: ['Help center', 'Track your order', 'Returns', 'Shipping details', 'Contact'],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="mt-20 border-t border-stone-200 bg-[#10211d] text-stone-300">
      <div className="container py-16">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-primary/90 via-[#12433d] to-[#0d1a18] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                <Mail size={14} />
                Newsletter
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-white md:text-5xl">
                Get the next edit before it sells out
              </h2>
              <p className="mt-4 w-full text-sm leading-7 text-white/70 md:w-[30rem]">
                Weekly drop alerts, new brand launches, and room styling picks with a calmer inbox rhythm.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/35"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-stone-900 transition hover:bg-sand"
              >
                {subscribed ? 'Subscribed' : (
                  <>
                    <Send size={15} />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-10 pt-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#10211d]">
                <span className="font-display text-2xl font-bold leading-none">S</span>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-white">ShopEase</p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Studio store</p>
              </div>
            </div>
            <p className="mt-5 w-full text-sm leading-7 text-stone-400 md:w-[24rem]">
              A calmer storefront for design-led fashion, thoughtful tech, and home pieces that photograph beautifully and live well.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3 text-stone-300">
                <Phone size={15} className="text-white/70" />
                +1 800 123 4567
              </p>
              <p className="flex items-center gap-3 text-stone-300">
                <Mail size={15} className="text-white/70" />
                support@shopease.com
              </p>
              <p className="flex items-center gap-3 text-stone-300">
                <MapPin size={15} className="text-white/70" />
                123 Mercer Street, New York, NY
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">{title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <a key={link} href="#" className="inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-white">
                    <ArrowRight size={14} className="text-white/30" />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">Client services</p>
            <div className="mt-5 space-y-4 text-sm text-stone-300">
              <div>
                <p className="font-semibold text-white">Same-day dispatch</p>
                <p className="mt-1 text-stone-400">For select cities before 2pm local time.</p>
              </div>
              <div>
                <p className="font-semibold text-white">Verified brands only</p>
                <p className="mt-1 text-stone-400">Every partner is approved by our merchandising team.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 ShopEase. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
