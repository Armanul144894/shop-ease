'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useStorefront } from './StorefrontProvider';

export default function ProductPurchaseActions({ product }) {
  const router = useRouter();
  const { addToCart } = useStorefront();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const handleCheckoutNow = () => {
    addToCart(product);
    router.push('/checkout');
  };

  return (
    <div className="mt-8 space-y-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn-primary ${added ? 'bg-primary' : ''}`}
        >
          <ShoppingBag size={16} />
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
        <button type="button" onClick={handleCheckoutNow} className="btn-secondary">
          Checkout now
          <ArrowRight size={16} />
        </button>
      </div>
      <p className="text-sm text-stone-500">
        Add this item to your cart, or jump straight into checkout from the product page.
      </p>
    </div>
  );
}
