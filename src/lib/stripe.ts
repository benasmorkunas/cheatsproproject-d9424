import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  {
    // Allow payment method auto-fill in development environment
    ...(process.env.NODE_ENV === 'development' && {
      stripeAccount: undefined,
      locale: 'en',
    })
  }
);