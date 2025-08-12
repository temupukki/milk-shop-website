// app/api/updateStock/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    
    // Validate request body
    if (!requestBody || typeof requestBody !== 'object') {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { productId, quantity } = requestBody;

    // Validate inputs
    if (typeof productId !== 'number' || productId <= 0) {
      return NextResponse.json(
        { message: 'Invalid product ID' },
        { status: 400 }
      );
    }

    if (typeof quantity !== 'number' || quantity === 0) {
      return NextResponse.json(
        { message: 'Invalid quantity' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // For negative quantities (reducing stock), check availability
    if (quantity < 0 && product.stock < Math.abs(quantity)) {
      return NextResponse.json(
        { message: 'Insufficient stock available' },
        { status: 400 }
      );
    }

    // Update stock (can be positive or negative change)
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { 
        stock: {
          increment: quantity // increment can be positive or negative
        } 
      },
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        image: true,
        category: true
      }
    });

    // Prevent negative stock (shouldn't happen due to earlier check)
    if (updatedProduct.stock < 0) {
      await prisma.product.update({
        where: { id: productId },
        data: { stock: 0 }
      });
      return NextResponse.json(
        { message: 'Stock cannot be negative' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      updatedProduct
    });

  } catch (error: any) {
    console.error('Update stock error:', error);
    return NextResponse.json(
      { 
        message: error.message || 'Failed to update stock',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}