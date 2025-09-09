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
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function BF6ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    category: 'bf6',
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
      
      // Load BF6 product groups 
      const productGroups = getProductGroupsByGame('bf6');
      
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
      console.error('Error loading BF6 products:', error);
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
        <title>BF6 Cheats & Hacks | Undetected Battlefield 6 Tools</title>
        <meta name="description" content="Professional BF6 cheats including aimbot, ESP wallhack, and advanced features. Undetected Battlefield 6 hacks for competitive gaming and server dominance." />
        <meta name="keywords" content="BF6 cheat, Battlefield 6 hack, BF6 aimbot, BF6 ESP, wallhack, undetected cheat" />
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
                      BF6 Premium Tools
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl">
                    Advanced Battlefield 6 enhancements with precision aimbot, ESP wallhack, and professional gaming tools. Dominate every server with confidence.
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