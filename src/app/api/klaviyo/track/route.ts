import { NextRequest, NextResponse } from 'next/server';
import { 
  trackEvent, 
  trackAddedToCart, 
  trackViewedProduct, 
  trackStartedCheckout,
  createOrUpdateProfile 
} from '@/lib/klaviyo';
import type { ProductItem, CustomerProfile } from '@/lib/klaviyo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, customerEmail, ...eventData } = body;

    if (!eventType || !customerEmail) {
      return NextResponse.json(
        { error: 'eventType and customerEmail are required' },
        { status: 400 }
      );
    }

    switch (eventType) {
      case 'viewed_product': {
        const { product } = eventData as { product: ProductItem };
        if (!product) {
          return NextResponse.json(
            { error: 'product data is required for viewed_product event' },
            { status: 400 }
          );
        }
        await trackViewedProduct(customerEmail, product);
        break;
      }

      case 'added_to_cart': {
        const { product, cartTotal } = eventData as { product: ProductItem; cartTotal?: number };
        if (!product) {
          return NextResponse.json(
            { error: 'product data is required for added_to_cart event' },
            { status: 400 }
          );
        }
        await trackAddedToCart(customerEmail, product, cartTotal);
        break;
      }

      case 'started_checkout': {
        const { products, totalAmount, currency } = eventData as {
          products: ProductItem[];
          totalAmount: number;
          currency?: string;
        };
        if (!products || !Array.isArray(products)) {
          return NextResponse.json(
            { error: 'products array is required for started_checkout event' },
            { status: 400 }
          );
        }
        await trackStartedCheckout(customerEmail, products, totalAmount, currency);
        break;
      }

      case 'custom': {
        const { eventName, properties } = eventData as {
          eventName: string;
          properties?: Record<string, any>;
        };
        if (!eventName) {
          return NextResponse.json(
            { error: 'eventName is required for custom events' },
            { status: 400 }
          );
        }
        await trackEvent(eventName, customerEmail, properties);
        break;
      }

      case 'update_profile': {
        const { customerInfo } = eventData as { customerInfo: CustomerProfile };
        if (!customerInfo) {
          return NextResponse.json(
            { error: 'customerInfo is required for update_profile event' },
            { status: 400 }
          );
        }
        await createOrUpdateProfile(customerInfo);
        break;
      }

      default:
        return NextResponse.json(
          { error: `Unsupported event type: ${eventType}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Error tracking Klaviyo event:', error);
    return NextResponse.json(
      {
        error: 'Failed to track event',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}