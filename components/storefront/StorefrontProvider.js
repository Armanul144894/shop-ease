'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { catalogProducts } from '../../lib/catalog';

const STOREFRONT_KEY = 'shopease-storefront-v1';
const DEMO_OTP = '123456';

const productLookup = new Map(catalogProducts.map((product) => [product.slug, product]));

const starterOrderProducts = [
  catalogProducts[3],
  catalogProducts[17],
  catalogProducts[49],
].filter(Boolean);

const StorefrontContext = createContext(null);

const defaultState = {
  user: null,
  cart: [],
  orders: [],
  lastOrder: null,
  pendingOtpTarget: '',
};

const titleCase = (value) =>
  value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

function resolveCartItems(cart) {
  return cart
    .map((entry) => {
      const product = productLookup.get(entry.slug);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: entry.quantity,
        lineTotal: product.price * entry.quantity,
        lineOriginalTotal: product.originalPrice * entry.quantity,
      };
    })
    .filter(Boolean);
}

function buildCustomerProfile({
  name,
  email,
  phone,
  loginMethod,
  address,
}) {
  return {
    name,
    email,
    phone,
    loginMethod,
    memberSince: '2026',
    loyaltyTier: 'Studio Circle',
    address: address ?? {
      label: 'Primary address',
      line1: '123 Mercer Street',
      line2: 'Suite 4B',
      city: 'New York',
      region: 'NY',
      postalCode: '10012',
      country: 'United States',
    },
  };
}

function buildStarterOrders(profile) {
  const statuses = ['Delivered', 'In transit', 'Confirmed'];

  return starterOrderProducts.map((product, index) => {
    const quantity = index === 0 ? 1 : 2;
    const subtotal = product.price * quantity;
    const shipping = subtotal >= 250 ? 0 : 18;
    const tax = Math.round(subtotal * 0.08);
    const placedAt = new Date(Date.now() - (index + 2) * 86400000 * 6).toISOString();
    const eta = new Date(Date.parse(placedAt) + 86400000 * 4).toISOString();

    return {
      id: `SE-${6200 + index}`,
      status: statuses[index],
      placedAt,
      estimatedDelivery: eta,
      customer: profile,
      shippingAddress: profile.address,
      paymentMethod: index === 1 ? 'Cash on delivery' : 'Card ending in 2048',
      deliveryNote: index === 2 ? 'Leave at concierge desk.' : '',
      items: [
        {
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          image: product.image,
          quantity,
          price: product.price,
          lineTotal: subtotal,
        },
      ],
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
    };
  });
}

export function StorefrontProvider({ children }) {
  const [state, setState] = useState(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedState = window.localStorage.getItem(STOREFRONT_KEY);

      if (savedState) {
        setState({ ...defaultState, ...JSON.parse(savedState) });
      }
    } catch (error) {
      console.error('Failed to restore storefront state.', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(STOREFRONT_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  const cartItems = resolveCartItems(state.cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const cartOriginalSubtotal = cartItems.reduce((sum, item) => sum + item.lineOriginalTotal, 0);
  const cartSavings = cartOriginalSubtotal - cartSubtotal;
  const shippingTotal = cartItems.length ? (cartSubtotal >= 250 ? 0 : 18) : 0;
  const taxTotal = cartItems.length ? Math.round(cartSubtotal * 0.08) : 0;
  const cartTotal = cartSubtotal + shippingTotal + taxTotal;

  const addToCart = (product, quantity = 1) => {
    setState((current) => {
      const existingItem = current.cart.find((item) => item.slug === product.slug);

      if (existingItem) {
        return {
          ...current,
          cart: current.cart.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        ...current,
        cart: [...current.cart, { slug: product.slug, quantity }],
      };
    });
  };

  const updateCartQuantity = (slug, quantity) => {
    setState((current) => ({
      ...current,
      cart: current.cart
        .map((item) => (item.slug === slug ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    }));
  };

  const removeFromCart = (slug) => {
    setState((current) => ({
      ...current,
      cart: current.cart.filter((item) => item.slug !== slug),
    }));
  };

  const clearCart = () => {
    setState((current) => ({
      ...current,
      cart: [],
    }));
  };

  const sendOtp = (identifier) => {
    if (!identifier) {
      return { ok: false, error: 'Enter your phone or email first.' };
    }

    setState((current) => ({
      ...current,
      pendingOtpTarget: identifier,
    }));

    return { ok: true };
  };

  const loginWithOtp = ({ name, identifier, otp }) => {
    if (!identifier) {
      return { ok: false, error: 'Enter the phone or email you want to use.' };
    }

    if (otp !== DEMO_OTP) {
      return { ok: false, error: 'Use the demo code 123456 for this storefront.' };
    }

    const email = identifier.includes('@') ? identifier : `${identifier.replace(/\D/g, '')}@shopease.demo`;
    const phone = identifier.includes('@') ? '+1 (800) 555-0199' : identifier;
    const profile = buildCustomerProfile({
      name: name || 'Studio Shopper',
      email,
      phone,
      loginMethod: 'OTP login',
    });

    setState((current) => ({
      ...current,
      user: profile,
      orders: current.orders.length ? current.orders : buildStarterOrders(profile),
      pendingOtpTarget: '',
    }));

    return { ok: true };
  };

  const loginWithPassword = ({ email, password }) => {
    if (!email || !password) {
      return { ok: false, error: 'Enter both email and password.' };
    }

    if (password.length < 6) {
      return { ok: false, error: 'Use at least 6 characters for the demo password.' };
    }

    const displayName = titleCase(email.split('@')[0] || 'Studio Shopper');
    const profile = buildCustomerProfile({
      name: displayName,
      email,
      phone: '+1 (800) 555-0188',
      loginMethod: 'Password login',
    });

    setState((current) => ({
      ...current,
      user: profile,
      orders: current.orders.length ? current.orders : buildStarterOrders(profile),
      pendingOtpTarget: '',
    }));

    return { ok: true };
  };

  const logout = () => {
    setState((current) => ({
      ...current,
      user: null,
      pendingOtpTarget: '',
    }));
  };

  const completeCheckout = ({
    customer,
    shippingAddress,
    paymentMethod,
    deliveryNote,
  }) => {
    if (!cartItems.length) {
      return { ok: false, error: 'Your cart is empty.' };
    }

    const profile = state.user ?? buildCustomerProfile({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      loginMethod: 'Guest checkout',
      address: shippingAddress,
    });

    const placedAt = new Date().toISOString();
    const order = {
      id: `SE-${Math.floor(Date.now() / 1000).toString().slice(-6)}`,
      status: 'Confirmed',
      placedAt,
      estimatedDelivery: new Date(Date.now() + 86400000 * 4).toISOString(),
      customer: profile,
      shippingAddress,
      paymentMethod,
      deliveryNote,
      items: cartItems.map((item) => ({
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        lineTotal: item.lineTotal,
      })),
      subtotal: cartSubtotal,
      shipping: shippingTotal,
      tax: taxTotal,
      total: cartTotal,
    };

    setState((current) => ({
      ...current,
      user: profile,
      cart: [],
      orders: [order, ...current.orders],
      lastOrder: order,
    }));

    return { ok: true, order };
  };

  return (
    <StorefrontContext.Provider
      value={{
        ...state,
        isAuthenticated: Boolean(state.user),
        isHydrated,
        cartItems,
        cartCount,
        cartSubtotal,
        cartOriginalSubtotal,
        cartSavings,
        shippingTotal,
        taxTotal,
        cartTotal,
        demoOtp: DEMO_OTP,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        sendOtp,
        loginWithOtp,
        loginWithPassword,
        logout,
        completeCheckout,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error('useStorefront must be used inside StorefrontProvider.');
  }

  return context;
}
