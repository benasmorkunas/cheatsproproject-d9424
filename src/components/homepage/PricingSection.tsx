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
      name: 'LITE',
      price: '0.66',
      originalPrice: '1.10',
      period: '/day',
      popular: false,
      features: [
        'Basic Wallhack (ESP)',
        'Simple Aimbot',
        'Community Support',
        '1 Game License',
        'Basic Updates'
      ],
      buttonText: 'Start with LITE',
      color: 'gray',
      savings: '40%'
    },
    {
      id: 'plus',
      name: 'PLUS',
      price: '0.99',
      originalPrice: '1.65',
      period: '/day',
      popular: true,
      features: [
        'Advanced ESP & Wallhack',
        'Professional Aimbot',
        'Grenade Helper Tool',
        'CS2 + BF6 License',
        'Priority Support',
        'Exclusive Features',
        'Custom Configurations'
      ],
      buttonText: 'Get PLUS (Most Popular)',
      color: 'grayPurple',
      savings: '40%'
    },
    {
      id: 'pro',
      name: 'PRO',
      price: '1.33',
      originalPrice: '2.20',
      period: '/day',
      popular: false,
      features: [
        'Everything in PLUS',
        'Premium ESP Features',
        'Advanced Aimbot Settings',
        'Rage Mode Features',
        'VIP Discord Access',
        '24/7 Premium Support',
        'Early Access to Updates',
        'Custom Cheat Loader'
      ],
      buttonText: 'Unlock PRO Access',
      color: 'grayGold',
      savings: '40%'
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
            <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #825D8D, #6B7A9A, #9A8A6B)'}}>
              Choose Your Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your gaming needs
          </p>
        </motion.div>

        {/* Urgency Banner */}
        <motion.div
          className="rounded-2xl p-6 mb-12 text-center" style={{background: 'linear-gradient(135deg, #8A5B6A20, #8A6B5A20)', border: '1px solid #8A5B6A30'}}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="w-6 h-6" style={{color: '#8A5B6A'}} />
            <h3 className="text-2xl font-bold text-white">
              Black Friday Special: 40% Off – Limited Time
            </h3>
            <Zap className="w-6 h-6" style={{color: '#8A5B6A'}} />
          </div>
          
          <div className="flex justify-center items-center space-x-6 text-2xl font-bold">
            <div className="text-center">
              <div style={{color: '#8A5B6A'}}>{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-gray-400 text-xs">HOURS</div>
            </div>
            <div style={{color: '#8A5B6A'}}>:</div>
            <div className="text-center">
              <div style={{color: '#8A5B6A'}}>{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-gray-400 text-xs">MINS</div>
            </div>
            <div style={{color: '#8A5B6A'}}>:</div>
            <div className="text-center">
              <div style={{color: '#8A5B6A'}}>{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-gray-400 text-xs">SECS</div>
            </div>
          </div>
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
          <p className="text-gray-400 mb-6">
            Not sure which plan to choose? Start with PLUS - you can always upgrade later!
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />
              <span>Instant activation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" style={{color: '#6B8A7A'}} />
              <span>Cancel anytime</span>
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