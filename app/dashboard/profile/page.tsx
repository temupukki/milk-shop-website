import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfileCard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/sign-in");

  const user = session.user;
  const phone = user.email?.split("@")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto overflow-hidden rounded-2xl bg-white border border-rose-100 shadow-lg">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-400 to-amber-300 h-36 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <span className="text-3xl text-rose-600">👤</span>
            </div>
          </div>
        </div>

        <CardHeader className="text-center pt-16 pb-4">
          <CardTitle className="text-2xl font-bold text-rose-800">
            {user.name}
          </CardTitle>
          <CardDescription className="text-rose-600 font-medium">
            Profile Overview
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
     

            {/* Phone */}
            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <span className="text-amber-600 text-xl">📱</span>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-700">Phone</p>
                <p className="text-sm font-medium text-gray-800">+251 {phone}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <span className="text-blue-600 text-xl">🏠</span>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-700">Address</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.image || "Not specified"}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <span className="text-green-600 text-xl">🔐</span>
              </div>
              <div>
                <p className="text-xs font-medium text-green-700">Role</p>
                <p className={`text-sm font-semibold ${
                  user.role === "ADMIN" 
                    ? "text-green-600" 
                    : "text-rose-600"
                }`}>
                  {user.role}
                </p>
              </div>
            </div>
          
        </CardContent>
      </Card>
    </div>
  );
}