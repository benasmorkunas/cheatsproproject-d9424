'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, Headphones, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const stats = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Up to 50% Commission',
      value: '50%',
      highlight: true
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: '1000+ Active Users',
      value: '1K+'
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      label: '24/7 Support',
      value: '24/7'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Join the Cheats-Pro
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Affiliate Program
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Earn Premium Commissions Promoting Undetected Gaming Tools
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${
                  stat.highlight 
                    ? 'bg-gradient-to-br from-green-800/30 to-emerald-800/30 border-green-500/30' 
                    : 'bg-gray-800/50 border-purple-500/20'
                } backdrop-blur-sm border rounded-xl p-4 md:p-6 min-w-[140px] md:min-w-[180px]`}
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className={`${stat.highlight ? 'text-green-400' : 'text-purple-400'}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-lg md:text-xl font-bold ${
                    stat.highlight ? 'text-green-400' : 'text-white'
                  }`}>
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Commission Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-green-800/20 to-emerald-800/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold text-green-400">Lifetime Cookies</span>
            </div>
            <p className="text-gray-300">
              Earn recurring commissions from every customer you refer with our lifetime cookie tracking
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform shadow-lg shadow-purple-500/25 flex items-center space-x-2 mx-auto"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <DollarSign className="w-5 h-5" />
              <span>Apply Now</span>
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-gray-400 text-sm max-w-2xl mx-auto"
          >
            No minimum traffic requirements • Weekly payouts • Professional marketing materials included
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}