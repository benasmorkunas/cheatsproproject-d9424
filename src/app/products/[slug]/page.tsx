'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { getProductGroup } from '@/lib/products';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import LandingPageProduct from '@/components/product/LandingPageProduct';

export default function ProductDetailPage() {
  const params = useParams();
  const [productGroup, setProductGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      loadProduct(params.slug as string);
    }
  }, [params.slug]);

  const loadProduct = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get product group
      const group = getProductGroup(slug);
      
      if (group) {
        setProductGroup(group);
      } else {
        setError('Product not found');
      }
      
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Error loading product');
    } finally {
      setLoading(false);
    }
  };


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Loading skeleton */}
              <div className="space-y-6">
                <div className="aspect-video bg-black/40 rounded-2xl animate-pulse"></div>
              </div>
              <div className="space-y-6">
                <div className="h-12 bg-black/40 rounded-lg animate-pulse"></div>
                <div className="h-32 bg-black/40 rounded-lg animate-pulse"></div>
                <div className="h-16 bg-black/40 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !productGroup) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-12 text-center"
            >
              <div className="w-24 h-24 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-gray-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                The product you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg backdrop-blur-sm border border-gray-500/30"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.history.back();
                  }
                }}
              >
                Go Back
              </motion.button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main product page using the new landing page component
  return <LandingPageProduct productGroup={productGroup} />;
}