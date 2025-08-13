import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaLeaf, FaTruck, FaAward } from "react-icons/fa";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) return redirect("/dashboard");

  const benefits = [
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: "100% Organic",
      description: "No artificial hormones or antibiotics",
    },
    {
      icon: <FaTruck className="text-3xl text-rose-600" />,
      title: "Next-Day Delivery",
      description: "Fresh to your doorstep within 24 hours",
    },
    {
      icon: <FaAward className="text-3xl text-amber-600" />,
      title: "Award Winning",
      description: "Recognized for quality since 2010",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[80vh] flex items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="/homebackground.jpg"
            alt="Milk splash background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-800 mb-4 md:mb-6 leading-tight">
            Pure Dairy <span className="text-amber-600">Goodness</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-rose-700 max-w-2xl mx-auto mb-6 md:mb-8">
            Farm-fresh milk and dairy products delivered straight to your home
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-block text-center"
            >
              Shop Products
            </Link>
            <Link 
              href="/about" 
              className="bg-white hover:bg-rose-50 text-rose-700 font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg border border-rose-200 transition-all duration-300 hover:scale-105 inline-block text-center"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-rose-50 p-6 sm:p-8 rounded-xl text-center hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-rose-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-rose-700 sm:text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <div className="lg:w-1/2 w-full">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/homestory.jpg"
                  alt="Our dairy farm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-800 mb-4 sm:mb-6">
                Our Dairy Story
              </h2>
              <p className="text-gray-700 mb-4 text-base sm:text-lg">
                Milk Pukki began as a small family farm in 2025 with just 10
                cows. Today, we maintain those same values of quality and care
                while serving thousands of happy customers.
              </p>
              <p className="text-gray-700 mb-6 text-base sm:text-lg">
                We believe in sustainable farming practices that respect both
                the animals and the land. Our cows are pasture-raised and
                treated with the utmost care.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 hover:scale-105"
              >
                Read Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-rose-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-6">
            Ready to Experience Farm-Fresh Dairy?
          </h2>
          <Link 
            href="/sign-up" 
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}