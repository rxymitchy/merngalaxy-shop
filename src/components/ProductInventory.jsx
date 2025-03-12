
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import { ChevronRightIcon } from 'lucide-react';
import { Progress } from './ui/progress';

const ProductInventory = ({ category, limit = 4, showViewAll = true }) => {
  const [progress, setProgress] = useState(0);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category, 'limited'],
    queryFn: () => fetchProducts({ category, limit }),
  });
  
  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 90);
          return newProgress;
        });
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading, progress]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Progress value={progress} className="w-full h-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-lg aspect-square mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!products || products.length === 0) {
    return <div>No products available in this category.</div>;
  }
  
  const displayProducts = products.slice(0, limit);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {showViewAll && products.length > limit && (
        <div className="flex justify-center mt-6">
          <Link 
            to={`/products?category=${category}`}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View all {category} products
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductInventory;
