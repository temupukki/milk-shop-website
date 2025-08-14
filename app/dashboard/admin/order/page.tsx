"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from "react-icons/fi";
import InvoicePdfGenerator from "@/components/OrderDetailsButton";
import { toast } from "sonner";
import { User } from "lucide-react";

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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  // Filter states
  const [filterDate, setFilterDate] = useState<string>("");
  const [userIdFilter, setUserIdFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filterDate, userIdFilter, statusFilter]);

  const applyFilters = () => {
    let result = [...orders];

    // Date filter
    if (filterDate) {
      const selectedDate = new Date(filterDate);
      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getFullYear() === selectedDate.getFullYear() &&
          orderDate.getMonth() === selectedDate.getMonth() &&
          orderDate.getDate() === selectedDate.getDate()
        );
      });
    }

    // User ID filter
    if (userIdFilter) {
      result = result.filter((order) =>
        order.userId.toLowerCase().includes(userIdFilter.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(result);
  };

  const handleClearFilters = () => {
    setFilterDate("");
    setUserIdFilter("");
    setStatusFilter("");
    setShowFilters(false);
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/deliver`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (res.ok) {
        toast.success(`Order marked as ${newStatus.toLowerCase()}`);
        // Update local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      toast.error("Error updating order status");
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

        {/* Filter Controls */}
        <div className="flex flex-col items-center mb-12 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition"
          >
            {showFilters ? <FiX size={18} /> : <FiFilter size={18} />}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {showFilters && (
            <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rose-800">
                    Filter by date:
                  </label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-rose-50 text-red-800 border border-rose-200"
                    max={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>

                {/* User ID Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rose-800">
                    Filter by User ID:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter user ID"
                    value={userIdFilter}
                    onChange={(e) => setUserIdFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-rose-50 text-red-800 border border-rose-200"
                  />
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rose-800">
                    Filter by Status:
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
                    className="w-full px-4 py-2 rounded-lg bg-rose-50 text-red-800 border border-rose-200"
                  >
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              {(filterDate || userIdFilter || statusFilter) && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition flex items-center gap-2"
                  >
                    <FiX size={16} />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
           <title>Order Management| Pukki milk</title>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">
                    User ID
                  </th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                          #{order.userId.slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-600">
                          {format(
                            new Date(order.createdAt),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-600">
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                          ETB {order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status.toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <button
                            onClick={() => toggleOrderDetails(order.id)}
                            className="text-rose-600 hover:text-rose-800 p-1"
                          >
                            {expandedOrder === order.id ? (
                              <FiChevronUp className="h-5 w-5" />
                            ) : (
                              <FiChevronDown className="h-5 w-5" />
                            )}
                          </button>

                          {order.status === "PROCESSING" && (
                            <>
                              <InvoicePdfGenerator order={order} />
                              <button
                                onClick={() => handleStatusChange(order.id, "DELIVERED")}
                                className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                              >
                                Mark Delivered
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr className="bg-rose-50">
                          <td colSpan={7} className="px-6 py-4">
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
                      colSpan={7}
                      className="px-6 py-4 text-center text-sm text-rose-600"
                    >
                      No orders found matching your filters
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