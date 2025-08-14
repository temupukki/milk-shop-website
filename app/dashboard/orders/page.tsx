"use client";

import React, { useState, useEffect } from "react";
import { format, differenceInMilliseconds, addMinutes, addHours } from "date-fns";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast } from "sonner";
import InvoicePdfGenerator from "@/components/OrderDetailsButton";
import DeleteorderButton from "@/components/delete-order-button";

type OrderItem = {
  id: string;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
};

type Shipping = {
  id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
};

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type Order = {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shipping?: Shipping;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState<string | null>(
    null
  );
  const [countdowns, setCountdowns] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/user/order");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);

        // Initialize countdowns for pending orders
        const pendingOrders = data.filter(
          (order: Order) => order.status === "PENDING"
        );
        const newCountdowns: Record<string, string> = {};

        pendingOrders.forEach((order: Order) => {
          const createdAt = new Date(order.createdAt);
          const expirationTime = addMinutes(createdAt, 1440);
          const now = new Date();

          if (now > expirationTime) {
       
            return;
          }

          const timeLeft = differenceInMilliseconds(expirationTime, now);
          newCountdowns[order.id] = formatCountdown(timeLeft);
        });

        setCountdowns(newCountdowns);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
   
    const interval = setInterval(() => {
      const now = new Date();
      const updatedCountdowns: Record<string, string> = {};
      let needsUpdate = false;

      Object.keys(countdowns).forEach((orderId) => {
        const order = orders.find((o) => o.id === orderId);
        if (order && order.status === "PENDING") {
          const createdAt = new Date(order.createdAt);
          const expirationTime = addMinutes(createdAt,1440);
          const timeLeft = differenceInMilliseconds(expirationTime, now);

          if (timeLeft <= 0) {
            needsUpdate = true;
          } else {
            updatedCountdowns[orderId] = formatCountdown(timeLeft);
          }
        }
      });

      if (Object.keys(updatedCountdowns).length > 0) {
        setCountdowns(updatedCountdowns);
      }

      if (needsUpdate) {
        checkForExpiredOrders();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdowns, orders]);

  const checkForExpiredOrders = async () => {
    const now = new Date();
    const expiredOrders = orders.filter((order) => {
      if (order.status !== "PENDING") return false;
      const createdAt = new Date(order.createdAt);
      const expirationTime = addMinutes(createdAt, 1440); // same expiration time
      return now > expirationTime;
    });

    if (expiredOrders.length > 0) {
      try {
        // Pass orderId in DELETE body properly
        await Promise.all(
          expiredOrders.map((order) =>
            fetch(`/api/expired-order`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: order.id }),
            })
          )
        );

        // Update local state
        const updatedOrders = orders.filter(
          (order) => !expiredOrders.some((expired) => expired.id === order.id)
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);

        // Remove from countdowns
        const updatedCountdowns = { ...countdowns };
        expiredOrders.forEach((order) => delete updatedCountdowns[order.id]);
        setCountdowns(updatedCountdowns);

        toast.info(`Deleted ${expiredOrders.length} expired pending orders`);
      } catch (error) {
        toast.error("Failed to delete expired orders");
      }
    }
  };

  const formatCountdown = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    if (!filterDate) {
      setFilteredOrders(orders);
      return;
    }

    const selectedDate = new Date(filterDate);
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getFullYear() === selectedDate.getFullYear() &&
        orderDate.getMonth() === selectedDate.getMonth() &&
        orderDate.getDate() === selectedDate.getDate()
      );
    });
    setFilteredOrders(filtered);
  }, [filterDate, orders]);

  const handleClearFilter = () => {
    setFilterDate("");
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handlePayment = async (orderId: string, amount: number) => {
    setProcessingPayment(orderId);
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          currency: "ETB",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const { data } = await response.json();

      window.location.href =
        "https://checkout.chapa.co/checkout/payment/V38JyhpTygC9QimkJrdful9oEjih0heIv53eJ1MsJS6xG";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setProcessingPayment(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-rose-800 text-lg">Loading orders...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-rose-50 pb-20">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-rose-800 text-center mb-2">
          Order History
        </h1>
        <p className="text-rose-600 text-center mb-8">Your Past Purchases</p>
        <p className="text-red-800 text-center mb-8 font-bold uppercase text-2xl">
          NB: make sure the items are delivered correctly before pressing
          delivered button.
        </p>

        {/* Filter Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap gap-2 bg-white text-red-800 p-2 rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <label htmlFor="filterDate" className="text-sm">
                Filter by date:
              </label>
              <input
                type="date"
                id="filterDate"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-2 rounded-full bg-rose-50 text-red-800"
                max={format(new Date(), "yyyy-MM-dd")}
              />
            </div>

            {filterDate && (
              <button
                onClick={handleClearFilter}
                className="px-4 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-rose-50 transition-colors">
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800 cursor-pointer"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          #{order.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-rose-600 cursor-pointer"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          {format(
                            new Date(order.createdAt),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-rose-600 cursor-pointer"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800 cursor-pointer"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          ETB {order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                                order.status
                              )}`}
                            >
                              {order.status.toLowerCase()}
                            </span>
                            {order.status === "PENDING" &&
                              countdowns[order.id] && (
                                <span className="text-xs text-red-600 mt-1">
                                  Pay in: {countdowns[order.id]}
                                </span>
                              )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <button
                            onClick={() => toggleOrderDetails(order.id)}
                            className="text-rose-600 hover:text-rose-800"
                          >
                            {expandedOrder === order.id ? (
                              <FiChevronUp className="h-5 w-5" />
                            ) : (
                              <FiChevronDown className="h-5 w-5" />
                            )}
                          </button>
                          {order.status === "PENDING" && (
                            <button
                              onClick={() =>
                                handlePayment(order.id, order.total)
                              }
                              disabled={processingPayment === order.id}
                              className={`px-3 py-1 rounded-full text-xs ${
                                processingPayment === order.id
                                  ? "bg-gray-300 text-gray-600"
                                  : "bg-rose-600 text-white hover:bg-rose-700"
                              }`}
                            >
                              {processingPayment === order.id
                                ? "Processing..."
                                : "Pay Now"}
                            </button>
                          )}
                          {order.status === "PROCESSING" && (
                            <InvoicePdfGenerator order={order} />
                          )}
                          {order.status === "PENDING" && (
                            <DeleteorderButton orderId={order.id} />
                          )}
                          {order.status === "PROCESSING" && (
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(
                                    `/api/orders/${order.id}/deliver`,
                                    {
                                      method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        status: "DELIVERED",
                                      }),
                                    }
                                  );

                                  if (res.ok) {
                                    toast.success("Order marked as delivered");
                                    window.location.reload(); // or update state instead
                                  } else {
                                    toast.error(
                                      "Failed to update order status"
                                    );
                                  }
                                } catch (err) {
                                  toast.error("Error updating order status");
                                }
                              }}
                              className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                              DELIVERED
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr className="bg-rose-50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-medium text-rose-800 mb-2">
                                  Shipping Information
                                </h3>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                  {order.shipping ? (
                                    <>
                                      <p className="text-rose-600">
                                        <strong>Name:</strong>{" "}
                                        {order.shipping.name}
                                      </p>
                                      <p className="text-rose-600">
                                        <strong>Phone:</strong>{" "}
                                        {order.shipping.phone}
                                      </p>
                                      <p className="text-rose-600">
                                        <strong>Address:</strong>{" "}
                                        {order.shipping.address}
                                      </p>
                                      <p className="text-rose-600">
                                        <small>
                                          Created at:{" "}
                                          {format(
                                            new Date(order.shipping.createdAt),
                                            "MMM dd, yyyy HH:mm"
                                          )}
                                        </small>
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-rose-600">
                                      No shipping information available
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-rose-800 mb-2">
                                  Order Items
                                </h3>
                                <div className="space-y-4">
                                  {order.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex items-center bg-white p-4 rounded-lg shadow-sm"
                                    >
                                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                                        <img
                                          src={item.product.image}
                                          alt={item.product.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div className="ml-4 flex-1">
                                        <h4 className="text-sm font-medium text-rose-800">
                                          {item.product.name}
                                        </h4>
                                        <p className="text-sm text-rose-600">
                                          ETB {item.product.price.toFixed(2)} ×{" "}
                                          {item.quantity}
                                        </p>
                                      </div>
                                      <div className="ml-4">
                                        <p className="text-sm font-medium text-rose-800">
                                          ETB{" "}
                                          {(
                                            item.product.price * item.quantity
                                          ).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm text-rose-600"
                    >
                      No orders found{" "}
                      {filterDate
                        ? `on ${format(new Date(filterDate), "MMM dd, yyyy")}`
                        : ""}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function getStatusStyle(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-800";
    case "PROCESSING":
      return "bg-blue-100 text-blue-800";
    case "SHIPPED":
      return "bg-purple-100 text-purple-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
