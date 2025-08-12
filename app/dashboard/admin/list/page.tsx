// app/products/page.tsx
"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DeleteProductButton from "@/components/delete-product-button";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { EditableField } from "@/components/editable-field";
import { updateProductField } from "@/app/action/product-actions";

export default async function ProductList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/sign-in");

  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-rose-800 mb-2">
              Product List
            </h1>
            <p className="text-rose-600">Manage your products</p>
             <Button asChild variant="destructive">
            <Link href="/dashboard/admin/list/add" className="flex items-center gap-2 bg-pink-700 mt-3">
              <PlusIcon size={16} />
              Add Products
            </Link>
          </Button>
          </div>
         
        </div>

        <div className="bg-white rounded-xl shadow-md border border-rose-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-rose-50">
              <tr>
                <th className="p-4 text-left text-rose-800 font-semibold">ID</th>
                <th className="p-4 text-left text-rose-800 font-semibold">Name</th>
                <th className="p-4 text-left text-rose-800 font-semibold">Price</th>
                <th className="p-4 text-left text-rose-800 font-semibold">Category</th>
                <th className="p-4 text-left text-rose-800 font-semibold">Description</th>
                <th className="p-4 text-left text-rose-800 font-semibold">Stock</th>
                <th className="p-4 text-left text-rose-800 font-semibold">Image</th>

                <th className="p-4 text-left text-rose-800 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-rose-50 transition-colors">
                  <td className="p-4 text-red-700">{product.id}</td>
                   <td className="p-4 text-red-700">
                    <EditableField 
                      productId={product.id}
                      field="name"
                      initialValue={product.name}
                      type="text"
                      updateAction={updateProductField}
                    />
                  </td>
                  <td className="p-4 text-red-700">
                    <EditableField 
                      productId={product.id}
                      field="price"
                      initialValue={product.price.toFixed(2)}
                      type="number"
                      updateAction={updateProductField}
                    />
                  </td>
                  <td className="p-4 text-red-700">
                    <EditableField 
                      productId={product.id}
                      field="category"
                      initialValue={product.category}
                      updateAction={updateProductField}
                    />
                  </td>
                  <td className="p-4 text-red-700">
                    <EditableField 
                      productId={product.id}
                      field="description"
                      initialValue={product.description}
                      type="textarea"
                      updateAction={updateProductField}
                    />
                  </td>
                  <td className="p-4 text-red-700">
                    <EditableField 
                      productId={product.id}
                      field="stock"
                      initialValue={product.stock.toString()}
                      type="number"
                      updateAction={updateProductField}
                    />
                  </td>
                    <td className="p-4 text-red-700">
                    <EditableField 
                      productId={product.id}
                      field="image"
                      initialValue={product.image}
                      type="text"
                      updateAction={updateProductField}
                    />
                  </td>
                  <td className="p-4">
                    <DeleteProductButton productId={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-red-700">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}