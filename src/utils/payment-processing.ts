import type { Stripe, StripeElements, PaymentIntent } from '@stripe/stripe-js';

export interface PaymentResult {
  success: boolean;
  paymentIntent?: PaymentIntent;
  error?: string;
  requiresAction?: boolean;
}

export interface OrderData {
  orderId: string;
  amount: number;
  currency: string;
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface PaymentMetadata {
  orderId: string;
  customerEmail: string;
  productIds: string;
  totalAmount: number;
}

/**
 * Creates a payment intent on the server
 */
export const createPaymentIntent = async (orderData: OrderData): Promise<{
  clientSecret: string;
  orderId: string;
}> => {
  try {
    // Create order first
    const orderResponse = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: orderData.amount,
        currency: orderData.currency,
        automatic_payment_methods: { enabled: true },
        metadata: {
          customer_email: orderData.customerInfo.email,
          products: JSON.stringify(orderData.items)
        },
        timestamp: new Date().toISOString(),
        status: 'incomplete',
        customerInfo: orderData.customerInfo
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create order');
    }

    const orderResult = await orderResponse.json();

    // Create payment intent
    const productIds = orderData.items.map(item => item.id).join(',');
    const paymentResponse = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: orderData.amount,
        currency: orderData.currency,
        orderId: orderResult.data.id,
        productIds,
        metadata: {
          orderId: orderResult.data.id,
          customerEmail: orderData.customerInfo.email,
          productIds,
          totalAmount: orderData.amount
        }
      }),
    });

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create payment intent');
    }

    const paymentResult = await paymentResponse.json();

    return {
      clientSecret: paymentResult.clientSecret,
      orderId: orderResult.data.id
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Confirms a payment with Stripe
 */
export const confirmPayment = async (
  stripe: Stripe,
  elements: StripeElements,
  clientSecret: string,
  customerInfo: OrderData['customerInfo'],
  orderId: string,
  returnUrl?: string
): Promise<PaymentResult> => {
  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl || `${window.location.origin}/thank-you?order=${orderId}`,
        receipt_email: customerInfo.email,
        payment_method_data: {
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        },
      },
      redirect: 'if_required',
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Payment failed',
        requiresAction: error.type === 'card_error' && error.code === 'authentication_required'
      };
    }

    if (paymentIntent) {
      return {
        success: paymentIntent.status === 'succeeded',
        paymentIntent,
        requiresAction: paymentIntent.status === 'requires_action'
      };
    }

    return {
      success: false,
      error: 'Unknown payment error occurred'
    };
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during payment processing'
    };
  }
};

/**
 * Updates order status on the server
 */
export const updateOrderStatus = async (
  orderId: string,
  status: 'processing' | 'completed' | 'failed',
  customerInfo?: OrderData['customerInfo'],
  paymentIntentId?: string
): Promise<boolean> => {
  try {
    const updateData: any = {
      orderId,
      status
    };

    if (customerInfo) {
      updateData.customerInfo = customerInfo;
    }

    if (paymentIntentId) {
      updateData.paymentIntentId = paymentIntentId;
      updateData.completedAt = new Date().toISOString();
    }

    const response = await fetch('/api/test-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

/**
 * Handles the complete payment process
 */
export const processPayment = async (
  stripe: Stripe,
  elements: StripeElements,
  orderData: OrderData,
  clientSecret: string,
  onProgress?: (step: string) => void
): Promise<PaymentResult> => {
  try {
    if (onProgress) onProgress('Updating order information...');

    // Update order with customer information
    const orderUpdateSuccess = await updateOrderStatus(
      orderData.orderId,
      'processing',
      orderData.customerInfo
    );

    if (!orderUpdateSuccess) {
      console.warn('Failed to update order information, but continuing with payment...');
    }

    if (onProgress) onProgress('Processing payment...');

    // Confirm payment
    const paymentResult = await confirmPayment(
      stripe,
      elements,
      clientSecret,
      orderData.customerInfo,
      orderData.orderId
    );

    if (paymentResult.success && paymentResult.paymentIntent) {
      if (onProgress) onProgress('Finalizing order...');

      // Complete the order
      const completionSuccess = await updateOrderStatus(
        orderData.orderId,
        'completed',
        undefined,
        paymentResult.paymentIntent.id
      );

      if (!completionSuccess) {
        console.error('Failed to complete order, but payment was successful');
      }
    } else if (!paymentResult.success) {
      // Mark order as failed
      await updateOrderStatus(orderData.orderId, 'failed');
    }

    return paymentResult;
  } catch (error) {
    console.error('Payment processing error:', error);
    
    // Mark order as failed
    await updateOrderStatus(orderData.orderId, 'failed');
    
    return {
      success: false,
      error: 'An unexpected error occurred during payment processing'
    };
  }
};

/**
 * Formats payment amounts (converts cents to dollars)
 */
export const formatPaymentAmount = (amountInCents: number): string => {
  return (amountInCents / 100).toFixed(2);
};

/**
 * Converts dollar amount to cents for Stripe
 */
export const convertToCents = (dollarAmount: number): number => {
  return Math.round(dollarAmount * 100);
};

/**
 * Validates payment amount
 */
export const validatePaymentAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 999999.99; // Stripe limit
};

/**
 * Gets payment method details from Stripe elements
 */
export const getPaymentMethodDetails = async (
  stripe: Stripe,
  elements: StripeElements
): Promise<{
  paymentMethod?: any;
  error?: string;
}> => {
  try {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });

    if (error) {
      return { error: error.message };
    }

    return { paymentMethod };
  } catch (error) {
    return { error: 'Failed to retrieve payment method details' };
  }
};

/**
 * Handles payment method setup for future use
 */
export const setupPaymentMethod = async (
  stripe: Stripe,
  elements: StripeElements,
  customerId: string
): Promise<{
  setupIntent?: any;
  error?: string;
}> => {
  try {
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/account/payment-methods`,
      },
      redirect: 'if_required',
    });

    if (error) {
      return { error: error.message };
    }

    return { setupIntent };
  } catch (error) {
    return { error: 'Failed to setup payment method' };
  }
};

/**
 * Calculates tax amount (if needed)
 */
export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return Math.round(subtotal * taxRate * 100) / 100;
};

/**
 * Applies discount to order total
 */
export const applyDiscount = (
  subtotal: number,
  discount: { type: 'percentage' | 'fixed'; amount: number }
): number => {
  if (discount.type === 'percentage') {
    return Math.max(0, subtotal - (subtotal * discount.amount / 100));
  } else {
    return Math.max(0, subtotal - discount.amount);
  }
};

/**
 * Handles payment retry logic
 */
export const retryPayment = async (
  stripe: Stripe,
  elements: StripeElements,
  orderData: OrderData,
  clientSecret: string,
  maxRetries: number = 3
): Promise<PaymentResult> => {
  let lastError = '';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await processPayment(stripe, elements, orderData, clientSecret);
      
      if (result.success) {
        return result;
      }
      
      lastError = result.error || 'Payment failed';
      
      // Don't retry for certain types of errors
      if (result.error?.includes('card_declined') || result.error?.includes('insufficient_funds')) {
        break;
      }
      
      // Wait before retrying
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    } catch (error) {
      lastError = 'Payment processing failed';
    }
  }
  
  return {
    success: false,
    error: lastError || 'Payment failed after multiple attempts'
  };
};

// Export types
export type { Stripe, StripeElements, PaymentIntent };