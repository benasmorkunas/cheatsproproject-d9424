# Klaviyo Integration

This document describes the Klaviyo integration implemented in your e-commerce application.

## Overview

The Klaviyo integration provides comprehensive email marketing and customer tracking capabilities, including:

- **Server-side tracking** for reliable event capture
- **Client-side tracking** for real-time user behavior
- **Stripe webhook integration** for automatic order syncing
- **Customer profile management**
- **E-commerce event tracking**

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```env
# Klaviyo Configuration
KLAVIYO_API_KEY=pk_c96428a3c791cb4146c763ed6a2b32c9a3
NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY=WU3gFq
```

### Dependencies

The integration uses the following packages:
- `klaviyo-api` - Server-side Klaviyo API client

## Features

### 1. Automatic Order Tracking

Orders are automatically tracked in Klaviyo when:
- Order status is "completed"
- Customer email is provided
- Products are included in metadata

**Events tracked:**
- `Placed Order` - Complete purchase with product details

### 2. Stripe Webhook Integration

The webhook handler at `/api/webhooks/stripe` tracks these events:

**Payment Events:**
- `payment_intent.succeeded` → `Placed Order`
- `payment_intent.payment_failed` → `Payment Failed`
- `checkout.session.completed` → `Checkout Completed`

**Customer Events:**
- `customer.created` → `Customer Created`
- `customer.updated` → Profile update

**Subscription Events:**
- `customer.subscription.created` → `Subscription Created`
- `customer.subscription.updated` → `Subscription Updated`
- `customer.subscription.deleted` → `Subscription Cancelled`

**Other Events:**
- `invoice.payment_succeeded` → `Invoice Payment Succeeded`
- `invoice.payment_failed` → `Invoice Payment Failed`
- `charge.dispute.created` → `Dispute Created`

### 3. Client-Side Tracking

**Automatic tracking:**
- Page views (automatically tracked on route changes)
- Klaviyo script initialization

**Manual tracking functions:**
```typescript
import { 
  trackProductView, 
  trackAddToCart, 
  trackStartCheckout,
  identifyUser,
  trackCustomEvent 
} from '@/lib/klaviyo-client';

// Track product view
trackProductView(product, customerEmail);

// Track add to cart
trackAddToCart(product, customerEmail, cartTotal);

// Track checkout start
trackStartCheckout(products, customerEmail, totalValue);

// Identify user
identifyUser(email, { firstName, lastName });

// Custom events
trackCustomEvent('Custom Event Name', properties, customerEmail);
```

### 4. Server-Side API Endpoints

#### Track Events: `/api/klaviyo/track`
```typescript
POST /api/klaviyo/track
{
  "eventType": "viewed_product",
  "customerEmail": "customer@example.com",
  "product": {
    "id": 123,
    "name": "Product Name",
    "price": 19.99,
    "quantity": 1
  }
}
```

Supported event types:
- `viewed_product`
- `added_to_cart`
- `started_checkout`
- `custom`
- `update_profile`

#### Test Integration: `/api/klaviyo/test`
```bash
# Test with sample data
POST /api/klaviyo/test

# Check configuration
GET /api/klaviyo/test
```

## Data Structure

### Order Data
```typescript
interface OrderData {
  orderId: string;
  customerInfo: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  products: ProductItem[];
  totalAmount: number; // in cents
  currency: string;
  paymentIntentId?: string;
  isFirstTimePurchase: boolean;
  timestamp: string;
}
```

### Product Data
```typescript
interface ProductItem {
  id: string | number;
  name: string;
  price: string | number;
  quantity: number;
  imageUrl?: string;
  url?: string;
  categories?: string[];
}
```

## Integration Points

### 1. Order Creation
Orders are automatically tracked when created via `/api/orders` if:
- Status is "completed"
- Customer info is provided

### 2. Layout Integration
`KlaviyoProvider` component is added to the root layout for:
- Script initialization
- Automatic page view tracking

### 3. Webhook Configuration
Set up your Stripe webhook endpoint:
```
https://yoursite.com/api/webhooks/stripe
```

## Testing

### 1. Configuration Check
```bash
GET /api/klaviyo/test
```

### 2. Sample Order Test
```bash
POST /api/klaviyo/test
```

### 3. Manual Event Tracking
```bash
POST /api/klaviyo/track
{
  "eventType": "custom",
  "customerEmail": "test@example.com",
  "eventName": "Test Event",
  "properties": {
    "test": true
  }
}
```

## Monitoring

Events are logged to the console with format:
```
Tracked "Event Name" event for order: ORDER_ID
```

Errors are also logged with full error details for debugging.

## Best Practices

1. **Always include customer email** for proper tracking
2. **Use consistent product IDs** across your system
3. **Include product categories** for better segmentation
4. **Set up proper error handling** for failed API calls
5. **Test webhook integration** with Stripe CLI for development

## Klaviyo Dashboard Setup

After integration:

1. **Check Events** in Klaviyo → Analytics → Events
2. **Verify Profiles** are being created/updated
3. **Set up Email Flows** based on tracked events:
   - Welcome series for new customers
   - Abandoned cart recovery
   - Post-purchase follow-ups
   - Win-back campaigns

The integration provides all the necessary data for advanced segmentation and personalized email campaigns.