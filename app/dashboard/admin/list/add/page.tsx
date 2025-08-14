// app/products/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Milk",
    description: "",
    rating: "",
    stock: "0",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if stock is less than 1
    if (parseInt(formData.stock) < 1) {
      toast.error("Stock quantity must be at least 1");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      toast.success("Product created successfully!");
      router.push("/dashboard/admin/list");
    } catch (error) {
      toast.error("Failed to create product");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <title>Product Addition| Pukki milk</title>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-rose-100 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rose-800 mb-2">
            Add New Product
          </h1>
          <p className="text-rose-600">
            Fill in the details below to create a new product
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rose-800 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2  text-rose-800 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-rose-800 mb-1">
                  Price*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">
                    ETB
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 pl-12 border border-rose-200 rounded-lg focus:ring-2  text-rose-800 focus:ring-rose-300 focus:border-rose-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-800 mb-1">
                  Stock Quantity*
                </label>
                <input
                  type="number"
                  name="stock"
                  min="1"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2  text-rose-800 focus:ring-rose-300 focus:border-rose-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-rose-800 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/milk.jpg"
                className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2  text-rose-800 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-rose-800 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2  text-rose-800 focus:ring-rose-300 focus:border-rose-300"
                >
                  <option value="Milk">Milk</option>
                  <option value="Yogurt">Yogurt</option>
                  <option value="Cheese">Cheese</option>
                  <option value="Butter">Butter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-800 mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2  text-rose-800 focus:ring-rose-300 focus:border-rose-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-rose-800 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border  text-rose-800 border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/admin/list")}
              className="px-6 py-2 border border-rose-300 text-rose-700 rounded-lg hover:bg-rose-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
