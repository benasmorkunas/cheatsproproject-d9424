'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { validateCheckoutForm } from '@/utils/checkout-validation';
import { 
  User, 
  Mail, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Check,
  AlertCircle 
} from 'lucide-react';

interface CheckoutFormProps {
  clientSecret: string;
  orderId: string;
  total: number;
  selectedPaymentMethods: string[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutForm({ 
  clientSecret, 
  orderId, 
  total,
  selectedPaymentMethods,
  currentStep = 1,
  onStepChange 
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();
  
  const [step, setStep] = useState(currentStep);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [paymentElementReady, setPaymentElementReady] = useState(false);

  console.log('CheckoutForm received payment methods:', selectedPaymentMethods);

  useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  // Update canProceed based on step completion
  useEffect(() => {
    switch (step) {
      case 1:
        const validation = validateCheckoutForm(customerInfo, 1);
        setCanProceed(validation.isValid);
        break;
      case 2:
        setCanProceed(isPaymentComplete);
        break;
      default:
        setCanProceed(false);
    }
  }, [step, customerInfo, isPaymentComplete]);

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    if (onStepChange) {
      onStepChange(newStep);
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const validation = validateCheckoutForm(customerInfo, stepNumber);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      handleStepChange(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      handleStepChange(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded. Please refresh the page.');
      return;
    }

    if (!paymentElementReady) {
      setMessage('Payment form is still loading. Please wait a moment.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      console.log('Starting payment process...', { 
        orderId, 
        customerInfo, 
        selectedPaymentMethod,
        paymentElementReady,
        isPaymentComplete 
      });

      // Confirm payment first
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/thank-you?order=${orderId}`,
          receipt_email: customerInfo.email,
        },
        redirect: 'if_required',
      });

      console.log('Payment confirmation result:', { error, paymentIntent });

      if (error) {
        console.error('Payment error:', error);
        setMessage(error.message || 'Payment failed. Please check your card details.');
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded, updating order...');
        
        try {
          // Update order with completion info
          await fetch(`/api/orders/update/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: 'completed',
              paymentIntentId: paymentIntent.id,
              customerInfo,
              completedAt: new Date().toISOString(),
            }),
          });
        } catch (updateError) {
          console.warn('Failed to update order, but payment succeeded:', updateError);
        }
        
        clearCart();
        router.push(`/thank-you?order=${orderId}&payment_intent=${paymentIntent.id}`);
      } else {
        setMessage('Payment was not completed. Please try again.');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setMessage(`Payment failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }

    setIsLoading(false);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const progressSteps = [
    { number: 1, title: 'Contact Info', icon: User },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Complete', icon: Check }
  ];

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {progressSteps.map((progressStep, index) => {
            const Icon = progressStep.icon;
            const isActive = step === progressStep.number;
            const isCompleted = step > progressStep.number;
            
            return (
              <React.Fragment key={progressStep.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? 'bg-green-600' : isActive ? 'bg-purple-600' : 'bg-gray-600'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 transition-colors duration-300 ${
                    isActive ? 'text-purple-400' : isCompleted ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {progressStep.title}
                  </span>
                </div>
                
                {index < progressSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    step > progressStep.number ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                  <p className="text-gray-400 text-sm">We'll send your purchase confirmation here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={customerInfo.lastName}
                    onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>


              <div className="flex justify-end">
                <motion.button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!canProceed}
                  whileHover={{ scale: canProceed ? 1.02 : 1 }}
                  whileTap={{ scale: canProceed ? 0.98 : 1 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Address & Payment */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Payment Method</h3>
                  <p className="text-gray-400 text-sm">Your payment is secured with SSL encryption</p>
                </div>
              </div>


              {/* Payment Method */}
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <PaymentElement 
                    options={{
                      layout: 'tabs',
                      paymentMethodOrder: selectedPaymentMethods,
                      fields: {
                        billingDetails: 'auto'
                      }
                    }}
                    onReady={() => {
                      setPaymentElementReady(true);
                      console.log('Payment element ready');
                    }}
                    onChange={(event) => {
                      setIsPaymentComplete(event.complete);
                      console.log('Payment change:', {
                        complete: event.complete,
                        collapsed: event.collapsed,
                        empty: event.empty
                      });
                      
                      // Try to detect the payment method type
                      if (event.value?.type) {
                        setSelectedPaymentMethod(event.value.type);
                        console.log('Payment method selected:', event.value.type);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={handlePrevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 bg-black/30 hover:bg-black/40 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={isLoading || !stripe || !elements || !paymentElementReady}
                  whileHover={{ scale: (isLoading || !paymentElementReady) ? 1 : 1.02 }}
                  whileTap={{ scale: (isLoading || !paymentElementReady) ? 1 : 0.98 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Complete Payment - ${total.toFixed(2)}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{message}</p>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}