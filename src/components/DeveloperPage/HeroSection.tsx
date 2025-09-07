'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, DollarSign, MapPin } from 'lucide-react';

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
    const elements = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setAnimatedElements(elements);
  }, []);
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: '1000+ Active Users',
      value: '1K+'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Revenue Share Model',
      value: 'EARN'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: '100% Remote Team',
      value: 'REMOTE'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {animatedElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-gray-400/30 rounded-full"
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
              <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-100 bg-clip-text text-transparent">
                Join the Cheats-Pro
              </span>
              <span className="block bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                Development Team
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Build Undetected Gaming Tools That Dominate Every Match
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
                className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 md:p-6 min-w-[140px] md:min-w-[180px]"
              >
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="text-gray-400">
                    {stat.icon}
                  </div>
                  <div className="text-lg md:text-xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(107, 114, 128, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform shadow-2xl shadow-gray-500/30 flex items-center space-x-2 mx-auto border border-gray-400/20 backdrop-blur-sm overflow-hidden group"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              {/* Button content */}
              <Code className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Apply Now</span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
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