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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 overflow-x-hidden">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-500">
            You don&apos;t have permission to view this page
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard/admin/list">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white w-full sm:w-auto">
              Manage Products
            </Button>
          </Link>
          <Link href="/dashboard/admin/order">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white w-full sm:w-auto">
              Manage Orders
            </Button>
          </Link>
          <Link href="/dashboard/admin/contact">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white w-full sm:w-auto">
              See Messages
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 mt-1">
            Admin dashboard for managing user accounts
          </p>
        </div>

        {/* Search */}
        <div>
          <form className="flex flex-col sm:flex-row gap-2 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <Input
              type="text"
              name="search"
              placeholder="Filter by ID, name or email..."
              defaultValue={searchTerm}
              className="flex-1 placeholder:text-gray-600"
            />
            <Button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold"
            >
              Search
            </Button>
            {searchTerm && (
              <Link href="/dashboard/admin">
                <Button
                  variant="outline"
                  className="text-gray-800 border-gray-300 hover:bg-gray-100 font-bold"
                >
                  Clear
                </Button>
              </Link>
            )}
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-100">
              <tr>
                {["ID", "Name", "Email", "Role", "Created At", "Updated At", "Actions"].map(
                  (title) => (
                    <th
                      key={title}
                      className="p-4 text-left text-gray-700 font-semibold text-sm"
                    >
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-600">{user.id.slice(0, 8)}</td>
                  <td className="p-4 font-medium text-gray-800">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td
                    className={`p-4 font-semibold ${
                      user.role === "ADMIN" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="p-4 text-gray-600">
                    {user.createdAt ? formatDate(new Date(user.createdAt)) : "-"}
                  </td>
                  <td className="p-4 text-gray-600">
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

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-lg">
            {searchTerm ? "No matching users found" : "No users found"}
          </div>
        )}
      </div>
    </div>
  );
}
