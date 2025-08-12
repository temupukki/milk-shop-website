import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(), // No need for await here
    });

    // Authentication check
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // Fetch user data
    const userData = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {  // Using 'select' instead of 'include' for specific fields
        id: true,
        name: true,
        email: true,
        image: true,
        // Add other fields you need
      },
    });

    // Handle case where user doesn't exist
    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userData);
    
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}