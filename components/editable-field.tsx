"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { SaveIcon, EditIcon, XIcon } from "lucide-react";

export function EditableField({
  productId,
  field,
  initialValue,
  type = "text",
  updateAction,
}: {
  productId: number;
  field: string;
  initialValue: string;
  type?: "text" | "number" | "textarea";
  updateAction: (productId: number, field: string, value: string) => Promise<{ success: boolean }>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!value.trim()) {
      setError("Value cannot be empty");
      return;
    }

    if (type === "number" && isNaN(Number(value))) {
      setError("Please enter a valid number");
      return;
    }

    const { success } = await updateAction(productId, field, value);
    if (success) {
      setIsEditing(false);
    } else {
      setError("Failed to update");
    }
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span>{initialValue}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-rose-600 hover:text-rose-800"
        >
          <EditIcon size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-rose-200 rounded"
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-rose-200 rounded"
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-2">
        <SubmitButton />
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            setValue(initialValue);
            setError("");
          }}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={16} />
        </button>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-2 text-rose-600 hover:text-rose-800 disabled:opacity-50"
    >
      <SaveIcon size={16} />
    </button>
  );
}