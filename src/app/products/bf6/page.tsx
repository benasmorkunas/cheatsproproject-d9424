'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { SimpleProduct } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters, ProductFilters as FiltersType } from '@/components/product/ProductFilters';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { getBF6Products } from '@/lib/mockProducts';
import { useCart } from '@/contexts/CartContext';
import Head from 'next/head';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';

export default function BF6ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    category: 'bf6',
    featured: false,
    onSale: false,
    inStock: true,
  });
  
  const { addToCart } = useCart();

  // Convert WooCommerce Product to SimpleProduct for cart
  const convertProductToSimple = (product: Product): SimpleProduct => {
    return {
      id: product.id.toString(),
      name: product.name,
      price: Math.round(parseFloat(product.price) * 100), // Convert to cents
      description: product.short_description || product.description,
      image: product.images?.[0]?.src || '',
      stripe_price_id: product.sku || '',
      currency: 'usd'
    };
  };

  const handleAddToCart = (product: Product) => {
    const simpleProduct = convertProductToSimple(product);
    addToCart(simpleProduct);
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      // Use our structured product data
      console.log('Loading BF6 products from local data');
      const allProducts = getBF6Products();
      setProducts(allProducts);
      
    } catch (error) {
      console.error('Error loading BF6 products:', error);
      setProducts([]);
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
        
        <main className="pt-0">
          {/* Hero Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                BF6 Premium Tools
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Advanced Battlefield 6 enhancements with precision aimbot, ESP wallhack, and professional gaming tools. Dominate every server with confidence.
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
                    filters={filters}
                    onChange={handleFilterChange}
                    loading={loading}
                  />
                </div>
                
                {/* Product Grid */}
                <div className="lg:w-3/4">
                  <ProductGrid 
                    products={products}
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