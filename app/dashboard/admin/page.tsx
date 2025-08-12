import DeleteUserButton, {
  PlaceHolderDeleteUserButton,
} from "@/components/delete-user-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/sign-in");

  if (session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-rose-200 max-w-md text-center">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">
            Access Denied
          </h2>
          <p className="text-rose-600">
            You don't have permission to view this page
          </p>
        </div>
      </div>
    );
  }

  const searchTerm = params.search ? String(params.search) : "";

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    where: {
      OR: [
        { id: { contains: searchTerm, mode: "insensitive" } },
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
  });

  // Helper to format date with time (AM/PM)
  const formatDate = (date: Date) =>
    date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rose-800 mb-2">
            User Management
          </h1>
          <p className="text-rose-600">
            Admin dashboard for managing user accounts
          </p>
        </div>

        <div className="mb-6 bg-white text-red-600 p-4 rounded-lg shadow-sm border border-rose-100">
          <form className="flex gap-2">
            <Input
              type="text"
              name="search"
              placeholder="Filter by ID, name or email..."
              defaultValue={searchTerm}
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              Search
            </Button>
            {searchTerm && (
              <Link href="/dashboard/admin">
                <Button variant="outline" className="text-rose-600 font-bold">
                  Clear
                </Button>
              </Link>
            )}
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-rose-100 overflow-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-rose-50">
              <tr>
                <th className="p-4 text-left text-rose-800 font-semibold">ID</th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Name
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Email
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Role
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Created At
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Updated At
                </th>
                <th className="p-4 text-center text-rose-800 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-rose-50 transition-colors"
                >
                  <td className="p-4 text-gray-700">{user.id.slice(0, 8)}</td>
                  <td className="p-4 font-medium text-gray-800">{user.name}</td>
                  <td className="p-4 text-gray-700">{user.email}</td>
                  <td
                    className={`p-4 font-semibold ${
                      user.role === "ADMIN" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="p-4 text-gray-700">
                    {user.createdAt ? formatDate(new Date(user.createdAt)) : "-"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {user.updatedAt ? formatDate(new Date(user.updatedAt)) : "-"}
                  </td>
                  <td className="p-4 text-center">
                    {user.role === "USER" ? (
                      <DeleteUserButton userId={user.id} />
                    ) : (
                      <PlaceHolderDeleteUserButton />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? "No matching users found" : "No users found"}
          </div>
        )}

        <div className="mt-8 space-y-4">
          <div className="text-pink-800">
            Press this to manage products.....{" "}
            <Link href="/dashboard/admin/list">
              <Button className="bg-red-600 mt-2 text-white">Manage products</Button>
            </Link>
          </div>

          <div className="text-pink-800">
            Press this to manage orders.....{" "}
            <Link href="/dashboard/admin/order">
              <Button className="bg-red-600 mt-2 text-white">Manage orders</Button>
            </Link>
          </div>

          <div className="text-pink-800">
            Press this to see contacted users about us.....{" "}
            <Link href="/dashboard/admin/contact">
              <Button className="bg-red-600 mt-2 text-white">See Messages</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
