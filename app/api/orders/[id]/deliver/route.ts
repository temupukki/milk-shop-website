import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const orderId = context.params.id;

  try {
    const body = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: body.status }, // e.g. 'DELIVERED'
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
