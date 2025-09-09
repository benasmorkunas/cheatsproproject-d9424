'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import FloatingParticles from '@/components/common/FloatingParticles';
import Image from 'next/image';

export default function LatestArticles() {
  const articles = [
    {
      id: 1,
      title: 'Best Legit CS2 Hacks for Ranked Play in 2025',
      excerpt: 'Discover the most effective legit CS2 cheats with detailed comparisons, detection risk analysis, and undetected private builds for competitive play.',
      image: '/images/cs2-pro.webp',
      category: 'CS2 Guide',
      readTime: '12 min read',
      date: 'Jan 15, 2025',
      trending: true,
      slug: 'best-legit-cs2-hacks-ranked-2025'
    },
    {
      id: 2,
      title: 'Best CS2 Cheats That Actually Work in 2025',
      excerpt: 'Discover the most effective working CS2 cheats with detailed safety analysis, private builds comparison, and undetected performance reviews.',
      image: '/images/cs2-lite.webp',
      category: 'CS2 Guide',
      readTime: '8 min read',
      date: 'Jan 16, 2025',
      trending: false,
      slug: 'best-cs2-cheats-that-work-2025'
    },
    {
      id: 3,
      title: 'How CS2 Updates in 2025 Are Changing the Game for Private Cheats',
      excerpt: 'Discover how frequent CS2 updates in 2025 are affecting private cheats. Learn about protection features, real-time adaptations, and staying ahead of detection.',
      image: '/images/cs2-plus.webp',
      category: 'CS2 Updates',
      readTime: '10 min read',
      date: 'Jan 17, 2025',
      trending: true,
      slug: 'cs2-updates-2025-changing-private-cheats'
    }
  ];

  return (
    <section className="py-20 relative">
      <FloatingParticles />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl"
          style={{background: '#6B8A7A20'}}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              LATEST ARTICLES
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay informed with our latest insights, reviews, and expert analysis
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <Link key={article.id} href={`/guides/${article.slug}`}>
              <motion.article
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{} as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#825D8D50';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px #825D8D10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}>
                {/* Image/Thumbnail */}
                <div className="relative aspect-video overflow-hidden" style={{background: 'linear-gradient(to bottom right, #825D8D20, #6B7A9A20)'}}>
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      style={{ 
                        transform: 'scale(1)', 
                        filter: 'brightness(0.8)',
                        objectPosition: 'center 45%'
                      }}
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Read Full Guide</span>
                        <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Trending Badge */}
                  {article.trending && (
                    <div className="absolute top-4 left-4">
                      <div className="text-white px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-semibold" style={{background: 'linear-gradient(to right, #8A5B6A, #9A8A6B)'}}>
                        <TrendingUp className="w-4 h-4" />
                        <span>Trending</span>
                      </div>
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300 line-clamp-2"
                    style={{} as React.CSSProperties}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#B28DAD'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                    {article.title}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <motion.div
                      className="flex items-center space-x-2 transition-colors duration-300"
                      style={{color: '#825D8D'} as React.CSSProperties}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#925D9D'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#825D8D'}
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="text-white px-8 py-4 rounded-xl font-semibold text-lg border border-gray-600 transition-all duration-300"
            style={{background: 'linear-gradient(to right, #6B6B7A, #5A5A6A)', borderColor: '#6B6B6B'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #5B5B6A, #4A4A5A)';
              e.currentTarget.style.borderColor = '#7A7A7A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #6B6B7A, #5A5A6A)';
              e.currentTarget.style.borderColor = '#6B6B6B';
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Guides
          </motion.button>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-20 rounded-2xl p-8 text-center"
          style={{background: 'linear-gradient(to right, #825D8D20, #6B7A9A20)', border: '1px solid #825D8D30'}}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Latest Tips
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get exclusive gaming guides, cheat updates, and pro tips delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors duration-300"
              style={{} as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.borderColor = '#825D8D'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#6b7280'}
              suppressHydrationWarning
            />
            <motion.button
              className="text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300"
              style={{background: 'linear-gradient(to right, #825D8D, #6B7A9A)'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #714D7D, #5A6A8A)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #825D8D, #6B7A9A)'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            ✓ No spam, unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}