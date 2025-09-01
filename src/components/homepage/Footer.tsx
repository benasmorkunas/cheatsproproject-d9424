'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Users, Headphones, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Shop', href: '/products' },
    { name: 'CS2 Cheats', href: '/cs2-cheats' },
    { name: 'BF6 Hacks', href: '/bf6-hacks' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Status', href: '/status' },
  ];

  const support = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Support', href: '/support' },
    { name: 'Discord', href: 'https://discord.gg/cheats-pro' },
    { name: 'Installation Guide', href: '/guide' },
    { name: 'Refund Policy', href: '/refund' },
  ];

  const legal = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'DMCA', href: '/dmca' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ];

  const paymentMethods = [
    { name: 'PayPal', icon: '💳', color: 'text-blue-400' },
    { name: 'Visa', icon: '💳', color: 'text-blue-600' },
    { name: 'Mastercard', icon: '💳', color: 'text-red-500' },
    { name: 'Bitcoin', icon: '₿', color: 'text-orange-400' },
    { name: 'Ethereum', icon: 'Ξ', color: 'text-purple-400' },
    { name: 'USDT', icon: '₮', color: 'text-green-400' },
  ];

  const securityBadges = [
    { name: 'SSL Secured', icon: <Shield className="w-5 h-5" /> },
    { name: 'PCI Compliant', icon: <Shield className="w-5 h-5" /> },
    { name: '24/7 Support', icon: <Headphones className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              className="col-span-1 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Image
                  src="/images/cheatsprologo.webp"
                  alt="Cheats Pro"
                  width={600}
                  height={200}
                  className="h-40 w-auto"
                />
              </Link>

              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Premium gaming enhancements for CS2 and BF6. Undetected, reliable, and trusted by 1K+ gamers worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>support@cheats-pro.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>2,847 Discord Members Online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="https://discord.gg/cheats-pro"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white">DC</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white">FB</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white">YT</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3">
                {legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>


        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">
              © 2024 cheats-pro.com. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span>🌐 Available Worldwide</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-8 border-t border-gray-800/50">
            <p className="text-gray-500 text-sm text-center leading-relaxed">
              <strong>Disclaimer:</strong> This software is for educational and testing purposes only. 
              Use of cheats may violate game terms of service. Users are responsible for compliance with all applicable laws and regulations. 
              We do not condone cheating in competitive environments.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}