'use client';

import { motion } from 'framer-motion';
import { Check, Target, Shield, Star, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import './slider.css';

export default function LandingPageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleGetInstantAccess = () => {
    const currentProduct = slides[currentSlide].product;
    addToCart(currentProduct);
    router.push('/cart');
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "BF6 PRO VERSION",
      subtitle: "Military Grade",
      description: "Premium Battlefield 6 hacks and cheats with undetected aimbot, wallhack ESP, and advanced BF6 mods for competitive gaming advantage.",
      features: ["Wallhack", "No Recoil", "Speed Hack", "Vehicle ESP"],
      badge: "NEW RELEASE",
      price: "$34.99",
      product: {
        id: 'bf6-pro',
        name: 'BF6 PRO VERSION',
        price: 3499, // Price in cents
        image: '/images/productimages/bf6-pro.png',
        category: 'Gaming Cheats',
        description: 'Premium Battlefield 6 hacks and cheats with undetected aimbot, wallhack ESP, and advanced BF6 mods for competitive gaming advantage.'
      }
    },
    {
      title: "CS2 PRO VERSION",
      subtitle: "Undetected & Advanced",
      description: "Professional Counter-Strike 2 cheats with AI aimbot, ESP wallhack, and undetected CS2 hacks for ranked gameplay dominance.",
      features: ["AI-Enhanced Aimbot", "Advanced ESP", "Grenade Helper", "Radar Hack"],
      badge: "BEST SELLER",
      price: "$29.99",
      product: {
        id: 'cs2-pro',
        name: 'CS2 PRO VERSION',
        price: 2999, // Price in cents
        image: '/images/productimages/cs2-pro-product.png',
        category: 'Gaming Cheats',
        description: 'Professional Counter-Strike 2 cheats with AI aimbot, ESP wallhack, and undetected CS2 hacks for ranked gameplay dominance.'
      }
    },
    {
      title: "CS2 PLUS VERSION",
      subtitle: "Enhanced Edition",
      description: "Enhanced Counter-Strike 2 cheats with premium aimbot settings, advanced ESP features, and exclusive CS2 hack tools for pro players.",
      features: ["Enhanced Aimbot", "Premium ESP", "Custom Settings", "VIP Support"],
      badge: "POPULAR",
      price: "$24.99",
      product: {
        id: 'cs2-plus',
        name: 'CS2 PLUS VERSION',
        price: 2499, // Price in cents
        image: '/images/productimages/cs2-plus.png',
        category: 'Gaming Cheats',
        description: 'Enhanced Counter-Strike 2 cheats with premium aimbot settings, advanced ESP features, and exclusive CS2 hack tools for pro players.'
      }
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center">

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20 overflow-visible">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center space-x-2"
            >
              <div className="bg-gradient-to-r from-gray-600/20 to-gray-500/20 backdrop-blur-sm border border-gray-400/30 px-4 py-2 rounded-full">
                <span className="text-gray-300 text-sm font-semibold flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{slides[currentSlide].badge}</span>
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                  {slides[currentSlide].title.split(' ')[0]} {slides[currentSlide].title.split(' ')[1]}
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 bg-clip-text text-transparent">
                  {slides[currentSlide].title.split(' ').slice(2).join(' ')}
                </span>
              </motion.h1>

              <motion.h2
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Features List */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {slides[currentSlide].features.map((feature, index) => (
                <motion.div
                  key={`${currentSlide}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 px-4 py-3 rounded-xl"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.button
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl relative overflow-hidden group premium-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetInstantAccess}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Get Instant Access - {slides[currentSlide].price}</span>
                  <span className="sm:hidden">Get Access - {slides[currentSlide].price}</span>
                </span>
              </motion.button>

              <motion.button
                className="border-2 border-gray-600 hover:border-gray-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:bg-gray-500/10 glass-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Features</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Slider Dots */}
            <div className="flex space-x-3 pt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center h-full min-h-[600px] lg:min-h-[700px] overflow-visible"
            style={{ paddingRight: '2rem' }}
          >
            {/* Floating Product Box */}
            <motion.div
              className="relative z-20 product-box-3d"
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 5, -5, 0],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* 3D Product Box */}
              <div className="relative w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 transform-gpu perspective-1000 product-shadow">
                {/* Main Box */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden glass-card glow-box">
                  {/* Gloss Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
                    {/* Top Badge */}
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full self-start premium-button">
                      PRO VERSION
                    </div>
                    
                    {/* Center Logo/Icon */}
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div 
                        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg glow-box"
                        animate={{
                          scale: [1, 1.05, 1],
                          rotateZ: [0, 2, -2, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Target className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Bottom Text */}
                    <div className="text-center">
                      <h3 className="text-white font-bold text-base md:text-lg lg:text-xl mb-1 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                        {slides[currentSlide].title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm">Premium Edition</p>
                    </div>
                  </div>
                  
                  {/* Side Panel Effect */}
                  <div className="absolute -right-2 top-4 w-2 h-64 md:h-72 lg:h-80 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-r transform skew-y-1"></div>
                  
                  {/* Bottom Panel Effect */}
                  <div className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded transform skew-x-1"></div>
                </div>
              </div>
            </motion.div>




            {/* Glow Effect Behind Product */}
            <div className="absolute inset-0 flex items-center justify-center overflow-visible" style={{ left: '-4rem', right: '-4rem', width: 'calc(100% + 8rem)' }}>
              <div className="w-[30rem] h-[30rem] bg-gradient-to-r from-gray-500/20 via-gray-400/20 to-gray-600/20 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}