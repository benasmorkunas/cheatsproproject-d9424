import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { trackPlacedOrder } from '@/lib/klaviyo';
import type { OrderData, ProductItem } from '@/lib/klaviyo';

const ORDERS_DIR_PATH = path.join(process.cwd(), 'src', 'data', 'orders');

export async function GET() {
  try {
    // Read all order files from the orders directory
    const files = await fs.readdir(ORDERS_DIR_PATH);
    const orderFiles = files.filter(file => file.startsWith('Order-') && file.endsWith('.json'));
    
    const orders = [];
    for (const file of orderFiles) {
      try {
        const filePath = path.join(ORDERS_DIR_PATH, file);
        const orderData = await fs.readFile(filePath, 'utf8');
        const order = JSON.parse(orderData);
        orders.push(order);
      } catch (error) {
        console.error(`Error reading order file ${file}:`, error);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error('Error reading orders:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function checkFirstTimePurchase(customerEmail: string): Promise<boolean> {
  if (!customerEmail) return true; // Assume first time if no email
  
  try {
    // Read all existing order files
    const files = await fs.readdir(ORDERS_DIR_PATH);
    const orderFiles = files.filter(file => file.startsWith('Order-') && file.endsWith('.json'));
    
    for (const file of orderFiles) {
      try {
        const filePath = path.join(ORDERS_DIR_PATH, file);
        const orderData = await fs.readFile(filePath, 'utf8');
        const order = JSON.parse(orderData);
        
        // Check if this email has made a completed purchase before
        if (order.customerInfo?.email === customerEmail && order.status === 'completed') {
          return false; // Not first time
        }
      } catch (error) {
        console.error(`Error reading order file ${file}:`, error);
      }
    }
    
    return true; // First time purchase
  } catch (error) {
    console.error('Error checking first-time purchase:', error);
    return true; // Default to first time if error
  }
}

export async function POST(request: NextRequest) {
  try {
    const newOrder = await request.json();
    
    // Generate order ID if not provided
    const orderId = newOrder.id || Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Extract products from metadata if available
    let products = [];
    if (newOrder.metadata?.products) {
      try {
        products = JSON.parse(newOrder.metadata.products);
      } catch (error) {
        console.error('Error parsing products from metadata:', error);
      }
    }
    
    // Check if first-time purchase (will be updated when customer info is added)
    const customerEmail = newOrder.customerInfo?.email || '';
    const isFirstTimePurchase = await checkFirstTimePurchase(customerEmail);
    
    // Enhanced metadata with products array and first-time flag (excluding order_id)
    const { order_id, ...cleanMetadata } = newOrder.metadata || {};
    const enhancedMetadata = {
      ...cleanMetadata,
      products: products, // Store as array instead of JSON string
      isFirstTimePurchase: isFirstTimePurchase,
      productCount: products.length,
    };
    
    // Add order with timestamp and unique ID
    const orderWithId = {
      ...newOrder,
      id: orderId,
      createdAt: new Date().toISOString(),
      metadata: enhancedMetadata,
    };
    
    // Create filename: Order-{orderId}.json
    const filename = `Order-${orderId}.json`;
    const filePath = path.join(ORDERS_DIR_PATH, filename);
    
    // Write order to individual file
    await fs.writeFile(filePath, JSON.stringify(orderWithId, null, 2));

    // Track order in Klaviyo if it's completed and has customer info
    if (orderWithId.status === 'completed' && orderWithId.customerInfo?.email) {
      try {
        const klaviyoOrderData: OrderData = {
          orderId: orderWithId.id,
          customerInfo: {
            email: orderWithId.customerInfo.email,
            firstName: orderWithId.customerInfo.firstName,
            lastName: orderWithId.customerInfo.lastName,
            phone: orderWithId.customerInfo.phone,
          },
          products: products.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            imageUrl: p.imageUrl,
            url: p.url,
            categories: p.categories,
          })),
          totalAmount: orderWithId.amount,
          currency: orderWithId.currency || 'usd',
          paymentIntentId: orderWithId.paymentIntentId,
          isFirstTimePurchase: isFirstTimePurchase,
          timestamp: orderWithId.createdAt,
        };

        await trackPlacedOrder(klaviyoOrderData);
        console.log(`Order ${orderId} tracked in Klaviyo successfully`);
      } catch (klaviyoError) {
        console.error('Error tracking order in Klaviyo:', klaviyoError);
        // Don't fail the order creation if Klaviyo tracking fails
      }
    }
    
    return NextResponse.json({
      success: true,
      data: orderWithId,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create order',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}