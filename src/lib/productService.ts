import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stripe_price_id: string;
  currency: string;
  slug?: string;
  short_description?: string;
  categories?: { id: string; name: string; slug: string }[];
  images?: { src: string; alt?: string }[];
  stock_status?: string;
  on_sale?: boolean;
  featured?: boolean;
  sale_price?: number;
  regular_price?: number;
  sku?: string;
  rating_count?: number;
  average_rating?: string;
}

// Convert local product format to standard Product interface
function convertLocalProduct(localProduct: any): Product {
  const gameType = localProduct.id.includes('cs2') ? 'cs2' : 'bf6';
  const category = gameType === 'cs2' ? 'CS2 Cheats' : 'BF6 Cheats';
  
  return {
    id: localProduct.id,
    name: localProduct.name,
    price: localProduct.price / 100, // Convert from cents to dollars
    description: localProduct.description,
    image: localProduct.image,
    stripe_price_id: localProduct.stripe_price_id,
    currency: localProduct.currency,
    slug: localProduct.id,
    short_description: localProduct.description,
    categories: [{ 
      id: gameType, 
      name: category, 
      slug: gameType 
    }],
    images: [{ 
      src: localProduct.image, 
      alt: localProduct.name 
    }],
    stock_status: 'instock',
    on_sale: false,
    featured: localProduct.name.toLowerCase().includes('pro'),
    regular_price: localProduct.price / 100,
    sku: localProduct.id,
    rating_count: 0,
    average_rating: '0'
  };
}

export function getAllProducts(): Product[] {
  return productsData.map(convertLocalProduct);
}

export function getProductById(id: string): Product | undefined {
  const localProduct = productsData.find(p => p.id === id);
  return localProduct ? convertLocalProduct(localProduct) : undefined;
}

export function getProductsByCategory(category: string): Product[] {
  const allProducts = getAllProducts();
  return allProducts.filter(product => 
    product.categories?.some(cat => cat.slug === category.toLowerCase())
  );
}

export function getCS2Products(): Product[] {
  return getProductsByCategory('cs2');
}

export function getBF6Products(): Product[] {
  return getProductsByCategory('bf6');
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(product => product.featured);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return getAllProducts().filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}

// Product statistics
export function getProductStats() {
  const allProducts = getAllProducts();
  const cs2Products = getCS2Products();
  const bf6Products = getBF6Products();
  
  return {
    total: allProducts.length,
    cs2: {
      products: cs2Products.length,
      users: '2.5K+',
      rating: '4.7'
    },
    bf6: {
      products: bf6Products.length,
      users: '3.8K+', 
      rating: '4.8'
    }
  };
}