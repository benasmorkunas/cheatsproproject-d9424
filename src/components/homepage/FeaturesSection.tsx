'use client';

import { motion } from 'framer-motion';
import { Eye, Target, Bomb, Check } from 'lucide-react';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';

export default function FeaturesSection() {
  const features = [
    {
      id: 'wallhack',
      icon: <Eye className="w-8 h-8" />,
      title: 'Best CS2 Wallhack (Undetected)',
      description: 'See through walls and gain the ultimate advantage',
      features: [
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'ESP & Player Outlines' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Custom Colors & Styles' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Health & Armor Indicators' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Distance & Name Tags' }
      ],
      ctaText: 'Get Wallhack Now',
      color: 'purple',
      image: '/features/wallhack-demo.jpg'
    },
    {
      id: 'aimbot',
      icon: <Target className="w-8 h-8" />,
      title: 'Professional CS2 Aimbot',
      description: 'Precision targeting with natural movement',
      features: [
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Smooth Human-like Aim' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Customizable FOV Circle' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Bone Selection (Head/Body)' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Recoil Compensation' }
      ],
      ctaText: 'Unlock Aimbot Access',
      color: 'blue',
      image: '/features/aimbot-demo.jpg'
    },
    {
      id: 'grenade',
      icon: <Bomb className="w-8 h-8" />,
      title: 'CS2 Grenade Hack / Helper Tool',
      description: 'Master every smoke, flash, and nade throw',
      features: [
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Trajectory Preview Lines' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Damage Area Overlay' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Perfect Lineup Spots' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'One-Way Smoke Helper' }
      ],
      ctaText: '💣 Get Grenade Helper',
      color: 'green',
      image: '/features/grenade-demo.jpg'
    }
  ];

  const getGradientClasses = (color: string) => {
    const gradients = {
      purple: {
        bg: 'from-gray-900/50 to-gray-800/30',
        border: 'border-gray-700/50 hover:border-gray-600/70',
        button: 'custom-purple-gradient',
        icon: 'custom-purple-icon'
      },
      blue: {
        bg: 'from-gray-900/50 to-gray-800/30',
        border: 'border-gray-700/50 hover:border-gray-600/70',
        button: 'custom-blue-gradient',
        icon: 'custom-blue-icon'
      },
      green: {
        bg: 'from-gray-900/50 to-gray-800/30',
        border: 'border-gray-700/50 hover:border-gray-600/70',
        button: 'custom-green-gradient',
        icon: 'custom-green-icon'
      }
    };
    return gradients[color as keyof typeof gradients];
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #825D8D, #6B7A9A, #6B8A7A)'}}>
              Premium Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced gaming enhancements designed for competitive players
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const gradients = getGradientClasses(feature.color);

            const getCustomStyle = (color: string) => {
              const styles = {
                purple: { bg: '#6B5B7A', icon: '#825D8D' },
                blue: { bg: '#5A6B8A', icon: '#6B7A9A' },
                green: { bg: '#5A7A6B', icon: '#6B8A7A' }
              };
              return styles[color as keyof typeof styles] || styles.purple;
            };
            
            const customStyle = getCustomStyle(feature.color);

            return (
              <motion.div
                key={feature.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl border border-gray-700/50 hover:border-gray-600/70" style={{background: `linear-gradient(135deg, ${customStyle.bg}, ${customStyle.bg}90)`, color: customStyle.icon}}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {feature.features.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                        <span className="text-gray-200 font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    className="text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{background: `linear-gradient(135deg, ${customStyle.bg}, ${customStyle.bg}CC)`}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => e.currentTarget.style.background = `linear-gradient(135deg, ${customStyle.bg}DD, ${customStyle.bg}AA)`}
                    onMouseLeave={(e) => e.currentTarget.style.background = `linear-gradient(135deg, ${customStyle.bg}, ${customStyle.bg}CC)`}
                  >
                    {feature.ctaText}
                  </motion.button>
                </div>

                {/* Image/Demo */}
                <div className="flex-1">
                  <motion.div
                    className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${gradients.bg} border ${gradients.border} shadow-2xl`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-video bg-gray-800/50 flex items-center justify-center">
                      {/* Placeholder for demo image */}
                      <div className="text-center">
                        <div className={`text-6xl mb-4 ${gradients.icon}`}>
                          {feature.icon}
                        </div>
                        <div className="text-gray-400 text-lg font-medium">
                          {feature.title} Demo
                        </div>
                        <div className="text-gray-500 text-sm mt-2">
                          Live demonstration available
                        </div>
                      </div>
                    </div>

                    {/* Overlay with stats */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex justify-between items-center">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-white text-sm font-medium">✓ Undetected</span>
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-green-400 text-sm font-medium">● Active</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <motion.div
          className="text-center mt-20 pt-16 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Get All Features in One Package
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Don't choose between features. Get everything you need to dominate CS2 with our comprehensive cheat package.
          </p>
          <motion.button
            className="text-white px-12 py-4 rounded-xl font-bold text-xl shadow-2xl"
            style={{background: 'linear-gradient(to right, #6B5B7A, #5A6B8A, #5A7A6B)', transition: 'all 0.3s'}}
            onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #5A4B6A, #4A5B7A, #4A6A5B)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #6B5B7A, #5A6B8A, #5A7A6B)'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Complete Package
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}