'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Check, X, Shield, Target, Eye } from 'lucide-react';

interface BestCheatsArticleContentProps {
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

export default function BestCheatsArticleContent({ comparisonFeatures, detectionRisks, features }: BestCheatsArticleContentProps) {
  return (
    <div className="min-h-screen">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Best CS2 Cheats That Actually Work in 2025
          </h1>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>January 16, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>CS2 Expert Team</span>
            </div>
          </div>

          {/* Article Intro */}
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p className="border-b border-gray-700/30 pb-4">
              Ranked play in CS2 continues to be highly competitive. Timing, awareness, and smart utility usage now separate top players from the rest. While mechanical skill still matters, having an informational edge gives you an undeniable advantage — especially if you're using safe and legit CS2 cheats.
            </p>
            <p className="border-b border-gray-700/30 pb-4">
              In this guide, we'll explore the best CS2 cheats for ranked play in 2025. From subtle wallhacks to advanced ESP and humanized aimbots, these tools help you stay one step ahead without risking bans or suspicion.
            </p>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Content Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              What Makes CS2 Cheats Worth Using in 2025?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 border-b border-gray-700/30 pb-4">
              The best cheats in 2025 are not about raging. Instead, they focus on visibility, map awareness, and legit performance enhancement. For many ranked-focused players, the goal is simple: cheat smarter, not louder.
            </p>

            <h3 className="text-2xl font-bold text-white mb-6">Key Features to Look For</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-sm border rounded-xl p-6 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                    borderColor: 'rgba(255,255,255,0.2)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
                  }}
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

            <div className="backdrop-blur-sm border rounded-xl p-6 mb-8" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div className="grid md:grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300"><strong>Undetected Performance</strong>: Avoid public, free cheats that are easily flagged. Choose private builds with proven safety records.</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300"><strong>Subtle Aimbot Assistance</strong>: Features like smoothing, low FOV, and aim-on-spotted settings help you remain undetected.</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300"><strong>Visual ESP and Wallhacks</strong>: See player positions, health, and utility without revealing you're cheating.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Product Comparison Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Best Private CS2 Cheats for Ranked Play
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 text-center">
              Here are some of the best options tailored for legit-style players in 2025.
            </p>

            {/* Feature Comparison Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full backdrop-blur-sm border rounded-xl overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
                borderColor: 'rgba(255,255,255,0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <thead>
                  <tr style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(160,160,160,0.06))'
                  }}>
                    <th className="px-6 py-4 text-left text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Feature</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>CS2 Lite</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>CS2 Plus</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>External ESP</th>
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
              <div className="backdrop-blur-sm border rounded-xl p-8 text-center" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 className="text-2xl font-bold text-white mb-4">LITE CS2 WALLHACK</h3>
                <p className="text-gray-300 mb-6">Perfect for entry-level legit players, the Lite version offers streamlined visuals without aim features.</p>
                
                <div className="space-y-3 mb-6">
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Box ESP (Normal, Cornered, Filled)
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Skeleton + Snaplines
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Health, Distance, Name ESP
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Grenade & Step ESP
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    No aimbot, no triggerbot = zero risk
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">Ideal for streamers or cautious players who want just enough info to play smart.</p>

                <Link 
                  href="/products/cs2-lite"
                  className="inline-block text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(160,160,160,0.15))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  Get CS2 Lite →
                </Link>
              </div>

              {/* CS2 Plus */}
              <div className="backdrop-blur-sm border rounded-xl p-8 text-center" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 className="text-2xl font-bold text-white mb-4">PLUS CS2 HACKS</h3>
                <p className="text-gray-300 mb-6">A balanced, mid-tier cheat offering clean visuals and human-like aimbot. Designed for legit playstyles, it minimizes detection risk while maintaining competitive performance.</p>
                
                <div className="space-y-3 mb-6">
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    All Lite ESP features
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Legit Aimbot with FOV & Smoothing
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Triggerbot with Delay Controls
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Aim Only When Spotted
                  </div>
                  <div className="border rounded-lg p-3 text-sm text-gray-300" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.04))',
                    borderColor: 'rgba(255,255,255,0.15)'
                  }}>
                    Anti-Team
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">Great for ranked grinders who want more firepower but still play it cool.</p>

                <Link 
                  href="/products/cs2-plus"
                  className="inline-block text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(160,160,160,0.15))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  Get CS2 Plus →
                </Link>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              How to Choose Safe CS2 Cheats
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Choosing a safe cheat in 2025 means balancing performance and stealth. Look for:
            </p>

            <div className="backdrop-blur-sm border rounded-xl p-6 mb-8" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div className="grid md:grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Frequent undetected reports</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Streamproof visuals</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Customizable config for legit settings</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Active community + Discord support</span>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Are Legit Cheats Still Effective in 2025?
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Absolutely. Despite better anti-cheat systems, smartly configured cheats remain viable. Public cheats are nearly useless, but private builds still dominate high ELO matchmaking.
              </p>
              <p>
                Legit players now prioritize smooth gameplay, real-time visuals, and undetectable tools. With options like Lite and Plus, you can stay competitive without triggering suspicion.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Final Thoughts
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              You don't need rage cheats to rank up. With the right CS2 wallhack, ESP, and legit aimbot, you can make cleaner decisions, win more duels, and stay under the radar.
            </p>
            
            <div className="backdrop-blur-sm border rounded-xl p-8 text-center" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Looking for the safest legit builds? Read our guide: <Link href="/guides/best-legit-cs2-hacks-ranked-2025" className="text-blue-400 underline hover:text-blue-300">Best Legit CS2 Hacks for Ranked Play in 2025</Link>
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-gray-400" />
                    <span className="text-white font-medium">Lite Wallhack</span>
                  </div>
                  <span className="text-gray-400">Undetected visual advantage</span>
                  <Link 
                    href="/products/cs2-lite"
                    className="text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(160,160,160,0.15))',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    View →
                  </Link>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">Plus Legit Hack</span>
                  </div>
                  <span className="text-gray-400">Complete legit enhancement package</span>
                  <Link 
                    href="/products/cs2-plus"
                    className="text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(160,160,160,0.15))',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    View →
                  </Link>
                </div>
              </div>
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
          <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h4 className="text-lg font-semibold text-white mb-2">CS2 Wallhack Setup Guide</h4>
              <p className="text-gray-400 text-sm">Configure wallhacks for maximum effectiveness while staying undetected</p>
            </div>
            <div className="backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h4 className="text-lg font-semibold text-white mb-2">Private vs Public Cheats</h4>
              <p className="text-gray-400 text-sm">Understanding the difference between free and premium CS2 cheats</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}