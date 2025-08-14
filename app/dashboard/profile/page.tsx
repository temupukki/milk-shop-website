import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Phone, MapPin, ShieldCheck, Settings, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/sign-in");

  const user = session.user;
  const phone = user.email?.split("@")[0];
  const initials = getInitials(user.name || "US");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-pink-400 to-rose-300 h-48 w-full relative">
        {/* Admin Badge - Mobile */}
        {user.role === "ADMIN" && (
          <div className="lg:hidden absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <ShieldCheck className="text-green-500 w-4 h-4" />
            <span className="text-xs font-semibold text-gray-700">Admin</span>
          </div>
        )}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-end pb-8">
          {/* Admin Badge - Desktop */}
          {user.role === "ADMIN" && (
            <div className="hidden lg:flex absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm items-center gap-2">
              <ShieldCheck className="text-green-500 w-5 h-5" />
              <span className="text-sm font-semibold text-gray-700">Administrator</span>
            </div>
          )}

          {/* User Avatar and Name */}
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white -mb-12">
              <span className="text-3xl lg:text-4xl font-bold text-pink-500">
                {initials}
              </span>
            </div>
            <div className="ml-4 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                {user.name}
              </h1>
              <p className="text-white/90">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phone */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-50 rounded-lg flex items-center justify-center">
                  <Phone className="text-pink-500 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Phone
                  </p>
                  <p className="text-lg font-semibold text-gray-800">+251 {phone}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Address
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.image || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-green-500 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Role
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      user.role === "ADMIN" ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-4">
            {user.role === "ADMIN" && (
              <Link href="/dashboard/admin">
                <Button variant="outline" className="w-full gap-2 h-14 text-lg  bg-gray-700 hover:bg-gray-800">
                  <Settings className="w-5 h-5" />
                  Admin Dashboard
                </Button>
              </Link>
            )}

          

         
          </div>
        </div>
      </div>
    </div>
  );
}