'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BF6LaunchBanner() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set launch date (example: March 15, 2025)
  const launchDate = new Date('2025-03-15');
  const currentDate = new Date();
  const isLaunched = currentDate >= launchDate;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePreOrderClick = () => {
    router.push('/products/bf6');
  };

  // Prevent hydration issues by not rendering until client-side
  if (!mounted) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-900/30 via-orange-800/40 to-orange-900/30 border-t-2 border-t-orange-500/70 border-b border-orange-700/50 backdrop-blur-sm">
        <div className="relative z-10 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-6 text-center">
              <div className="flex-1">
                <span className="text-sm md:text-base font-semibold text-white">
                  BATTLEFIELD 6 LAUNCH - Coming Soon
                </span>
              </div>
              <button className="flex-shrink-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                <span>Pre-Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-900/30 via-orange-800/40 to-orange-900/30 border-t-2 border-t-orange-500/70 border-b border-orange-700/50 backdrop-blur-sm">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          animate={{ x: [-100, 1200] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 text-center">
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0"
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/images/bf6-logo-icon.png"
                  alt="BF6 Logo"
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
            </motion.div>

            {/* Running message */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex items-center whitespace-nowrap space-x-8"
                animate={{ x: [-100, -2000] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <span className="text-sm md:text-base font-semibold text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>BATTLEFIELD 6 LAUNCH - {isLaunched ? 'NOW AVAILABLE!' : `Coming ${formatDate(launchDate)}`}</span>
                </span>

                <span className="text-sm text-orange-200">
                  BF6 PLUS: Advanced Aimbot + Auto Aim + Target Lock
                </span>

                <span className="text-sm text-orange-200">
                  BF6 PRO: Complete Package + ESP Wallhack + Player Tracking
                </span>

                <span className="text-sm text-orange-200">
                  Undetected BF6 Cheats for Competitive Gaming
                </span>

                <span className="text-sm font-semibold text-white">
                  {isLaunched ? 'GET BF6 CHEATS NOW' : 'PRE-ORDER BF6 CHEATS'}
                </span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handlePreOrderClick}
              className="flex-shrink-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:via-orange-300 hover:to-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl border border-orange-400/30 hover:border-orange-300/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #f97316, #fb923c, #fdba74, #fb923c, #f97316)',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>{isLaunched ? 'Get Now' : 'Pre-Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

    </div>
  );
}