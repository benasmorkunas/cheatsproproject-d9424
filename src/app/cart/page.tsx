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
        
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {isCheckoutMode ? 'Checkout' : 'Shopping Cart'}
                </h1>
                {!isCheckoutMode && (
                  <p className="text-gray-400 mt-2">
                    {/* Description for cart mode if needed */}
                  </p>
                )}
              </div>
              
              {isCheckoutMode && (
                <button
                  onClick={handleBackToCart}
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Cart</span>
                </button>
              )}
              
              {!isCheckoutMode && items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
                >
                  Clear All Items
                </button>
              )}
            </motion.div>

            <div className={`grid gap-8 ${isCheckoutMode ? 'lg:grid-cols-5' : 'lg:grid-cols-5'}`}>
              {/* Main Content */}
              <div className={isCheckoutMode ? 'lg:col-span-3' : 'lg:col-span-3'}>
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
                      loader: 'auto',
                      // Allow payment method auto-fill in development
                      paymentMethodCreation: 'manual'
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
                  /* Cart Items */
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-black/30 rounded-lg flex items-center justify-center overflow-hidden">
                            {item.product.image ? (
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <ShoppingBag className="w-8 h-8 text-gray-400" />
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                              Digital product • Instant delivery
                            </p>
                            
                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="w-10 h-10 bg-black/30 hover:bg-black/40 rounded-lg flex items-center justify-center transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-white font-semibold px-4">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-10 h-10 bg-black/30 hover:bg-black/40 rounded-lg flex items-center justify-center transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-white" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="ml-4 w-10 h-10 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg flex items-center justify-center transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-400">
                                  ${((item.product.price / 100) * item.quantity).toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-sm text-gray-400">
                                    ${(item.product.price / 100).toFixed(2)} each
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Payment Method Selection */}
                    {!isCheckoutMode && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: items.length * 0.1 }}
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

                    {/* Customer Reviews */}
                    {!isCheckoutMode && (
                      <CustomerReviews />
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <OrderSummary 
                    items={items}
                  />
                  
                  {!isCheckoutMode && <TrustSignals />}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MinimalisticBackground>
  );
}