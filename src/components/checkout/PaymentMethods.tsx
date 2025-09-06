'use client';

import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function PaymentMethods() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
        Payment Methods
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-pink-500/20 border border-pink-400/40 rounded-lg p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
            <span className="text-lg text-pink-400 font-bold">K</span>
          </div>
          <span className="text-xs text-pink-300 font-medium">Klarna</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <CreditCard className="w-6 h-6 text-gray-400 mx-auto mb-1" />
          <span className="text-xs text-gray-300">Cards</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
            <span className="text-sm text-white font-bold">🍎</span>
          </div>
          <span className="text-xs text-gray-300">Apple Pay</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
            <span className="text-sm text-gray-500 font-bold">G</span>
          </div>
          <span className="text-xs text-gray-300">Google Pay</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
            <span className="text-lg text-gray-600 font-bold">P</span>
          </div>
          <span className="text-xs text-gray-300">PayPal</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
          <div className="w-6 h-6 mx-auto mb-1 flex items-center justify-center">
            <span className="text-lg text-orange-400 font-bold">₿</span>
          </div>
          <span className="text-xs text-gray-300">Crypto</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          All payments are processed securely through Stripe
        </p>
      </div>
    </motion.div>
  );
}