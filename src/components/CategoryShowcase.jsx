
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';
import ProductInventory from './ProductInventory';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

const categories = [
  { id: 'electronics', name: 'Electronics', description: 'Latest tech gadgets and devices' },
  { id: 'fashion', name: 'Fashion', description: 'Stylish clothing and accessories' },
  { id: 'home', name: 'Home & Living', description: 'Beautiful items for your home' },
];

const CategoryShowcase = () => {
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ['products-all'],
    queryFn: () => fetchProducts({}),
  });
  
  if (isLoading) {
    return (
      <div className="py-8">
        <Progress value={45} className="w-full" />
        <div className="text-center mt-4">Loading product categories...</div>
      </div>
    );
  }
  
  // Count products per category
  const productCounts = allProducts?.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="space-y-20 py-12">
      {categories.map(category => (
        <section key={category.id} className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-medium">{category.name}</h2>
              <p className="text-muted-foreground mt-2">{category.description}</p>
            </div>
            <Link to={`/products?category=${category.id}`}>
              <Button variant="outline">
                View All
                <span className="ml-1 text-sm text-muted-foreground">
                  ({productCounts?.[category.id] || 0})
                </span>
              </Button>
            </Link>
          </div>
          
          <ProductInventory 
            category={category.id} 
            limit={4} 
            showViewAll={false}
          />
        </section>
      ))}
    </div>
  );
};

export default CategoryShowcase;
