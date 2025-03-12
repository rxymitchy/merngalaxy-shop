
import { API_URL, handleResponse, useMockData } from './apiUtils';
import { mockProducts } from './mockData';

export const fetchProducts = async ({ category = '', limit = 0, sortBy = 'newest' } = {}) => {
  let url = `${API_URL}/products?`;
  
  if (category) {
    url += `category=${category}&`;
  }
  
  if (sortBy) {
    url += `sort=${sortBy}`;
  }
  
  // If API is not yet connected, return mock data
  if (useMockData()) {
    let filtered = mockProducts;
    
    // Apply category filter if provided
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      // Default: newest
      return b._id.localeCompare(a._id);
    });
    
    // Apply limit if provided
    if (limit > 0) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }
  
  const response = await fetch(url);
  return handleResponse(response);
};

export const fetchProductById = async (id) => {
  // If API is not yet connected, return mock data
  if (useMockData()) {
    const product = mockProducts.find(p => p._id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }
  
  const response = await fetch(`${API_URL}/products/${id}`);
  return handleResponse(response);
};

export const fetchFeaturedProducts = async () => {
  // If API is not yet connected, return mock data
  if (useMockData()) {
    return mockProducts.filter(product => product.featured);
  }
  
  const response = await fetch(`${API_URL}/products/featured`);
  return handleResponse(response);
};

export const fetchSimilarProducts = async (category, currentProductId) => {
  // If API is not yet connected, return mock data
  if (useMockData()) {
    return mockProducts
      .filter(product => product.category === category && product._id !== currentProductId)
      .slice(0, 4);
  }
  
  const response = await fetch(`${API_URL}/products/similar?category=${category}&productId=${currentProductId}`);
  return handleResponse(response);
};
