'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
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

// Stripe Payment Form Component
interface StripePaymentFormProps {
  clientSecret: string;
  onPaymentComplete: () => void;
  isProcessing: boolean;
  price: number;
  activeColors: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
    darker: string;
  };
}

function StripePaymentForm({ clientSecret, onPaymentComplete, isProcessing, price, activeColors }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  const formatPrice = (priceInCents: number): string => {
    return (priceInCents / 100).toFixed(2);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setCardError(null);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (error) {
      setCardError(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onPaymentComplete();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9CA3AF',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#EF4444',
      },
    },
    hidePostalCode: false,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Element */}
      <div className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Details
        </label>
        <CardElement options={cardElementOptions} />
      </div>

      {/* Error Display */}
      {cardError && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm">{cardError}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:cursor-not-allowed"
        style={{
          background: isProcessing ? '#6B7280' : `linear-gradient(to right, ${activeColors.primary}, ${activeColors.secondary})`
        }}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Complete Purchase - ${formatPrice(price)}</span>
          </div>
        )}
      </button>
    </form>
  );
}

interface InstantCheckoutWidgetProps {
  productGroup: {
    id: string;
    name: string;
    baseDescription: string;
    image: string;
    variants: SimpleProduct[];
  };
  selectedVariant?: SimpleProduct;
  onClose?: () => void;
  colors?: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
    darker: string;
  };
}

export default function InstantCheckoutWidget({ productGroup, selectedVariant: initialSelectedVariant, onClose, colors }: InstantCheckoutWidgetProps) {
  const [selectedVariant, setSelectedVariant] = useState(initialSelectedVariant || productGroup.variants[0]);
  const [checkoutStep, setCheckoutStep] = useState(initialSelectedVariant ? 2 : 1);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
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


  // Calculate licenses remaining (same logic as product page)
  const calculateLicensesRemaining = () => {
    const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const productOffset = selectedVariant.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10;
    const daysSinceStart = (today + productOffset) % 12;
    const licenses = Math.max(15, 50 - (daysSinceStart * 3));
    return licenses === 15 ? 50 : licenses;
  };

  const licensesRemaining = calculateLicensesRemaining();

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const productPrefix = selectedVariant.id.includes('cs2') ? 'CS2' : 'BF6';
    return `${productPrefix}-${timestamp}-${random}`.toUpperCase();
  };

  // Create payment intent
  const createPaymentIntent = async () => {
    try {
      setIsProcessing(true);
      setPaymentError(null);

      const newOrderId = generateOrderId();
      setOrderId(newOrderId);

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedVariant.price, // Amount in cents
          currency: 'usd',
          orderId: newOrderId,
          productIds: selectedVariant.id,
          customerInfo: customerInfo
        })
      });

      const data = await response.json();

      if (data.success) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        return true;
      } else {
        setPaymentError(data.message || 'Failed to create payment intent');
        return false;
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setPaymentError('Network error. Please try again.');
      return false;
    } finally {
      setIsProcessing(false);
    }
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

  const handleCustomerInfoSubmit = async () => {
    if (customerInfo.email && customerInfo.firstName && customerInfo.lastName) {
      // Create payment intent before moving to payment step
      const success = await createPaymentIntent();
      if (success) {
        setCheckoutStep(2);
      }
      // If payment intent creation fails, stay on current step
      // Error message is already set in createPaymentIntent function
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
        <div></div>
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
            <span className="text-orange-300 text-sm font-medium">Limited Licenses Available</span>
          </div>
          <div className="text-red-400 font-mono font-bold">
            {licensesRemaining} left
          </div>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <div className="w-full mb-6">
        <div className="flex items-center mb-2">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= checkoutStep ? 'bg-gray-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {step < checkoutStep ? <Check className="w-4 h-4" /> : step}
                </div>
                <span className={`text-xs mt-2 ${checkoutStep >= step ? 'text-gray-300' : 'text-gray-500'}`}>
                  {step === 1 ? (initialSelectedVariant ? 'Plan Selected' : 'Choose Plan') :
                   step === 2 ? 'Customer Info' : 'Payment'}
                </span>
              </div>
              {index < 2 && (
                <div className={`flex-1 h-1 mx-4 ${
                  step < checkoutStep ? 'bg-gray-500' : 'bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
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
                        <div className="bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700 text-white px-3 py-1 rounded-full text-xs font-bold">
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

          {/* Error Message */}
          {paymentError && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">{paymentError}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleCustomerInfoSubmit}
            disabled={!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName || isProcessing}
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
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Creating Payment...</span>
              </>
            ) : (
              <>
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
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
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src={productGroup.image}
                  alt={productGroup.name}
                  fill
                  className="object-contain rounded-lg"
                  sizes="64px"
                />
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


          {/* Stripe Payment Form */}
          {clientSecret && (
            <div>
              <p className="text-green-400 text-sm mb-4">✓ Payment form ready</p>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentForm
                  clientSecret={clientSecret}
                  onPaymentComplete={handlePaymentComplete}
                  isProcessing={isProcessing}
                  price={selectedVariant.price}
                  activeColors={activeColors}
                />
              </Elements>
            </div>
          )}

          {/* Loading State */}
          {!clientSecret && !paymentError && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-400 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-400">Loading payment form...</p>
            </div>
          )}

          {/* Error State */}
          {paymentError && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300">{paymentError}</span>
              </div>
              <button
                onClick={() => {
                  setPaymentError(null);
                  setCheckoutStep(1);
                }}
                className="mt-2 text-sm text-red-300 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Payment Security */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div>•</div>
            <div>Powered by Stripe</div>
            <div>•</div>
            <div>Money-back Guarantee</div>
          </div>

        </motion.div>
      )}
    </div>
  );
}