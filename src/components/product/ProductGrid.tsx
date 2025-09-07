import { SimpleProduct } from '@/contexts/CartContext';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: SimpleProduct[];
  onAddToCart?: (product: SimpleProduct) => void;
  loading?: boolean;
}

export function ProductGrid({ products, onAddToCart, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-black/40 rounded-2xl overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="aspect-square bg-gradient-to-br from-gray-700/50 to-gray-800/50 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-pulse"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-700/50 rounded-lg w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700/50 rounded-lg w-1/2 animate-pulse"></div>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, starIndex) => (
                  <div key={starIndex} className="w-4 h-4 bg-gray-700/50 rounded animate-pulse"></div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-700/50 rounded-lg w-20 animate-pulse"></div>
                <div className="h-5 bg-gray-700/50 rounded-full w-12 animate-pulse"></div>
              </div>
              
              <div className="h-12 bg-gray-700/50 rounded-lg animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-12 text-center"
      >
        <div className="w-24 h-24 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          We couldn&apos;t find any products matching your current filters. 
          Try adjusting your search criteria or browse all products.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
          >
            Browse All Products
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-700/50 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <motion.div
          key={`${product.id}-${index}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
          />
        </motion.div>
      ))}
    </div>
  );
}