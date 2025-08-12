"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteuseraction({ userId }: { userId: string }) {
  const headerlist = await headers();
  const session = await auth.api.getSession({
    headers: headerlist,
  });
  if (!session) {
    return redirect("/sign-in");
  }
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // You can trigger a UI refresh or toast here
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "internal server error" };
  }
}
