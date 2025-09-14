'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Shield, 
  Users,
  Clock,
  Download,
  Zap,
  Crown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Play,
  Eye,
  Award,
  Mail,
  Heart,
  Share2,
  ShoppingCart,
  X
} from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import { SimpleProduct } from '@/lib/products';
import { getEnhancedProductFeatures } from '@/lib/enhancedProductFeatures';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import InteractiveFeatures from './InteractiveFeatures';
import InstantCheckoutWidget from './InstantCheckoutWidget';

interface LandingPageProductProps {
  productGroup: {
    id: string;
    name: string;
    baseDescription: string;
    image: string;
    variants: SimpleProduct[];
  };
  selectedVariant?: SimpleProduct;
}

export default function LandingPageProduct({ productGroup, selectedVariant }: LandingPageProductProps) {
  const [currentVariant, setCurrentVariant] = useState(selectedVariant || productGroup.variants[0]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [socialProof, setSocialProof] = useState({
    onlineUsers: Math.floor(Math.random() * 500) + 2500,
    recentPurchases: Math.floor(Math.random() * 20) + 45,
    totalUsers: Math.floor(Math.random() * 200) + 800
  });
  
  const { addToCart } = useCart();
  const features = getEnhancedProductFeatures(currentVariant.id);
  
  // SEO data
  const gameType = currentVariant.id.includes('cs2') ? 'Counter-Strike 2' : 'Battlefield 6';
  const tierType = currentVariant.id.includes('pro') ? 'Pro' : 
                   currentVariant.id.includes('plus') ? 'Plus' : 'Lite';
  
  // Color scheme based on game type - Grey gradient theme
  const isCS2 = currentVariant.id.includes('cs2');
  const colors = isCS2 ? {
    primary: '#6B7280',
    secondary: '#9CA3AF',
    light: '#D1D5DB',
    dark: '#4B5563',
    darker: '#374151'
  } : {
    primary: '#6B7280',
    secondary: '#9CA3AF', 
    light: '#D1D5DB',
    dark: '#4B5563',
    darker: '#374151'
  };

  function getDurationDays(productId: string): number {
    if (productId.includes('1day')) return 1;
    if (productId.includes('7day')) return 7;
    if (productId.includes('30day')) return 30;
    return 1;
  }

  function formatPrice(priceInCents: number): string {
    return (priceInCents / 100).toFixed(2);
  }

  function getDurationLabel(variantId: string): string {
    if (variantId.includes('1day')) return '1 Day';
    if (variantId.includes('7day')) return '7 Days';
    if (variantId.includes('30day')) return '30 Days';
    return '1 Day';
  }

  function getSavingsPercentage(variants: SimpleProduct[], current: SimpleProduct): number {
    const dailyPrice = variants.find(v => v.id.includes('1day'))?.price || current.price;
    const currentDailyPrice = current.price / getDurationDays(current.id);
    const dailyRateDaily = dailyPrice;
    return Math.round((1 - (currentDailyPrice / dailyRateDaily)) * 100);
  }

  function getDailyPrice(variant: SimpleProduct): string {
    const days = getDurationDays(variant.id);
    const dailyPrice = variant.price / days;
    return formatPrice(dailyPrice);
  }


  // Product name and description
  const productName = `${productGroup.name} ${tierType} - ${getDurationLabel(currentVariant.id)}`;
  const productDescription = `${productGroup.baseDescription} Get instant access for ${getDurationLabel(currentVariant.id).toLowerCase()} with premium features and 24/7 support.`;
  const savings = getSavingsPercentage(productGroup.variants, currentVariant);


  return (
    <>
      <Head>
        <title>{productName} | Premium {gameType} Enhancement | CheatsPro</title>
        <meta name="description" content={productDescription} />
        <meta name="keywords" content={`${gameType.toLowerCase()}, gaming enhancement, ${tierType.toLowerCase()}, undetected, premium, aimbot, esp`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${productName} | CheatsPro`} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={`https://cheats-pro.com${productGroup.image}`} />
        
        {/* Product specific */}
        <meta property="product:price:amount" content={formatPrice(currentVariant.price)} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:brand" content="CheatsPro" />
      </Head>
      
      <MinimalisticBackground>
        <Header />
        
        <main className="relative -mt-20">

            {/* Hero Section */}
            <section className="py-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Product Showcase */}
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Product Image/Demo with Title */}
                    <div className="relative">
                      {/* Image Container */}
                      <div className="aspect-[4/5] bg-transparent rounded-2xl flex items-center justify-center">
                        <Image
                          src={productGroup.image}
                          alt={`${productGroup.name} Package`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      
                      {/* Product Title */}
                      <div className="text-center mt-2">
                        <h1 className="text-4xl md:text-5xl font-bold">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 uppercase">
                            {productGroup.name}
                          </span>
                        </h1>
                      </div>
                    </div>

                    {/* Rating & Social Proof */}
                    <div className="space-y-4">
                      {/* Rating & Social Proof */}
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-white font-semibold">4.9</span>
                          <span className="text-gray-400">(100+ reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5" style={{ color: colors.secondary }} />
                          <span style={{ color: colors.secondary }}>{socialProof.totalUsers.toLocaleString()}+ users</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Shield, label: 'Undetected', desc: 'Safe to use', color: '#10B981' },
                        { icon: Download, label: 'Instant', desc: 'Download ready', color: '#3B82F6' },
                        { icon: Award, label: 'Premium', desc: 'Professional grade', color: colors.secondary }
                      ].map((badge, index) => (
                        <motion.div
                          key={index}
                          className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <badge.icon className="w-6 h-6 mx-auto mb-2" style={{ color: badge.color }} />
                          <div className="text-sm font-medium text-white">{badge.label}</div>
                          <div className="text-xs text-gray-400">{badge.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Purchase Section */}
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Integrated Checkout Widget */}
                    {showCheckout ? (
                      <InstantCheckoutWidget 
                        productGroup={productGroup}
                        selectedVariant={currentVariant}
                        onClose={() => setShowCheckout(false)}
                        colors={colors}
                      />
                    ) : (
                      <>
                        {/* Subscription Plans */}
                        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Zap className="w-5 h-5 mr-2" style={{ color: colors.secondary }} />
                            Choose Your Duration
                          </h3>
                          
                          <div className="space-y-3">
                            {productGroup.variants.map((variant, index) => {
                              const days = getDurationDays(variant.id);
                              const isSelected = currentVariant.id === variant.id;
                              const dailyPrice = getDailyPrice(variant);
                              const savings = getSavingsPercentage(productGroup.variants, variant);
                              
                              return (
                                <motion.button
                                  key={variant.id}
                                  onClick={() => setCurrentVariant(variant)}
                                  className="w-full p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden"
                                  style={{
                                    borderColor: isSelected ? colors.primary : 'rgba(255,255,255,0.2)',
                                    backgroundColor: isSelected ? `${colors.primary}33` : 'rgba(0,0,0,0.2)',
                                    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isSelected) {
                                      (e.target as HTMLElement).style.borderColor = `${colors.primary}80`;
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isSelected) {
                                      (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                                    }
                                  }}
                                  whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                  {/* Popular/Best Value Badge */}
                                  {variant.id.includes('7day') && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                      <div className="text-white px-4 py-1 rounded-full text-xs font-bold" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}>
                                        MOST POPULAR
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex justify-between items-center">
                                    <div className="text-left">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-white font-bold text-lg">
                                          {getDurationLabel(variant.id)}
                                        </span>
                                        {isSelected && <CheckCircle className="w-5 h-5" style={{ color: colors.secondary }} />}
                                        {days === 30 && <Crown className="w-4 h-4 text-yellow-400" />}
                                      </div>
                                      <div className="text-gray-400 text-sm">
                                        ${dailyPrice}/day • Total: ${formatPrice(variant.price)}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-white">
                                        ${formatPrice(variant.price)}
                                      </div>
                                      {savings > 0 && (
                                        <div className="text-green-400 text-sm font-medium">
                                          Save {savings}%
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Instant Checkout CTA */}
                        <motion.button
                          onClick={() => setShowCheckout(true)}
                          className="w-full text-white py-6 rounded-xl font-bold text-xl shadow-2xl border"
                          style={{
                            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.light})`,
                            boxShadow: `0 25px 50px -12px ${colors.primary}40`,
                            borderColor: `${colors.primary}80`
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.background = `linear-gradient(to right, ${colors.dark}, ${colors.darker}, ${colors.secondary})`;
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.background = `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.light})`;
                          }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <Zap className="w-6 h-6" />
                            <span>Get Instant Access - ${formatPrice(currentVariant.price)}</span>
                            <ArrowRight className="w-6 h-6" />
                          </div>
                          <div className="text-sm font-normal opacity-90 mt-1">
                            Instant download • 24/7 support • Money-back guarantee
                          </div>
                        </motion.button>

                        {/* Secondary Actions */}
                        <motion.button
                          onClick={() => addToCart(currentVariant)}
                          className="w-full bg-black/30 backdrop-blur-lg border border-white/20 hover:border-white/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </motion.button>

                        {/* Payment Methods */}
                        <div className="text-center">
                          <div className="text-gray-400 text-sm">Secure payment powered by Stripe</div>
                        </div>

                        {/* Urgency Elements */}
                        <motion.div
                          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg border border-orange-400/30 rounded-xl p-2 shadow-xl max-w-xs mx-auto"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                            <div>
                              <div className="text-white font-semibold text-sm">Limited Time Offer</div>
                              <div className="text-orange-300 text-xs">{(() => {
                                const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
                                const productOffset = currentVariant.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10; // 0-9 offset based on product ID
                                const daysSinceStart = (today + productOffset) % 12; // 12-day cycle with product-specific offset
                                const licenses = Math.max(15, 50 - (daysSinceStart * 3));
                                return licenses === 15 ? 50 : licenses;
                              })()} licenses remaining</div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Interactive Features Section */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <InteractiveFeatures productId={currentVariant.id} />
              </div>
            </section>

        </main>
        
        <Footer />

      </MinimalisticBackground>
    </>
  );
}