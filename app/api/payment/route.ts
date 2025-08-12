import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { toast } from 'sonner';

export async function POST(request: Request) {
  try {
    // Verify user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Validate request body
    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing required field: orderId' },
        { status: 400 }
      );
    }

    // Fetch order and shipping info from database
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: session.user.id // Ensure user owns this order
      },
      include: {
        shipping: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or unauthorized' },
        { status: 404 }
      );
    }

    if (!order.shipping) {
      return NextResponse.json(
        { error: 'Shipping information missing for this order' },
        { status: 400 }
      );
    }

    // Prepare Chapa payload with data from database
    const tx_ref = `order-${order.id}-${Date.now()}`;
    const userNameParts = order.shipping.name.split(' ');
    const first_name = userNameParts[0] || 'Customer';
    const last_name = userNameParts.slice(1).join(' ') || '';

    const raw = JSON.stringify({
      amount: order.total.toString(),
      currency: 'ETB',
      email: session.user.email || 'customer@example.com',
      first_name,
      last_name,
      phone_number: order.shipping.phone,
      tx_ref,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders?payment=success`,
      "customization[title]": `Payment for Order #${order.id.slice(0, 8)}`,
      "customization[description]": `Payment for ${order.items.length} items`,
      "meta[hide_receipt]": "true"
    });

    // Create headers
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_SECRET_KEY}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as const
    };

    // Make the request to Chapa
    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions);
    const result = await response.json();

 

    // Update order status to PROCESSING
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'PROCESSING' }
      
    });

    return NextResponse.json({ 
      data: result,
      message: 'Payment initialized successfully'

    });
        

  } catch (error) {
    console.error('[PAYMENT_INIT_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? 
          error.message : 
          'An unexpected error occurred during payment initialization',
        details: process.env.NODE_ENV === 'development' ? 
          error instanceof Error ? error.stack : null : 
          undefined
      },
      { status: 500 }
    );
  }
}