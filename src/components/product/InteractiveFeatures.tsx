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
            CS2 ESP wallhack with enemy detection and player tracking. Undetected Counter-Strike 2 cheat showing enemy positions, health bars, weapon info, and distance through walls. Entry-level CS2 hack for tactical advantage and map awareness.
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
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-full flex items-center justify-center mb-2">
                  {(() => {
                    const IconComponent = getFeatureIcon(category.icon);
                    return <IconComponent className="w-8 h-8 text-gray-300" />;
                  })()} 
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2">{category.name}</h4>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">{category.description}</p>
                  <div className="flex items-center justify-center space-x-3 mt-3">
                    <span className="text-sm text-gray-300 font-medium bg-black/30 px-3 py-1 rounded-full">
                      {category.features.length} features
                    </span>
                    {category.tierRequired && (
                      <span className="text-xs px-3 py-1 rounded-full border border-gray-400/30 bg-gray-400/10 text-gray-300 font-semibold">
                        {category.tierRequired.toUpperCase()}
                      </span>
                    )}
                  </div>
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
                    <div className="flex items-start space-x-2 mb-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <FeatureIcon className="w-4 h-4 text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-white text-xs group-hover:text-gray-200 transition-colors truncate">
                          {feature.title}
                        </h5>
                        <div className="flex items-center gap-1 mt-0.5">
                          {feature.premium && <Crown className="w-2.5 h-2.5 text-yellow-400" />}
                          {feature.highlight && <Star className="w-2.5 h-2.5 text-gray-400" />}
                        </div>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <p className="text-gray-400 text-xs leading-tight mb-2 line-clamp-2">
                      {feature.description}
                    </p>

                    {/* Feature Details */}
                    {feature.details && feature.details.length > 0 && (
                      <div className="mb-2">
                        {feature.details.slice(0, 1).map((detail, index) => (
                          <div key={index} className="flex items-center space-x-1 text-xs text-gray-300">
                            <CheckCircle className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                            <span className="truncate text-xs">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}

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

      {/* Feature Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-gray-600/20 to-gray-400/20 backdrop-blur-sm border border-gray-500/30 rounded-lg p-4"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-white mb-0.5">
              {features.reduce((acc, cat) => acc + cat.features.length, 0)}
            </div>
            <div className="text-gray-300 text-xs font-medium">Total Features</div>
          </div>
          <div>
            <div className="text-xl font-bold text-yellow-400 mb-0.5">
              {features.reduce((acc, cat) => acc + cat.features.filter(f => f.premium).length, 0)}
            </div>
            <div className="text-gray-300 text-xs font-medium">Premium</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-300 mb-0.5">
              {features.length}
            </div>
            <div className="text-gray-300 text-xs font-medium">Categories</div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-gray-300 mb-4 text-sm">
          All features included • Updated regularly
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-gray-600/30">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Undetected</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-gray-600/30">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">Updates</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-full border border-gray-600/30">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-medium">Support</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}