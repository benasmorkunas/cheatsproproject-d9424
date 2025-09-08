'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Check, X, Star, Shield, Target, Eye } from 'lucide-react';

interface ArticleContentProps {
  comparisonFeatures: Array<{
    feature: string;
    lite: boolean | string;
    plus: boolean | string;
    external: boolean | string;
  }>;
  detectionRisks: Array<{
    risk: string;
    lite: string;
    plus: string;
    external: string;
  }>;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }>;
}

export default function ArticleContent({ comparisonFeatures, detectionRisks, features }: ArticleContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>CS2 Expert</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Best Legit CS2 Hacks for Ranked Play in 2025
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Discover the most effective legit CS2 cheats designed for competitive ranked play, featuring advanced ESP systems, smooth aim assistance, and undetected private builds that keep your account safe.
          </p>
        </motion.header>

        {/* Article Content */}
        <motion.article
          className="prose prose-lg prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Ranked CS2 is sweaty — timing, crosshair placement, and reaction speed define every round. But even top-tier players know that smart information wins games. If you're looking for a subtle advantage that keeps you under the radar, legit CS2 hacks offer a reliable edge.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              These tools aren't about rage. Instead, they're tailored for serious players who want safer, more tactical support. In this post, we'll explore what makes a cheat "legit," the best options in 2025, and how to stay undetected with the right setup.
            </p>
          </div>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              What Makes a Legit CS2 Hack Safe for Ranked Play?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Unlike rage hacks, legit CS2 cheats are built to mimic natural gameplay. The goal isn't to dominate with obvious aimlocks or teleporting — it's to enhance your decision-making while remaining unnoticed.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">Legit Features Include:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Smooth aim assist with adjustable FOV</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">ESP overlays that reveal player positions</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">"Only aim when spotted" logic to lower detection risk</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Visual-only setups (no triggerbot or aimbot)</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 md:col-span-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Stream-safe rendering that avoids recording software</span>
                </div>
              </div>
            </div>
          </section>

          {/* Product Comparison Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Top Legit CS2 Hacks for Ranked in 2025
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 text-center">
              If you're climbing the ranks, you want smarter tools — not flashy ones. Below are the most reliable legit CS2 hacks built specifically for competitive gameplay:
            </p>

            {/* Feature Comparison Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700/30">Feature</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b border-gray-700/30">CS2 Lite</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b border-gray-700/30">CS2 Plus</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b border-gray-700/30">External ESP</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/20">
                      <td className="px-6 py-4 text-gray-300 font-medium">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof item.lite === 'boolean' ? (
                          item.lite ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{item.lite}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof item.plus === 'boolean' ? (
                          item.plus ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{item.plus}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof item.external === 'boolean' ? (
                          item.external ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{item.external}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* CS2 Lite */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">LITE CS2 WALLHACK</h3>
                <p className="text-gray-300 mb-6">Built for players who focus on awareness and map control, this visual-only cheat keeps things clean.</p>
                
                <div className="space-y-3 mb-6">
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Clean ESP overlays: box, skeleton, name, health, snaplines
                  </div>
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Excludes aimbot and other rage-based features
                  </div>
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Lightweight, stable, and undetected on current anti-cheat systems
                  </div>
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Perfect for streamers, cautious players, and first-time users
                  </div>
                </div>

                <Link 
                  href="/products/cs2-lite"
                  className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Get CS2 Lite →
                </Link>
              </div>

              {/* CS2 Plus */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">PLUS CS2 HACKS</h3>
                <p className="text-gray-300 mb-6">For players seeking refined aim support, the Plus version blends precise assistance with powerful ESP features.</p>
                
                <div className="space-y-3 mb-6">
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Aimbot with FOV, smoothing, and bone targeting
                  </div>
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Triggerbot with adjustable delay and toggle hotkeys
                  </div>
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    ESP includes footsteps, weapons, distance, and defuse status
                  </div>
                  <div className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 text-sm text-gray-300">
                    Private, undetected loader with streamproof visuals
                  </div>
                </div>

                <Link 
                  href="/products/cs2-plus"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Get CS2 Plus →
                </Link>
              </div>
            </div>
          </section>

          {/* Detection Risk Analysis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Detection Risk Comparison
            </h2>
            
            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700/30">Risk Type</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b border-gray-700/30">CS2 Lite</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b border-gray-700/30">CS2 Plus</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b border-gray-700/30">External ESP</th>
                  </tr>
                </thead>
                <tbody>
                  {detectionRisks.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/20">
                      <td className="px-6 py-4 text-gray-300 font-medium">{item.risk}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          item.lite.includes('Very Low') || item.lite.includes('Rare') 
                            ? 'bg-green-500/20 text-green-400' 
                            : item.lite.includes('Low')
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.lite}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          item.plus.includes('Low') || item.plus.includes('Uncommon')
                            ? 'bg-green-500/20 text-green-400' 
                            : item.plus.includes('Medium')
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.plus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          item.external.includes('Minimal') || item.external.includes('None') || item.external.includes('Very Rare')
                            ? 'bg-green-500/20 text-green-400' 
                            : item.external.includes('Low')
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.external}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Safety Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              How to Choose Legit CS2 Hacks That Stay Undetected
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Staying undetected requires more than just installing a cheat. Instead, look for options that prioritize:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Private loaders with regular security updates</span>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">Legit-style aimbot with smoothing and narrow FOV</span>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 flex items-center space-x-3">
                <Eye className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">ESP that avoids screen capture tools</span>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 flex items-center space-x-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Smart toggles (e.g., aim only when enemy is visible)</span>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Are Legit CS2 Hacks Still Worth It in 2025?
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Yes — legit CS2 cheats remain essential for ranked-focused players. Public and free hacks are often detected within days. In contrast, private, legit-style hacks stay online for months when maintained.
              </p>
              <p>
                These tools don't rely on brute-force aim. Instead, they assist with awareness, game sense, and positioning. They help you read enemy utility, rotate early, and avoid obvious mistakes — without drawing unwanted attention.
              </p>
              <p>
                Moreover, legit cheats allow for subtle advantages like grenade pathing, real-time ESP, and detection of walk paths. This level of info can decide matches — especially in higher ranks.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Conclusion: Play Smart, Stay Undetected
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              You don't need rage cheats to climb the ladder. Legit CS2 hacks give you the edge you need — while keeping your account safe.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Explore tools designed for smart players:
            </p>
            
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-8 text-center">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-gray-400" />
                    <span className="text-white font-medium">CS2 Lite Wallhack</span>
                  </div>
                  <span className="text-gray-400">Pure ESP with zero aim assist</span>
                  <Link 
                    href="/products/cs2-lite"
                    className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                  >
                    View →
                  </Link>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">CS2 Plus Hacks</span>
                  </div>
                  <span className="text-gray-400">Refined aim support and full visual overlays</span>
                  <Link 
                    href="/products/cs2-plus"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                  >
                    View →
                  </Link>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm">
                Want to cheat safely in ranked without raising suspicion? Discover CS2 hacks built for 2025's most competitive legit players.
              </p>
            </div>
          </section>
        </motion.article>

        {/* Related Articles */}
        <motion.section
          className="mt-16 pt-8 border-t border-gray-700/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-colors duration-300">
              <h4 className="text-lg font-semibold text-white mb-2">CS2 ESP Configuration Guide</h4>
              <p className="text-gray-400 text-sm">Learn optimal ESP settings for competitive play</p>
            </div>
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-colors duration-300">
              <h4 className="text-lg font-semibold text-white mb-2">Aimbot Settings for Legit Play</h4>
              <p className="text-gray-400 text-sm">Configure smooth aim assistance without detection</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}