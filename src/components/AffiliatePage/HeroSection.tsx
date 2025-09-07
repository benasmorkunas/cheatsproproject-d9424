'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Headphones, TrendingUp } from 'lucide-react';

interface AnimatedElement {
  id: number;
  x: number;
  y: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function HeroSection() {
  const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    // Generate animated elements on client side only
    const elements = [...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
    }));
    setAnimatedElements(elements);
  }, []);

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

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {animatedElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
            animate={{
              x: [0, element.x, 0],
              y: [0, element.y, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
            }}
            style={{
              left: element.left,
              top: element.top,
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
                    : 'bg-black/40 border-gray-600/20'
                } backdrop-blur-sm border rounded-xl p-4 md:p-6 min-w-[140px] md:min-w-[180px]`}
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className={`${stat.highlight ? 'text-green-400' : 'text-gray-400'}`}>
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
              className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform shadow-lg shadow-gray-500/25 flex items-center space-x-2 mx-auto"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <DollarSign className="w-5 h-5" />
              <span>Apply Now</span>
            </motion.button>
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
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}