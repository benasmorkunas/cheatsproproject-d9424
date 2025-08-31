import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { trackPlacedOrder } from '@/lib/klaviyo';
import type { OrderData, ProductItem } from '@/lib/klaviyo';

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerInfo, status, paymentIntentId, completedAt } = await request.json();
    
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }
    
    const ORDERS_DIR_PATH = path.join(process.cwd(), 'src', 'data', 'orders');
    const filename = `Order-${orderId}.json`;
    const filePath = path.join(ORDERS_DIR_PATH, filename);
    
    // Read existing order
    let existingOrder;
    try {
      const orderData = await fs.readFile(filePath, 'utf8');
      existingOrder = JSON.parse(orderData);
    } catch {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // Prepare updated metadata with customer information (excluding old order_id)
    const { order_id, ...cleanMetadata } = existingOrder.metadata || {};
    const updatedMetadata = {
      ...cleanMetadata,
    };

    // Add customer information to metadata if provided
    if (customerInfo?.email) {
      updatedMetadata.customer_email = customerInfo.email;
      updatedMetadata.customer_first_name = customerInfo.firstName;
      updatedMetadata.customer_last_name = customerInfo.lastName;
      updatedMetadata.customer_name = `${customerInfo.firstName} ${customerInfo.lastName}`;
    }

    // Update order with all new fields
    const updatedOrder = {
      ...existingOrder,
      customerInfo,
      status: status || existingOrder.status,
      updatedAt: new Date().toISOString(),
      metadata: updatedMetadata,
      ...(paymentIntentId && { paymentIntentId }),
      ...(completedAt && { completedAt }),
    };
    
    // Write back
    await fs.writeFile(filePath, JSON.stringify(updatedOrder, null, 2));

    // Track in Klaviyo if order is completed and has customer info (check both customerInfo and metadata)
    const customerEmail = updatedOrder.customerInfo?.email || updatedOrder.metadata?.customer_email;
    if (updatedOrder.status === 'completed' && customerEmail) {
      try {
        // Parse products from metadata
        let products: ProductItem[] = [];
        if (Array.isArray(updatedOrder.metadata.products)) {
          products = updatedOrder.metadata.products;
        } else if (typeof updatedOrder.metadata.products === 'string') {
          products = JSON.parse(updatedOrder.metadata.products);
        }

        const klaviyoOrderData: OrderData = {
          orderId: updatedOrder.id,
          customerInfo: {
            email: customerEmail,
            firstName: updatedOrder.customerInfo?.firstName || updatedOrder.metadata?.customer_first_name,
            lastName: updatedOrder.customerInfo?.lastName || updatedOrder.metadata?.customer_last_name,
            phone: updatedOrder.customerInfo?.phone,
          },
          products: products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            imageUrl: p.imageUrl,
            url: p.url,
            categories: p.categories,
          })),
          totalAmount: updatedOrder.amount,
          currency: updatedOrder.currency || 'usd',
          paymentIntentId: updatedOrder.paymentIntentId,
          isFirstTimePurchase: updatedOrder.metadata.isFirstTimePurchase || false,
          timestamp: updatedOrder.completedAt || updatedOrder.updatedAt,
        };

        await trackPlacedOrder(klaviyoOrderData);
        console.log(`Order ${orderId} completion tracked in Klaviyo successfully`);
      } catch (klaviyoError) {
        console.error('Error tracking completed order in Klaviyo:', klaviyoError);
        // Don't fail the order update if Klaviyo tracking fails
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}