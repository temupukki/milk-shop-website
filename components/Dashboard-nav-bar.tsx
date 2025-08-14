import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    { href: "/dashboard/orders", label: "Orders" },
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
            {/* Profile */}
            <li>
              <Link href="/dashboard/profile" className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-semibold hover:bg-rose-600 transition-colors">
                  {initials}
                </span>
              </Link>
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
          <div className="lg:hidden flex items-center gap-4">
            <Link href="/dashboard/profile">
              <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-semibold hover:bg-rose-600 transition-colors">
                {initials}
              </span>
            </Link>
            <label
              htmlFor="mobile-nav-toggle"
              className="cursor-pointer p-2 rounded text-black hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300 peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </label>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <input type="checkbox" id="mobile-nav-toggle" className="hidden peer" />
        <div
          className="
            lg:hidden max-h-0 overflow-hidden
            peer-checked:max-h-[500px]
            transition-all duration-500 ease-in-out
            bg-white shadow-lg rounded-b-lg
          "
        >
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <label key={link.href} htmlFor="mobile-nav-toggle" className="block">
                <Link
                  href={link.href}
                  className="block py-3 px-4 rounded-md text-gray-700 hover:text-rose-600 hover:bg-gray-100 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </label>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <label htmlFor="mobile-nav-toggle" className="block">
                <form
                  action={async () => {
                    "use server";
                    await auth.api.signOut({ headers: await headers() });
                    redirect("/sign-in");
                  }}
                >
                  <Button className="w-full bg-black text-white font-semibold rounded-lg py-3 hover:shadow-md">
                    Sign out
                  </Button>
                </form>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
