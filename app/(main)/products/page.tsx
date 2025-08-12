"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-rose-800 text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <div className="text-rose-800 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50">
       <title> Products | Milk Pukki</title>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-rose-800 mb-6">Our Dairy Products</h2>
          
          {/* Centered filter buttons with better spacing */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
            {['All', 'Milk', 'Yogurt', 'Cheese', 'Butter'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full transition text-sm sm:text-base ${
                  activeFilter === category
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-rose-800 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-rose-800 text-lg">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition hover:scale-[1.02]">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={product.id <= 4}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-rose-800 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center mb-3">
                    <FiStar className="text-amber-400 mr-1" />
                    <span className="text-gray-700">{product.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-rose-600">ETB {product.price.toFixed(2)}</span>
                    <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 rounded-lg transition text-sm sm:text-base">
                      <Link href="/sign-in">Add to cart</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}