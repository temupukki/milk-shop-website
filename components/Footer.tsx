'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className=" bg-rose-200 text-rose-800 py-12 w-full p-0 m-0">
      <div className="max-w-[1340px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="flex items-center"> {/* <-- Center vertically */}
          <h2 className="text-pink-900 text-3xl font-bold mb-0 select-none cursor-default">
            Milk.
          </h2>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-pink-900 text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-500 transition">
                Produts
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-pink-900 text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:text-green-500 transition">
                FAQ
              </Link>
            </li>
           
            <li>
              <Link href="/privacy" className="hover:text-green-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-green-500 transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col justify-start items-center"> {/* <-- Center horizontally */}
          {/* You can add newsletter or other content here if you want */}

          <div className="flex space-x-4 mt-6 text-pink-900">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-green-500 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-green-500 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-green-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-500 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Milk. All rights reserved.
      </div>
    </footer>
  );
}
