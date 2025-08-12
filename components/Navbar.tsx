import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50  w-full ">
      <nav className="w-full bg-white text-rose-800 flex flex-col md:flex-row items-center justify-between p-4 shadow-md">
        <h1 className="font-bold text-pink-900 text-[32px] tracking-wide pt-4 pb-4 pl-12">
          Milk Shop
        </h1>

        <ul className="flex gap-6 flex-col md:flex-row items-center mt-4 md:mt-0 text-[18px]  pr-12">
          <li className="hover:text-green-400 cursor-pointer transition">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer transition">
            <Link href="/products">Products</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer transition">
            <Link href="/about">About Us</Link>
          </li>
          <li className="hover:text-green-400 cursor-pointer transition">
            <Link href="/contact">Contact Us</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/sign-up">
              <button className="bg-black text-white font-bold border-2 border-white rounded w-[120px] py-2 hover:text-green-400 hover:border-green-400 transition">
                Get Started
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}