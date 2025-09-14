import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_51234567890abcdef') {
  console.warn('Stripe is not configured with valid keys. Using mock mode.');
}

const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_51234567890abcdef'
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', orderId, customerInfo, productIds } = await request.json();

    if (!amount || amount < 50) { // Stripe minimum is $0.50
      return NextResponse.json(
        {
          success: false,
          message: 'Amount must be at least $0.50',
        },
        { status: 400 }
      );
    }

    // If Stripe is not configured, return mock payment intent
    if (!stripe) {
      console.log('Mock payment intent created for order:', orderId);
      return NextResponse.json({
        success: true,
        clientSecret: `pi_mock_${orderId}_secret_${Date.now()}`,
        paymentIntentId: `pi_mock_${orderId}_${Date.now()}`,
        message: 'Mock payment intent created (Stripe not configured)',
      });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: orderId,
        product_id: productIds || '',
        customer_email: customerInfo?.email || '',
        customer_name: `${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Check if it's a Stripe authentication error
    if (error instanceof Error && error.message.includes('Invalid API key')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Stripe API key is invalid. Please check your environment variables.',
          error: 'Invalid Stripe API key configuration',
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create payment intent',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}