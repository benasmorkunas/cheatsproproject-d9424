import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { trackPlacedOrder, trackEvent, createOrUpdateProfile } from '@/lib/klaviyo';
import type { OrderData, ProductItem } from '@/lib/klaviyo';

// Environment variables - use fallbacks for build time
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_default';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_default';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
});

const endpointSecret = webhookSecret;

// Helper function to convert Stripe metadata to our order format
function convertStripeToOrderData(
  paymentIntent: Stripe.PaymentIntent,
  customer: Stripe.Customer | null
): OrderData | null {
  try {
    const metadata = paymentIntent.metadata;
    
    if (!metadata.order_id || !metadata.customer_email) {
      console.warn('Missing required metadata in payment intent:', paymentIntent.id);
      return null;
    }

    // Parse products from metadata
    let products: ProductItem[] = [];
    if (metadata.products) {
      try {
        const parsedProducts = JSON.parse(metadata.products);
        products = Array.isArray(parsedProducts) ? parsedProducts : [parsedProducts];
      } catch (error) {
        console.error('Error parsing products from metadata:', error);
      }
    }

    return {
      orderId: metadata.order_id,
      customerInfo: {
        email: metadata.customer_email,
        firstName: customer?.name ? customer.name.split(' ')[0] || '' : '',
        lastName: customer?.name ? customer.name.split(' ').slice(1).join(' ') || '' : '',
        phone: customer?.phone || undefined,
        properties: {
          customerId: customer?.id,
          billingAddress: customer?.address,
        },
      },
      products,
      totalAmount: paymentIntent.amount,
      currency: paymentIntent.currency,
      paymentIntentId: paymentIntent.id,
      isFirstTimePurchase: metadata.isFirstTimePurchase === 'true',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error converting Stripe data to order format:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  // Runtime validation for required environment variables
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_default') {
    return NextResponse.json({ error: 'Stripe configuration not available' }, { status: 503 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_default') {
    return NextResponse.json({ error: 'Webhook configuration not available' }, { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  console.log(`Processing Stripe webhook event: ${event.type}`);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Get customer details if available
        let customer: Stripe.Customer | null = null;
        if (paymentIntent.customer) {
          try {
            customer = await stripe.customers.retrieve(paymentIntent.customer as string) as Stripe.Customer;
          } catch (error) {
            console.error('Error retrieving customer:', error);
          }
        }

        // Convert to our order format and track in Klaviyo
        const orderData = convertStripeToOrderData(paymentIntent, customer);
        if (orderData) {
          await trackPlacedOrder(orderData);
          console.log(`Tracked "Placed Order" event for order: ${orderData.orderId}`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        if (paymentIntent.metadata.customer_email) {
          await trackEvent('Payment Failed', paymentIntent.metadata.customer_email, {
            PaymentIntentId: paymentIntent.id,
            OrderId: paymentIntent.metadata.order_id,
            Amount: paymentIntent.amount / 100,
            Currency: paymentIntent.currency.toUpperCase(),
            FailureReason: paymentIntent.last_payment_error?.message || 'Unknown error',
          });
          console.log(`Tracked "Payment Failed" event for payment intent: ${paymentIntent.id}`);
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.customer_details?.email) {
          // Create/update customer profile
          await createOrUpdateProfile({
            email: session.customer_details.email,
            firstName: session.customer_details.name ? session.customer_details.name.split(' ')[0] || '' : '',
            lastName: session.customer_details.name ? session.customer_details.name.split(' ').slice(1).join(' ') || '' : '',
            phone: session.customer_details.phone || undefined,
          });

          await trackEvent('Checkout Completed', session.customer_details.email, {
            SessionId: session.id,
            PaymentIntentId: session.payment_intent,
            Amount: session.amount_total ? session.amount_total / 100 : 0,
            Currency: session.currency?.toUpperCase() || 'USD',
            PaymentStatus: session.payment_status,
          });
          console.log(`Tracked "Checkout Completed" event for session: ${session.id}`);
        }
        break;
      }

      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer;
        
        if (customer.email) {
          await createOrUpdateProfile({
            email: customer.email,
            firstName: customer.name ? customer.name.split(' ')[0] || '' : '',
            lastName: customer.name ? customer.name.split(' ').slice(1).join(' ') || '' : '',
            phone: customer.phone || undefined,
            properties: {
              stripeCustomerId: customer.id,
              created: customer.created,
            },
          });

          await trackEvent('Customer Created', customer.email, {
            CustomerId: customer.id,
            CustomerName: customer.name,
            CreatedAt: new Date(customer.created * 1000).toISOString(),
          });
          console.log(`Tracked "Customer Created" event for customer: ${customer.id}`);
        }
        break;
      }

      case 'customer.updated': {
        const customer = event.data.object as Stripe.Customer;
        
        if (customer.email) {
          await createOrUpdateProfile({
            email: customer.email,
            firstName: customer.name ? customer.name.split(' ')[0] || '' : '',
            lastName: customer.name ? customer.name.split(' ').slice(1).join(' ') || '' : '',
            phone: customer.phone || undefined,
            properties: {
              stripeCustomerId: customer.id,
              updated: Math.floor(Date.now() / 1000),
            },
          });
          console.log(`Updated customer profile for customer: ${customer.id}`);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.customer_email) {
          await trackEvent('Invoice Payment Succeeded', invoice.customer_email, {
            InvoiceId: invoice.id,
            CustomerId: invoice.customer,
            Amount: invoice.amount_paid / 100,
            Currency: invoice.currency.toUpperCase(),
            SubscriptionId: (invoice as any).subscription || null,
          });
          console.log(`Tracked "Invoice Payment Succeeded" event for invoice: ${invoice.id}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.customer_email) {
          await trackEvent('Invoice Payment Failed', invoice.customer_email, {
            InvoiceId: invoice.id,
            CustomerId: invoice.customer,
            Amount: invoice.amount_due / 100,
            Currency: invoice.currency.toUpperCase(),
            SubscriptionId: (invoice as any).subscription || null,
            AttemptCount: invoice.attempt_count,
          });
          console.log(`Tracked "Invoice Payment Failed" event for invoice: ${invoice.id}`);
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get customer details
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
          if (customer.email) {
            await trackEvent('Subscription Created', customer.email, {
              SubscriptionId: subscription.id,
              CustomerId: customer.id,
              Status: subscription.status,
              PlanId: subscription.items.data[0]?.price?.id,
              PlanName: subscription.items.data[0]?.price?.nickname,
              Amount: subscription.items.data[0]?.price?.unit_amount ? subscription.items.data[0].price.unit_amount / 100 : 0,
              Currency: subscription.currency.toUpperCase(),
              BillingInterval: subscription.items.data[0]?.price?.recurring?.interval,
            });
            console.log(`Tracked "Subscription Created" event for subscription: ${subscription.id}`);
          }
        } catch (error) {
          console.error('Error processing subscription.created:', error);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
          if (customer.email) {
            await trackEvent('Subscription Updated', customer.email, {
              SubscriptionId: subscription.id,
              CustomerId: customer.id,
              Status: subscription.status,
              PlanId: subscription.items.data[0]?.price?.id,
              PlanName: subscription.items.data[0]?.price?.nickname,
              Amount: subscription.items.data[0]?.price?.unit_amount ? subscription.items.data[0].price.unit_amount / 100 : 0,
              Currency: subscription.currency.toUpperCase(),
            });
            console.log(`Tracked "Subscription Updated" event for subscription: ${subscription.id}`);
          }
        } catch (error) {
          console.error('Error processing subscription.updated:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
          if (customer.email) {
            await trackEvent('Subscription Cancelled', customer.email, {
              SubscriptionId: subscription.id,
              CustomerId: customer.id,
              Status: subscription.status,
              CancelledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
              EndedAt: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
            });
            console.log(`Tracked "Subscription Cancelled" event for subscription: ${subscription.id}`);
          }
        } catch (error) {
          console.error('Error processing subscription.deleted:', error);
        }
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        
        try {
          const charge = await stripe.charges.retrieve(dispute.charge as string);
          if (charge.receipt_email) {
            await trackEvent('Dispute Created', charge.receipt_email, {
              DisputeId: dispute.id,
              ChargeId: charge.id,
              Amount: dispute.amount / 100,
              Currency: dispute.currency.toUpperCase(),
              Reason: dispute.reason,
              Status: dispute.status,
            });
            console.log(`Tracked "Dispute Created" event for dispute: ${dispute.id}`);
          }
        } catch (error) {
          console.error('Error processing dispute.created:', error);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook event ${event.type}:`, error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}