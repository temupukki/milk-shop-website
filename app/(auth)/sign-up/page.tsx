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
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

type SignupFormData = z.infer<typeof formSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupFormData) {
    const { firstName, lastName, phone, address, password } = values;

    try {
      toast.info("Creating your account...", { duration: 4000 });
      const { error } = await authClient.signUp.email(
        {
          email: `${phone}@milk.shop`,
          password,
          name: `${firstName} ${lastName}`,
          image: `${address}`,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            toast.loading("Processing your request...");
          },
          onSuccess: () => {
            toast.success("Account created successfully!");
            window.location.href = "/sign-in";
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Signup failed, please try again."
            );
          },
        }
      );
      if (error) {
        toast.error(error.message || "Signup failed, please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Sign-up error →", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 p-4 sm:p-6">
      <title>Sign Up | Milk Pukki</title>
      <Card className="w-full max-w-md bg-white rounded-xl shadow-sm border-0">
        <CardHeader className="text-center space-y-1 pb-2">
          <CardTitle className="text-2xl font-bold text-rose-700">
            Create Account
          </CardTitle>
          <CardDescription className="text-rose-500">
            Join the Milk Pukki family
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-rose-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Your first name"
                  className="border-rose-200 focus-visible:ring-rose-400 text-rose-700 placeholder:text-rose-400 "
                />
                {errors.firstName && (
                  <p className="text-xs text-rose-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-rose-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Your last name"
                  className="border-rose-200 focus-visible:ring-rose-400  text-rose-700 placeholder:text-rose-400"
                />
                {errors.lastName && (
                  <p className="text-xs text-rose-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className="text-rose-700">
                Phone Number
              </Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-rose-700 bg-rose-50 border border-r-0 border-rose-200 rounded-l-md">
                  +251
                </span>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="912345678"
                  className="rounded-l-none border-rose-200 focus-visible:ring-rose-400  text-rose-700 placeholder:text-rose-400"
                  inputMode="numeric"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="address" className="text-rose-700">
                Delivery Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Bole, Ednamall"
                className="border-rose-200 focus-visible:ring-rose-400  text-rose-700 placeholder:text-rose-400"
              />
              {errors.address && (
                <p className="text-xs text-rose-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-rose-700">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs hover:text-rose-800  text-rose-700 placeholder:text-rose-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Create a password"
                className="border-rose-200 focus-visible:ring-rose-400  text-rose-700 placeholder:text-rose-400"
              />
              {errors.password && (
                <p className="text-xs text-rose-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-transform"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-4 text-center text-sm text-rose-600">
          <div>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-rose-700 font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
          <Link href="/" className="text-rose-500 hover:underline">
            ← Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
