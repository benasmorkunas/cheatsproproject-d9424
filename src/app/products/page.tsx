'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { ArrowRight, Shield, Users, Star } from 'lucide-react';
import { getCategoryStats } from '@/lib/categoryStats';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';

const baseCategoriesData = [
  {
    id: 'cs2',
    name: 'CS2 Cheats',
    description: 'Premium Counter-Strike 2 hacks with undetected aimbot, wallhack, and ESP',
    image: '/images/cs2-category.jpg',
    href: '/products/cs2',
    gradient: 'from-orange-600 to-red-600',
    bgGradient: 'from-orange-900/20 to-red-900/20',
    features: [
      'Advanced Aimbot',
      'ESP & Wallhack', 
      'Radar Hack',
      'Anti-Cheat Bypass'
    ]
  },
  {
    id: 'bf6',
    name: 'BF6 Cheats',
    description: 'Ultimate Battlefield 6 enhancement tools with radar, ESP, and vehicle hacks',
    image: '/images/bf6-category.jpg',
    href: '/products/bf6',
    gradient: 'from-green-600 to-blue-600',
    bgGradient: 'from-green-900/20 to-blue-900/20',
    features: [
      'Ultimate Aimbot',
      'Advanced ESP',
      'Vehicle Hacks',
      'Instant Kill'
    ]
  }
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(baseCategoriesData.map(cat => ({ ...cat, stats: { products: 0, users: '0', rating: '0' } })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryStats = async () => {
      try {
        const stats = await getCategoryStats();
        const updatedCategories = baseCategoriesData.map(cat => ({
          ...cat,
          stats: cat.id === 'cs2' ? stats.cs2 : stats.bf6
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error loading category stats:', error);
        // Keep default stats if loading fails
        setCategories(baseCategoriesData.map(cat => ({
          ...cat,
          stats: cat.id === 'cs2' ? { products: 3, users: '2.5K+', rating: '4.7' } : { products: 3, users: '3.8K+', rating: '4.8' }
        })));
      } finally {
        setLoading(false);
      }
    };

    loadCategoryStats();
  }, []);

  return (
    <MinimalisticBackground>
      <div className="min-h-screen">
        <Header />
      
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 bg-[#0e0e0e] overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                    CHOOSE YOUR GAME
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Select your preferred gaming category to explore our premium undetected cheats and enhancement tools
                </p>
              </motion.div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-20 bg-[#0e0e0e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:gap-12">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group"
                  >
                    <Link href={category.href}>
                      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.bgGradient} border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 lg:p-12">
                          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient}`}></div>
                                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                    Premium Category
                                  </span>
                                </div>
                                
                                <h2 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                                  {category.name}
                                </h2>
                                
                                <p className="text-lg text-gray-300 leading-relaxed">
                                  {category.description}
                                </p>
                              </div>

                              {/* Stats */}
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                                  <div className="text-2xl font-bold text-white mb-1">{category.stats.products}</div>
                                  <div className="text-xs text-gray-400 uppercase tracking-wide">Products</div>
                                </div>
                                <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                                  <div className="text-2xl font-bold text-blue-400 mb-1">{category.stats.users}</div>
                                  <div className="text-xs text-gray-400 uppercase tracking-wide">Users</div>
                                </div>
                                <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                                  <div className="flex items-center justify-center space-x-1 mb-1">
                                    <span className="text-2xl font-bold text-yellow-400">{category.stats.rating}</span>
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                  </div>
                                  <div className="text-xs text-gray-400 uppercase tracking-wide">Rating</div>
                                </div>
                              </div>

                              {/* CTA Button */}
                              <div className="flex items-center space-x-4">
                                <motion.div
                                  className={`flex items-center space-x-2 bg-gradient-to-r ${category.gradient} hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <span>Explore {category.id.toUpperCase()} Cheats</span>
                                  <ArrowRight className="w-5 h-5" />
                                </motion.div>
                                
                                <div className="flex items-center space-x-2 text-green-400">
                                  <Shield className="w-5 h-5" />
                                  <span className="text-sm font-medium">Undetected</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Content - Features */}
                            <div className="space-y-6">
                              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                                  <Star className="w-5 h-5 text-purple-400" />
                                  <span>Key Features</span>
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-3">
                                  {category.features.map((feature, featureIndex) => (
                                    <motion.div
                                      key={feature}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) }}
                                      className="flex items-center space-x-2 text-gray-300"
                                    >
                                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}></div>
                                      <span className="text-sm font-medium">{feature}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              {/* Trust Indicators */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                                  <Shield className="w-6 h-6 text-green-400" />
                                  <div>
                                    <div className="text-sm font-semibold text-green-400">Safe & Secure</div>
                                    <div className="text-xs text-gray-400">Anti-Detection</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                                  <Users className="w-6 h-6 text-blue-400" />
                                  <div>
                                    <div className="text-sm font-semibold text-blue-400">24/7 Support</div>
                                    <div className="text-xs text-gray-400">Expert Help</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 text-center"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Need Help Choosing?
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Our gaming experts are available 24/7 to help you select the perfect cheats for your gaming style and needs.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/products/all"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      View All Products
                    </Link>
                    <Link
                      href="https://discord.gg/cheats-pro"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Get Support
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </MinimalisticBackground>
  );
}