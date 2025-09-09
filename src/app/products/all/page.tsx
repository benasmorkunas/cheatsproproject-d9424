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
import products from '@/data/products.json';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function AllProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    featured: false,
    onSale: false,
    inStock: true,
  });
  
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      // Use products directly from JSON file and group them
      console.log('Loading all products from products.json');
      
      // Group products by base name (remove duration suffix)
      const groupedProducts = new Map<string, SimpleProduct>();
      
      products.forEach(product => {
        const baseKey = product.id.replace(/-\d+day$/, ''); // Remove -1day, -7day, -30day
        if (!groupedProducts.has(baseKey)) {
          // Create a clean product object without duration in name
          const cleanProduct = {
            ...product,
            name: product.name.replace(/ \d+ Day$/, '') // Remove " 1 Day", " 7 Day", " 30 Day" from name
          } as SimpleProduct;
          groupedProducts.set(baseKey, cleanProduct);
        }
      });
      
      let filtered = Array.from(groupedProducts.values());
      
      // Apply filters
      if (filters.search) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description.toLowerCase().replace(/<[^>]*>/g, '').includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.category !== 'all') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(filters.category)
        );
      }
      
      setFilteredProducts(filtered);
      
    } catch (error) {
      console.error('Error loading products:', error);
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
        <title>All Gaming Cheats & Hacks | Premium Undetected Tools</title>
        <meta name="description" content="Complete collection of premium gaming cheats including CS2, BF6 aimbot, ESP wallhack, and advanced features. Undetected hacks for competitive gaming." />
        <meta name="keywords" content="gaming cheat, aimbot, ESP, wallhack, CS2 hack, BF6 hack, undetected cheat" />
      </Head>
      
      <MinimalisticBackground>
        <Header />
        
        <main className="pt-12">
          {/* Hero Section */}
          <section className="pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                      Premium Gaming Tools
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl">
                    Complete collection of professional gaming enhancements. Advanced aimbot, ESP wallhack, and exclusive features for CS2 and BF6. Trusted by gamers worldwide.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:max-w-md"
                >
                  <div className="bg-gradient-to-r from-gray-800/20 to-slate-800/20 backdrop-blur-sm border border-gray-500/20 rounded-xl p-6 hover:border-gray-400/30 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-6 h-6 text-gray-300 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">Need Help Choosing?</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Unable to find the correct plan? Don't hesitate to join our Discord and we will help you choose the perfect package.
                        </p>
                        <Link href="https://discord.gg/cheats-pro" className="text-[#5865F2] hover:text-[#4752C4] font-semibold text-sm transition-colors">
                          Join Discord →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
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
                    onAddToCart={addToCart}
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