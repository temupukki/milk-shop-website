import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaHeart, FaAward, FaTruck } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-rose-50">
      <title>About | Milk Pukki</title>
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/homebackground.jpg"
            alt="Milk Pukki Farm Landscape"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="text-center z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-800 mb-3 sm:mb-4">
            Our Dairy Story
          </h1>
          <p className="text-lg sm:text-xl text-rose-700 max-w-2xl mx-auto">
            Pure milk, honest values, and generations of passion
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-8 sm:py-12 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center">
          <div className="md:w-1/2 w-full">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/homestory.jpg"
                alt="Milk Pukki Family Farmers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-4 sm:mb-6">
              From Our Family to Yours
            </h2>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              Milk Pukki began in 1985 when Grandpa Henry bought his first dairy
              cow, Bessie. What started as a small family operation has grown
              into a beloved local dairy, but we&apos;ve never lost sight of our
              roots.
            </p>
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              Today, we still milk our cows by hand twice daily, refusing to
              compromise on quality for scale. Every bottle of Milk Pukki
              carries three generations of care and tradition.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="bg-rose-100 text-rose-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                <FaLeaf className="text-sm sm:text-base" /> 100% Organic
              </span>
              <span className="bg-rose-100 text-rose-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                <FaHeart className="text-sm sm:text-base" /> Family-Owned
              </span>
              <span className="bg-rose-100 text-rose-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                <FaAward className="text-sm sm:text-base" /> Award-Winning
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-8 sm:mb-12 text-center">
            Our Dairy Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                icon: <FaLeaf className="text-3xl sm:text-4xl text-green-600" />,
                title: "Sustainable Farming",
                description: "We use regenerative practices to nourish the land.",
              },
              {
                icon: <FaHeart className="text-3xl sm:text-4xl text-rose-600" />,
                title: "Community First",
                description: "Supporting local families since 1985.",
              },
              {
                icon: <FaAward className="text-3xl sm:text-4xl text-amber-500" />,
                title: "Quality Guarantee",
                description: "Never any hormones, antibiotics, or shortcuts.",
              },
              {
                icon: <FaTruck className="text-3xl sm:text-4xl text-rose-500" />,
                title: "Fresh Delivery",
                description: "From our farm to your table in under 24 hours.",
              },
              {
                icon: <div className="text-3xl sm:text-4xl text-rose-800">🥛</div>,
                title: "Traditional Taste",
                description: "The rich, creamy flavor you remember from childhood.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-rose-50 p-4 sm:p-6 rounded-xl text-center hover:shadow-md transition h-full"
              >
                <div className="flex justify-center mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-rose-800 mb-1 sm:mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 sm:py-16 container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-8 sm:mb-12 text-center">
          Meet the Milk Pukki Family
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              name: "some one",
              role: "Founder",
              image: "/ladystaff.jpg",
              bio: "Still milks cows at 4am every morning. 'Retirement' isn't in his vocabulary.",
            },
            {
              name: "some one",
              role: "Head of Production",
              image: "/manstaff.jpg",
              bio: "Makes the creamiest yogurt.",
            },
            {
              name: "some one",
              role: "Delivery & Operations",
              image: "/ladystaff.jpg",
              bio: "Knows every customer by name and their usual order by heart.",
            },
            {
              name: "some one",
              role: "ChiefOfficers",
              image: "/manstaff.jpg",
             
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition h-full flex flex-col"
            >
              <div className="relative h-48 sm:h-56 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 sm:p-6 flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-rose-800">
                  {member.name}
                </h3>
                <p className="text-amber-600 mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
                <p className="text-gray-700 text-sm sm:text-base">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-4 sm:mb-6">
            Taste the Milk Pukki Difference
          </h2>
          <p className="text-lg sm:text-xl text-rose-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Visit our farm store or order fresh delivery to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 sm:py-3 px-6 rounded-full shadow-lg transition inline-block text-center"
            >
              Shop Our Products
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-rose-50 text-rose-700 font-semibold py-2 sm:py-3 px-6 rounded-full shadow-lg border border-rose-200 transition inline-block text-center"
            >
              Visit the Farm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}