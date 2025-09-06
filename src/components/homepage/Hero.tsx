'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Target, Shield } from 'lucide-react';

export default function Hero() {
  const valueProps = [
    { icon: <Check className="w-5 h-5" />, text: 'Undetected Cheats' },
    { icon: <Target className="w-5 h-5" />, text: 'Aimbot, ESP & Grenade Helper' },
    { icon: <Zap className="w-5 h-5" />, text: 'Instant Setup (3 min install)' },
  ];

  const trustBadges = ['Undetected', '24/7 Support', 'Instant Delivery'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {trustBadges.map((badge, index) => (
              <div
                key={badge}
                className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-full"
              >
                <Shield className="w-4 h-4" style={{color: '#6B8A7A'}} />
                <span className="text-sm text-gray-300">{badge}</span>
              </div>
            ))}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, white, #9B8A9E, #7A8B9C)'}}>
              Undetected CS2 Hacks &
            </span>
            <br />
            <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #825D8D, #6B7A9A, #6B8A7A)'}}>
              BF6 Cheats
            </span>
            <br />
            <span className="text-white text-3xl md:text-4xl lg:text-5xl">
              Dominate Every Match
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Premium cheats with{' '}
            <span className="font-semibold" style={{color: '#825D8D'}}>AI-based technology</span> and{' '}
            <span className="font-semibold" style={{color: '#6B7A9A'}}>instant activation</span>
          </motion.p>

          {/* Value propositions */}
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 px-6 py-4 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{color: '#6B8A7A'}}>{prop.icon}</div>
                <span className="text-white font-medium">{prop.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              className="text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl relative overflow-hidden group"
              style={{background: 'linear-gradient(to right, #6B5B7A, #5A6B8A, #6B5B7A)', transition: 'all 0.3s'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #5A4B6A, #4A5B7A, #5A4B6A)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #6B5B7A, #5A6B8A, #6B5B7A)'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{background: 'linear-gradient(to right, #825D8D, #6B7A9A)'}}></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Instant Access</span>
                <Zap className="w-5 h-5" />
              </span>
            </motion.button>

            <div className="text-gray-400 text-sm">
              <p>✓ Instant download</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-16 pt-16 border-t border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold" style={{color: '#825D8D'}}>1K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{color: '#6B7A9A'}}>99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{color: '#6B8A7A'}}>24/7</div>
              <div className="text-gray-400 text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{color: '#9A8A6B'}}>5★</div>
              <div className="text-gray-400 text-sm">Rating</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}