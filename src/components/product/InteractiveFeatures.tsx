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
  Info
} from 'lucide-react';
import { getEnhancedProductFeatures, getTierColor, FeatureCategory, Feature } from '@/lib/enhancedProductFeatures';
import AnimatedIcon, { getIconType } from '@/components/common/AnimatedIcons';

interface InteractiveFeaturesProps {
  productId: string;
  className?: string;
}

export default function InteractiveFeatures({ productId, className = '' }: InteractiveFeaturesProps) {
  const features = getEnhancedProductFeatures(productId);

  if (features.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Features Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Powerful Features Included
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Experience the most advanced gaming enhancement technology with our comprehensive feature suite
        </p>
      </motion.div>

      {/* Feature Categories */}
      <div className="space-y-12">
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
                className="inline-flex items-center space-x-4 mb-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 + 0.2 }}
              >
                <AnimatedIcon 
                  type={getIconType(category.icon)} 
                  size={64}
                  className="mx-auto" 
                />
                <div className="text-left">
                  <h4 className="text-3xl font-bold text-white mb-1">{category.name}</h4>
                  <p className="text-gray-400">{category.description}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-sm text-purple-300 font-medium">
                      {category.features.length} features
                    </span>
                    {category.tierRequired && (
                      <span className={`text-xs px-3 py-1 rounded-full border ${getTierColor(category.tierRequired)} border-current/30 bg-current/10 font-semibold`}>
                        {category.tierRequired.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.features.map((feature, featureIndex) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 + featureIndex * 0.05 }}
                  className="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-gray-400/30 hover:bg-black/30 transition-all duration-300 shadow-xl hover:shadow-gray-500/10 hover:scale-105"
                >
                  {/* Premium Badge */}
                  {feature.premium && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Highlight Badge */}
                  {feature.highlight && (
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      <AnimatedIcon 
                        type={getIconType(feature.icon)} 
                        size={48}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-bold text-white group-hover:text-gray-300 transition-colors">
                          {feature.title}
                        </h5>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                          {feature.category}
                        </span>
                        {feature.premium && (
                          <span className="inline-block px-3 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                            Premium
                          </span>
                        )}
                        {feature.highlight && (
                          <span className="inline-block px-3 py-1 bg-gray-600/20 text-purple-300 text-xs rounded-full border border-gray-500/30">
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Feature Details */}
                      {feature.details && feature.details.length > 0 && (
                        <div className="space-y-2">
                          {feature.details.slice(0, 3).map((detail, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs text-gray-300">
                              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Status Indicator */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-300">Active</span>
                        </div>
                        {feature.premium && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border border-gray-400/30 rounded-2xl p-6 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-1">
              {features.reduce((acc, cat) => acc + cat.features.length, 0)}
            </div>
            <div className="text-gray-300 text-sm">Total Features</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {features.reduce((acc, cat) => acc + cat.features.filter(f => f.premium).length, 0)}
            </div>
            <div className="text-gray-300 text-sm">Premium Features</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-400 mb-1">
              {features.length}
            </div>
            <div className="text-gray-300 text-sm">Categories</div>
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
        <p className="text-gray-400 mb-4">
          All features are included with your subscription and updated regularly
        </p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 text-green-400">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Undetected</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Instant Updates</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Crown className="w-4 h-4" />
            <span className="text-sm">Premium Support</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}