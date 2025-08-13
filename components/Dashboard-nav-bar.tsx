import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const user = session?.user;
  const initials = getInitials(user?.name || "US");

  const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/products", label: "Products" },
    { href: "/dashboard/about", label: "About" },
    { href: "/dashboard/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <h1 className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-2xl md:text-3xl tracking-tight">
            Milk Pukki
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-lg">
            {links.map((link) => (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
                >
                  {link.label}
                </Link>
                <span className="absolute -bottom-1 left-0 h-0.5 bg-rose-600 w-0 group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}

            {/* User Dropdown */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors border border-rose-200 text-sm font-medium">
                  <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-semibold">
                    {initials}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-[160px] bg-white rounded-md shadow-lg border border-rose-100 p-1 text-black">
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link href="/dashboard/admin" className="w-full">
                        Admin Page
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <Link href="/dashboard/orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            {/* Sign out */}
            <li>
              <form
                action={async () => {
                  "use server";
                  await auth.api.signOut({ headers: await headers() });
                  redirect("/sign-in");
                }}
              >
                <Button className="bg-black text-white font-bold rounded px-4 py-2 hover:text-green-400">
                  Sign out
                </Button>
              </form>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <label
            htmlFor="mobile-nav-toggle"
            className="lg:hidden cursor-pointer p-2 rounded hover:bg-gray-800 hover:text-rose-600"
          >
            ☰
          </label>
        </div>

        {/* Mobile Menu */}
        <input type="checkbox" id="mobile-nav-toggle" className="hidden peer" />
        <div className="peer-checked:block hidden lg:hidden fixed inset-0 z-40">
          <label
            htmlFor="mobile-nav-toggle"
            className="absolute inset-0 bg-black/30 cursor-pointer"
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-6 space-y-6">
            <div className="flex items-center justify-center pb-4 border-b">
              <span className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-semibold text-lg">
                {initials}
              </span>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-4 rounded-lg text-pink-700 hover:text-rose-600 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-gray-200" />

            <Link href="/dashboard/profile" className="block">
              Profile
            </Link>
            {user?.role === "ADMIN" && (
              <Link href="/dashboard/admin" className="block">
                Admin Page
              </Link>
            )}
            <Link href="/dashboard/orders" className="block">
              Orders
            </Link>

            <form
              action={async () => {
                "use server";
                await auth.api.signOut({ headers: await headers() });
                redirect("/sign-in");
              }}
            >
              <Button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg py-3 hover:shadow-md">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
