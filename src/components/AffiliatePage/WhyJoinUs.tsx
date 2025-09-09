'use client';

import { motion } from 'framer-motion';
import { DollarSign, Image, CreditCard, Headphones, TrendingUp } from 'lucide-react';

export default function WhyJoinUs() {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'High Commission Rates',
      description: 'Earn up to 50% commission on all sales. The more you promote, the higher your commission tier gets.',
      gradient: 'from-gray-500 to-slate-500',
      highlight: true
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: 'Premium Marketing Materials',
      description: 'Access professional banners, landing pages, promotional content, and branded assets designed to convert visitors into customers.',
      gradient: 'from-gray-600 to-gray-500'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Dedicated Support',
      description: 'Personal affiliate manager and 24/7 technical support. Get help with campaigns, optimization, and any questions you have.',
      gradient: 'from-gray-600 to-slate-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growing Market',
      description: 'Tap into the rapidly expanding gaming enhancement industry with products that have proven demand and high retention rates.',
      gradient: 'from-gray-800 to-gray-700'
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
              Why Partner With Us?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join a profitable affiliate program with industry-leading commissions, 
            marketing support, and reliable payouts.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`relative ${
                benefit.highlight 
                  ? 'bg-gradient-to-br from-gray-800/20 to-slate-800/20 border-gray-500/30' 
                  : 'bg-black/40 border-gray-600/20'
              } backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 hover:border-gray-500/30 hover:shadow-xl ${
                benefit.highlight ? 'hover:shadow-gray-500/10' : 'hover:shadow-gray-500/10'
              }`}>
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${benefit.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`text-xl font-bold ${
                    benefit.highlight ? 'text-gray-200' : 'text-white'
                  } group-hover:text-gray-300 transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Special highlight for commission */}
                {benefit.highlight && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      UP TO 50%
                    </div>
                  </div>
                )}

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl ${
                  benefit.highlight
                    ? 'bg-gradient-to-r from-gray-500/0 via-slate-500/0 to-gray-500/0 group-hover:from-gray-500/20 group-hover:via-slate-500/20 group-hover:to-gray-500/20'
                    : 'bg-gradient-to-r from-gray-500/0 via-gray-400/0 to-gray-300/0 group-hover:from-gray-500/20 group-hover:via-gray-400/20 group-hover:to-gray-300/20'
                } transition-all duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start earning premium commissions by promoting the best gaming enhancement tools in the industry.
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