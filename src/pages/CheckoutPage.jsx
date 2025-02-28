
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronDownIcon, CreditCardIcon, LockIcon } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/checkout/success');
    }, 2000);
  };
  
  if (cart.length === 0) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-medium mb-6">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            You need to add items to your cart before checking out.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 animate-fade-in">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-medium mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="bg-muted px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Shipping Information</h2>
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <input
                      required
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      required
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State / Province
                    </label>
                    <input
                      required
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      required
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      required
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="bg-muted px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Payment Information</h2>
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background pl-3 pr-10 py-2 text-sm ring-offset-background"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Name on Card
                    </label>
                    <input
                      required
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                      Expiry Date
                    </label>
                    <input
                      required
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                      CVV
                    </label>
                    <input
                      required
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <Link to="/cart" className="text-sm text-primary hover:underline">
                  Return to Cart
                </Link>
                
                <button 
                  type="submit" 
                  className={`btn btn-primary btn-lg flex items-center gap-2 ${
                    isProcessing ? 'opacity-70 pointer-events-none' : ''
                  }`}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : (
                    <>
                      <LockIcon className="h-4 w-4" />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-20">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <ul className="divide-y max-h-64 overflow-auto">
                {cart.map((item) => (
                  <li key={item._id} className="py-3 flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-sm font-medium">
                        <h3 className="truncate">{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Qty {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$0.00</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(cartTotal + cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
