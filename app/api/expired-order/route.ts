// app/api/expired-order/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    // Parse JSON body safely
    const data = await request.json().catch(() => null);
    if (!data || typeof data.orderId !== "string" || data.orderId.trim() === "") {
      return NextResponse.json(
        { error: "Missing or invalid orderId in request body" },
        { status: 400 }
      );
    }

    const orderId = data.orderId;

    // Delete order items linked to orderId
    await prisma.orderItem.deleteMany({
      where: { orderId },
    });

    // Delete order itself
    await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete order:", err);

    if (err instanceof Error) {
      // Handle Prisma known errors or any error message
      return NextResponse.json(
        { error: err.message || "Internal Server Error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown internal server error" },
      { status: 500 }
    );
  }
}
