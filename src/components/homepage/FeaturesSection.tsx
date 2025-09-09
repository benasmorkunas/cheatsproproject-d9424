'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Bomb, Check } from 'lucide-react';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';
import { useRouter } from 'next/navigation';
import FloatingParticles from '@/components/common/FloatingParticles';

export default function FeaturesSection() {
  const router = useRouter();
  const [currentAimbotGif, setCurrentAimbotGif] = useState(0);
  
  const aimbotGifs = ['/images/featureimages/5.webp', '/images/featureimages/6.webp'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAimbotGif(prev => (prev + 1) % aimbotGifs.length);
    }, 3000); // Switch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (featureId: string) => {
    if (featureId === 'wallhack') {
      router.push('/products/cs2'); // CS2 Lite
    } else if (featureId === 'aimbot') {
      router.push('/products/cs2'); // CS2 Plus  
    } else if (featureId === 'grenade') {
      router.push('/products/cs2'); // CS2 Pro
    }
  };

  const features = [
    {
      id: 'wallhack',
      icon: <Eye className="w-8 h-8" />,
      title: 'Best Undetected CS2 Wallhack',
      description: 'See through walls and gain the ultimate competitive advantage with our undetected CS2 wallhack ESP. Professional Counter-Strike 2 wall hack with advanced player visibility features.',
      features: [
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'CS2 ESP & Player Outlines' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Custom Colors & Wallhack Styles' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Health & Armor ESP Indicators' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Distance & Name Tag Display' }
      ],
      ctaText: 'Get Wallhack Now',
      color: 'wallhack',
      image: '/features/wallhack-demo.jpg'
    },
    {
      id: 'aimbot',
      icon: <Target className="w-8 h-8" />,
      title: 'Professional CS2 Aimbot',
      description: 'Dominate matches with precision targeting and natural movement patterns. Advanced Counter-Strike 2 aimbot with human-like aiming behavior and customizable settings for undetected gameplay.',
      features: [
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Smooth Human-like CS2 Aimbot' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Customizable FOV Circle & Range' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Bone Selection (Head/Body Targeting)' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Advanced Recoil Compensation' }
      ],
      ctaText: 'Unlock Aimbot Access',
      color: 'aimbot',
      image: '/features/aimbot-demo.jpg'
    },
    {
      id: 'grenade',
      icon: <Bomb className="w-8 h-8" />,
      title: 'CS2 Grenade Hack / Helper Tool',
      description: 'Master every smoke, flash, and grenade throw with precision trajectory assistance. Professional CS2 grenade helper with lineup spots and damage area overlays for tactical advantage.',
      features: [
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Grenade Trajectory Preview Lines' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Grenade Recorder' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'Perfect CS2 Lineup Spots' },
        { icon: <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />, text: 'One-Way Smoke Helper Tool' }
      ],
      ctaText: 'Get Grenade Helper',
      color: 'grenade',
      image: '/features/grenade-demo.jpg'
    }
  ];

  const getGradientClasses = (color: string) => {
    const gradients = {
      wallhack: {
        bg: 'from-gray-900/50 to-gray-800/30',
        border: 'border-gray-700/50 hover:border-gray-600/70',
        button: 'custom-wallhack-gradient',
        icon: 'custom-wallhack-icon'
      },
      aimbot: {
        bg: 'from-gray-900/50 to-gray-800/30',
        border: 'border-gray-700/50 hover:border-gray-600/70',
        button: 'custom-aimbot-gradient',
        icon: 'custom-aimbot-icon'
      },
      grenade: {
        bg: 'from-gray-900/50 to-gray-800/30',
        border: 'border-gray-700/50 hover:border-gray-600/70',
        button: 'custom-grenade-gradient',
        icon: 'custom-grenade-icon'
      }
    };
    return gradients[color as keyof typeof gradients];
  };

  return (
    <section className="relative py-20">
      <FloatingParticles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              PREMIUM FEATURES
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Undetected Cheats Designed for Competitive Players
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const gradients = getGradientClasses(feature.color);

            const getCustomStyle = (color: string) => {
              const styles = {
                wallhack: { bg: '#B99C92', icon: '#AFA09C' },
                aimbot: { bg: '#5D7A8D', icon: '#697881' },
                grenade: { bg: '#9B8263', icon: '#8D8171' }
              };
              return styles[color as keyof typeof styles] || styles.wallhack;
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
                    <motion.div 
                      className="p-3 rounded-xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${customStyle.bg}, ${customStyle.bg}90)`,
                        color: customStyle.icon
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">
                        {feature.id === 'wallhack' ? (
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B99C92] to-[#AFA09C]">
                            {feature.title}
                          </span>
                        ) : feature.id === 'aimbot' ? (
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5D7A8D] to-[#697881]">
                            {feature.title}
                          </span>
                        ) : feature.id === 'grenade' ? (
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9B8263] to-[#8D8171]">
                            {feature.title}
                          </span>
                        ) : (
                          <span className="text-white">
                            {feature.title}
                          </span>
                        )}
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
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    {feature.ctaText}
                  </motion.button>
                </div>

                {/* Image/Demo */}
                <div className="flex-1">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {feature.id === 'wallhack' ? (
                      <div className="aspect-video relative">
                        <BeforeAfterSlider
                          beforeImage="/images/featureimages/1.webp"
                          afterImage="/images/featureimages/2.webp"
                          beforeLabel=""
                          afterLabel=""
                          className="w-full h-full absolute inset-0"
                        />
                      </div>
                    ) : feature.id === 'grenade' ? (
                      <div className="aspect-video relative">
                        <BeforeAfterSlider
                          beforeImage="/images/featureimages/4.png"
                          afterImage="/images/featureimages/3.png"
                          beforeLabel=""
                          afterLabel=""
                          className="w-full h-full absolute inset-0"
                          beforeImagePosition="50% 100%"
                        />
                      </div>
                    ) : feature.id === 'aimbot' ? (
                      <div className="aspect-video bg-gray-800/50 rounded-xl overflow-hidden">
                        <Image
                          src={aimbotGifs[currentAimbotGif]}
                          alt="CS2 Aimbot Demo"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-800/50 flex items-center justify-center">
                        {/* Placeholder for other features */}
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
                    )}

                    {/* Overlay with stats - only for non-slider demos */}
                    {feature.id !== 'wallhack' && feature.id !== 'grenade' && (
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
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}