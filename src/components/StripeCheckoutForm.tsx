'use client';

import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface StripeCheckoutFormProps {
  clientSecret: string;
  orderId: string;
  total: number;
  onSuccess?: () => void;
}

export default function StripeCheckoutForm({ 
  clientSecret, 
  orderId, 
  total, 
  onSuccess 
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();
  
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      // Update order with customer information
      console.log('Updating order with customer info:', orderId, customerInfo);
      const updateResponse = await fetch(`/api/test-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          customerInfo,
          status: 'processing',
        }),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.text();
        console.error('Failed to update order:', errorData);
        throw new Error(`Failed to update order: ${updateResponse.status}`);
      }

      const updateResult = await updateResponse.json();
      console.log('Order updated successfully:', updateResult);

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/thank-you?order=${orderId}`,
          receipt_email: customerInfo.email,
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || 'An error occurred.');
        } else {
          setMessage('An unexpected error occurred.');
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        console.log('Payment succeeded, updating order to completed:', paymentIntent.id);
        const completionResponse = await fetch(`/api/test-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            status: 'completed',
            paymentIntentId: paymentIntent.id,
            completedAt: new Date().toISOString(),
          }),
        });

        if (!completionResponse.ok) {
          const errorData = await completionResponse.text();
          console.error('Failed to complete order:', errorData);
        } else {
          const completionResult = await completionResponse.json();
          console.log('Order completed successfully:', completionResult);
        }
        
        clearCart();
        if (onSuccess) onSuccess();
        router.push(`/thank-you?order=${orderId}&payment_intent=${paymentIntent.id}`);
      }
    } catch (err) {
      setMessage('An error occurred while processing your payment.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs' as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Billing Address</h3>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <AddressElement 
              options={{
                mode: 'billing',
                allowedCountries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
              }}
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <PaymentElement 
              options={paymentElementOptions}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </button>

        {/* Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
          >
            <p className="text-red-400 text-sm">{message}</p>
          </motion.div>
        )}
      </form>

      {/* Security Notice */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-5 h-5 text-green-400">🔒</div>
          <span className="font-semibold text-green-400">Secure Payment</span>
        </div>
        <p className="text-sm text-gray-300">
          Your payment information is encrypted and secure. We never store your payment details.
        </p>
      </div>
    </motion.div>
  );
}