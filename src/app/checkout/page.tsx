'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

function CheckoutContent() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderData, setOrderData] = useState<any>(null);

  // Load existing order if orderId is provided
  useEffect(() => {
    if (orderId) {
      fetchOrderData(orderId);
    }
  }, [orderId]);

  const fetchOrderData = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (response.ok) {
        const result = await response.json();
        setOrderData(result.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Email is invalid';
    
    if (!customerInfo.firstName) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!customerInfo.address.line1) newErrors.addressLine1 = 'Address is required';
    if (!customerInfo.address.city) newErrors.city = 'City is required';
    if (!customerInfo.address.state) newErrors.state = 'State is required';
    if (!customerInfo.address.postalCode) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Use cart items since orderData.items is removed
    const currentItems = items;
    const currentTotal = orderData?.amount ? orderData.amount / 100 : total;
    
    if (currentItems.length === 0) return;

    setIsProcessing(true);

    try {
      if (orderId && orderData) {
        // Update existing order with customer information
        const updatedOrderData = {
          ...orderData,
          customerInfo,
          status: 'completed',
          metadata: {
            ...orderData.metadata,
            customer_email: customerInfo.email,
            customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          },
          completedAt: new Date().toISOString()
        };

        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedOrderData),
        });

        if (response.ok) {
          clearCart();
          router.push(`/thank-you?order=${orderId}`);
        } else {
          throw new Error('Failed to update order');
        }
      } else {
        // Create new order (fallback for direct checkout access)
        const newOrderId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newOrderData = {
          amount: Math.round(currentTotal * 100), // Convert to cents
          currency: 'usd',
          automatic_payment_methods: { enabled: true },
          metadata: {
            product_id: currentItems[0].product.id,
            customer_email: customerInfo.email,
            order_id: newOrderId,
            customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            products: JSON.stringify(currentItems.map((item: any) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity
            })))
          },
          customerInfo,
          timestamp: new Date().toISOString(),
          status: 'completed'
        };

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrderData),
        });

        if (response.ok) {
          clearCart();
          router.push('/thank-you');
        } else {
          throw new Error('Failed to create order');
        }
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Use cart items for display since orderData.items is removed
  const displayItems = items;
  const displayTotal = orderData?.amount ? orderData.amount / 100 : total;

  if (displayItems.length === 0 && !orderData) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add some products to your cart before checking out.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customer Information Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Customer Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder="Last Name"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Billing Address</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address.line1}
                    onChange={(e) => setCustomerInfo({
                      ...customerInfo,
                      address: {...customerInfo.address, line1: e.target.value}
                    })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder="123 Main Street"
                  />
                  {errors.addressLine1 && <p className="text-red-400 text-sm mt-1">{errors.addressLine1}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address.line2 || ''}
                    onChange={(e) => setCustomerInfo({
                      ...customerInfo,
                      address: {...customerInfo.address, line2: e.target.value}
                    })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address.city}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo,
                        address: {...customerInfo.address, city: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address.state}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo,
                        address: {...customerInfo.address, state: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                      placeholder="State"
                    />
                    {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address.postalCode}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo,
                        address: {...customerInfo.address, postalCode: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                      placeholder="12345"
                    />
                    {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      value={customerInfo.address.country}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo,
                        address: {...customerInfo.address, country: e.target.value}
                      })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {displayItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                  <img
                    src={item.product.image || '/images/default-product.png'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.product.name}</h3>
                    <p className="text-gray-400 text-sm">{item.product.description.replace(/<[^>]*>/g, '')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-300">Qty: {item.quantity}</span>
                      <span className="text-white font-semibold">
                        ${(item.product.price / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white border-t border-gray-700 pt-2">
                <span>Total</span>
                <span>${displayTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isProcessing || displayItems.length === 0}
              className="w-full mt-8 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{orderId ? 'Updating Order...' : 'Processing Order...'}</span>
                </div>
              ) : (
                `Complete Order - $${displayTotal.toFixed(2)}`
              )}
            </button>

            <div className="mt-6 flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}