
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CategoryShowcase from '../components/CategoryShowcase';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Discover Quality Products For Your Lifestyle
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our curated collection of premium products designed to enhance your everyday experience.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link to="/products?category=featured">
              <Button variant="outline" size="lg">Featured Items</Button>
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170"
              alt="Premium Products" 
              className="rounded-lg object-cover w-full aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Category Showcases */}
      <CategoryShowcase />
      
      {/* Call to action */}
      <div className="bg-muted rounded-xl p-8 sm:p-12 my-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Shopping Experience?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have discovered their favorite products through our store.
        </p>
        <Link to="/products">
          <Button size="lg">Explore All Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
