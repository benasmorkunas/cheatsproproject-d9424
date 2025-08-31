'use client';

import type { ProductItem } from './klaviyo';

// Client-side Klaviyo tracking using the public API key
const KLAVIYO_PUBLIC_KEY = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY;

// Initialize Klaviyo client-side tracking
export function initKlaviyoTracking() {
  if (typeof window === 'undefined' || !KLAVIYO_PUBLIC_KEY) return;

  // Load Klaviyo tracking script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=' + KLAVIYO_PUBLIC_KEY;
  document.head.appendChild(script);

  // Initialize Klaviyo once loaded
  script.onload = () => {
    if (window.klaviyo) {
      window.klaviyo.init({
        account: KLAVIYO_PUBLIC_KEY,
      });
    }
  };
}

// Identify user for Klaviyo tracking
export function identifyUser(email: string, properties: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  window.klaviyo.identify({
    email,
    ...properties,
  });
}

// Track page view
export function trackPageView(pageName?: string) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  window.klaviyo.track('Viewed Page', {
    page: pageName || document.title,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

// Track product view
export function trackProductView(product: ProductItem, customerEmail?: string) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  const properties = {
    ProductID: product.id,
    ProductName: product.name,
    ItemPrice: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    ProductURL: product.url || window.location.href,
    ImageURL: product.imageUrl,
    Categories: product.categories || [],
    timestamp: new Date().toISOString(),
  };

  if (customerEmail) {
    identifyUser(customerEmail);
  }

  window.klaviyo.track('Viewed Product', properties);
}

// Track add to cart
export function trackAddToCart(product: ProductItem, customerEmail?: string, cartTotal?: number) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  const properties = {
    ProductID: product.id,
    ProductName: product.name,
    Quantity: product.quantity,
    ItemPrice: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    ProductURL: product.url || window.location.href,
    ImageURL: product.imageUrl,
    Categories: product.categories || [],
    CartTotal: cartTotal,
    timestamp: new Date().toISOString(),
  };

  if (customerEmail) {
    identifyUser(customerEmail);
  }

  window.klaviyo.track('Added to Cart', properties);
}

// Track started checkout
export function trackStartCheckout(products: ProductItem[], customerEmail?: string, totalValue?: number) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  const properties = {
    ItemNames: products.map(p => p.name),
    CheckoutURL: window.location.href,
    TotalValue: totalValue,
    Items: products.map(product => ({
      ProductID: product.id,
      ProductName: product.name,
      Quantity: product.quantity,
      ItemPrice: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      RowTotal: (typeof product.price === 'string' ? parseFloat(product.price) : product.price) * product.quantity,
      ProductURL: product.url,
      ImageURL: product.imageUrl,
      Categories: product.categories || [],
    })),
    timestamp: new Date().toISOString(),
  };

  if (customerEmail) {
    identifyUser(customerEmail);
  }

  window.klaviyo.track('Started Checkout', properties);
}

// Track custom event
export function trackCustomEvent(eventName: string, properties: Record<string, any> = {}, customerEmail?: string) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  if (customerEmail) {
    identifyUser(customerEmail);
  }

  window.klaviyo.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
}

// Track form submission
export function trackFormSubmission(formName: string, customerEmail?: string, additionalProperties: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  const properties = {
    FormName: formName,
    URL: window.location.href,
    ...additionalProperties,
    timestamp: new Date().toISOString(),
  };

  if (customerEmail) {
    identifyUser(customerEmail);
  }

  window.klaviyo.track('Submitted Form', properties);
}

// Subscribe to newsletter
export function subscribeToNewsletter(email: string, listId?: string, properties: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.klaviyo) return;

  // Identify the user first
  identifyUser(email, properties);

  // Track subscription event
  window.klaviyo.track('Newsletter Signup', {
    email,
    ListId: listId,
    Source: window.location.href,
    ...properties,
    timestamp: new Date().toISOString(),
  });
}

// Declare global Klaviyo interface for TypeScript
declare global {
  interface Window {
    klaviyo?: {
      init: (config: { account: string }) => void;
      identify: (properties: Record<string, any>) => void;
      track: (eventName: string, properties?: Record<string, any>) => void;
      push: (args: any[]) => void;
    };
  }
}