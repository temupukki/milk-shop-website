"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

type SigninFormData = z.infer<typeof signinSchema>;

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninFormData) {
    const { phone, password } = values;

    try {
      await authClient.signIn.email(
        {
          email: `${phone}@milk.shop`,
          password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            toast.info("Authenticating...", {
              description: "Please wait while we sign you in",
            });
          },
          onSuccess: () => {
            toast.success("Welcome Dear!", {
              description: "You've been signed in successfully",
            });
            window.location.href = "/dashboard";
          },
          onError: (ctx) => {
            toast.error("Sign in failed", {
              description:
                ctx.error.message || "Please check your credentials and try again",
            });
          },
        }
      );
    } catch (err) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 p-4 sm:p-6">
      <title>Sign In | Milk Pukki</title>
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-rose-200">
        <CardHeader className="text-center space-y-2 mb-4 sm:mb-6">
          <CardTitle className="text-3xl sm:text-4xl font-extrabold text-rose-700">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-rose-500 text-base sm:text-lg">
            Sign in to your Milk Shop account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold text-rose-700 text-sm sm:text-base">
                Phone Number
              </Label>
              <div className="flex">
                <span className="px-3 py-2 bg-rose-100 text-rose-700 text-sm rounded-l-md border border-r-0 border-rose-300 select-none flex items-center">
                  +251
                </span>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="912345678"
                  className="rounded-l-none placeholder-rose-300 text-rose-700 focus:ring-2 focus:ring-rose-400"
                  inputMode="numeric"
                />
              </div>
              {errors.phone && (
                <p className="text-xs sm:text-sm text-rose-600 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="font-semibold text-rose-700 text-sm sm:text-base">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs sm:text-sm text-rose-600 hover:text-rose-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className="placeholder-rose-300 text-rose-700 focus:ring-2 focus:ring-rose-400"
              />
              {errors.password && (
                <p className="text-xs sm:text-sm text-rose-600 mt-1">{errors.password.message}</p>
              )}
            </div>

           

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 font-semibold text-white rounded-lg shadow-sm active:scale-[0.98] transition-transform"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center text-xs sm:text-sm text-rose-600">
          <div>
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-rose-700 underline font-semibold hover:text-rose-900"
            >
              Create one
            </Link>
          </div>
          <Link
            href="/"
            className="text-rose-500 underline hover:text-rose-700 flex items-center justify-center"
          >
            ← Return to homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}