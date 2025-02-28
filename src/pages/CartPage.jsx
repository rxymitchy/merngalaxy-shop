
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon, ArrowRightIcon } from 'lucide-react';

const CartPage = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };
  
  const proceedToCheckout = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  if (cart.length === 0) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-medium mb-6">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 animate-fade-in">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-medium mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item._id} className="py-6 first:pt-0 flex flex-col sm:flex-row gap-4">
                  <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium">
                          <Link to={`/products/${item._id}`} className="hover:text-primary">
                            {item.name}
                          </Link>
                        </h3>
                        {item.category && (
                          <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                        )}
                      </div>
                      <p className="text-base font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                          className="h-8 w-8 flex items-center justify-center border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <MinusIcon className="h-3 w-3" />
                        </button>
                        
                        <div className="h-8 w-12 flex items-center justify-center border-t border-b text-sm">
                          {item.quantity}
                        </div>
                        
                        <button 
                          onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                          className="h-8 w-8 flex items-center justify-center border rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <PlusIcon className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex justify-between">
              <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
                <ArrowRightIcon className="h-3 w-3 rotate-180" />
                Continue Shopping
              </Link>
              
              <button 
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/checkout"
                className={`btn btn-primary w-full mt-6 ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
                onClick={proceedToCheckout}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </Link>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
