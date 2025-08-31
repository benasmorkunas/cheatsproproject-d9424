'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { itemCount } = useCart();

  const navItems = [
    { name: 'STATUS', href: '/status', highlight: true },
    { name: 'FAQ', href: '/faq' },
    { name: 'DISCORD', href: 'https://discord.gg/cheats-pro' },
    { name: 'DEVELOPERS', href: '/for-developers' },
    { name: 'AFFILIATES', href: '/affiliate-program' },
  ];

  const shopItems = [
    { name: 'CS2 Hacks', href: '/products/cs2' },
    { name: 'BF6 Hacks', href: '/products/bf6' },
    { name: 'All Products', href: '/products/all' },
  ];

  return (
    <motion.header
      className="relative z-50 bg-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/cheatsprologo.webp"
              alt="Cheats Pro"
              width={600}
              height={200}
              className="h-40 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
                className="transition-colors duration-200 relative group flex items-center space-x-1 font-semibold text-gray-300 hover:text-white"
              >
                <span>SHOP</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-white/80 to-white/40"></span>
              </button>

              <AnimatePresence>
                {isShopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    {shopItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 font-semibold first:rounded-t-lg last:rounded-b-lg"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 relative group flex items-center space-x-1 font-semibold ${
                  item.highlight 
                    ? 'text-green-400 hover:text-green-300' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.highlight && (
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                )}
                <span>{item.name}</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  item.highlight 
                    ? 'bg-gradient-to-r from-green-400 to-green-300' 
                    : 'bg-gradient-to-r from-white/80 to-white/40'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA and Cart */}
          <div className="flex items-center space-x-4 h-full">
            <Link
              href="/cart"
              className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-white/90 to-white/70 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </Link>

            <motion.button
              className="bg-gradient-to-r from-white/90 to-white/70 hover:from-white hover:to-white/90 text-black px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/30 backdrop-blur-sm rounded-lg mt-2 border border-white/10">
              {/* Shop Items */}
              <div className="mb-2">
                <div className="px-3 py-2 text-white/80 font-semibold text-sm uppercase tracking-wide">Shop</div>
                {shopItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-6 py-2 rounded-md transition-colors duration-200 font-semibold text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Separator */}
              <div className="border-t border-gray-600 my-2"></div>
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 font-semibold ${
                    item.highlight
                      ? 'text-green-400 hover:text-green-300 hover:bg-green-900/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.highlight && (
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}