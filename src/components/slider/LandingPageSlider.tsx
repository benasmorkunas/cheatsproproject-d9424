'use client';

import { motion } from 'framer-motion';
import { Check, Target, Shield, Star, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import './slider.css';

export default function LandingPageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleGetInstantAccess = () => {
    if (currentSlide === 0) {
      router.push('/products/bf6');
    } else if (currentSlide === 1 || currentSlide === 2) {
      router.push('/products/cs2');
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, isHovered ? 20000 : 10000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slides = [
    {
      title: "BF6 PRO VERSION",
      subtitle: "Premium BF6 Hacks",
      description: "Premium Battlefield 6 Hacks and Cheats with Undetected Aimbot, Wallhack ESP, and Advanced BF6 Aimbot for Competitive Gaming Advantage.",
      features: ["Wallhack", "Recoil Control", "PID Controller", "Aimbot"],
      badge: "NEW RELEASE",
      price: "$7.99",
      product: {
        id: 'bf6-pro',
        name: 'BF6 PRO VERSION',
        price: 799, // Price in cents
        image: '/images/productimages/bf6-pro.png',
        stripe_price_id: 'price_bf6_pro_30day',
        currency: 'usd',
        description: 'Premium Battlefield 6 Hacks and Cheats with Undetected Aimbot, Wallhack ESP, and Advanced BF6 Aimbot for Competitive Gaming Advantage.'
      }
    },
    {
      title: "CS2 PRO VERSION",
      subtitle: "Undetected CS2 Aimbot",
      description: "Undetected Counter-Strike 2 Cheats with AI Aimbot, ESP Wallhack, and Undetected CS2 Hacks for Ranked Gameplay Dominance.",
      features: ["AI-Enhanced Aimbot", "Grenade Recorder", "Grenade Helper", "Stream-proof"],
      badge: "ADVANCED",
      price: "$7.99",
      product: {
        id: 'cs2-pro',
        name: 'CS2 PRO VERSION',
        price: 799, // Price in cents
        image: '/images/productimages/cs2-pro-product.png',
        stripe_price_id: 'price_cs2_pro_30day',
        currency: 'usd',
        description: 'Undetected Counter-Strike 2 Cheats with AI Aimbot, ESP Wallhack, and Undetected CS2 Hacks for Ranked Gameplay Dominance.'
      }
    },
    {
      title: "CS2 PLUS VERSION",
      subtitle: "Enhanced CS2 Hacks",
      description: "Enhanced Counter-Strike 2 Cheats with Premium Aimbot Settings, Advanced ESP Features, and Exclusive CS2 Hack Tools for Pro Players.",
      features: ["Enhanced Aimbot", "Premium ESP", "Undetected", "24/7 Support"],
      badge: "BEST SELLER",
      price: "$5.99",
      product: {
        id: 'cs2-plus',
        name: 'CS2 PLUS VERSION',
        price: 599, // Price in cents
        image: '/images/productimages/cs2-plus.png',
        stripe_price_id: 'price_cs2_plus_30day',
        currency: 'usd',
        description: 'Enhanced Counter-Strike 2 Cheats with Premium Aimbot Settings, Advanced ESP Features, and Exclusive CS2 Hack Tools for Pro Players.'
      }
    },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

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
                  {slides[currentSlide].badge === 'NEW RELEASE' && (
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  )}
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
                <span className={`bg-clip-text text-transparent ${
                  currentSlide === 0 ? 'bg-gradient-to-r from-[#E2891C] via-[#F5A623] to-[#E2891C]' : // BF6 - shiny orange gradient
                  currentSlide === 1 ? 'bg-gradient-to-r from-[#CC6150] via-[#E07B6B] to-[#CC6150]' : // CS2 PRO - shiny red gradient
                  'bg-gradient-to-r from-[#4480A6] via-[#5BA0D1] to-[#4480A6]' // CS2 PLUS - shiny blue gradient
                }`}>
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
            {/* Large Product Image */}
            <motion.div
              className="relative z-20 w-full h-full max-w-2xl max-h-[80vh]"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <motion.div
                key={slides[currentSlide].product.id}
                className="w-full h-full relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={slides[currentSlide].product.image}
                  alt={slides[currentSlide].product.name}
                  fill
                  className="object-contain transition-all duration-500"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </motion.div>
            </motion.div>




          </motion.div>
        </div>
      </div>

    </section>
  );
}