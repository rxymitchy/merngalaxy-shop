
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { SearchIcon, ShoppingBagIcon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            Elegance
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-sm transition-colors hover:text-primary ${
                location.pathname.includes('/products') ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Products
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          
          <Link 
            to="/cart" 
            className="rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
          
          <button 
            className="md:hidden rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-slide-down">
          <nav className="container py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className={`px-2 py-2 rounded-md text-sm ${
                location.pathname === '/' ? 'bg-accent text-accent-foreground font-medium' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`px-2 py-2 rounded-md text-sm ${
                location.pathname.includes('/products') ? 'bg-accent text-accent-foreground font-medium' : 'text-foreground'
              }`}
            >
              Products
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
