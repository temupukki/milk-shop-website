"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductsPage() {

  const [activeFilter, setActiveFilter] = useState('All');


  const products = [
    {
      id: 1,
      name: "Fresh Whole Milk",
      price: 3.99,
      category: "Milk",
      rating: 4.8,
      image: "/milk7.jpg",
      description: "Creamy, full-fat milk from grass-fed cows."
    },
    {
      id: 2,
      name: "Strawberry Yogurt",
      price: 2.49,
      category: "Yogurt",
      rating: 4.5,
      image: "/milk11.jpg",
      description: "Smooth yogurt with real strawberry bits."
    },
    {
      id: 3,
      name: "Farmhouse Cheddar",
      price: 5.99,
      category: "Cheese",
      rating: 4.9,
      image: "/milk8.jpg",
      description: "Aged for 6 months, rich and tangy."
    },
    {
      id: 4,
      name: "Lactose-Free Milk",
      price: 4.49,
      category: "Milk",
      rating: 4.7,
      image: "/milk3.jpg",
      description: "All the goodness without discomfort."
    },
    {
      id: 5,
      name: "Greek Yogurt",
      price: 3.29,
      category: "Yogurt",
      rating: 4.6,
      image: "/milk9.jpg",
      description: "High-protein, thick & creamy."
    },
    {
      id: 6,
      name: "Organic Butter",
      price: 6.99,
      category: "Butter",
      rating: 4.8,
      image: "/milk4.jpg",
      description: "Rich, creamy, and perfect for baking."
    },
    {
      id: 7,
      name: "Chocolate Milk",
      price: 4.29,
      category: "Milk",
      rating: 4.7,
      image: "/milk2.jpg",
      description: "Creamy chocolate flavor with less sugar."
    },
    {
      id: 8,
      name: "Blueberry Yogurt",
      price: 2.59,
      category: "Yogurt",
      rating: 4.4,
      image: "/milk10.jpg",
      description: "Packed with antioxidant-rich blueberries."
    }
  ];


  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <div className="min-h-screen bg-rose-50">
  
      <main className="container mx-auto px-4 py-8">
     
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-rose-800 mb-4">Our Dairy Products</h2>
          <div className="flex flex-wrap gap-2">
            {['All', 'Milk', 'Yogurt', 'Cheese', 'Butter'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full transition ${
                  activeFilter === category
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-rose-800 hover:bg-rose-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-rose-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center mb-3">
                  <FiStar className="text-amber-400 mr-1" />
                  <span className="text-gray-700">{product.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-rose-600">${product.price.toFixed(2)}</span>
                  <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 rounded-lg transition">
                    <Link href="/sign-in">Add to cart</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

     
        <div className="mt-16 text-center text-gray-600">
          <p>Milk Haven - Premium Dairy Products</p>
        </div>
      </main>
    </div>
  );
}