"use server";

import prisma from "@/lib/prisma";

export async function updateProductField(
  productId: number,
  field: string,
  value: string
) {
  try {
    const numericFields = ["price", "stock"];
    const data = {
      [field]: numericFields.includes(field) ? parseFloat(value) : value,
    };

    await prisma.product.update({
      where: { id: productId },
      data,
    });

    return { success: true };
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    return { success: false, error: "Failed to update product" };
  }
}