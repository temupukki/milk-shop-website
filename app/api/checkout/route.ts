"use server"
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { items, total, shippingInfo } = await request.json();

    // Validate required shipping fields
    if (!shippingInfo?.name || !shippingInfo?.phone || !shippingInfo?.address) {
      return NextResponse.json(
        { message: 'Name, phone, and address are required' },
        { status: 400 }
      );
    }

    // Create the order with shipping information
    const order = await prisma.$transaction(async (tx) => {
      // Create the order first
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          total: total,
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
          shipping: {
            create: {
              name: shippingInfo.name,
              phone: shippingInfo.phone,
              address: shippingInfo.address,
            }
          }
        },
        include: {
          items: true,
          shipping: true,
        },
      });

      
     

      return newOrder;
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}