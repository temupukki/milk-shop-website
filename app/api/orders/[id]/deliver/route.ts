import { NextRequest, NextResponse } from 'next/server';
import prisma  from '@/lib/prisma'; // adjust if you use another path

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = params.id;

  try {
    const body = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: body.status }, // should be 'DELIVERED'
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
