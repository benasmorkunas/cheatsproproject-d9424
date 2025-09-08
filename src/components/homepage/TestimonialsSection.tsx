'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "These CS2 cheats are absolutely insane! The wallhack is so smooth and the aimbot feels completely natural. Been using for 3 months with zero detections. Customer support is top-notch too!",
      author: "ProGamer_2024",
      platform: "Steam",
      avatar: "🎮",
      game: "CS2",
      verified: true
    },
    {
      id: 2,
      rating: 5,
      text: "Finally found reliable BF6 hacks! The ESP works flawlessly and gives me such a tactical advantage. The subscription model is perfect - no huge upfront costs. Highly recommended!",
      author: "BattlefieldKing",
      platform: "Discord",
      avatar: "👑",
      game: "BF6",
      verified: true
    },
    {
      id: 3,
      rating: 5,
      text: "The grenade helper is a game-changer! Now I can hit perfect smokes and flashes every time. The trajectory lines are so accurate. Worth every penny for competitive play.",
      author: "SmokeWizard",
      platform: "Steam",
      avatar: "💨",
      game: "CS2",
      verified: true
    },
    {
      id: 4,
      rating: 5,
      text: "Been through many cheat providers, but cheats-pro is different. Professional quality, regular updates, and the community is amazing. The Discord is super active and helpful.",
      author: "VeteranPlayer",
      platform: "Discord",
      avatar: "⭐",
      game: "CS2 + BF6",
      verified: true
    },
    {
      id: 5,
      rating: 5,
      text: "Installation was super easy (literally 3 minutes) and everything works perfectly. The aimbot settings are so customizable - you can make it as subtle or obvious as you want.",
      author: "QuickScope99",
      platform: "Steam",
      avatar: "🎯",
      game: "CS2",
      verified: true
    },
    {
      id: 6,
      rating: 5,
      text: "The BF6 vehicle ESP is incredible! I can see tanks and helicopters from across the map. Combined with the infantry ESP, I'm dominating every match. Undetected for months!",
      author: "TankHunter",
      platform: "Discord",
      avatar: "🚁",
      game: "BF6",
      verified: true
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-40 right-20 w-72 h-72 rounded-full blur-3xl"
          style={{background: '#6B7A9A20'}}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              PEOPLE WHO LIKED OUR PRODUCT
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied gamers dominating their matches
          </p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-white text-xl font-semibold">4.9/5</div>
            <div className="text-gray-400">from 250+ reviews</div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          <motion.button
            onClick={prevTestimonial}
            className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-full p-3 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-300" />
          </motion.button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }"
                style={index === currentIndex ? {background: '#825D8D'} : {}}
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-full p-3 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </motion.button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${currentIndex}`}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 relative transition-all duration-300"
                style={{} as React.CSSProperties}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#825D8D80'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8" style={{color: '#825D8D40'}} />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{background: 'linear-gradient(to right, #825D8D, #6B7A9A)'}}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">
                          {testimonial.author}
                        </span>
                        {testimonial.verified && (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{background: '#6B7A9A'}}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.platform} • {testimonial.game}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{color: '#825D8D'}}>2.5K+</div>
            <div className="text-gray-400">Happy Gamers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{color: '#6B8A7A'}}>99.2%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2" style={{color: '#9A8A6B'}}>24/7</div>
            <div className="text-gray-400">Support Available</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}