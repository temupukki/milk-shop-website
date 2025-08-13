"use client"
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="font-bold text-pink-900 text-2xl md:text-3xl tracking-wide">
              Milk Pukkijjj
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-rose-800 hover:text-green-500 transition duration-300 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-rose-800 hover:text-green-500 transition duration-300 font-medium">
              Products
            </Link>
            <Link href="/about" className="text-rose-800 hover:text-green-500 transition duration-300 font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-rose-800 hover:text-green-500 transition duration-300 font-medium">
              Contact Us
            </Link>
            <Link href="/sign-up">
              <button className="bg-black text-white font-bold border-2 border-white rounded-lg px-4 py-2 hover:text-green-400 hover:border-green-400 transition duration-300">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-rose-800 hover:text-green-500 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4 mt-4">
              <Link 
                href="/" 
                className="text-rose-800 hover:text-green-500 transition duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-rose-800 hover:text-green-500 transition duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-rose-800 hover:text-green-500 transition duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-rose-800 hover:text-green-500 transition duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                href="/sign-up"
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full bg-black text-white font-bold border-2 border-white rounded-lg py-2 hover:text-green-400 hover:border-green-400 transition duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}