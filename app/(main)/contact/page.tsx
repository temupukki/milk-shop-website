"use client";
import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "sonner";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          `Thanks for your message, ${formData.name}! We'll respond soon.`
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <title>Contact | Pukki Milk</title>
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative h-48 sm:h-64 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="text-center z-10 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-800 mb-3 sm:mb-4">
            Contact Pukki milk
          </h1>
          <p className="text-lg sm:text-xl text-rose-700">
            We'd love to hear from you!
          </p>
        </div>
      </section>


      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-rose-800 mb-4 sm:mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm sm:text-base text-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm sm:text-base text-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm sm:text-base text-black"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-rose-800 mb-4 sm:mb-6">
                Our Information
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="text-rose-600 mr-3 sm:mr-4 mt-0.5">
                    <FaMapMarkerAlt className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">Farm Address</h3>
                    <p className="text-gray-700 text-sm sm:text-base">Addis Ababa, Akaki Kality Subcity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-rose-600 mr-3 sm:mr-4 mt-0.5">
                    <FaPhone className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">Phone</h3>
                    <p className="text-gray-700 text-sm sm:text-base">+251 9999999999</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Mon-Fri, 2am-11pm LT
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-rose-600 mr-3 sm:mr-4 mt-0.5">
                    <FaEnvelope className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-700 text-sm sm:text-base">hello@milk.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-rose-600 mr-3 sm:mr-4 mt-0.5">
                    <FaClock className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                      Farm Store Hours
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base">Monday-Friday: 2am-11am</p>
                    <p className="text-gray-700 text-sm sm:text-base">Saturday: 9am-4pm</p>
                    <p className="text-gray-700 text-sm sm:text-base">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-rose-800 mb-4 sm:mb-6">
                Connect With Us
              </h2>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition active:scale-95"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-lg sm:text-xl" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 sm:p-3 rounded-full hover:opacity-90 transition active:scale-95"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg sm:text-xl" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 transition active:scale-95"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-lg sm:text-xl" />
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white p-2 sm:p-3 rounded-full hover:bg-blue-600 transition active:scale-95"
                  aria-label="Telegram"
                >
                  <FaTelegram className="text-lg sm:text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-rose-100 to-amber-100 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-800 mb-3 sm:mb-4">
            Have Questions?
          </h2>
          <p className="text-lg sm:text-xl text-rose-700 mb-4 sm:mb-6 max-w-2xl mx-auto">
            We're here to help! Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="tel:+2519123456789"
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 sm:py-3 px-6 rounded-full shadow-lg transition active:scale-95 inline-block text-center"
            >
              Call Us
            </a>
            <a
              href="mailto:hello@milk.com"
              className="bg-white hover:bg-rose-50 text-rose-700 font-semibold py-2 sm:py-3 px-6 rounded-full shadow-lg border border-rose-200 transition active:scale-95 inline-block text-center"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}