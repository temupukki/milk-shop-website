import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/sign-in");
  }
  const user = session?.user;

  return (
    <>
      <div className="sticky top-0 z-50  w-full ">
        <div className="   bg-white text-rose-800 w-full   flex flex-col md:flex-row items-center justify-between px-8 py-4 shadow-md">
          <h1 className="font-bold text-pink-900 text-[32px] tracking-wide pt-4 pb-4 pl-12">
            Milk Shop
          </h1>

          <ul className="flex gap-6 flex-col md:flex-row items-center mt-4 md:mt-0 text-[18px] pr-12">
            <li className="hover:text-green-400 cursor-pointer transition">
              <Link href="/dashboard">Home</Link>
            </li>
            <li className="hover:text-green-400 cursor-pointer transition">
              <Link href="/dashboard/products">Products</Link>
            </li>
            <li className="hover:text-green-400 cursor-pointer transition">
              <Link href="/dashboard/about">About</Link>
            </li>
            <li className="hover:text-green-400 cursor-pointer transition">
              <Link href="/dashboard/contact">Contact</Link>
            </li>

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors border border-rose-200 text-sm font-medium">
                  👤 {user.name}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-[180px] bg-white rounded-md shadow-lg border border-rose-100 p-1">
                  <DropdownMenuItem className="px-3 py-2 hover:bg-rose-50 rounded-[4px] cursor-pointer font-semibold text-rose-700">
                    <Link href="/dashboard/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem className="px-3 py-2 hover:bg-rose-50 rounded-[4px] cursor-pointer font-semibold text-rose-700">
                      <Link
                        href="/dashboard/admin"
                        className="w-full flex items-center gap-2"
                      >
                        Admin Page
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem className="px-3 py-2 hover:bg-rose-50 rounded-[4px] cursor-pointer font-semibold text-rose-700">
                    <Link href="/dashboard/orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <div>
                {session ? (
                  <form
                    action={async () => {
                      "use server";
                      await auth.api.signOut({
                        headers: await headers(),
                      });
                      redirect("/sign-in");
                    }}
                  >
                    <Button
                      type="submit"
                      className="bg-black text-white font-bold border-2 border-white rounded w-[120px] py-2  hover:text-green-400 transition"
                    >
                      Sign out
                    </Button>
                  </form>
                ) : (
                  <Link href="/sign-in" className={buttonVariants()}>
                    Sign in
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
