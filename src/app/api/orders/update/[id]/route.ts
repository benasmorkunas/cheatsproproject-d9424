import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ORDERS_DIR_PATH = path.join(process.cwd(), 'src', 'data', 'orders');

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const updatedOrderData = await request.json();
    const filename = `Order-${orderId}.json`;
    const filePath = path.join(ORDERS_DIR_PATH, filename);
    
    console.log('Updating order:', orderId, 'with data:', updatedOrderData);
    
    // Check if order file exists
    let existingOrder;
    try {
      const orderData = await fs.readFile(filePath, 'utf8');
      existingOrder = JSON.parse(orderData);
      console.log('Found existing order:', existingOrder);
    } catch {
      console.log('Order not found:', orderId);
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 }
      );
    }
    
    // Update the order (simple merge)
    const updatedOrder = {
      ...existingOrder,
      ...updatedOrderData,
      updatedAt: new Date().toISOString(),
      // Merge metadata
      metadata: updatedOrderData.metadata 
        ? { ...existingOrder.metadata, ...updatedOrderData.metadata }
        : existingOrder.metadata,
    };
    
    console.log('Writing updated order:', updatedOrder);
    
    // Write updated order back to file
    await fs.writeFile(filePath, JSON.stringify(updatedOrder, null, 2));
    
    console.log('Order updated successfully');
    
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