
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => fetchFeaturedProducts(),
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-black/10 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container relative z-10">
          <div className="max-w-xl animate-slide-up">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-6">
              New Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Timeless Elegance
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8">
              Explore our curated collection of premium products designed with simplicity, quality, and function in mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="btn btn-primary btn-lg"
              >
                Shop Now
              </Link>
              <Link 
                to="/products?category=new" 
                className="btn btn-ghost btn-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              >
                Explore New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              View All <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-square mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts && featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Category Highlights */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-medium mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              to="/products?category=electronics" 
              className="relative group overflow-hidden rounded-lg aspect-square bg-gray-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                alt="Electronics" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h3 className="text-xl font-medium text-white">Electronics</h3>
              </div>
            </Link>
            
            <Link 
              to="/products?category=fashion" 
              className="relative group overflow-hidden rounded-lg aspect-square bg-gray-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1493787039806-2edcbe808750?auto=format&fit=crop&q=80" 
                alt="Fashion" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h3 className="text-xl font-medium text-white">Fashion</h3>
              </div>
            </Link>
            
            <Link 
              to="/products?category=home" 
              className="relative group overflow-hidden rounded-lg aspect-square bg-gray-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1493755904350-4c4a71435b9e?auto=format&fit=crop&q=80" 
                alt="Home & Living" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h3 className="text-xl font-medium text-white">Home & Living</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-accent rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter to receive updates on new products, special offers, and more.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
                <button type="submit" className="btn btn-primary btn-md whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
