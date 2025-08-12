"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface DeleteorderButtonProps {
  orderId: string;
}

const DeleteorderButton = ({ orderId }: DeleteorderButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);

    try {
      // 1. First get the complete order details from YOUR endpoint
      const orderResponse = await fetch(`/api/user/order`);
      if (!orderResponse.ok) {
        throw new Error("Failed to fetch order details");
      }
      
      const orders = await orderResponse.json();
      const order = orders.find((o: any) => o.id === orderId);
      
      if (!order) {
        throw new Error("Order not found in your account");
      }

      const items = order?.items || [];

      // 2. Delete the order first
      const deleteResponse = await fetch("/api/expired-order", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.error || "Failed to delete order");
      }

      // 3. Update stock for each product (with proper error handling)
      if (items.length > 0) {
        const updatePromises = items.map(async (item: any) => {
          try {
            const res = await fetch("/api/updateStock", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productId: item.productId, // Using direct productId
                quantity: item.quantity,
              }),
            });
            
            if (!res.ok) {
              throw new Error(`Failed to update stock for product ${item.productId}`);
            }
            return await res.json();
          } catch (error) {
            console.error(`Stock update error for product ${item.productId}:`, error);
            return null;
          }
        });

        await Promise.all(updatePromises);
      }

      toast.success("Order canceled and stock updated");
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      console.error("Order cancellation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel order"
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold ml-3.5 py-2 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <TrashIcon className="w-5 h-5" />
      <span>{isPending ? "Processing..." : "Cancel Order"}</span>
    </Button>
  );
};

export default DeleteorderButton;