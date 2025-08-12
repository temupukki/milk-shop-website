import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Verify admin access (optional)

    const { name, email, message } = await req.json();

    // Create the product
    const contact = await prisma.contactForm.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
