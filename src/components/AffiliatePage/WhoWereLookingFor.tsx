'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Globe, Gamepad2, Shield, ChevronDown } from 'lucide-react';

export default function WhoWereLookingFor() {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const requirements = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Marketing Experience',
      subtitle: 'Content creators and influencers welcome',
      gradient: 'from-purple-500 to-pink-500',
      details: [
        'Social media influencers with engaged gaming audiences',
        'Content creators (YouTube, TikTok, Instagram)',
        'Gaming community managers and moderators',
        'Bloggers and website owners in gaming niche',
        'Email marketing experience preferred',
        'Understanding of conversion optimization'
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Traffic Sources',
      subtitle: 'Multiple channels for maximum reach',
      gradient: 'from-blue-500 to-cyan-500',
      details: [
        'YouTube channels focused on gaming content',
        'Twitch streaming with regular viewership',
        'Discord servers with active gaming communities',
        'Gaming forums and Reddit communities',
        'Social media platforms (Twitter, Instagram, TikTok)',
        'Gaming blogs and websites with organic traffic'
      ]
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Gaming Knowledge',
      subtitle: 'Deep understanding of gaming culture',
      gradient: 'from-green-500 to-emerald-500',
      details: [
        'Understanding of FPS games and competitive gaming',
        'Knowledge of gaming enhancement tools and their benefits',
        'Familiarity with streaming and content creation',
        'Active participation in gaming communities',
        'Understanding of esports and competitive scenes',
        'Experience with gaming hardware and software'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Professional Approach',
      subtitle: 'Ethical and quality-focused promotion',
      gradient: 'from-orange-500 to-red-500',
      details: [
        'Reliable and committed to partnership agreements',
        'Ethical promotion practices and honest reviews',
        'Quality-focused content creation approach',
        'Professional communication and responsiveness',
        'Long-term partnership mindset',
        'Willingness to follow brand guidelines'
      ]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Who We're Looking For
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We welcome content creators, influencers, and marketers who are passionate 
            about gaming and committed to quality promotion.
          </p>
        </motion.div>

        {/* Requirements Cards */}
        <div className="space-y-6">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                {/* Card Header */}
                <button
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-black/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${req.gradient} flex-shrink-0`}>
                        <div className="text-white">
                          {req.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                          {req.title}
                        </h3>
                        <p className="text-gray-400">
                          {req.subtitle}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <div className="bg-black/20 rounded-xl p-6">
                          <ul className="space-y-3">
                            {req.details.map((detail, detailIndex) => (
                              <motion.li
                                key={detailIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimum Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-green-800/20 to-emerald-800/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-400 mb-4 text-center">No Minimum Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-300 text-sm">Minimum Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-300 text-sm">Minimum Traffic</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <div className="text-gray-300 text-sm">Upfront Costs</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6">
            <p className="text-lg text-gray-300">
              <span className="text-purple-400 font-semibold">New to affiliate marketing?</span> 
              {' '}No problem! We provide comprehensive training, marketing materials, 
              and ongoing support to help you succeed. Quality and passion matter more than experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}