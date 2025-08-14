"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FiTruck,
  FiUser,
  FiPhone,
  FiMapPin,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import Image from "next/image";

interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
}

interface UserSession {
  user?: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
  };
}

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) throw new Error("Failed to fetch session");

        const session: UserSession = await response.json();

        if (session?.user) {
          const phoneNumber = session.user.email
            ? session.user.email.replace(/@.*$/, "")
            : "";
          setShippingInfo({
            name: session.user.name || "",
            phone: phoneNumber || "",
            address: session.user.image || "",
          });
        }
      } catch (error) {
        console.error("Session fetch error:", error);
        toast.error("Failed to load your saved information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleShippingInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Validation
    if (!shippingInfo.name || shippingInfo.name.trim() === "") {
      toast.error("Please provide your name.");
      setIsProcessing(false);
      return;
    }
    if (!shippingInfo.phone) {
      toast.error("Please provide your phone number.");
      setIsProcessing(false);
      return;
    }
    if (shippingInfo.phone.length !== 9 && shippingInfo.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      setIsProcessing(false);
      return;
    }
    if (!/^(09|07|9|7)\d{7,8}$/.test(shippingInfo.phone)) {
      toast.error("Enter Valid phone number!");
      setIsProcessing(false);
      return;
    }
    if (!shippingInfo.address || shippingInfo.address.trim() === "") {
      toast.error("Please provide your address.");
      setIsProcessing(false);
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
        shippingInfo: {
          name: shippingInfo.name,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
        },
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Checkout failed");
      }

      clearCart();
      toast.success(
        <div>
          <p className="font-bold">Order placed successfully!</p>
          <p>Shipping to: {shippingInfo.name}</p>
        </div>
      );

      router.push("/dashboard/orders");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <title>Checkout| Pukki milk</title>

        <div className="text-center">
          <p className="text-rose-800 text-lg">Your cart is empty</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-rose-800">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center text-rose-600 mb-6 hover:text-rose-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-rose-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-rose-800 mb-6 flex items-center gap-2">
              <FiTruck /> Shipping Information
            </h2>
            <p className="block text-sm font-bold italic text-red-400 mb-1">
              NB : If you want change the shipping Information you can edit
              these below boxes..
            </p>
            <hr className="text-rose-600 my-3" />
            <div className="space-y-4 mt-3.5">
              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-rose-800" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleShippingInfoChange}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-rose-800"
                    placeholder="Abebe Kebede"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">
                  Phone *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-rose-800" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingInfoChange}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-rose-800"
                    placeholder="0912345678 or 0712345678"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-700 mb-1">
                  Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-rose-800" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-rose-800"
                    placeholder="Bole Edna Mall"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-rose-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 pb-4 border-b"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-rose-800">{item.name}</h4>
                    <p className="text-gray-600">ETB {item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-rose-700">× {item.quantity}</div>
                  <div className="font-medium text-rose-800">
                    ETB {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-rose-200 pt-4">
              <div className="flex justify-between">
                <span className="text-rose-700">Subtotal</span>
                <span className="text-rose-800">ETB {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-700">Tax (15%)</span>
                <span className="text-rose-800">ETB {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span className="text-rose-800">Total</span>
                <span className="text-rose-600">ETB {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full mt-6 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition shadow-md flex items-center justify-center ${
                isProcessing ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
