'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Crown,
  Zap,
  Shield,
  CheckCircle,
  Info,
  Eye,
  Target,
  Crosshair,
  Activity
} from 'lucide-react';
import { getEnhancedProductFeatures, getTierColor, FeatureCategory, Feature } from '@/lib/enhancedProductFeatures';

interface InteractiveFeaturesProps {
  productId: string;
  className?: string;
}

export default function InteractiveFeatures({ productId, className = '' }: InteractiveFeaturesProps) {
  const features = getEnhancedProductFeatures(productId);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (features.length === 0) {
    return null;
  }

  // Modern structured feature layout
  const getFeatureIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'eye': Eye,
      'target': Target,
      'crosshair': Crosshair,
      'shield': Shield,
      'zap': Zap,
      'activity': Activity,
      'star': Star
    };
    return iconMap[iconName.toLowerCase()] || CheckCircle;
  };

  // Product-specific descriptions
  const getProductDescription = (productId: string): string => {
    const productType = productId.replace(/-\d+day$/, '');
    
    const descriptions: { [key: string]: string } = {
      'cs2-lite': 'Discover your CS2 cheats starter pack! You will find essential Counter-Strike 2 hacks with multi-style ESP boxes, skeleton display, head dot markers, player names, health bars & weapon info. Perfect entry-level CS2 hacks for tactical awareness!',
      'cs2-plus': 'Unlock advanced CS2 hacks! Inside: premium Counter-Strike 2 hacks with undetected aimbot, AI triggerbot, undetected ESP wallhacks, CS2 Aimbot, player tracking & cloud config. Your CS2 cheat arsenal for domination!',
      'cs2-pro': 'Open the ultimate CS2 vault! Inside: professional Counter-Strike 2 hacks with AI aimbot, smart triggerbot, undetected ESP, grenade helper, stream-proof technology & cloud sync. The best CS2 cheats for legendary performance!',
      'bf6-plus': 'Get Battlefield 6 hacks! In the product you will find advanced BF6 hacks with AI-powered aimbot, recoil control system, target prediction, PID controller & cloud storage. Your professional Battlefield Cheats toolkit awaits!',
      'bf6-pro': 'Crack open BF6 mastery! Inside: elite Battlefield 6 hacks with AI aimbot, advanced recoil system, visual patterns, 8 weapon profiles, stream-proof mode & premium support. The ultimate BF6 cheat collection for legends!'
    };

    return descriptions[productType] || 'Professional-grade gaming enhancement features for competitive advantage';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Modern Features Header */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              What's in the Box
            </span>
          </h3>
          <p className="text-base text-gray-300">
            {getProductDescription(productId)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/30 backdrop-blur-sm border border-gray-400/30 rounded-lg p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-2">Need Help?</h4>
              <p className="text-gray-300 text-sm mb-4">
                If you need help or information about the product or features, join our Discord community for instant support and guidance.
              </p>
              <button className="bg-gradient-to-r from-gray-400 to-gray-300 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg backdrop-blur-sm border border-gray-500/30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                <span>Join Discord</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Categories */}
      <div className="space-y-8">
        {features.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="space-y-8"
          >
            {/* Category Header */}
            <div className="text-center">
              <motion.div
                className="flex flex-col items-center mb-5"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 + 0.2 }}
              >
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2">{category.name}</h4>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">{category.description}</p>
                </div>
              </motion.div>
            </div>

            {/* Feature Grid - Compact Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.features.map((feature, featureIndex) => {
                const FeatureIcon = getFeatureIcon(feature.icon);
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + featureIndex * 0.05 }}
                    className="group relative bg-black/30 backdrop-blur-sm border border-gray-600/20 rounded-lg p-3 hover:border-gray-400/40 hover:bg-black/40 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {/* Feature Header */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <FeatureIcon className="w-4 h-4 text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h5 className="font-semibold text-white text-xs group-hover:text-gray-200 transition-colors truncate">
                            {feature.title}
                          </h5>
                          {feature.premium && <Crown className="w-2.5 h-2.5 text-yellow-400 flex-shrink-0" />}
                          {feature.highlight && <Star className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />}
                        </div>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <p className="text-gray-400 text-xs leading-tight mb-2 line-clamp-3">
                      {feature.description}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-300">Active</span>
                      </div>
                      {(feature.premium || feature.highlight) && (
                        <div className="flex items-center space-x-1">
                          {feature.premium && (
                            <span className="text-xs px-1 py-0.5 bg-yellow-600/20 text-yellow-300 rounded text-xs">
                              Pro
                            </span>
                          )}
                          {feature.highlight && (
                            <span className="text-xs px-1 py-0.5 bg-gray-600/30 text-gray-300 rounded text-xs">
                              Pop
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}