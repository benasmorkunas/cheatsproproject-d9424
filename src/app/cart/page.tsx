'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { useCart } from '@/contexts/CartContext';
import { stripePromise } from '@/lib/stripe';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  Shield, 
  Truck, 
  Clock, 
  CreditCard,
  Lock,
  CheckCircle,
  Info
} from 'lucide-react';

interface ProceedToCheckoutButtonProps {
  items: any[];
  total: number;
}

interface TransformingCheckoutProps {
  items: any[];
  total: number;
  onCheckoutModeChange: (isCheckout: boolean) => void;
}

function TransformingCheckout({ items, total, onCheckoutModeChange }: TransformingCheckoutProps) {
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');

  const handleProceedToCheckout = async () => {
    setIsCreatingOrder(true);

    try {
      // Create initial order
      const newOrderId = Math.random().toString(36).substring(2, 8).toUpperCase();
      const orderData = {
        amount: Math.round(total * 100), // Convert to cents
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: {
          product_id: items.length === 1 ? items[0].product.id : items.map(item => item.product.id).join(','),
          customer_email: '',
          products: JSON.stringify(items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          })))
        },
        timestamp: new Date().toISOString(),
        status: 'incomplete',
        customerInfo: null
      };

      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');
      
      const orderResult = await orderResponse.json();
      
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
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json().catch(() => ({}));
        console.error('Payment intent creation failed:', errorData);
        throw new Error(errorData.message || 'Failed to create payment intent');
      }
      
      const paymentResult = await paymentResponse.json();
      
      setOrderId(orderResult.data.id);
      setClientSecret(paymentResult.clientSecret);
      setIsCheckoutMode(true);
      onCheckoutModeChange(true);
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error creating your order. Please try again.');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleBackToCart = () => {
    setIsCheckoutMode(false);
    onCheckoutModeChange(false);
  };

  if (isCheckoutMode && clientSecret) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Secure Checkout</h2>
          <button
            onClick={handleBackToCart}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>
        </div>
        
        <Elements 
          stripe={stripePromise}
          options={{
            clientSecret,
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
            }
          }}
        >
          <StripeCheckoutForm 
            clientSecret={clientSecret}
            orderId={orderId}
            total={total}
          />
        </Elements>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full"
    >
      <button
        onClick={handleProceedToCheckout}
        disabled={isCreatingOrder || items.length === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed mb-4"
      >
        {isCreatingOrder ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Preparing Checkout...</span>
          </div>
        ) : (
          'Proceed to Checkout'
        )}
      </button>
    </motion.div>
  );
}

export default function CartPage() {
  const { items, total, subtotal, tax, shipping, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckoutPanel, setShowCheckoutPanel] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);

  if (items.length === 0) {
    return (
      <MinimalisticBackground>
        <div className="min-h-screen">
          <Header />
          
          <main className="pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShoppingBag className="w-16 h-16 text-gray-400" />
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
                <p className="text-xl text-gray-300 mb-8">
                  Add some premium gaming cheats to get started
                </p>
                
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Continue Shopping</span>
                </Link>
              </motion.div>
            </div>
          </main>
          
          <Footer />
        </div>
      </MinimalisticBackground>
    );
  }

  return (
    <MinimalisticBackground>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Shopping Cart</h1>
                  <p className="text-gray-300">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
                </div>
                
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
              
              {itemCount > 1 && (
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
                >
                  Clear All Items
                </button>
              )}
            </motion.div>

            <div className={isCheckoutMode ? "grid lg:grid-cols-2 gap-8" : "grid lg:grid-cols-3 gap-8"}>
              {/* Cart Items / Checkout Form */}
              <div className={isCheckoutMode ? "lg:col-span-1" : "lg:col-span-2"}>
                {isCheckoutMode ? (
                  <div className="space-y-6">
                    {/* This will be replaced by the checkout form */}
                  </div>
                ) : (
                  <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
                  >
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.product.name}</h3>
                        <p className="text-gray-300 mb-3 line-clamp-2">{item.product.description.replace(/<[^>]*>/g, '')}</p>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold text-purple-400">${(item.product.price / 100).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-gray-700/50 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-all duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="w-12 text-center font-semibold text-white">{item.quantity}</span>
                          
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-all duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          ${((item.product.price / 100) * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-gray-400">
                            ${(item.product.price / 100).toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                  </div>
                )}
              </div>

              {/* Checkout Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-400' : ''}>
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    {shipping > 0 && (
                      <div className="flex items-center space-x-2 text-sm text-gray-400 bg-blue-500/10 p-3 rounded-lg">
                        <Info className="w-4 h-4 text-blue-400" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                    )}
                    
                    <hr className="border-gray-600" />
                    
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-purple-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Transforming Checkout */}
                  <TransformingCheckout 
                    items={items} 
                    total={total} 
                    onCheckoutModeChange={setIsCheckoutMode}
                  />
                  
                  {!isCheckoutMode && (
                    <button
                      onClick={() => setShowCheckoutPanel(true)}
                      className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold transition-all duration-300 mb-4 text-sm"
                    >
                      View Checkout Details
                    </button>
                  )}

                  {/* Security Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>SSL Secured Checkout</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Truck className="w-4 h-4 text-blue-400" />
                      <span>Instant Digital Delivery</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>24/7 Customer Support</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="border-t border-gray-600 pt-6">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">We Accept</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                        <CreditCard className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-300">Credit Cards</span>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                        <span className="text-lg text-orange-400 font-bold">₿</span>
                        <div className="text-xs text-gray-300">Crypto</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Checkout Slide Panel */}
        <AnimatePresence>
          {showCheckoutPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCheckoutPanel(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 border border-gray-600 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Checkout Information</h2>
                  <button
                    onClick={() => setShowCheckoutPanel(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Security Notice */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-green-400">Secure Checkout</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Your payment information is encrypted and secure. We never store your payment details.
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-gray-300">
                          <span>{item.product.name} × {item.quantity}</span>
                          <span>${((item.product.price / 100) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <hr className="border-gray-600" />
                      <div className="flex justify-between font-semibold text-white">
                        <span>Total</span>
                        <span className="text-purple-400">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Features */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">Instant download after payment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">Lifetime updates included</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">24/7 premium support</span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                      Complete Purchase
                    </button>
                    <button 
                      onClick={() => setShowCheckoutPanel(false)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 text-center">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </MinimalisticBackground>
  );
}