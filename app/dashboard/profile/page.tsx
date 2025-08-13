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
import { User, Phone, MapPin, ShieldCheck } from "lucide-react";

export default async function ProfileCard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/sign-in");

  const user = session.user;
  const phone = user.email?.split("@")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <Card className="w-full max-w-lg overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 h-36 relative">
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <User className="text-pink-500 w-12 h-12" />
            </div>
          </div>
        </div>

        {/* User Info */}
        <CardHeader className="text-center pt-16 pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
            {user.name}
          </CardTitle>
          <CardDescription className="text-gray-500 font-medium">
            Profile Overview
          </CardDescription>
        </CardHeader>

        {/* Profile Details */}
        <CardContent className="px-6 pb-8 flex flex-col gap-5">
          {/* Phone */}
          <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-3 bg-pink-50 rounded-lg flex items-center justify-center">
              <Phone className="text-pink-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Phone
              </p>
              <p className="text-sm font-semibold text-gray-800">+251 {phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-center">
              <MapPin className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Address
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {user.image || "Not specified"}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-3 bg-green-50 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Role
              </p>
              <p
                className={`text-sm font-semibold ${
                  user.role === "ADMIN" ? "text-green-600" : "text-rose-600"
                }`}
              >
                {user.role}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
