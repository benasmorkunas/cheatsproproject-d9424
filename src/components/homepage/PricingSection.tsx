'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Star } from 'lucide-react';

export default function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const plans = [
    {
      id: 'lite',
      name: 'CS2 LITE',
      price: '3.99',
      originalPrice: '19.99',
      period: '/day',
      popular: false,
      features: [
        'CS2 ESP Wallhack',
        'CS2 Aimbot and Triggerbot',
        'Health Bars & Weapon Info',
        'Distance',
        'Multi-Style ESP Boxes',
        'Support'
      ],
      buttonText: 'Start with CS2 LITE',
      color: 'gray',
      savings: '80%'
    },
    {
      id: 'plus',
      name: 'CS2 PLUS',
      price: '5.99',
      originalPrice: '29.99',
      period: '/day',
      popular: true,
      features: [
        'Everything in LITE',
        'CS2 Aimbot & ESP Combo',
        'Smooth Aimbot & Auto Aim',
        'Headshot Assistance',
        'Recoil Control System',
        'Priority Support'
      ],
      buttonText: 'Get CS2 PLUS (Most Popular)',
      color: 'grayPurple',
      savings: '80%'
    },
    {
      id: 'pro',
      name: 'CS2 PRO',
      price: '7.99',
      originalPrice: '39.99',
      period: '/day',
      popular: false,
      features: [
        'Everything in PLUS',
        'Grenade Helper',
        'Grenade Recorder',
        'Stream-Proof Features',
        'Enhanced ESP',
        'AI Aimbot',
        'Ultimate CS2 Tool',
        'VIP Discord Access',
        '24/7 Support',
        'Undetected Status'
      ],
      buttonText: 'Unlock CS2 PRO Access',
      color: 'grayGold',
      savings: '80%'
    }
  ];

  const getColorClasses = (color: string, popular = false) => {
    const colors = {
      gray: {
        border: 'border-gray-600',
        bg: 'from-gray-800/50 to-gray-900/50',
        button: 'from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
        accent: 'text-gray-400'
      },
      grayPurple: {
        border: 'border-gray-600',
        bg: 'from-gray-800/20 to-gray-900/20',
        button: 'custom-gray-purple',
        accent: 'custom-gray-purple-accent'
      },
      grayGold: {
        border: 'border-gray-600',
        bg: 'from-gray-800/20 to-gray-900/20',
        button: 'custom-gray-gold',
        accent: 'custom-gray-gold-accent'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              CHOOSE YOUR PLAN
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your gaming needs
          </p>
        </motion.div>


        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const colors = getColorClasses(plan.color, plan.popular);
            
            const getCustomPlanStyle = (color: string) => {
              const styles = {
                grayPurple: { accent: '#825D8D', button: '#6B5B7A' },
                grayGold: { accent: '#9A8A6B', button: '#7A6B5A' },
                gray: { accent: '#8A8A8A', button: '#6A6A6A' }
              };
              return styles[color as keyof typeof styles] || styles.gray;
            };
            
            const customStyle = getCustomPlanStyle(plan.color);
            
            return (
              <motion.div
                key={plan.id}
                className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-sm border-2 ${colors.border} rounded-2xl p-8 ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-white px-6 py-2 rounded-full flex items-center space-x-2" style={{background: 'linear-gradient(135deg, #6B5B7A, #5A6B8A)'}}>
                      <Star className="w-4 h-4" />
                      <span className="font-bold text-sm">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                <div className="absolute top-4 right-4">
                  <div className="text-white px-3 py-1 rounded-full text-sm font-bold" style={{background: '#7A4B5A'}}>
                    Save {plan.savings}
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-gray-400 line-through text-lg">
                        ${plan.originalPrice}
                      </span>
                      <span className="text-4xl font-bold" style={{color: customStyle.accent}}>
                        ${plan.price}
                      </span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                  </div>
                  
                  {plan.name === 'PRO' && (
                    <div className="flex items-center justify-center space-x-1 mb-4" style={{color: '#9A8A6B'}}>
                      <Crown className="w-5 h-5" />
                      <span className="font-semibold">Premium Tier</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#6B8A7A'}} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className="w-full text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{background: `linear-gradient(135deg, ${customStyle.button}, ${customStyle.button}DD)`}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={(e) => e.currentTarget.style.background = `linear-gradient(135deg, ${customStyle.button}CC, ${customStyle.button}AA)`}
                  onMouseLeave={(e) => e.currentTarget.style.background = `linear-gradient(135deg, ${customStyle.button}, ${customStyle.button}DD)`}
                >
                  {plan.buttonText}
                </motion.button>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />
              <span>Instant activation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />
              <span>Secure payments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}