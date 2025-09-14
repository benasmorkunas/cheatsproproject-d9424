'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Clock, Users, MessageCircle, Star, ExternalLink, HelpCircle, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Header from '@/components/homepage/Header';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        id: 'who-are-we',
        question: 'Who are we?',
        answer: 'Cheats-Pro is the leading provider of premium gaming software with over 50,000+ satisfied customers worldwide. We specialize in secure, undetectable cheats for CS2 and other popular games. Our team consists of experienced developers with 5+ years in the gaming industry, ensuring top-quality products and 24/7 customer support.',
        ctaText: 'Learn More About Us',
        ctaLink: '/about'
      },
      {
        id: 'safety',
        question: 'Are Cheats-Pro products currently safe to use?',
        answer: 'Yes, absolutely! Our products feature advanced anti-detection technology with a 99.9% safety record. We monitor game updates 24/7 and push automatic updates within 2-4 hours of any game patches. All our cheats use kernel-level protection and sophisticated bypass methods. We offer a full refund guarantee if you experience any detection issues within 30 days.',
        ctaText: 'View Safety Features',
        ctaLink: '/safety-features'
      },
      {
        id: 'free-trial',
        question: 'Do you offer free trials for CS2 cheats?',
        answer: 'We offer a 24-hour trial period for first-time customers on select packages. This allows you to test our aimbot accuracy, wallhack clarity, and overall performance risk-free. Trial access includes full features with no limitations. Simply create an account and verify your payment method to start your trial instantly.',
        ctaText: 'Start Free Trial',
        ctaLink: '/trial'
      }
    ]
  },
  {
    category: 'Purchase & Payment',
    questions: [
      {
        id: 'how-to-purchase',
        question: 'How do I purchase your CS2 cheats?',
        answer: 'Purchasing is simple and secure: 1) Browse our product catalog and select your desired package, 2) Add to cart and proceed to checkout, 3) Complete payment using any of our 10+ payment methods, 4) Receive instant download access via email within 5 minutes, 5) Follow our easy setup guide to get started. All purchases include lifetime updates and priority support.',
        ctaText: 'Shop Now',
        ctaLink: '/products'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods are available?',
        answer: 'We accept all major payment methods for maximum convenience: Credit/Debit Cards (Visa, MasterCard, AMEX), PayPal, Cryptocurrency (Bitcoin, Ethereum, USDT), Bank Transfers, and various regional payment systems. All transactions are secured with 256-bit SSL encryption and processed through verified payment gateways.',
        ctaText: 'View All Payment Options',
        ctaLink: '/payment-methods'
      },
      {
        id: 'payment-review',
        question: 'Why is my payment under review?',
        answer: 'Payment reviews occur in 5-10% of transactions for security purposes and typically resolve within 1-4 hours. Common reasons include: first-time purchase, high-value orders, or mismatched billing information. Our fraud prevention system ensures all customers are protected. You\'ll receive email updates throughout the review process, and our support team can expedite urgent cases.',
        ctaText: 'Contact Support',
        ctaLink: 'https://discord.gg/cheats-pro'
      }
    ]
  },
  {
    category: 'Installation & Support',
    questions: [
      {
        id: 'installation',
        question: 'Is the firmware easy to install?',
        answer: 'Installation takes just 3-5 minutes with our automated installer! Our software includes: 1) One-click installation wizard, 2) Automatic driver setup, 3) Built-in compatibility checker, 4) Step-by-step video tutorials, 5) Live chat support during setup. No technical knowledge required - if you can install a game, you can install our cheats.',
        ctaText: 'Watch Installation Guide',
        ctaLink: '/installation-guide'
      },
      {
        id: 'promoters',
        question: 'Do you accept promoters or sponsorships?',
        answer: 'Yes! We have an active affiliate and sponsorship program with competitive rates. Content creators can earn 25-40% commission on sales plus bonus incentives. We provide promotional materials, dedicated support, and custom discount codes for your audience. Perfect for streamers, YouTubers, and community leaders looking to monetize their gaming content.',
        ctaText: 'Join Affiliate Program',
        ctaLink: '/affiliate-program'
      }
    ]
  }
];

const trustBadges = [
  { icon: Shield, text: '256-bit SSL Encryption' },
  { icon: Clock, text: '24/7 Customer Support' },
  { icon: Users, text: '1000+ Happy Customers' }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleQuestionClick = (id: string) => {
    toggleItem(id);
    window.history.pushState(null, '', `#${id}`);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setOpenItems([hash]);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, []);

  const totalQuestions = faqData.reduce((sum, category) => sum + category.questions.length, 0);

  return (
    <MinimalisticBackground>
      <Header />
        <section className="py-20 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Title and Description */}
              <div className="text-left">
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Frequently Asked{' '}
                  <span className="bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                    Questions
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Find quick answers to common questions about our CS2 cheats, installation, safety, and more. 
                  Can't find what you're looking for? Join our Discord for instant support.
                </motion.p>
              </div>

              {/* Right side - Discord Invitation */}
              <motion.div 
                className="flex justify-center lg:justify-end items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6 hover:border-gray-400/30 transition-all duration-300 max-w-md">
                  <div className="text-center space-y-4">
                    <MessageCircle className="w-8 h-8 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Can't find your question? Join our Discord server for instant support from our team.
                      </p>
                      <Link href="https://discord.gg/cheats-pro" className="inline-flex items-center justify-center w-full bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                        Join Discord Support
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* First two categories in two columns */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {faqData.slice(0, 2).map((category, categoryIndex) => (
                <motion.div 
                  key={category.category}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center text-sm font-bold mr-3 leading-none">
                      {category.questions.length}
                    </span>
                    {category.category}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        id={faq.id}
                        className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => handleQuestionClick(faq.id)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-inset group"
                          aria-expanded={openItems.includes(faq.id)}
                          aria-controls={`answer-${faq.id}`}
                        >
                          <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-gray-300 transition-colors">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {openItems.includes(faq.id) && (
                            <motion.div
                              id={`answer-${faq.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <div className="border-t border-gray-600/20 pt-4">
                                  <p className="text-gray-300 leading-relaxed mb-4 text-base">
                                    {faq.answer}
                                  </p>
                                  
                                  {faq.ctaText && faq.ctaLink && (
                                    <div className="flex flex-wrap gap-3">
                                      <Link href={faq.ctaLink}>
                                        <Button 
                                          size="sm" 
                                          className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 shadow-lg shadow-gray-500/20 border border-gray-400/20 backdrop-blur-sm"
                                        >
                                          {faq.ctaText}
                                          <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                      </Link>
                                      
                                      {faq.id === 'safety' && (
                                        <Link href="/status">
                                          <Button variant="outline" size="sm">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                                            Check Live Status
                                          </Button>
                                        </Link>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Third category in full width */}
            {faqData.slice(2).map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (categoryIndex + 2) * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {category.questions.length}
                  </span>
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      id={faq.id}
                      className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleQuestionClick(faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-inset group"
                        aria-expanded={openItems.includes(faq.id)}
                        aria-controls={`answer-${faq.id}`}
                      >
                        <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-gray-300 transition-colors">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {openItems.includes(faq.id) && (
                          <motion.div
                            id={`answer-${faq.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t border-gray-600/20 pt-4">
                                <p className="text-gray-300 leading-relaxed mb-4 text-base">
                                  {faq.answer}
                                </p>
                                
                                {faq.ctaText && faq.ctaLink && (
                                  <div className="flex flex-wrap gap-3">
                                    <Link href={faq.ctaLink}>
                                      <Button 
                                        size="sm" 
                                        className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 hover:from-slate-600 hover:via-gray-500 hover:to-slate-600 shadow-lg shadow-gray-500/20 border border-gray-400/20 backdrop-blur-sm"
                                      >
                                        {faq.ctaText}
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                      </Button>
                                    </Link>
                                    
                                    {faq.id === 'safety' && (
                                      <Link href="/status">
                                        <Button variant="outline" size="sm">
                                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                                          Check Live Status
                                        </Button>
                                      </Link>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-gray-600/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Cheats-Pro?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust our secure, reliable gaming software.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <badge.icon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-white">{badge.text}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-gray-600/20"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Ready to get started?</p>
                <p className="text-gray-200 text-xs">Join 50,000+ users today</p>
              </div>
              <Link href="/products">
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Shop Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
    </MinimalisticBackground>
  );
}