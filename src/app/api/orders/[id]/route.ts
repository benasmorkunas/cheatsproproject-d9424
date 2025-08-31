import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
// Temporarily disabled to fix Jest worker issue:
// import { trackPlacedOrder } from '@/lib/klaviyo';
// import type { OrderData, ProductItem } from '@/lib/klaviyo';

const ORDERS_DIR_PATH = path.join(process.cwd(), 'src', 'data', 'orders');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const filename = `Order-${orderId}.json`;
    const filePath = path.join(ORDERS_DIR_PATH, filename);
    
    // Check if order file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }
    
    // Read order file
    const orderData = await fs.readFile(filePath, 'utf8');
    const order = JSON.parse(orderData);
    
    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error reading order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch order',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function checkFirstTimePurchaseForUpdate(customerEmail: string, currentOrderId: string): Promise<boolean> {
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
        
        // Skip the current order being updated
        if (order.id === currentOrderId) continue;
        
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const updatedOrderData = await request.json();
    const filename = `Order-${orderId}.json`;
    const filePath = path.join(ORDERS_DIR_PATH, filename);
    
    // Check if order file exists
    let existingOrder;
    try {
      const orderData = await fs.readFile(filePath, 'utf8');
      existingOrder = JSON.parse(orderData);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }
    
    // If customer info is being added/updated, check for first-time purchase
    let updatedMetadata = existingOrder.metadata || {};
    if (updatedOrderData.customerInfo?.email) {
      const isFirstTimePurchase = await checkFirstTimePurchaseForUpdate(
        updatedOrderData.customerInfo.email,
        orderId
      );
      
      updatedMetadata = {
        ...updatedMetadata,
        isFirstTimePurchase: isFirstTimePurchase,
      };
    }
    
    // Update the order
    const updatedOrder = {
      ...existingOrder,
      ...updatedOrderData,
      metadata: updatedMetadata,
      updatedAt: new Date().toISOString(),
    };
    
    // Write updated order back to file
    await fs.writeFile(filePath, JSON.stringify(updatedOrder, null, 2));

    // Klaviyo tracking temporarily disabled to fix Jest worker issue
    // TODO: Re-enable Klaviyo integration once Jest worker issue is resolved
    if (updatedOrder.status === 'completed' && updatedOrder.customerInfo?.email) {
      console.log(`Order ${orderId} completed - Klaviyo tracking would happen here`);
    }
    
    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update order',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}