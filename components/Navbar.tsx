"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path: string) => pathname === path;

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          {/* Logo */}
          <h1 className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-2xl md:text-3xl tracking-tight">
            Pukki milk
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
                  />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sign-up">
                <button className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg px-6 py-2 hover:shadow-lg transition-all duration-300 hover:from-rose-700 hover:to-pink-700 group">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </button>
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger / X */}
          <button
            className="lg:hidden p-2 rounded text-black hover:bg-gray-200 transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

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
          {/* Header with close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-rose-600 transition-colors p-2"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-md text-gray-700 hover:text-rose-600 hover:bg-gray-100 transition-colors font-medium relative ${
                  isActive(link.href) ? "text-rose-600" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-4 right-4 bottom-2 h-0.5 bg-rose-600 transition-all duration-300 ${
                    isActive(link.href) ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Get Started button */}
          <div className="p-4 mt-auto">
            <Link href="/sign-up">
              <button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg py-3 px-4 hover:shadow-md transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}