
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Try to load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    // Update cart count and total when cart changes
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    setCartCount(count);
    setCartTotal(price);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item._id === product._id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        
        toast.success(`Updated quantity for ${product.name}`);
        return updatedCart;
      } else {
        // Item doesn't exist, add it
        toast.success(`Added ${product.name} to cart`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item._id === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from cart`);
      }
      return prevCart.filter(item => item._id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item._id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
