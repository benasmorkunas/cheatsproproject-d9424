'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Check, AlertTriangle, Shield, Target, Eye } from 'lucide-react';

interface CS2UpdatesArticleContentProps {
  updateFeatures: Array<{
    feature: string;
    impact: string;
    severity: string;
    frequency: string;
  }>;
  protectionFeatures: Array<{
    feature: string;
    status: string;
    coverage: string;
  }>;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }>;
}

export default function CS2UpdatesArticleContent({ updateFeatures, protectionFeatures, features }: CS2UpdatesArticleContentProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'enabled':
      case 'live': return 'bg-green-500/20 text-green-400';
      case 'real-time': return 'bg-blue-500/20 text-blue-400';
      case 'monitoring': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

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
            How CS2 Updates in 2025 Are Changing the Game for Private Cheats
          </h1>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>January 17, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>6 min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>CS2 Expert Team</span>
            </div>
          </div>

          {/* Article Intro */}
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p className="border-b border-gray-700/30 pb-4">
              CS2 updates are dropping fast in 2025 — and they're shaking things up for everyone who relies on private cheats. If you're a legit-style player or cheat user looking to stay ahead of detection, these CS2 updates matter more than ever. In this article, we'll break down how CS2 updates are reshaping the cheat landscape and what that means for safety, features, and long-term use.
            </p>
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Why Updates Matter Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Why CS2 Updates in 2025 Matter for Cheat Users
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 border-b border-gray-700/30 pb-4">
              Every update to CS2 brings changes to the game's core files, anti-cheat systems, and visual effects. For cheat users — especially those using private builds — that means added risk, new detection vectors, and broken features if your tools aren't maintained.
            </p>

            <h3 className="text-2xl font-bold text-white mb-6">CS2 Updates: More Frequent, More Aggressive</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Valve has stepped up its pace this year. Patches now roll out almost weekly. These updates often include:
            </p>

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
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Map adjustments and visual changes</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">VAC and Overwatch improvements</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-gray-300">Code rewrites that disrupt injected software</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300">Tweaks to hitboxes, player models, and weapon balance</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed border-b border-gray-700/30 pb-4">
              The result? Cheats that aren't actively supported or updated fall apart quickly. And that puts users at risk of bans.
            </p>
          </section>

          {/* Update Impact Analysis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              CS2 Update Impact on Cheat Features
            </h2>
            
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
                    <th className="px-6 py-4 text-left text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Update Type</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Impact Area</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Severity</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {updateFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/20">
                      <td className="px-6 py-4 text-gray-300 font-medium">{item.feature}</td>
                      <td className="px-6 py-4 text-center text-gray-300">{item.impact}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getSeverityColor(item.severity)}`}>
                          {item.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">{item.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Private Cheat Response */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              How Private Cheat Providers Stay Ahead
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Private cheat developers now need to respond within hours — not days. Our builds, like the <Link href="/products/cs2-lite" className="text-blue-400 underline hover:text-blue-300">Lite CS2 Wallhack</Link> and <Link href="/products/cs2-plus" className="text-blue-400 underline hover:text-blue-300">Plus CS2 Hacks</Link>, get rapid updates synced with every game patch. We monitor file changes, hook behavior, and network patterns to ensure stability and stealth.
            </p>

            <h3 className="text-2xl font-bold text-white mb-6">Built-In Protection Features</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              To keep up with CS2 updates, safe CS2 cheats now include:
            </p>

            {/* Protection Features Table */}
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
                    <th className="px-6 py-4 text-left text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Protection Feature</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Status</th>
                    <th className="px-6 py-4 text-center text-white font-semibold border-b" style={{borderColor: 'rgba(255,255,255,0.1)'}}>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {protectionFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/20">
                      <td className="px-6 py-4 text-gray-300 font-medium">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">{item.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="backdrop-blur-sm border rounded-xl p-6 mb-8" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-400" />
                <h4 className="text-xl font-bold text-white">Automatic Defense System</h4>
              </div>
              <p className="text-gray-300 border-b border-gray-700/30 pb-4">
                We've also added alert systems that disable the cheat if an update puts it at risk. This automatic defense prevents damage to your account.
              </p>
            </div>
          </section>

          {/* Player Adjustment Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              How Players Should Adjust to Ongoing CS2 Updates
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              If you're using cheats in 2025, you must:
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
                  <span className="text-gray-300">Avoid public or outdated software</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Choose providers that offer real-time updates</span>
                </div>
                <div className="flex items-center space-x-3 backdrop-blur-sm border rounded-lg p-3" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Use builds with auto-patch compatibility</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed border-b border-gray-700/30 pb-4">
              Want to cheat smarter? Our blog on <Link href="/guides/best-legit-cs2-hacks-ranked-2025" className="text-blue-400 underline hover:text-blue-300">Best Legit CS2 Hacks for Ranked Play in 2025</Link> explains which builds help you climb without risking bans.
            </p>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              CS2 Updates Are Here to Stay — Use Smarter Cheats
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-8">
              <p>
                CS2 updates in 2025 are making private cheats more complex — but also more advanced. With tools like stream-proof visuals, smart ESP, and "only when spotted" aim, you can stay undetected and dominant.
              </p>
            </div>

            <div className="backdrop-blur-sm border rounded-xl p-8 text-center" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <strong className="text-white">Ready to adapt and survive the patch storm?</strong> Choose a private cheat that evolves with the game.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(160,160,160,0.05))',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}>
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-gray-400" />
                    <span className="text-white font-medium">Lite Build</span>
                  </div>
                  <span className="text-gray-400">Auto-updating wallhack for legit players</span>
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
                    <span className="text-white font-medium">Plus Build</span>
                  </div>
                  <span className="text-gray-400">Complete package with smart updates</span>
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
              <h4 className="text-lg font-semibold text-white mb-2">Staying Safe During CS2 Updates</h4>
              <p className="text-gray-400 text-sm">Best practices for cheat users when game patches drop</p>
            </div>
            <div className="backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(160,160,160,0.03))',
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h4 className="text-lg font-semibold text-white mb-2">CS2 Anti-Cheat Evolution</h4>
              <p className="text-gray-400 text-sm">How VAC and Overwatch are adapting to modern cheats</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}