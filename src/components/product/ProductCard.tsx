import { SimpleProduct } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, Shield, Users, CheckCircle, Clock, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: SimpleProduct;
  onAddToCart?: (product: SimpleProduct) => void;
}

function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2);
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = false; // All products from JSON are in stock
  const totalSales = Math.floor(Math.random() * 1000) + 100; // Generate random sales number
  
  // Map old product IDs to new enhanced product page URLs
  const getProductURL = (productId: string) => {
    // Remove duration suffix and map to new product pages
    const baseId = productId.replace(/-\d+day$/, '');
    
    // Map to the new enhanced product pages
    switch (baseId) {
      case 'cs2-lite':
        return '/products/cs2-lite';
      case 'cs2-plus':
        return '/products/cs2-plus';
      case 'cs2-pro':
        return '/products/cs2-pro';
      case 'bf6-plus':
        return '/products/bf6-plus';
      case 'bf6-pro':
        return '/products/bf6-pro';
      default:
        // Fallback to original product ID for unknown products
        return `/products/${productId}`;
    }
  };
  
  const productURL = getProductURL(product.id);
  
  // Extract subscription pricing based on product name
  const getSubscriptionPricing = () => {
    const productName = product.name.toLowerCase();
    
    // CS2 Products
    if (productName.includes('cs2')) {
      if (productName.includes('lite')) {
        return { day1: '3.99', day7: '9.99', day30: '19.99' };
      } else if (productName.includes('plus')) {
        return { day1: '5.99', day7: '14.99', day30: '29.99' };
      } else if (productName.includes('pro')) {
        return { day1: '7.99', day7: '19.99', day30: '39.99' };
      }
    }
    
    // Battlefield 6 Products
    if (productName.includes('bf6') || productName.includes('battlefield')) {
      if (productName.includes('plus')) {
        return { day1: '5.99', day7: '14.99', day30: '29.99' };
      } else if (productName.includes('pro')) {
        return { day1: '7.99', day7: '19.99', day30: '39.99' };
      }
    }
    
    // Default fallback
    return { day1: formatPrice(product.price), day7: formatPrice(product.price * 2), day30: formatPrice(product.price * 4) };
  };
  
  const subscriptionPrices = getSubscriptionPricing();
  
  // Get badges based on product name
  const isMostPopular = product.name.toLowerCase().includes('cs2') && product.name.toLowerCase().includes('plus');
  const isBestValue = product.name.toLowerCase().includes('plus');
  const isPreOrder = product.name.toLowerCase().includes('bf6');

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-400/60 hover:shadow-2xl hover:shadow-gray-400/25 h-full flex flex-col relative">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} - Gaming Cheat Tool`}
              fill
              className={`object-contain transition-transform duration-500 ${
                product.name.toLowerCase().includes('lite') ? 'scale-[1.35] group-hover:scale-[1.6] object-[50%_62%]' :
                product.name.toLowerCase().includes('bf6') ? 'scale-[1.2] group-hover:scale-[1.45]' :
                'scale-[1.35] group-hover:scale-[1.6]'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-700/50">
              <div className="text-center">
                <Shield className="w-16 h-16 text-gray-500 mx-auto mb-3" />
                <span className="text-gray-400 text-sm">Gaming Tool Preview</span>
              </div>
            </div>
          )}
          
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isPreOrder && (
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg text-center flex items-center justify-center">
                PRE-ORDER
              </div>
            )}
            {isMostPopular && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg text-center flex items-center justify-center">
                MOST POPULAR
              </div>
            )}
            {isBestValue && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg text-center flex items-center justify-center">
                BEST VALUE
              </div>
            )}
          </div>
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div className="flex gap-3">
              <Link href={productURL}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full shadow-xl hover:bg-white/20 transition-all duration-300"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-700/90 hover:bg-slate-600 border-gray-400 text-white hover:shadow-gray-400/50 p-3 rounded-full shadow-xl backdrop-blur-sm border transition-all duration-300"
                onClick={() => onAddToCart?.(product)}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <Link href={productURL}>
            <h3 className="text-xl font-bold mb-3 line-clamp-1 transition-all duration-300 leading-tight text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent hover:from-gray-300 hover:via-slate-300 hover:to-gray-300 hover:scale-105 transform tracking-wide uppercase whitespace-nowrap overflow-hidden text-ellipsis">
              {product.name}
            </h3>
          </Link>
          
          {/* Short Description */}
          {product.description && (
            <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed text-left font-thin">
              {product.description.replace(/<[^>]*>/g, '')}
            </p>
          )}
          
          {/* Trust Indicators */}
          <div className="flex items-center gap-4 mb-4 text-xs">
            <div className="flex items-center text-green-400">
              <Users className="w-3 h-3 mr-1" />
              <span>{totalSales}+ users</span>
            </div>
            <div className="flex items-center text-blue-400">
              <Clock className="w-3 h-3 mr-1" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center text-gray-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Instant Access</span>
            </div>
          </div>
          
          {/* Price Section */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-700/30 rounded-lg p-2">
                <div className="text-gray-400 text-xs mb-1">1 Day</div>
                <div className="text-white text-sm font-medium">
                  ${subscriptionPrices.day1}
                </div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2">
                <div className="text-gray-400 text-xs mb-1">7 Days</div>
                <div className="text-white text-sm font-medium">
                  ${subscriptionPrices.day7}
                </div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2">
                <div className="text-gray-400 text-xs mb-1">30 Days</div>
                <div className="text-white text-sm font-medium">
                  ${subscriptionPrices.day30}
                </div>
              </div>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 mt-auto mb-2 bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 text-white shadow-lg hover:shadow-gray-400/50 backdrop-blur-sm border border-gray-500/30"
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-base">Add to Cart</span>
          </motion.button>
          
        </div>
        
        {/* Enhanced Hover Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/0 via-slate-500/0 to-gray-500/0 group-hover:from-gray-500/10 group-hover:via-slate-500/5 group-hover:to-gray-500/10 transition-all duration-500 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}