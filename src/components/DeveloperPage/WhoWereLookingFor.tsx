'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Gamepad2, Shield, ChevronDown } from 'lucide-react';

export default function WhoWereLookingFor() {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const requirements = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Technical Expertise',
      subtitle: 'Strong foundation in core technologies',
      gradient: 'from-blue-500 to-cyan-500',
      details: [
        'C++ for performance-critical game modifications',
        'Python for automation and scripting',
        'Reverse Engineering and memory manipulation',
        'Assembly language understanding preferred',
        'Windows API and system programming',
        'Game engine familiarity (Unity, Unreal, etc.)'
      ]
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Gaming Passion',
      subtitle: 'Deep understanding of gaming ecosystems',
      gradient: 'from-green-500 to-emerald-500',
      details: [
        'FPS games experience (CS2, PUBG, BF, COD, Valorant, Apex)',
        'Anti-cheat system knowledge (VAC, EAC, BattlEye)',
        'Game mechanics and networking understanding',
        'Competitive gaming background preferred',
        'Understanding of game security measures',
        'Interest in game development and modding'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Professional Ethics',
      subtitle: 'Commitment to quality and responsibility',
      gradient: 'from-orange-500 to-red-500',
      details: [
        'Reliable and committed to deadlines',
        'Discrete and professional in all interactions',
        'Quality-focused development approach',
        'User safety and security awareness',
        'Team collaboration and communication skills',
        'Continuous learning and improvement mindset'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

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
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Who We're Looking For
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We welcome developers of all levels who share our passion for gaming and technical excellence.
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
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                {/* Card Header */}
                <button
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-gray-700/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
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
                        <div className="bg-gray-700/30 rounded-xl p-6">
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

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-purple-800/20 to-blue-800/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <p className="text-lg text-gray-300">
              <span className="text-purple-400 font-semibold">Don't see yourself fitting perfectly?</span> 
              {' '}We value passion and potential over perfect matches. 
              If you're excited about what we do, we'd love to hear from you!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}