
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CategoryShowcase from '../components/CategoryShowcase';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm p-8">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-800">
              Discover Quality Products For Your Lifestyle
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our curated collection of premium products designed to enhance your everyday experience.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/products">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products?category=featured">
                <Button variant="outline" size="lg" className="border-indigo-300 text-indigo-700 hover:bg-indigo-100 transition-colors shadow-sm hover:shadow-md">
                  Featured Items
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170"
                alt="Premium Products" 
                className="rounded-lg object-cover w-full aspect-[4/3] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Category Showcases */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8">
          <CategoryShowcase />
        </div>
        
        {/* Call to action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 sm:p-12 my-16 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Elevate Your Shopping Experience?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered their favorite products through our store.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 transition-colors shadow-md hover:shadow-lg">
              Explore All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
