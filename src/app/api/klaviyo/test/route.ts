import { NextRequest, NextResponse } from 'next/server';
import { trackPlacedOrder, createOrUpdateProfile, trackEvent } from '@/lib/klaviyo';
import type { OrderData } from '@/lib/klaviyo';

export async function POST(request: NextRequest) {
  try {
    // Sample order data based on your provided structure
    const sampleOrderData: OrderData = {
      orderId: "EG61VR",
      customerInfo: {
        email: "benasmorkunas@gmail.com",
        firstName: "Benas",
        lastName: "Morkunas",
      },
      products: [
        {
          id: 27535,
          name: "CS2 LITE VERSION",
          price: "3.99",
          quantity: 2,
        }
      ],
      totalAmount: 1477, // Amount in cents
      currency: "usd",
      paymentIntentId: "pi_3S1DY6DgNZJsmfkI22fttlfo",
      isFirstTimePurchase: false,
      timestamp: "2025-08-28T21:39:59.788Z",
    };

    // First try to create/update profile
    await createOrUpdateProfile(sampleOrderData.customerInfo);
    
    // Then track the event
    const result = await trackEvent('Placed Order', sampleOrderData.customerInfo.email, {
      OrderId: sampleOrderData.orderId,
      TotalAmount: sampleOrderData.totalAmount / 100,
      Currency: sampleOrderData.currency.toUpperCase(),
    });

    return NextResponse.json({
      success: true,
      message: 'Sample order tracked successfully in Klaviyo',
      klaviyoResponse: result,
      sampleData: sampleOrderData,
    });
  } catch (error) {
    console.error('Error testing Klaviyo integration:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to test Klaviyo integration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to verify configuration
export async function GET() {
  try {
    const hasApiKey = !!process.env.KLAVIYO_API_KEY;
    const hasPublicKey = !!process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY;
    
    return NextResponse.json({
      success: true,
      message: 'Klaviyo configuration check',
      config: {
        hasApiKey,
        hasPublicKey,
        apiKeyPrefix: process.env.KLAVIYO_API_KEY ? 
          process.env.KLAVIYO_API_KEY.substring(0, 8) + '...' : null,
        publicKey: process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Configuration check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}