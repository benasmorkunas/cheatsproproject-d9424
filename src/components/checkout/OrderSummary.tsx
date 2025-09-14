'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Tag, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Plus, 
  Minus,
  Trash2,
  Gift,
  Check,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: any[];
  isCheckoutMode?: boolean;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

const VALID_PROMO_CODES: PromoCode[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage' },
  { code: 'FIRST20', discount: 20, type: 'percentage' },
  { code: 'SAVE5', discount: 5, type: 'fixed' },
  { code: 'GAMER15', discount: 15, type: 'percentage' }
];

export default function OrderSummary({ items, isCheckoutMode = false }: OrderSummaryProps) {
  const { total, subtotal, tax, updateQuantity, removeFromCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(!isCheckoutMode);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.discount) / 100;
    } else {
      return Math.min(appliedPromo.discount, subtotal);
    }
  };

  const discount = calculateDiscount();
  const finalTotal = Math.max(0, total - discount);

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setPromoError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const validPromo = VALID_PROMO_CODES.find(
      promo => promo.code.toLowerCase() === promoCode.toLowerCase()
    );

    if (validPromo) {
      setAppliedPromo(validPromo);
      setShowPromoCode(false);
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Please try again.');
    }

    setIsApplyingPromo(false);
  };

  const handleRemovePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      layout
      className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div 
        className="p-6 border-b border-gray-700/50 cursor-pointer lg:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Order Summary</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-400">
              ${finalTotal.toFixed(2)}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 lg:hidden ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Items List */}
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 bg-black/20 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      ${(item.product.price / 100).toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  {!isCheckoutMode && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-black/30 rounded transition-all duration-200"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-black/30 rounded transition-all duration-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all duration-200 ml-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      ${((item.product.price / 100) * item.quantity).toFixed(2)}
                    </div>
                    {isCheckoutMode && (
                      <div className="text-gray-400 text-sm">
                        Qty: {item.quantity}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Promo Code Section */}
            <div className="px-6 pb-4">
              <AnimatePresence>
                {!appliedPromo && !showPromoCode && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => setShowPromoCode(true)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors duration-200 text-sm"
                  >
                    <Tag className="w-4 h-4" />
                    <span>Add promo code</span>
                  </motion.button>
                )}

                {showPromoCode && !appliedPromo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoError('');
                          }}
                          placeholder="Enter promo code"
                          className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                        />
                        <Gift className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                      
                      <button
                        onClick={handleApplyPromoCode}
                        disabled={isApplyingPromo || !promoCode.trim()}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-black/40 text-white text-sm rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
                      >
                        {isApplyingPromo ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'Apply'
                        )}
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowPromoCode(false);
                          setPromoCode('');
                          setPromoError('');
                        }}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {promoError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-xs flex items-center space-x-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>{promoError}</span>
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {appliedPromo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">
                        {appliedPromo.code}
                      </span>
                      <span className="text-gray-400 text-xs">applied</span>
                    </div>
                    
                    <button
                      onClick={handleRemovePromoCode}
                      className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label="Remove promo code"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Breakdown */}
            <div className="px-6 pb-6 space-y-3 border-t border-gray-700/50 pt-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              
              <hr className="border-gray-600" />
              
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span className="text-gray-400">${finalTotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through">
                    ${total.toFixed(2)}
                  </span>
                  <span className="text-sm text-green-400 ml-2">
                    You saved ${discount.toFixed(2)}!
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}