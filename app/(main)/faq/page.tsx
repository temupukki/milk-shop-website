"use client";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaShoppingCart,
  FaLeaf,
  FaTruck,
} from "react-icons/fa";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      name: "Products & Orders",
      icon: <FaShoppingCart className="text-rose-600" />,
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "You can order directly through our website, by phone at +25199999999, or in person at our stores. Online orders require an account for tracking purposes.",
        },
        {
          question: "What's your return policy?",
          answer:
            "Due to the perishable nature of dairy products, we can't accept returns. However, if you're unsatisfied with any product, contact us within 24 hours for a full refund or replacement.",
        },
        {
          question: "Do you offer subscriptions?",
          answer:
            "Yes! Our Milk Delivery Club offers weekly or bi-weekly deliveries of your favorite products with 10% off and free delivery.",
        },
      ],
    },
    {
      name: "Delivery & Shipping",
      icon: <FaTruck className="text-amber-600" />,
      questions: [
        {
          question: "What areas do you deliver to?",
          answer:
            "We currently deliver in Addis Ababa only , We're expanding regularly!",
        },
        {
          question: "How are products kept cold during delivery?",
          answer:
            "All deliveries use insulated coolers with ice packs to maintain proper temperatures. Our drivers are trained in food safety handling.",
        },
        {
          question: "Can I schedule a specific delivery time?",
          answer:
            "We offer morning (8am-12pm) and afternoon (12pm-5pm) delivery windows. You'll receive a notification when your driver is en route.",
        },
      ],
    },
    {
      name: "Farm & Sustainability",
      icon: <FaLeaf className="text-green-600" />,
      questions: [
        {
          question: "Are your cows pasture-raised?",
          answer:
            "Absolutely! Our herd enjoys 300 days/year on pasture with access to organic feed. We never use growth hormones or routine antibiotics.",
        },
        {
          question: "What makes your milk organic?",
          answer:
            "We meet all USDA Organic standards: non-GMO feed, no synthetic pesticides on pastures, and humane animal treatment. We're also Certified Humane®.",
        },
        {
          question: "Can I visit the farm?",
          answer:
            "Yes! We offer public tours every Saturday at 10am and 2pm. Private tours can be booked for groups of 8+ by calling ahead.",
        },
      ],
    },
    
  ];

  return (
    <div className="min-h-screen bg-rose-50">
      <title>FAQ | Milk Pukki</title>
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl font-bold text-rose-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-rose-700">
            Find answers about our dairy products and farm
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-rose-50 p-6 flex items-center">
                <div className="mr-4 text-2xl">{category.icon}</div>
                <h2 className="text-2xl font-bold text-rose-800">
                  {category.name}
                </h2>
              </div>

              {/* Questions */}
              <div className="divide-y divide-rose-100">
                {category.questions.map((item, index) => {
                  const questionIndex = catIndex * 10 + index;
                  return (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleQuestion(questionIndex)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.question}
                        </h3>
                        {activeIndex === questionIndex ? (
                          <FaChevronUp className="text-rose-600 ml-4" />
                        ) : (
                          <FaChevronDown className="text-rose-600 ml-4" />
                        )}
                      </button>
                      {activeIndex === questionIndex && (
                        <div className="mt-4 text-gray-700">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-rose-800 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We&apos;re happy to help! Contact our friendly team for personalized
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
            >
              Contact Us
            </a>
           
          </div>
        </div>
      </section>
    </div>
  );
}
