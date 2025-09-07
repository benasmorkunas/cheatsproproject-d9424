'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  Shield, 
  Check, 
  Users,
  Clock,
  Download,
  Zap,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Play,
  Eye,
  Lock,
  Award,
  TrendingUp,
  Mail,
  CreditCard,
  ArrowRight,
  X,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import { SimpleProduct } from '@/lib/products';
import { getProductFeatures, FeatureCategory } from '@/lib/productFeatures';
import AnimatedIcon, { getIconType } from '@/components/common/AnimatedIcons';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';

interface EnhancedProductPageProps {
  productGroup: {
    id: string;
    name: string;
    baseDescription: string;
    image: string;
    variants: SimpleProduct[];
  };
  selectedVariant?: SimpleProduct;
}

export default function EnhancedProductPage({ productGroup, selectedVariant }: EnhancedProductPageProps) {
  const [currentVariant, setCurrentVariant] = useState(selectedVariant || productGroup.variants[0]);
  const [urgencyTimer, setUrgencyTimer] = useState(300); // 5 minutes
  const { addToCart } = useCart();

  const features = getProductFeatures(currentVariant.id);
  const savings = getSavingsPercentage(productGroup.variants, currentVariant);
  const isPopular = currentVariant.id.includes('7day');
  const isBestValue = currentVariant.id.includes('30day');

  // Live user counter simulation
  const [onlineUsers] = useState(() => Math.floor(Math.random() * 500) + 2500);
  const [recentPurchases] = useState(() => Math.floor(Math.random() * 20) + 45);

  function getSavingsPercentage(variants: SimpleProduct[], current: SimpleProduct): number {
    const dailyPrice = variants.find(v => v.id.includes('1day'))?.price || current.price;
    const currentDailyPrice = current.price / getDurationDays(current.id);
    const dailyRateDaily = dailyPrice;
    return Math.round((1 - (currentDailyPrice / dailyRateDaily)) * 100);
  }

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

  function getDailyPrice(variant: SimpleProduct): string {
    const days = getDurationDays(variant.id);
    const dailyPrice = variant.price / days;
    return formatPrice(dailyPrice);
  }

  const handleInstantCheckout = () => {
    // Add to cart for now - can be enhanced later
    addToCart(currentVariant);
  };


  // SEO and structured data
  const productName = `${productGroup.name} - ${getDurationLabel(currentVariant.id)}`;
  const productDescription = `${productGroup.baseDescription} Get instant access for ${getDurationLabel(currentVariant.id).toLowerCase()} with premium features and 24/7 support.`;
  const productPrice = formatPrice(currentVariant.price);
  const productUrl = `https://cheats-pro.com/products/${currentVariant.id}`;
  const imageUrl = `https://cheats-pro.com${productGroup.image}`;
  const seoSavings = currentVariant.id.includes('30day') ? '40%' : currentVariant.id.includes('7day') ? '25%' : '0%';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": [imageUrl],
    "sku": currentVariant.id,
    "brand": {
      "@type": "Brand",
      "name": "CheatsPro"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "USD",
      "price": productPrice,
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "CheatsPro"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "ProGamer2024"
        },
        "reviewBody": "Amazing product! Works perfectly and undetected. Highly recommended."
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{productName} | Premium Gaming Enhancement | CheatsPro</title>
        <meta name="description" content={productDescription} />
        <meta name="keywords" content={`${productGroup.name.toLowerCase()}, gaming cheat, aimbot, esp, wallhack, undetected, premium, ${currentVariant.id.includes('cs2') ? 'counter-strike 2' : 'battlefield 6'}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${productName} | CheatsPro`} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content="CheatsPro" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${productName} | CheatsPro`} />
        <meta name="twitter:description" content={productDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Product specific */}
        <meta property="product:price:amount" content={productPrice} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:brand" content="CheatsPro" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={productUrl} />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-900">
        <Header />
        
        <main className="relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Showcase */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Product Image/Demo */}
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl border border-gray-700/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Image
                      src={productGroup.image}
                      alt={productGroup.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Play Demo Button */}
                    <motion.button
                      className="absolute inset-0 flex items-center justify-center group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.button>

                    {/* Live Indicators */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">Live Demo</span>
                        </div>
                      </div>
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-green-400 text-sm font-medium">Status: Undetected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Title & Rating */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                        {productGroup.name}
                      </span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {productGroup.baseDescription}
                    </p>
                  </div>

                  {/* Rating & Social Proof */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white font-semibold">4.9</span>
                      <span className="text-gray-400">(1,247 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-300">50K+ users</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Shield, label: 'Undetected', desc: '99.8% success rate', color: 'text-green-400' },
                    { icon: Clock, label: 'Instant', desc: 'Download ready', color: 'text-blue-400' },
                    { icon: Award, label: 'Premium', desc: 'Professional grade', color: 'text-gray-400' }
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <badge.icon className={`w-6 h-6 mx-auto mb-2 ${badge.color}`} />
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
                {/* Subscription Plans */}
                <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Zap className="w-5 h-5 text-yellow-400 mr-2" />
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
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                            isSelected
                              ? 'border-gray-500 bg-purple-500/20 scale-105'
                              : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-400/50'
                          }`}
                          whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          {/* Popular/Best Value Badge */}
                          {variant.id.includes('7day') && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <div className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 text-white px-4 py-1 rounded-full text-xs font-bold">
                                MOST POPULAR
                              </div>
                            </div>
                          )}
                          {variant.id.includes('30day') && (
                            <div className="absolute -top-2 right-4">
                              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                SAVE {savings}%
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-bold text-lg">
                                  {days === 1 ? '1 Day' : days === 7 ? '7 Days' : '30 Days'}
                                </span>
                                {isSelected && <CheckCircle className="w-5 h-5 text-gray-400" />}
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
                  onClick={handleInstantCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-slate-600 hover:via-purple-600 hover:via-gray-500 hover:to-slate-600 text-white py-6 rounded-xl font-bold text-xl shadow-2xl shadow-gray-500/25 border border-gray-400/50"
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

                {/* Payment Methods */}
                <div className="text-center space-y-3">
                  <div className="text-gray-400 text-sm">Secure payment powered by Stripe</div>
                  <div className="flex justify-center space-x-4">
                    {['💳', '🍎', '🅿️', '₿'].map((icon, index) => (
                      <div key={index} className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/50">
                        <span className="text-lg">{icon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Urgency Elements */}
                <motion.div
                  className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-400" />
                      <div>
                        <div className="text-white font-semibold text-sm">Limited Time Offer</div>
                        <div className="text-orange-300 text-xs">47 daily licenses remaining</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-400 font-mono font-bold">23:45:12</div>
                      <div className="text-gray-400 text-xs">expires in</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="py-16 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Everything you need to dominate the competition
              </p>
            </motion.div>

            {/* Feature Categories */}
            <div className="space-y-8">
              {features.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="space-y-6"
                >
                  {/* Category Header */}
                  <div className="text-center">
                    <motion.div
                      className="inline-flex items-center space-x-3 mb-4"
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + 0.2 }}
                    >
                      <AnimatedIcon 
                        type={getIconType(category.icon)} 
                        size={56}
                        className="mx-auto" 
                      />
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    </motion.div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Discover {category.features.length} advanced features designed to give you the competitive edge
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="group bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-gray-400/30 hover:bg-black/30 transition-all duration-300 shadow-xl hover:shadow-gray-500/10 hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + featureIndex * 0.05 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            <AnimatedIcon 
                              type={getIconType(feature.icon)} 
                              size={40}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                              {feature.title}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                              {feature.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="inline-block px-3 py-1 bg-gray-600/20 text-purple-300 text-xs rounded-full border border-gray-500/30">
                                {feature.category}
                              </span>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border border-gray-400/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Complete Feature Suite</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-gray-400 mb-2">
                    {features.reduce((acc, cat) => acc + cat.features.length, 0)}+
                  </div>
                  <div className="text-gray-300">Total Features</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {features.length}
                  </div>
                  <div className="text-gray-300">Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-gray-300">Always Updated</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
