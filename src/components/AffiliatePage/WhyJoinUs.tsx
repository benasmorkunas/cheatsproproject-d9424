'use client';

import { motion } from 'framer-motion';
import { DollarSign, Image, CreditCard, Headphones, TrendingUp } from 'lucide-react';

export default function WhyJoinUs() {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'High Commission Rates',
      description: 'Earn up to 50% commission on all sales with lifetime cookie tracking. The more you promote, the higher your commission tier gets.',
      gradient: 'from-green-500 to-emerald-500',
      highlight: true
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: 'Premium Marketing Materials',
      description: 'Access professional banners, landing pages, promotional content, and branded assets designed to convert visitors into customers.',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Reliable Payouts',
      description: 'Weekly payments via PayPal, cryptocurrency, or bank transfer. No minimum threshold and transparent earnings tracking.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Dedicated Support',
      description: 'Personal affiliate manager and 24/7 technical support. Get help with campaigns, optimization, and any questions you have.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growing Market',
      description: 'Tap into the rapidly expanding gaming enhancement industry with products that have proven demand and high retention rates.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-purple-600/10"></div>
      </div>

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
            <span className="bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
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
                  ? 'bg-gradient-to-br from-green-800/20 to-emerald-800/20 border-green-500/30' 
                  : 'bg-gray-800/50 border-gray-700/50'
              } backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl ${
                benefit.highlight ? 'hover:shadow-green-500/10' : 'hover:shadow-purple-500/10'
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
                    benefit.highlight ? 'text-green-300' : 'text-white'
                  } group-hover:text-purple-300 transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Special highlight for commission */}
                {benefit.highlight && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      UP TO 50%
                    </div>
                  </div>
                )}

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl ${
                  benefit.highlight
                    ? 'bg-gradient-to-r from-green-500/0 via-emerald-500/0 to-green-500/0 group-hover:from-green-500/20 group-hover:via-emerald-500/20 group-hover:to-green-500/20'
                    : 'bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-green-500/0 group-hover:from-purple-500/20 group-hover:via-blue-500/20 group-hover:to-green-500/20'
                } transition-all duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commission Tiers Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-green-800/20 to-emerald-800/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Commission Structure</h3>
              <p className="text-gray-300">Earn more as you grow your affiliate business</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">30%</div>
                <div className="text-white font-semibold mb-1">Starter</div>
                <div className="text-gray-400 text-sm">0-50 sales/month</div>
              </div>
              <div className="text-center border-x border-green-500/20">
                <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
                <div className="text-white font-semibold mb-1">Pro</div>
                <div className="text-gray-400 text-sm">51-100 sales/month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50%</div>
                <div className="text-white font-semibold mb-1">Elite</div>
                <div className="text-gray-400 text-sm">100+ sales/month</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of successful affiliates who are earning premium commissions 
              promoting the best gaming enhancement tools in the industry.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Application
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}