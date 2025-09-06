'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleProduct } from '@/contexts/CartContext';
import { X, CreditCard, Shield, Clock, Check, Star, Users, Zap } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface InstantCheckoutProps {
  product: SimpleProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CheckoutFormProps {
  product: SimpleProduct;
  onClose: () => void;
}

function CheckoutForm({ product, onClose }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('7day');
  const [showSuccess, setShowSuccess] = useState(false);

  const pricingPlans = {
    '1day': { 
      price: product.name.toLowerCase().includes('lite') ? '3.99' : 
             product.name.toLowerCase().includes('plus') ? '5.99' : '7.99',
      label: '1 Day Access',
      savings: ''
    },
    '7day': { 
      price: product.name.toLowerCase().includes('lite') ? '9.99' : 
             product.name.toLowerCase().includes('plus') ? '14.99' : '19.99',
      label: '7 Days Access',
      savings: 'MOST POPULAR'
    },
    '30day': { 
      price: product.name.toLowerCase().includes('lite') ? '19.99' : 
             product.name.toLowerCase().includes('plus') ? '29.99' : '39.99',
      label: '30 Days Access',
      savings: 'BEST VALUE'
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found');
      setProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email,
          name: `${firstName} ${lastName}`,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      // In a real implementation, you would send this to your backend
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        setProcessing(false);
        setShowSuccess(true);
        
        // Auto-close after success
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 3000);
      }, 2000);

    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Payment Successful!</h3>
        <p className="text-gray-300 mb-6">
          Your {product.name} access has been activated. Check your email for download instructions.
        </p>
        <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4">
          <p className="text-green-400 font-semibold">
            ✓ Instant activation completed
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Download link sent to: {email}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plan Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Plan</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(pricingPlans).map(([key, plan]) => (
            <motion.button
              key={key}
              type="button"
              onClick={() => setSelectedPlan(key)}
              className={`relative p-3 rounded-xl border text-center transition-all duration-300 ${
                selectedPlan === key
                  ? 'border-orange-500 bg-orange-500/20'
                  : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.savings && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {plan.savings}
                  </div>
                </div>
              )}
              <div className="text-sm text-gray-400 mb-1">{plan.label}</div>
              <div className="text-lg font-bold text-white">${plan.price}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Payment Information */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Information
        </label>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#9CA3AF',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="bg-gray-800/30 rounded-xl p-4">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>SSL Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-400" />
            <span>Money Back Guarantee</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300"
        whileHover={!processing ? { scale: 1.02 } : {}}
        whileTap={!processing ? { scale: 0.98 } : {}}
      >
        {processing ? (
          <span className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Complete Purchase - ${pricingPlans[selectedPlan as keyof typeof pricingPlans].price}</span>
          </span>
        )}
      </motion.button>
    </form>
  );
}

export default function InstantCheckout({ product, isOpen, onClose }: InstantCheckoutProps) {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 14,
    seconds: 59
  });

  // Countdown timer for urgency
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!product || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-700">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                <p className="text-gray-300">Instant Access - 3 Minute Setup</p>
              </div>
            </div>

            {/* Urgency Banner */}
            <div className="mt-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">Limited Time: 40% Off</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">10K+</div>
                <div className="text-xs text-gray-400">Active Users</div>
              </div>
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-2xl font-bold text-yellow-400">4.9</span>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <div className="text-2xl font-bold text-gray-400">24/7</div>
                <div className="text-xs text-gray-400">Support</div>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm product={product} onClose={onClose} />
            </Elements>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}