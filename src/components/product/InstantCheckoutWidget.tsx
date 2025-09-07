'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart,
  CreditCard,
  Mail,
  User,
  Lock,
  Check,
  Zap,
  Crown,
  Clock,
  AlertCircle,
  X,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { SimpleProduct } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';

interface InstantCheckoutWidgetProps {
  productGroup: {
    id: string;
    name: string;
    baseDescription: string;
    image: string;
    variants: SimpleProduct[];
  };
  onClose?: () => void;
  colors?: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
    darker: string;
  };
}

export default function InstantCheckoutWidget({ productGroup, onClose, colors }: InstantCheckoutWidgetProps) {
  const [selectedVariant, setSelectedVariant] = useState(productGroup.variants[0]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [urgencyTimer, setUrgencyTimer] = useState(300); // 5 minutes
  const { addToCart } = useCart();
  
  // Default colors if not provided (Grey theme)
  const defaultColors = {
    primary: '#6B7280',
    secondary: '#9CA3AF',
    light: '#D1D5DB',
    dark: '#4B5563',
    darker: '#374151'
  };
  
  const activeColors = colors || defaultColors;

  // Timer effect for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDurationLabel = (variantId: string): string => {
    if (variantId.includes('1day')) return '1 Day';
    if (variantId.includes('7day')) return '7 Days';
    if (variantId.includes('30day')) return '30 Days';
    return '1 Day';
  };

  const getDurationDays = (variantId: string): number => {
    if (variantId.includes('1day')) return 1;
    if (variantId.includes('7day')) return 7;
    if (variantId.includes('30day')) return 30;
    return 1;
  };

  const getSavingsPercentage = (variants: SimpleProduct[], current: SimpleProduct): number => {
    const dailyPrice = variants.find(v => v.id.includes('1day'))?.price || current.price;
    const currentDailyPrice = current.price / getDurationDays(current.id);
    const dailyRateDaily = dailyPrice;
    return Math.round((1 - (currentDailyPrice / dailyRateDaily)) * 100);
  };

  const getDailyPrice = (variant: SimpleProduct): string => {
    const days = getDurationDays(variant.id);
    const dailyPrice = variant.price / days;
    return (dailyPrice / 100).toFixed(2);
  };

  const formatPrice = (priceInCents: number): string => {
    return (priceInCents / 100).toFixed(2);
  };

  const handleCustomerInfoSubmit = () => {
    if (customerInfo.email && customerInfo.firstName && customerInfo.lastName) {
      setCheckoutStep(2);
    }
  };

  const handlePaymentComplete = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      addToCart(selectedVariant);
      
      // Auto-close after success
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
    }, 3000);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border border-gray-700/50 rounded-2xl p-8 max-w-md w-full mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-4">Purchase Successful!</h3>
        <p className="text-gray-300 mb-6">
          Your download link has been sent to <strong>{customerInfo.email}</strong>
        </p>
        
        <div className="text-white/10 border border-gray-500/20 rounded-lg p-4 mb-6">
          <p className="text-gray-300 text-sm">
            <strong>Setup Instructions:</strong> Check your email within 2-3 minutes for download and installation guide.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300"
          style={{ 
            background: `linear-gradient(to right, ${activeColors.primary}, ${activeColors.secondary})` 
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = `linear-gradient(to right, ${activeColors.dark}, ${activeColors.darker})`;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = `linear-gradient(to right, ${activeColors.primary}, ${activeColors.secondary})`;
          }}
        >
          Continue Browsing
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span>Instant Checkout</span>
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Urgency Timer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-lg p-3 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Limited Time Offer</span>
          </div>
          <div className="text-red-400 font-mono font-bold">
            {formatTime(urgencyTimer)}
          </div>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center mb-6">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step <= checkoutStep ? 'text-white text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              {step < checkoutStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 2 && (
              <div className={`flex-1 h-1 mx-2 ${
                step < checkoutStep ? 'text-white' : 'bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Plan Selection & Customer Info */}
      {checkoutStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Plan Selection */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Choose Your Plan</h4>
            <div className="space-y-3">
              {productGroup.variants.map((variant, index) => {
                const days = getDurationDays(variant.id);
                const isSelected = selectedVariant.id === variant.id;
                const savings = getSavingsPercentage(productGroup.variants, variant);
                const dailyPrice = getDailyPrice(variant);
                
                return (
                  <motion.button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 relative ${
                      isSelected
                        ? 'border-gray-500 text-white/20 scale-105'
                        : 'border-white/20 bg-black/20 hover:border-gray-500/50'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Popular Badge */}
                    {days === 7 && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          MOST POPULAR
                        </div>
                      </div>
                    )}
                    
                    {/* Best Value Badge */}
                    {days === 30 && savings > 0 && (
                      <div className="absolute -top-2 right-4">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          SAVE {savings}%
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-bold text-lg">
                            {getDurationLabel(variant.id)}
                          </span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-gray-300" />}
                          {days === 30 && <Crown className="w-4 h-4 text-yellow-400" />}
                        </div>
                        <div className="text-gray-400 text-sm">
                          ${dailyPrice}/day
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ${formatPrice(variant.price)}
                        </div>
                        {savings > 0 && (
                          <div className="text-green-400 text-sm font-medium">
                            Save {savings}%
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Your Information</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-black/20 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCustomerInfoSubmit}
            disabled={!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName}
            className="w-full text-white py-4 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{
              background: isProcessing ? '#6B7280' : `linear-gradient(to right, ${activeColors.primary}, ${activeColors.secondary})`
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                (e.target as HTMLElement).style.background = `linear-gradient(to right, ${activeColors.dark}, ${activeColors.darker})`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) {
                (e.target as HTMLElement).style.background = `linear-gradient(to right, ${activeColors.primary}, ${activeColors.secondary})`;
              }
            }}
          >
            <span>Continue to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Step 2: Payment */}
      {checkoutStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Order Summary */}
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex items-start space-x-4 mb-4">
              <div className="text-2xl">
                {selectedVariant.id.includes('cs2') ? '🎯' : '🚁'}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{selectedVariant.name}</h4>
                <p className="text-gray-400 text-sm">
                  {getDurationLabel(selectedVariant.id)} Access • Instant Download
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-green-600/20 text-green-300 rounded-full border border-green-500/30">
                    Undetected
                  </span>
                  <span className="text-xs px-2 py-1 text-white/20 text-gray-300 rounded-full border border-gray-500/30">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600/30 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total:</span>
                <span className="text-2xl font-bold text-white">${formatPrice(selectedVariant.price)}</span>
              </div>
            </div>
          </div>

          {/* Development Notice */}
          <div className="text-white/10 border border-gray-500/20 rounded-lg p-4">
            <p className="text-gray-300 text-sm">
              <strong>Development Mode:</strong> This is a demo. No actual payment will be processed.
            </p>
          </div>

          {/* Payment Security */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div>•</div>
            <div>Powered by Stripe</div>
            <div>•</div>
            <div>Money-back Guarantee</div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePaymentComplete}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Complete Purchase - ${formatPrice(selectedVariant.price)}</span>
              </div>
            )}
          </button>

          {/* Go Back */}
          <button
            onClick={() => setCheckoutStep(1)}
            className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors"
          >
            ← Go Back
          </button>
        </motion.div>
      )}
    </div>
  );
}