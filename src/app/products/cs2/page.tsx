'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SimpleProduct } from '@/contexts/CartContext';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters, ProductFilters as FiltersType } from '@/components/product/ProductFilters';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { useCart } from '@/contexts/CartContext';
import Head from 'next/head';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import { getProductGroupsByGame } from '@/lib/products';

export default function CS2ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    category: 'cs2',
    minPrice: '',
    maxPrice: '',
    featured: false,
    onSale: false,
    inStock: true,
  });
  
  const { addToCart } = useCart();

  const handleAddToCart = (product: SimpleProduct) => {
    addToCart(product);
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      // Load CS2 product groups 
      const productGroups = getProductGroupsByGame('cs2');
      
      // Convert product groups to individual products for display
      const products = productGroups.map(group => ({
        id: group.id,
        name: group.name,
        price: group.variants[0].price, // Use first variant's price for display
        description: group.baseDescription,
        image: group.image,
        stripe_price_id: group.variants[0].stripe_price_id,
        currency: group.variants[0].currency
      })) as SimpleProduct[];
      
      let filtered = products;
      
      // Apply filters
      if (filters.search) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description.toLowerCase().replace(/<[^>]*>/g, '').includes(filters.search.toLowerCase())
        );
      }
      
      setFilteredProducts(filtered);
      
    } catch (error) {
      console.error('Error loading CS2 products:', error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Head>
        <title>CS2 Cheats & Hacks | Undetected Counter-Strike 2 Tools</title>
        <meta name="description" content="Professional CS2 cheats including aimbot, ESP wallhack, and advanced features. Undetected Counter-Strike 2 hacks for competitive gaming and rank climbing." />
        <meta name="keywords" content="CS2 cheat, Counter-Strike 2 hack, CS2 aimbot, CS2 ESP, wallhack, undetected cheat" />
      </Head>
      
      <MinimalisticBackground>
        <Header />
        
        <main className="pt-0">
          {/* Hero Section */}
          <section className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                CS2 Premium Tools
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Professional Counter-Strike 2 enhancements with advanced aimbot, ESP wallhack, and exclusive features. Trusted by competitive gamers worldwide.
              </motion.p>
            </div>
          </section>

          {/* Products Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters */}
                <div className="lg:w-1/4">
                  <ProductFilters 
                    onFiltersChange={handleFilterChange}
                    loading={loading}
                  />
                </div>
                
                {/* Product Grid */}
                <div className="lg:w-3/4">
                  <ProductGrid 
                    products={filteredProducts}
                    loading={loading}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </MinimalisticBackground>
    </>
  );
}