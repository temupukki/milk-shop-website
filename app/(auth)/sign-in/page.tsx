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

type SigninFormData = z.infer<typeof signinSchema>;

export default function Signin() {
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
            toast.success("Welcome back!", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 px-6">
      <Card className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-rose-200">
        <CardHeader className="text-center space-y-2 mb-6">
          <CardTitle className="text-4xl font-extrabold text-rose-700">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-rose-500 text-lg">
            Sign in to your Milk Shop account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="phone" className="font-semibold text-rose-700">
                Phone Number
              </Label>
              <div className="flex">
                <span className="px-4 py-2 bg-rose-100 text-rose-700 text-sm rounded-l-md border border-r-0 border-rose-300 select-none flex items-center">
                  +251
                </span>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="912345678"
                  className="rounded-l-none placeholder-rose-400 text-rose-700 focus:ring-2 focus:ring-rose-400 focus:scale-105 focus:shadow-lg transition-transform duration-300"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-rose-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password" className="font-semibold text-rose-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Input password here..."
                className="placeholder-rose-400 text-rose-700 focus:ring-2 focus:ring-rose-400 focus:scale-105 focus:shadow-lg transition-transform duration-300"
              />
              {errors.password && (
                <p className="text-sm text-rose-600">{errors.password.message}</p>
              )}
            </div>

          

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 hover:scale-105 transition-transform duration-300 font-bold text-white rounded-lg shadow-md flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center text-sm text-rose-600">
          <div>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-rose-700 underline ml-1 font-semibold hover:text-rose-900"
            >
              Create one
            </Link>
          </div>
          <Link
            href="/"
            className="text-rose-500 underline hover:text-rose-700"
          >
            ← Return to homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
