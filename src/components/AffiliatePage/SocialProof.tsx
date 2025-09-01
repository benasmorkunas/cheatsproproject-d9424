'use client';

import { motion } from 'framer-motion';
import { Star, DollarSign, Users, CheckCircle, Award, TrendingUp } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Jake "StreamKing" Miller',
      role: 'Twitch Streamer & YouTuber',
      platform: 'Twitch: 45K followers',
      image: '/api/placeholder/60/60',
      rating: 5,
      earnings: '$3,200',
      period: 'first month',
      text: 'Cheats-pro\'s affiliate program is incredible! The commission rates are the highest I\'ve seen, and the products actually convert. Made over $3K in my first month just from honest reviews.',
      joinedDate: '2023',
      verified: true
    },
    {
      name: 'Sarah Chen',
      role: 'Gaming Content Creator',
      platform: 'YouTube: 120K subscribers',
      image: '/api/placeholder/60/60',
      rating: 5,
      earnings: '$5,800',
      period: 'last month',
      text: 'The support team is amazing and the marketing materials are professional. My audience trusts the recommendations because the products are actually undetected and reliable.',
      joinedDate: '2022',
      verified: true
    },
    {
      name: 'Alex Rodriguez',
      role: 'Gaming Forum Moderator',
      platform: 'Discord: 25K members',
      image: '/api/placeholder/60/60',
      rating: 5,
      earnings: '$1,950',
      period: 'this month',
      text: 'I love the lifetime cookie tracking - I still earn from customers I referred 6 months ago. The 50% commission rate for top affiliates is unmatched in the industry.',
      joinedDate: '2023',
      verified: true
    }
  ];

  const trustIndicators = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Reliable Payouts Since 2019',
      subtitle: 'Never missed a payment',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '150+ Active Affiliates',
      subtitle: 'Growing partner network',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: '$2.5M+ Paid Out',
      subtitle: 'Total commissions earned',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Top Tier Support',
      subtitle: '24/7 affiliate assistance',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const successStats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: '95%',
      label: 'Affiliate Retention Rate',
      description: 'Partners stay with us long-term'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: '$2,400',
      label: 'Average Monthly Earnings',
      description: 'Top 25% of affiliates'
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: '15%',
      label: 'Conversion Rate',
      description: 'Above industry average'
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: '4.9/5',
      label: 'Affiliate Satisfaction',
      description: 'Based on partner surveys'
    }
  ];

  const earningsHighlights = [
    {
      amount: '$8,500',
      period: 'First 3 months',
      affiliate: 'Gaming YouTuber',
      achievement: 'Elite tier reached'
    },
    {
      amount: '$15,200',
      period: 'Monthly record',
      affiliate: 'Twitch Streamer',
      achievement: 'Top performer'
    },
    {
      amount: '$4,800',
      period: 'Part-time earnings',
      affiliate: 'Discord Manager',
      achievement: 'Consistent growth'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              Trusted by Top Affiliates
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${indicator.gradient} mb-4`}>
                  <div className="text-white">
                    {indicator.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{indicator.title}</h3>
                <p className="text-gray-400 text-sm">{indicator.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Affiliate Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">What Our </span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Top Affiliates Say
            </span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Earnings Highlight */}
                <div className="bg-gradient-to-r from-green-800/30 to-emerald-800/30 border border-green-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{testimonial.earnings}</div>
                      <div className="text-green-300 text-sm">earned {testimonial.period}</div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  {testimonial.verified && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                  )}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-purple-400 text-xs">{testimonial.platform}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Affiliate Success Statistics</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="font-bold text-white text-2xl mb-1">{stat.value}</div>
                <div className="text-purple-400 font-medium text-sm mb-1">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Earnings Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-green-800/20 to-emerald-800/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">Real Affiliate Earnings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earningsHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-800/30 rounded-xl"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">{highlight.amount}</div>
                <div className="text-white font-medium mb-1">{highlight.period}</div>
                <div className="text-gray-400 text-sm mb-2">{highlight.affiliate}</div>
                <div className="text-green-300 text-xs bg-green-900/20 px-3 py-1 rounded-full">
                  {highlight.achievement}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start earning premium commissions today. Our affiliates consistently outperform 
              industry standards with our high-converting products and generous commission structure.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-green-500/25"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Earning Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}