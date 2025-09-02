import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';

// Initialize Klaviyo API client
const session = new ApiKeySession(process.env.KLAVIYO_API_KEY!);
const eventsApi = new EventsApi(session);
const profilesApi = new ProfilesApi(session);

export interface CustomerProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  properties?: Record<string, any>;
}

export interface ProductItem {
  id: string | number;
  name: string;
  price: string | number;
  quantity: number;
  imageUrl?: string;
  url?: string;
  categories?: string[];
}

export interface OrderData {
  orderId: string;
  customerInfo: CustomerProfile;
  products: ProductItem[];
  totalAmount: number;
  currency: string;
  paymentIntentId?: string;
  isFirstTimePurchase: boolean;
  timestamp: string;
}

// Create or update customer profile in Klaviyo
export async function createOrUpdateProfile(customer: CustomerProfile) {
  try {
    const profileData = {
      type: 'profile' as const,
      attributes: {
        email: customer.email,
        first_name: customer.firstName,
        last_name: customer.lastName,
        phone_number: customer.phone,
        properties: customer.properties || {},
      },
    };

    const response = await profilesApi.createProfile({
      data: profileData,
    });

    return response.body?.data || response.body;
  } catch (error) {
    console.error('Error creating/updating Klaviyo profile:', error);
    throw error;
  }
}

// Track custom event in Klaviyo
export async function trackEvent(
  eventName: string,
  customerEmail: string,
  properties: Record<string, any> = {}
) {
  try {
    const eventData = {
      type: 'event' as const,
      attributes: {
        metric: {
          data: {
            type: 'metric' as const,
            attributes: {
              name: eventName,
            },
          },
        },
        profile: {
          data: {
            type: 'profile' as const,
            attributes: {
              email: customerEmail,
            },
          },
        },
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
        },
        time: new Date(),
      },
    };

    const response = await eventsApi.createEvent({
      data: eventData,
    });

    return response.body?.data || response.body;
  } catch (error) {
    console.error(`Error tracking Klaviyo event "${eventName}":`, error);
    throw error;
  }
}

// Track "Placed Order" event
export async function trackPlacedOrder(orderData: OrderData) {
  try {
    // First, create/update the customer profile
    await createOrUpdateProfile(orderData.customerInfo);

    // Prepare order properties for Klaviyo
    const orderProperties = {
      $event_id: `order_${orderData.orderId}_${Date.now()}`,
      $value: orderData.totalAmount / 100, // Convert cents to dollars
      OrderId: orderData.orderId,
      Categories: orderData.products.map(p => p.categories || []).flat(),
      ItemNames: orderData.products.map(p => p.name),
      Items: orderData.products.map(product => ({
        ProductID: product.id,
        ProductName: product.name,
        Quantity: product.quantity,
        ItemPrice: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        RowTotal: (typeof product.price === 'string' ? parseFloat(product.price) : product.price) * product.quantity,
        ProductURL: product.url,
        ImageURL: product.imageUrl,
        Categories: product.categories || [],
      })),
      PaymentIntentId: orderData.paymentIntentId,
      IsFirstTimePurchase: orderData.isFirstTimePurchase,
      Currency: orderData.currency.toUpperCase(),
      BillingAddress: orderData.customerInfo.properties?.billingAddress,
      ShippingAddress: orderData.customerInfo.properties?.shippingAddress,
    };

    return await trackEvent('Placed Order', orderData.customerInfo.email, orderProperties);
  } catch (error) {
    console.error('Error tracking placed order:', error);
    throw error;
  }
}

// Track "Started Checkout" event
export async function trackStartedCheckout(
  customerEmail: string,
  products: ProductItem[],
  totalAmount: number,
  currency: string = 'usd'
) {
  const properties = {
    $event_id: `checkout_started_${Date.now()}`,
    $value: totalAmount / 100,
    ItemNames: products.map(p => p.name),
    CheckoutURL: typeof window !== 'undefined' ? window.location.href : '',
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
    Currency: currency.toUpperCase(),
  };

  return await trackEvent('Started Checkout', customerEmail, properties);
}

// Track "Added to Cart" event
export async function trackAddedToCart(
  customerEmail: string,
  product: ProductItem,
  cartTotal?: number
) {
  const properties = {
    $event_id: `added_to_cart_${product.id}_${Date.now()}`,
    $value: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    ProductID: product.id,
    ProductName: product.name,
    Quantity: product.quantity,
    ItemPrice: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    ProductURL: product.url,
    ImageURL: product.imageUrl,
    Categories: product.categories || [],
    CartTotal: cartTotal ? cartTotal / 100 : undefined,
  };

  return await trackEvent('Added to Cart', customerEmail, properties);
}

// Track "Viewed Product" event
export async function trackViewedProduct(
  customerEmail: string,
  product: ProductItem
) {
  const properties = {
    $event_id: `viewed_product_${product.id}_${Date.now()}`,
    ProductID: product.id,
    ProductName: product.name,
    ItemPrice: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    ProductURL: product.url,
    ImageURL: product.imageUrl,
    Categories: product.categories || [],
  };

  return await trackEvent('Viewed Product', customerEmail, properties);
}

export { eventsApi, profilesApi };