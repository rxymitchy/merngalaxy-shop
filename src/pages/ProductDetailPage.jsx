
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../context/CartContext';
import { fetchProductById, fetchSimilarProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ChevronRightIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });
  
  const { data: similarProducts } = useQuery({
    queryKey: ['similarProducts', product?.category],
    queryFn: () => product ? fetchSimilarProducts(product.category, id) : [],
    enabled: !!product,
  });
  
  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [id]);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-pulse bg-muted rounded-lg aspect-square"></div>
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-12 bg-muted rounded w-full mt-8"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-medium mb-4">Product not found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products" className="btn btn-primary btn-md">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 animate-fade-in">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRightIcon className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRightIcon className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="overflow-hidden rounded-lg mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      overflow-hidden rounded-md aspect-square border-2 transition-all
                      ${selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground'}
                    `}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            {product.category && (
              <div className="mb-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-xs font-medium">
                  {product.category}
                </span>
              </div>
            )}
            
            <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="ml-2 text-muted-foreground line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="border-t border-b py-6 mb-6">
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="h-10 w-10 flex items-center justify-center border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  
                  <div className="h-10 w-16 flex items-center justify-center border-t border-b">
                    {quantity}
                  </div>
                  
                  <button 
                    onClick={increaseQuantity}
                    className="h-10 w-10 flex items-center justify-center border rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Add to Cart
              </button>
              
              {/* Product Meta */}
              {product.features && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
