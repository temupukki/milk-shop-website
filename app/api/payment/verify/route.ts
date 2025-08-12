import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const txRef = body.tx_ref;

    // Verify the transaction with Chapa
    const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const verificationData = await response.json();

    // Extract order ID from the reference
    const orderId = txRef.split('-')[1];

    // Update order status in your database
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: 'PROCESSING',
        paymentVerified: true,
        paymentReference: txRef
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PAYMENT_VERIFICATION_ERROR]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment verification failed' },
      { status: 500 }
    );
  }
}