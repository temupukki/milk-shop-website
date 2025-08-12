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
       <title>Contact | Milk Pukki</title>
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl font-bold text-rose-800 mb-4">
            Contact Milk Pukki
          </h1>
          <p className="text-xl text-rose-700">We&apos;d love to hear from you!</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3  text-red-700 font-bold rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-red-700 font-bold border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                 
                  className="w-full px-4 py-3  text-red-700 font-bold borderrounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-rose-800 mb-6">
                Our Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-rose-600 mr-4 mt-1">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Farm Address</h3>
                    <p className="text-gray-700">Addis Ababa, Akaki Kality Subcity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-rose-600 mr-4 mt-1">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Phone</h3>
                    <p className="text-gray-700">+251 9123456789</p>
                    <p className="text-sm text-gray-500">
                      Mon-Fri, 2am-11pm LT
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-rose-600 mr-4 mt-1">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Email</h3>
                    <p className="text-gray-700">hello@milk.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-rose-600 mr-4 mt-1">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Farm Store Hours
                    </h3>
                    <p className="text-gray-700">Monday-Friday: 2am-11am</p>
                    <p className="text-gray-700">Saturday: 9am-4pm</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-rose-800 mb-6">
                Connect With Us
              </h2>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:opacity-90 transition"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white p-3 rounded-full hover:bg-gray-800 transition"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
                >
                  <FaTelegram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-rose-100 to-amber-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-rose-800 mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-rose-700 mb-6 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:temesgengashaw8@gmail.com"
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
