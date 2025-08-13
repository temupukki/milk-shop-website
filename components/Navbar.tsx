"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent text-2xl md:text-3xl tracking-tight">
              Milk Pukki
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors duration-200 font-medium text-lg relative group ${
                isActive("/")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Link
              href="/products"
              className={`transition-colors duration-200 font-medium text-lg relative group ${
                isActive("/products")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              Products
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ${
                  isActive("/products") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Link
              href="/about"
              className={`transition-colors duration-200 font-medium text-lg relative group ${
                isActive("/about")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              About Us
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ${
                  isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Link
              href="/contact"
              className={`transition-colors duration-200 font-medium text-lg relative group ${
                isActive("/contact")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              Contact Us
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ${
                  isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Link href="/sign-up">
              <button className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg px-6 py-2 hover:shadow-lg transition-all duration-300 hover:from-rose-700 hover:to-pink-700 group">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-600 focus:outline-none transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-gray-700 hover:text-rose-600 transition-colors duration-200 p-2 -mr-2"
              >
                <FaTimes className="h-6 w-6" />
              </button>

              <div className="flex flex-col space-y-6 mt-8">
                <Link
                  href="/"
                  className={`transition-colors duration-200 font-medium py-2 px-4 rounded-lg ${
                    isActive("/")
                      ? "text-rose-600 bg-rose-50"
                      : "text-gray-700 hover:text-rose-600 hover:bg-gray-50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={`transition-colors duration-200 font-medium py-2 px-4 rounded-lg ${
                    isActive("/products")
                      ? "text-rose-600 bg-rose-50"
                      : "text-gray-700 hover:text-rose-600 hover:bg-gray-50"
                  }`}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors duration-200 font-medium py-2 px-4 rounded-lg ${
                    isActive("/about")
                      ? "text-rose-600 bg-rose-50"
                      : "text-gray-700 hover:text-rose-600 hover:bg-gray-50"
                  }`}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className={`transition-colors duration-200 font-medium py-2 px-4 rounded-lg ${
                    isActive("/contact")
                      ? "text-rose-600 bg-rose-50"
                      : "text-gray-700 hover:text-rose-600 hover:bg-gray-50"
                  }`}
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-auto pt-6">
                <Link href="/sign-up">
                  <button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-lg py-3 px-4 hover:shadow-md transition-all duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
