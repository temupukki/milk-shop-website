"use client";
import Image from "next/image";
import {
  FiShoppingCart,
  FiStar,
  FiX,
  FiPlus,
  FiMinus,
  FiCheck,
} from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  description: string;
  stock?: number;
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingProductId, setAddingProductId] = useState<number | null>(null);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const router = useRouter();

  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const updateProductStock = async (
    productId: number,
    quantityChange: number
  ) => {
    try {
      const response = await fetch("/api/updateStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity: quantityChange,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update stock");
      }

      const { updatedProduct } = await response.json();
      return updatedProduct;
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (product.stock === 0) {
      toast.warning("This product is out of stock");
      return;
    }

    setAddingProductId(product.id);

    try {
      // Check if item already in cart
      const cartItem = cartItems.find((item) => item.id === product.id);

      if (cartItem) {
        // If already in cart, just increase quantity without decreasing stock again
        updateQuantity(product.id, 1);
      } else {
        // If not in cart, decrease stock by 1 and add to cart
        const updatedProduct = await updateProductStock(product.id, -1);
        setProducts(
          products.map((p) =>
            p.id === product.id ? { ...p, stock: updatedProduct.stock } : p
          )
        );
        addToCart(product);
      }

      setAddedProductId(product.id);
      setTimeout(() => setAddedProductId(null), 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    } finally {
      setAddingProductId(null);
    }
  };

  const handleIncreaseQuantity = async (productId: number) => {
    const product = products.find((p) => p.id === productId);
    const cartItem = cartItems.find((item) => item.id === productId);

    // Check if stock is less than 1 (either 0 or negative)
    if (product.stock < 1) {
      toast.warning("This product is out of stock");
      return;
    }

    try {
      const updatedProduct = await updateProductStock(productId, -1);
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, stock: updatedProduct.stock } : p
        )
      );
      updateQuantity(productId, 1);
    } catch (error: any) {
      toast.error(error.message || "Failed to update quantity");
    }
  };

  const handleDecreaseQuantity = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (!cartItem) return;

    try {
      if (cartItem.quantity === 1) {
        await handleRemoveFromCart(productId);
        return;
      }

      // Increase stock by 1 when decreasing quantity
      const updatedProduct = await updateProductStock(productId, 1);
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, stock: updatedProduct.stock } : p
        )
      );
      updateQuantity(productId, -1);
    } catch (error: any) {
      toast.error(error.message || "Failed to decrease quantity");
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (!cartItem) return;

    try {
      // Return all quantities of this item to stock
      const updatedProduct = await updateProductStock(
        productId,
        cartItem.quantity
      );
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, stock: updatedProduct.stock } : p
        )
      );
      removeFromCart(productId);
    } catch (error: any) {
      toast.error(error.message || "Failed to remove item");
    }
  };

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    router.push("/dashboard/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-rose-800 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 pb-20">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-rose-800 text-center mb-2">
          Milk Haven
        </h1>
        <p className="text-rose-600 text-center mb-8">Premium Dairy Products</p>

        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap gap-2 bg-white text-red-800 p-2 rounded-full shadow-sm">
            {["All", "Milk", "Yogurt", "Cheese", "Butter"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full transition ${
                  activeFilter === category
                    ? "bg-rose-600 text-white"
                    : "hover:bg-rose-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-rose-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        fill={
                          i < Math.floor(product.rating || 0)
                            ? "currentColor"
                            : "none"
                        }
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 text-sm">
                    {product.rating?.toFixed(1) || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-rose-600">
                    ETB {product.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${
                      (product.stock || 0) > 5
                        ? "text-green-600"
                        : (product.stock || 0) > 0
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.stock || 0} in stock
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={
                    !product.stock ||
                    product.stock <= 0 ||
                    addingProductId === product.id
                  }
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 ${
                    !product.stock || product.stock <= 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : addingProductId === product.id
                      ? "bg-rose-700 text-white"
                      : addedProductId === product.id
                      ? "bg-green-500 text-white animate-pulse"
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                  }`}
                >
                  {addingProductId === product.id ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Adding...
                    </>
                  ) : addedProductId === product.id ? (
                    <>
                      <FiCheck className="mr-1" size={16} />
                      Added!
                    </>
                  ) : (
                    <>
                      <FiPlus size={16} />
                      {!product.stock || product.stock <= 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all"
      >
        <FiShoppingCart size={20} />
        <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        <span>View Cart</span>
      </button>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-rose-800">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-rose-600 p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <FiShoppingCart size={48} className="mb-4" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    const remainingStock = product?.stock || 0;

                    return (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-rose-800">
                            {item.name}
                          </h4>
                          <p className="text-gray-600">
                            ETB {item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="w-8 h-8 flex items-center justify-center bg-rose-100 text-rose-600 rounded hover:bg-rose-200 transition"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="w-8 text-center text-rose-600">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              disabled={remainingStock < 1}
                              className={`w-8 h-8 flex items-center justify-center rounded transition ${
                                remainingStock <= 1
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                              }`}
                            >
                              <FiPlus size={14} />
                            </button>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              remainingStock > 5
                                ? "text-green-600"
                                : remainingStock > 0
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {remainingStock > 0
                              ? `${remainingStock} remaining in stock`
                              : "No more in stock"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-black">Subtotal:</span>
                    <span className="font-medium text-black">
                      ETB {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Tax (15%):</span>
                    <span className="font-medium text-black">
                      ETB {tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <span className="text-rose-800">Total:</span>
                    <span className="text-rose-600">
                      ETB {total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}