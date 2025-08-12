import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


export async function POST(req: Request) {
  try {
    // Verify admin access (optional)
    const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        return redirect("/sign-in");
      }

    const {
      name,
      price,
      image,
      category,
      description,
      rating,
      stock
    } = await req.json()

    // Validate required fields
    if (!name || !price || !category || !stock) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: image || null,
        category,
        description: description || null,
        rating: rating ? parseFloat(rating) : null,
        stock: parseInt(stock)
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('[PRODUCTS_POST]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}