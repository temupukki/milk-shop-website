"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getInitials(name?: string) {
  return name?.split(" ").map((n) => n[0]?.toUpperCase()).join("").slice(0, 2);
}

export default function Dashboard() {
  const [user, setUser] = useState<{ name?: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((session) => {
        if (!session?.user) window.location.href = "/sign-in";
        else setUser(session.user);
      })
      .catch(() => (window.location.href = "/sign-in"));
  }, []);

  // Close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initials = getInitials(user?.name);

  const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/products", label: "Products" },
    { href: "/dashboard/about", label: "About" },
    { href: "/dashboard/contact", label: "Contact" },
    { href: "/dashboard/orders", label: "Orders" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <h1 className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-2xl md:text-3xl tracking-tight">
            Milk Pukki
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-lg">
            {links.map((link) => (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`text-gray-700 hover:text-rose-600 transition-colors font-medium ${
                    isActive(link.href) ? "text-rose-600" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/dashboard/profile">
                <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-semibold hover:bg-rose-600 transition-colors">
                  {initials}
                </span>
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger / X */}
          <button
            className="lg:hidden p-2 rounded text-black hover:bg-gray-200 transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with initials */}
        <div className="flex flex-col items-center p-6 border-b">
          <Link
            href="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className="flex flex-col items-center"
          >
            <span className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xl hover:bg-rose-600 transition-colors">
              {initials}
            </span>
            <span className="mt-2 text-gray-700 font-medium hover:text-rose-600">
              View Profile
            </span>
          </Link>
        </div>

        {/* Links */}
        <nav className="flex flex-col p-4 gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 rounded-md text-gray-700 hover:text-rose-600 hover:bg-gray-100 transition-colors font-medium group relative ${
                isActive(link.href) ? "text-rose-600" : ""
              }`}
            >
              {link.label}
              <span
                className={`absolute left-4 right-4 bottom-2 h-0.5 bg-rose-600 transition-all duration-300 ${
                  isActive(link.href) ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"
                }`}
              ></span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}