"use client";
interface DeleteUserButtonProps {
  userId: string;
}
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Icon, TrashIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { deleteuseraction } from "@/app/action/del";
import { toast } from "sonner";

const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  async function handleclick() {
    setIsPending(true);

    const result = await deleteuseraction({ userId });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("User deleted successfully");
    }

    setIsPending(false);
  }
  return (
    <div>
      <Button
        variant="destructive"
        onClick={handleclick}
        disabled={isPending}
        className="flex items-center gap-2  bg-red-600 hover:bg-red-700 text-white font-semibold ml-26 py-2 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <TrashIcon className="w-5 h-5" />
        <span>Delete</span>
      </Button>
    </div>
  );
};
export const PlaceHolderDeleteUserButton = () => {
  return (
    <div>
      <Button size="icon" variant="destructive" disabled>
        <span className="sr-only">Delete user</span>
        <TrashIcon />
      </Button>
    </div>
  );
};

export default DeleteUserButton;
