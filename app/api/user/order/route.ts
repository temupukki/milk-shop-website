import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Validate session
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch orders for the current user
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        shipping: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders);
    
  } catch (error) {
    console.error('[ORDERS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}