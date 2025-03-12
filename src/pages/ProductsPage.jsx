
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Progress } from '@/components/ui/progress';
import { FilterIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category, sortBy],
    queryFn: () => fetchProducts({ category, sortBy }),
  });
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(10);
  
  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter(product => 
          (!priceRange.min || product.price >= priceRange.min) && 
          (!priceRange.max || product.price <= priceRange.max)
        )
      );
    }
  }, [products, priceRange]);
  
  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoadingProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 15, 90);
          return newProgress;
        });
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setLoadingProgress(100);
    }
  }, [isLoading, loadingProgress]);
  
  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
  };
  
  const handleSortChange = (e) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };
  
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value ? parseInt(value) : type === 'min' ? 0 : null
    }));
  };
  
  const handleClearFilters = () => {
    setSearchParams({});
    setPriceRange({ min: 0, max: 1000 });
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  // Categories for filter
  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'new', name: 'New Arrivals' },
    { id: 'featured', name: 'Featured' },
  ];
  
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-medium mb-4">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
        </h1>
        
        {isLoading && <Progress value={loadingProgress} className="mb-8" />}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filters button */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={toggleFilters}
              className="flex items-center gap-2 btn btn-ghost border"
            >
              <FilterIcon className="h-4 w-4" />
              {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters sidebar - hidden on mobile unless toggled */}
          <div className={`
            ${isFiltersOpen ? 'block' : 'hidden'} 
            lg:block lg:w-64 flex-shrink-0
          `}>
            <div className="sticky top-20 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Filters</h3>
                <button 
                  onClick={handleClearFilters}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear all
                </button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        category === cat.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="flex gap-2">
                  <div>
                    <label htmlFor="min-price" className="sr-only">Min Price</label>
                    <input
                      id="min-price"
                      type="number"
                      placeholder="Min"
                      min="0"
                      value={priceRange.min || ''}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">Max Price</label>
                    <input
                      id="max-price"
                      type="number"
                      placeholder="Max"
                      min="0"
                      value={priceRange.max || ''}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                {filteredProducts ? `Showing ${filteredProducts.length} products` : 'Loading products...'}
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                </select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-muted rounded-lg aspect-square mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or browse our other categories
                </p>
                <button 
                  onClick={handleClearFilters} 
                  className="btn btn-primary btn-md"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
