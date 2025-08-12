import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaHeart, FaShoppingCart, FaStar, FaLeaf, FaTruck, FaAward } from 'react-icons/fa';

export default async function Home() {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (session) return redirect("/dashboard");


  const benefits = [
    {
      icon: <FaLeaf className="text-2xl text-green-600" />,
      title: "100% Organic",
      description: "No artificial hormones or antibiotics"
    },
    {
      icon: <FaTruck className="text-2xl text-rose-600" />,
      title: "Next-Day Delivery",
      description: "Fresh to your doorstep within 24 hours"
    },
    {
      icon: <FaAward className="text-2xl text-amber-600" />,
      title: "Award Winning",
      description: "Recognized for quality since 2010"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
  
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/homebackground.jpg" 
            alt="Milk splash background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-rose-800 mb-6">
            Pure Dairy <span className="text-amber-600">Goodness</span>
          </h1>
          <p className="text-xl md:text-2xl text-rose-700 max-w-2xl mx-auto mb-8">
            Farm-fresh milk and dairy products delivered straight to your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
              <Link href="/products">Shop Products</Link>
            </button>
            <button className="bg-white hover:bg-rose-50 text-rose-700 font-semibold py-3 px-8 rounded-full shadow-lg border border-rose-200 transition transform hover:scale-105">
             <Link href="/about"> Learn About Us</Link>
            </button>
          </div>
        </div>
      </section>

   
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-rose-50 p-8 rounded-xl text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-rose-800 mb-2">{benefit.title}</h3>
                <p className="text-rose-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

 
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/homestory.jpg"
                  alt="Our dairy farm"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-rose-800 mb-6">Our Dairy Story</h2>
              <p className="text-gray-700 mb-4">
                Milk Haven began as a small family farm in 1985 with just 10 cows. Today, we maintain those same values of quality and care while serving thousands of happy customers.
              </p>
              <p className="text-gray-700 mb-6">
                We believe in sustainable farming practices that respect both the animals and the land. Our cows are pasture-raised and treated with the utmost care.
              </p>
              
            </div>
          </div>
        </div>
      </section>
      

      
    </main>
  );
}