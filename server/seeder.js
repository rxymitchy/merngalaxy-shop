
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

// Load environment variables
dotenv.config();

// Sample products data
const products = [
  {
    name: 'Premium Wireless Headphones',
    price: 299.99,
    oldPrice: 349.99,
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.',
    category: 'electronics',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80',
    ],
    features: [
      'Active noise cancellation',
      '30-hour battery life',
      'Premium sound quality',
      'Bluetooth 5.0 connectivity',
    ],
    countInStock: 15,
  },
  {
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    description: 'Add a touch of elegance to your workspace with this minimalist desk lamp. Features adjustable brightness, color temperature, and a sleek, modern design.',
    category: 'home',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
    ],
    features: [
      'Adjustable brightness',
      'Color temperature control',
      'Touch-sensitive controls',
      'Energy-efficient LED',
    ],
    countInStock: 25,
  },
  {
    name: 'Smart Watch Series 5',
    price: 399.99,
    oldPrice: 449.99,
    description: 'Stay connected and track your fitness with our latest smartwatch. Features heart rate monitoring, GPS, water resistance, and a stunning always-on Retina display.',
    category: 'electronics',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80',
    ],
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water-resistant up to 50m',
      'Always-on Retina display',
      'Up to 18-hour battery life',
    ],
    countInStock: 10,
  },
  {
    name: 'Italian Leather Wallet',
    price: 79.99,
    description: 'Crafted from premium Italian leather, this slim wallet combines elegance and functionality with multiple card slots and RFID protection.',
    category: 'fashion',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577125305658-dee71d4ee3c5?auto=format&fit=crop&q=80',
    ],
    features: [
      'Genuine Italian leather',
      'RFID protection',
      '6 card slots',
      'Slim profile design',
    ],
    countInStock: 30,
  },
  {
    name: 'Ceramic Pour-Over Coffee Set',
    price: 64.99,
    description: 'Elevate your coffee ritual with this elegant ceramic pour-over set. Includes a handcrafted ceramic dripper, serving carafe, and custom filters for the perfect brew.',
    category: 'home',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1565452344518-368bb014c3c0?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572119486138-fc0247667672?auto=format&fit=crop&q=80',
    ],
    features: [
      'Handcrafted ceramic',
      'Optimal heat retention',
      'Includes reusable filter',
      'Ergonomic design',
    ],
    countInStock: 18,
  },
  {
    name: 'Wool Cashmere Scarf',
    price: 129.99,
    description: 'Stay warm in style with this luxurious wool-cashmere blend scarf. Incredibly soft, lightweight, and available in a range of timeless colors.',
    category: 'fashion',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1578763374764-81a157da7267?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578763425126-dd416de4bc9d?auto=format&fit=crop&q=80',
    ],
    features: [
      '90% wool, 10% cashmere blend',
      'Ultra-soft texture',
      'Lightweight warmth',
      'Ethically sourced materials',
    ],
    countInStock: 22,
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 159.99,
    oldPrice: 189.99,
    description: 'Take your music anywhere with this premium portable speaker. Features 360° sound, waterproof design, and 20-hour battery life in a compact, stylish package.',
    category: 'electronics',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610166000605-4af54e98f8f2?auto=format&fit=crop&q=80',
    ],
    features: [
      '360° immersive sound',
      'IPX7 waterproof rating',
      '20-hour battery life',
      'Built-in microphone for calls',
    ],
    countInStock: 12,
  },
  {
    name: 'Minimalist Wall Clock',
    price: 49.99,
    description: 'Add a touch of understated elegance to any room with this minimalist wall clock. Features a silent sweep mechanism and clean, modern design.',
    category: 'home',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3a1a0be?auto=format&fit=crop&q=80',
    ],
    features: [
      'Silent sweep mechanism',
      'Aluminum frame',
      'Easy wall mounting',
      'Battery operated (AA)',
    ],
    countInStock: 28,
  },
];

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/elegance';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing products
      await Product.deleteMany();
      console.log('Products cleared');
      
      // Insert new products
      await Product.insertMany(products);
      console.log('Products added to database');
      
      mongoose.disconnect();
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
