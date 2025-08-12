import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const orderId = context.params.id;

  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID is required' },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    if (!body.status) {
      return NextResponse.json(
        { error: 'Status is required in the request body' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: body.status },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Failed to update order:', error);
    
    if (error instanceof Error && error.message.includes('RecordNotFound')) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}