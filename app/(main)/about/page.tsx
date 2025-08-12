import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaHeart, FaAward, FaTruck } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-rose-50">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/farm-landscape.jpg"
            alt="Milk Pukki Farm Landscape"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-800 mb-4">
            Our Dairy Story
          </h1>
          <p className="text-xl text-rose-700 max-w-2xl mx-auto">
            Pure milk, honest values, and generations of passion
          </p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/homestory.jpg"
                alt="Milk Pukki Family Farmers"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-rose-800 mb-6">
              From Our Family to Yours
            </h2>
            <p className="text-gray-700 mb-4">
              Milk Pukki began in 1985 when Grandpa Henry bought his first dairy
              cow, Bessie. What started as a small family operation has grown
              into a beloved local dairy, but we&apos;ve never lost sight of our
              roots.
            </p>
            <p className="text-gray-700 mb-6">
              Today, we still milk our cows by hand twice daily, refusing to
              compromise on quality for scale. Every bottle of Milk Pukki
              carries three generations of care and tradition.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full flex items-center gap-2">
                <FaLeaf /> 100% Organic
              </span>
              <span className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full flex items-center gap-2">
                <FaHeart /> Family-Owned
              </span>
              <span className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full flex items-center gap-2">
                <FaAward /> Award-Winning
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-rose-800 mb-12 text-center">
            Our Dairy Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLeaf className="text-4xl text-green-600" />,
                title: "Sustainable Farming",
                description:
                  "We use regenerative practices to nourish the land.",
              },
              {
                icon: <FaHeart className="text-4xl text-rose-600" />,
                title: "Community First",
                description: "Supporting local families since 1985.",
              },
              {
                icon: <FaAward className="text-4xl text-amber-500" />,
                title: "Quality Guarantee",
                description: "Never any hormones, antibiotics, or shortcuts.",
              },
              {
                icon: <FaTruck className="text-4xl text-rose-500" />,
                title: "Fresh Delivery",
                description: "From our farm to your table in under 24 hours.",
              },
              {
                icon: <div className="text-4xl text-rose-800">🥛</div>,
                title: "Traditional Taste",
                description:
                  "The rich, creamy flavor you remember from childhood.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-rose-50 p-6 rounded-xl text-center hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-rose-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-rose-800 mb-12 text-center">
          Meet the Milk Pukki Family
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "some one",
              role: "Founder",
              image: "/",
              bio: "Still milks cows at 4am every morning. 'Retirement' isn't in his vocabulary.",
            },
            {
              name: "some one",
              role: "Head of Production",
              image: "/",
              bio: " Makes the creamiest yogurt.",
            },
            {
              name: "some one",
              role: "Delivery & Operations",
              image: "/",
              bio: "Knows every customer by name and their usual order by heart.",
            },
            {
              name: "Bessie & Daisy",
              role: "Chief Grazing Officers",
              image: "/farm-cows.jpg",
              bio: "Our original cows' great-granddaughters. Produce the sweetest milk.",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-rose-800">
                  {member.name}
                </h3>
                <p className="text-amber-600 mb-3">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-rose-800 mb-6">
            Taste the Milk Pukki Difference
          </h2>
          <p className="text-xl text-rose-700 mb-8 max-w-2xl mx-auto">
            Visit our farm store or order fresh delivery to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition">
              <Link href="/products"> Shop Our Products</Link>
            </button>
            <button className="bg-white hover:bg-rose-50 text-rose-700 font-semibold py-3 px-8 rounded-full shadow-lg border border-rose-200 transition">
              <Link href="/contact">Visit the Farm</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
