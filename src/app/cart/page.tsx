'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import TrustSignals from '@/components/checkout/TrustSignals';
import CustomerReviews from '@/components/checkout/CustomerReviews';
import { useCart } from '@/contexts/CartContext';
import { stripePromise } from '@/lib/stripe';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  Shield, 
  Clock, 
  CreditCard,
  Lock,
  CheckCircle,
  Info
} from 'lucide-react';

// Available payment methods configuration
const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, American Express' },
  { id: 'link', name: 'Link', icon: '🔗', description: 'One-click checkout' },
  { id: 'apple_pay', name: 'Apple Pay', icon: '🍎', description: 'Touch ID or Face ID' },
  { id: 'google_pay', name: 'Google Pay', icon: '🔵', description: 'Quick and secure' },
];

export default function CartPage() {
  const { items, total, subtotal, tax, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [checkoutError, setCheckoutError] = useState<string>('');

  // Handle empty cart
  if (items.length === 0) {
    return (
      <MinimalisticBackground>
        <div className="min-h-screen">
          <Header />
          
          <main className="pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
                <p className="text-gray-400 mb-8">Add some awesome gaming tools to get started!</p>
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Browse Products</span>
                </Link>
              </motion.div>
            </div>
          </main>

          <Footer />
        </div>
      </MinimalisticBackground>
    );
  }

  const handleProceedToCheckout = async () => {
    setIsCreatingOrder(true);
    setCheckoutError('');

    try {
      // Create initial order
      const newOrderId = Math.random().toString(36).substring(2, 8).toUpperCase();
      const orderData = {
        amount: Math.round(total * 100), // Convert to cents
        currency: 'usd',
        automatic_payment_methods: { enabled: false },
        payment_method_types: [selectedPaymentMethod],
        selected_payment_method: selectedPaymentMethod,
        metadata: {
          product_id: items.length === 1 ? items[0].product.id : items.map(item => item.product.id).join(','),
          customer_email: '',
          payment_method: selectedPaymentMethod,
          products: items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          }))
        },
        timestamp: new Date().toISOString(),
        status: 'incomplete',
        customerInfo: null,
      };

      console.log('Creating order with data:', orderData);

      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        console.error('Order creation failed:', {
          status: orderResponse.status,
          statusText: orderResponse.statusText,
          errorData
        });
        throw new Error((errorData as any).message || 'Failed to create order');
      }
      
      const orderResult = await orderResponse.json();
      console.log('Order created successfully:', orderResult);
      
      // Create payment intent
      const productIds = items.length === 1 ? items[0].product.id : items.map(item => item.product.id).join(',');
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'usd',
          orderId: orderResult.data.id,
          productIds,
          paymentMethodTypes: [selectedPaymentMethod],
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json().catch(() => ({}));
        console.error('Payment intent creation failed:', errorData);
        throw new Error((errorData as any).message || 'Failed to create payment intent');
      }
      
      const paymentResult = await paymentResponse.json();
      console.log('Payment intent created successfully:', paymentResult);
      
      setOrderId(orderResult.data.id);
      setClientSecret(paymentResult.clientSecret);
      setIsCheckoutMode(true);
      
    } catch (error) {
      console.error('Error creating order:', error);
      setCheckoutError(error instanceof Error ? error.message : 'There was an error creating your order. Please try again.');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleBackToCart = () => {
    setIsCheckoutMode(false);
    setClientSecret('');
    setOrderId('');
    setCheckoutError('');
  };

  return (
    <MinimalisticBackground>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-12 pb-75">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            {isCheckoutMode && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mb-8"
              >
                <button
                  onClick={handleBackToCart}
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Cart</span>
                </button>
              </motion.div>
            )}

            {!isCheckoutMode && items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mb-8"
              >
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
                >
                  Clear All Items
                </button>
              </motion.div>
            )}

            <div className={`grid gap-8 ${isCheckoutMode ? 'lg:grid-cols-1' : 'lg:grid-cols-5'}`}>
              {/* Payment Method and Trust Signals - Left Side */}
              <div className={isCheckoutMode ? 'hidden' : 'lg:col-span-2'}>
                <div className="space-y-6">
                  {!isCheckoutMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                        Select Payment Method
                      </h3>
                      
                      <div className="space-y-3">
                        {PAYMENT_METHODS.map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedPaymentMethod === method.id
                                ? 'border-gray-500 bg-gray-500/10'
                                : 'border-gray-600 hover:border-gray-500 bg-black/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={selectedPaymentMethod === method.id}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                              selectedPaymentMethod === method.id
                                ? 'border-gray-500 bg-gray-500'
                                : 'border-gray-400'
                            }`}>
                              {selectedPaymentMethod === method.id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <div className="flex items-center flex-1">
                              <span className="text-2xl mr-3">{method.icon}</span>
                              <div>
                                <div className="text-white font-medium">{method.name}</div>
                                <div className="text-gray-400 text-sm">{method.description}</div>
                              </div>
                            </div>
                            {selectedPaymentMethod === method.id && (
                              <CheckCircle className="w-5 h-5 text-gray-400 ml-auto" />
                            )}
                          </label>
                        ))}
                      </div>

                      {/* Proceed to Checkout Button */}
                      <div className="mt-6">
                        <button
                          onClick={handleProceedToCheckout}
                          disabled={isCreatingOrder || items.length === 0}
                          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                          {isCreatingOrder ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Preparing Checkout...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <Lock className="w-5 h-5" />
                              <span>Proceed to Checkout - ${total.toFixed(2)}</span>
                            </div>
                          )}
                        </button>

                        {checkoutError && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-2">
                              <Info className="w-5 h-5 text-red-400" />
                              <p className="text-red-400 text-sm">{checkoutError}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {!isCheckoutMode && <TrustSignals />}
                </div>
              </div>

              {/* Order Summary and Reviews - Right Side */}
              <div className={isCheckoutMode ? 'lg:col-span-1' : 'lg:col-span-3'}>
                {isCheckoutMode && clientSecret ? (
                  /* Checkout Form */
                  <Elements 
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      locale: 'en',
                      appearance: {
                        theme: 'night',
                        variables: {
                          colorPrimary: '#8b5cf6',
                          colorBackground: '#374151',
                          colorText: '#ffffff',
                          colorDanger: '#ef4444',
                          fontFamily: 'Inter, sans-serif',
                          borderRadius: '8px',
                        }
                      },
                      loader: 'auto'
                    }}
                  >
                    <CheckoutForm 
                      clientSecret={clientSecret}
                      orderId={orderId}
                      total={total}
                      selectedPaymentMethods={[selectedPaymentMethod]}
                    />
                  </Elements>
                ) : (
                  /* Order Summary and Reviews */
                  <div className="space-y-6">
                    <OrderSummary 
                      items={items}
                    />

                    {/* Customer Reviews */}
                    {!isCheckoutMode && (
                      <CustomerReviews />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MinimalisticBackground>
  );
}