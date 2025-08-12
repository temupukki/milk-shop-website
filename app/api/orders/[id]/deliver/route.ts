import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = params.id;

  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID is required' },
      { status: 400 }
    );
  }

  try {
    // Validate the request body
    const body = await req.json();
    if (!body.status || body.status !== 'DELIVERED') {
      return NextResponse.json(
        { error: 'Status must be set to "DELIVERED"' },
        { status: 400 }
      );
    }

    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: 'DELIVERED',
       
      },
    });

    return NextResponse.json({ 
      success: true, 
      order: updatedOrder 
    });
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}