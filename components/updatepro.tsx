// components/DeleteProductButton.tsx
"use client"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { TrashIcon } from "lucide-react"
import { deleteProductAction } from "@/app/action/prodel"
import { toast } from "sonner"

interface DeleteProductButtonProps {
  productId: number
}

const DeleteProductButton = ({ productId }: DeleteProductButtonProps) => {
  const [isPending, setIsPending] = useState(false)

  async function handleDelete() {
    setIsPending(true)
    
    const result = await deleteProductAction({ productId })

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Product deleted successfully")
      // Optional: Refresh the page
      window.location.reload()
    }

    setIsPending(false)
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <TrashIcon className="w-5 h-5" />
      <span>Delete</span>
    </Button>
  )
}

export default DeleteProductButton