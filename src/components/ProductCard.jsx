
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  if (!product) return null;
  
  const { _id, name, price, images, category } = product;
  
  return (
    <div 
      className="group product-card relative overflow-hidden rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${_id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-square">
          <img 
            src={images[0]} 
            alt={name}
            className="product-image object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        
        <div className="mt-4 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              {category && (
                <span className="text-xs text-muted-foreground mb-1 inline-block">
                  {category}
                </span>
              )}
              <h3 className="font-medium text-sm sm:text-base">{name}</h3>
            </div>
            <span className="font-medium text-sm sm:text-base">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        className={`absolute bottom-4 right-4 rounded-full bg-primary text-primary-foreground p-2 
          shadow-lg transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        aria-label={`Add ${name} to cart`}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductCard;
