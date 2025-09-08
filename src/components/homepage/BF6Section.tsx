'use client';

import { motion } from 'framer-motion';
import { Shield, Crosshair, Map, Users, Check } from 'lucide-react';

export default function BF6Section() {
  const bf6Features = [
    {
      icon: <Crosshair className="w-6 h-6" />,
      title: 'Advanced Aimbot',
      description: 'Precision targeting for all weapons'
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: 'Enhanced ESP',
      description: 'See enemies through walls and terrain'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'PID Controller',
      description: 'Advanced control system for smooth gameplay'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'No Recoil',
      description: 'Perfect weapon control system'
    }
  ];

  const testimonials = [
    {
      text: "BF6 cheats are insane! The ESP works perfectly and I haven't been detected.",
      author: "Zik2024",
      rating: 5
    },
    {
      text: "Finally, reliable BF6 hacks. The aimbot is smooth and natural looking.",
      author: "*******",
      rating: 5
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl" style={{background: '#8A6B5A20'}}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4" style={{background: '#8A6B5A30', border: '1px solid #8A6B5A50'}}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{background: '#8A6B5A'}}></span>
                <span className="text-sm font-medium" style={{color: '#9A7B6A'}}>NEW RELEASE</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Now Available for</span>
                <br />
                <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #8A6B5A, #8A5B6A)'}}>
                  Battlefield 6
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Dominate the battlefield with our undetected BF6 hacks. 
                Featuring advanced ESP, BF6 aimbot, and wallhack tools 
                designed for enhanced gaming experience.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bf6Features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 transition-all duration-300"
                  style={{} as React.CSSProperties}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8A6B5A80'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1" style={{color: '#8A6B5A'}}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Element */}
            <motion.div
              className="rounded-xl p-4" style={{background: '#6B8A7A20', border: '1px solid #6B8A7A30'}}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6" style={{color: '#6B8A7A'}} />
                <div>
                  <h4 className="text-white font-semibold">Tested & Undetected</h4>
                  <p className="text-sm" style={{color: '#6B8A7A'}}>
                    Extensively tested on BF6 servers • Zero detection reports
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
                style={{background: 'linear-gradient(to right, #7A5B4A, #7A4B5A)', transition: 'all 0.3s'}}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #6A4B3A, #6A3B4A)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #7A5B4A, #7A4B5A)'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pre-order BF6 Cheats
              </motion.button>
              
            </motion.div>
          </motion.div>

          {/* Visual/Demo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden" style={{background: 'linear-gradient(135deg, #8A6B5A20, #8A5B6A20)', border: '1px solid #8A6B5A30'}}>
              {/* Demo Screenshot Placeholder */}
              <div className="aspect-video bg-gray-800/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4" style={{color: '#8A6B5A'}}>🎮</div>
                  <div className="text-white text-xl font-semibold mb-2">
                    BF6 ESP in Action
                  </div>
                  <div className="text-gray-400">
                    Live battlefield awareness
                  </div>
                </div>
              </div>

              {/* Overlay UI Elements */}
              <div className="absolute top-4 left-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{background: '#6B8A7A'}}></div>
                    <span className="text-white text-sm font-medium">ESP Active</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="text-sm font-medium" style={{color: '#9A7B6A'}}>64 Players Visible</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Aimbot: ON</span>
                    <span className="text-gray-300">ESP: ON</span>
                    <span style={{color: '#6B8A7A'}}>Status: Undetected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-8 space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{background: 'linear-gradient(135deg, #7A5B4A, #7A4B5A)'}}>
                        {testimonial.author[0]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm italic mb-2">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">
                          - {testimonial.author}
                        </span>
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}