'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Clock, Users, MessageCircle, Star, ExternalLink, HelpCircle, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Header from '@/components/homepage/Header';

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
  { icon: Users, text: '50,000+ Happy Customers' },
  { icon: Star, text: '4.9/5 Average Rating' }
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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-24">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Find quick answers to common questions about our CS2 cheats, installation, safety, and more. 
              Can't find what you're looking for? Join our Discord for instant support.
            </motion.p>


            <motion.div 
              className="flex justify-center items-center space-x-8 text-sm text-gray-400 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>{totalQuestions} Questions</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Updated Daily</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Instant Answers</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqData.map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {category.questions.length}
                  </span>
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      id={faq.id}
                      className="bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleQuestionClick(faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-inset group"
                        aria-expanded={openItems.includes(faq.id)}
                        aria-controls={`answer-${faq.id}`}
                      >
                        <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-purple-300 transition-colors">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-purple-400" />
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
                              <div className="border-t border-purple-500/20 pt-4">
                                <p className="text-gray-300 leading-relaxed mb-4 text-base">
                                  {faq.answer}
                                </p>
                                
                                {faq.ctaText && faq.ctaLink && (
                                  <div className="flex flex-wrap gap-3">
                                    <Link href={faq.ctaLink}>
                                      <Button 
                                        size="sm" 
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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

        <section className="py-16 border-t border-purple-500/20">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <badge.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-white">{badge.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join our Discord community for instant support from our team and other users. 
                Get real-time help with installation, troubleshooting, and general questions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://discord.gg/cheats-pro">
                  <Button 
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Join Discord Support
                  </Button>
                </Link>
                
                <Link href="/products">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3"
                  >
                    Shop CS2 Cheats
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 shadow-2xl border border-purple-500/30"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Ready to get started?</p>
                <p className="text-purple-200 text-xs">Join 50,000+ users today</p>
              </div>
              <Link href="/products">
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Shop Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}