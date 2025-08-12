import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    if (!productId || typeof quantity !== 'number') {
      return NextResponse.json(
        { message: 'Invalid input' },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { 
        stock: { 
          increment: quantity
        } 
      },
    });

    return NextResponse.json({ updatedProduct });
  } catch (error) {
    console.error('Stock update error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}