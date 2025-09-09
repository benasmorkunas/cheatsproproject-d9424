'use client';

import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';

export default function WhyJoinUs() {
  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Remote Work',
      description: 'Set your own schedule with our results-focused culture. Work from anywhere in the world while maintaining work-life balance.',
      gradient: 'from-gray-500 to-gray-400'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Revenue Share Model',
      description: 'Earn competitive rates plus project bonuses. Share in our success with performance-based compensation and growth incentives.',
      gradient: 'from-gray-600 to-gray-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Opportunities',
      description: 'Lead projects and shape our technical direction. Advance your career while working on challenging, impactful projects.',
      gradient: 'from-gray-700 to-gray-600'
    }
  ];

  return (
    <section className="pt-64 pb-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
              Why Join Our Team?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're building the future of gaming tools with a world-class remote team. 
            Join us and be part of something extraordinary.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 h-full transition-all duration-300 hover:border-gray-500/30 hover:shadow-xl hover:shadow-gray-500/10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/0 via-gray-400/0 to-gray-300/0 group-hover:from-gray-500/20 group-hover:via-gray-400/20 group-hover:to-gray-300/20 transition-all duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our elite team of developers and help create the next generation of gaming tools.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(107, 114, 128, 0.35)" }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-2xl shadow-gray-500/30 border border-gray-400/20 backdrop-blur-sm overflow-hidden group"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              {/* Button content */}
              <span className="relative z-10">Start Your Application</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}