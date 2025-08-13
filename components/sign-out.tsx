// components/sign-out-button.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await auth.api.signOut({ headers: await headers() });
        redirect("/sign-in");
      }}
    >
      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg py-3 hover:shadow-md"
      >
        Sign out
      </Button>
    </form>
  );
}