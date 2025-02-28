
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="container max-w-6xl px-4 py-8 mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Elegance</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A premium shopping experience with elegant design and seamless functionality
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
          <Link to="/products?category=featured" className="btn btn-ghost btn-lg border">
            Featured Collection
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
            <p className="text-muted-foreground">
              Discover products crafted with exceptional materials and attention to detail
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-xl font-medium mb-2">Fast Shipping</h3>
            <p className="text-muted-foreground">
              Enjoy quick delivery with our reliable shipping partners
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-xl font-medium mb-2">Easy Returns</h3>
            <p className="text-muted-foreground">
              Shop with confidence with our hassle-free return policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
