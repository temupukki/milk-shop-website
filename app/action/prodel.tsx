"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteProductAction({
  productId,
}: {
  productId: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return { success: true };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "Internal server error" };
  }
}
