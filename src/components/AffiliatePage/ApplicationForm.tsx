'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Target, Megaphone, Send, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface FormData {
  // Step 1
  name: string;
  email: string;
  country: string;
  website: string;
  socialHandles: string;
  
  // Step 2
  trafficSources: string[];
  monthlyReach: string;
  affiliateExperience: string;
  contentExperience: string;
  
  // Step 3
  promotionPlan: string;
  targetAudience: string;
  contentTypes: string[];
  promotionMethods: string[];
  
  // Step 4
  motivation: string;
  monthlyVolume: string;
  paymentMethod: string;
  additionalInfo: string;
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    country: '',
    website: '',
    socialHandles: '',
    trafficSources: [],
    monthlyReach: '',
    affiliateExperience: '',
    contentExperience: '',
    promotionPlan: '',
    targetAudience: '',
    contentTypes: [],
    promotionMethods: [],
    motivation: '',
    monthlyVolume: '',
    paymentMethod: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Info', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Marketing Background', icon: <Target className="w-5 h-5" /> },
    { number: 3, title: 'Promotion Strategy', icon: <Megaphone className="w-5 h-5" /> },
    { number: 4, title: 'Final Details', icon: <Send className="w-5 h-5" /> }
  ];

  const trafficSourceOptions = [
    'YouTube Channel', 'Twitch Stream', 'Discord Server', 'Gaming Forum', 
    'Instagram', 'Twitter', 'TikTok', 'Personal Website/Blog', 'Reddit Communities'
  ];

  const contentTypeOptions = [
    'Gaming Videos', 'Live Streams', 'Reviews', 'Tutorials', 
    'Social Media Posts', 'Blog Articles', 'Community Posts'
  ];

  const promotionMethodOptions = [
    'Product Reviews', 'Sponsored Content', 'Banner Ads', 'Email Marketing',
    'Social Media Promotion', 'Community Engagement', 'Video Sponsorships'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;
      case 2:
        if (formData.trafficSources.length === 0) newErrors.trafficSources = 'Select at least one traffic source';
        if (!formData.monthlyReach) newErrors.monthlyReach = 'Monthly reach is required';
        break;
      case 3:
        if (!formData.promotionPlan.trim()) newErrors.promotionPlan = 'Promotion plan is required';
        if (formData.contentTypes.length === 0) newErrors.contentTypes = 'Select at least one content type';
        break;
      case 4:
        if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Affiliate application submitted successfully! We\'ll review your application and get back to you within 48 hours.');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayValue = (field: keyof Pick<FormData, 'trafficSources' | 'contentTypes' | 'promotionMethods'>, value: string) => {
    const currentArray = formData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFormData(field, newArray);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country/Region
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., United States, Canada, Germany"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website/Portfolio
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Social Media Handles
              </label>
              <textarea
                value={formData.socialHandles}
                onChange={(e) => updateFormData('socialHandles', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="List your social media profiles (YouTube, Twitch, Instagram, etc.)"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary Traffic Sources *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trafficSourceOptions.map((source) => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => toggleArrayValue('trafficSources', source)}
                    className={`px-4 py-3 rounded-lg border text-left font-medium transition-all duration-300 ${
                      formData.trafficSources.includes(source)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-black/30 border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
              {errors.trafficSources && <p className="text-red-400 text-sm mt-1">{errors.trafficSources}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monthly Audience Reach *
              </label>
              <select
                value={formData.monthlyReach}
                onChange={(e) => updateFormData('monthlyReach', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select your reach</option>
                <option value="under-1k">Under 1,000</option>
                <option value="1k-5k">1,000 - 5,000</option>
                <option value="5k-10k">5,000 - 10,000</option>
                <option value="10k-50k">10,000 - 50,000</option>
                <option value="50k-100k">50,000 - 100,000</option>
                <option value="100k+">100,000+</option>
              </select>
              {errors.monthlyReach && <p className="text-red-400 text-sm mt-1">{errors.monthlyReach}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Previous Affiliate Experience
              </label>
              <textarea
                value={formData.affiliateExperience}
                onChange={(e) => updateFormData('affiliateExperience', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe any previous affiliate marketing experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content Creation Experience
              </label>
              <textarea
                value={formData.contentExperience}
                onChange={(e) => updateFormData('contentExperience', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell us about your content creation background..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How do you plan to promote our products? *
              </label>
              <textarea
                value={formData.promotionPlan}
                onChange={(e) => updateFormData('promotionPlan', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe your promotion strategy and approach..."
              />
              {errors.promotionPlan && <p className="text-red-400 text-sm mt-1">{errors.promotionPlan}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Gaming Communities/Audiences
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => updateFormData('targetAudience', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., CS:GO players, FPS enthusiasts, competitive gamers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content Types You Create *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentTypeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayValue('contentTypes', type)}
                    className={`px-4 py-3 rounded-lg border text-left font-medium transition-all duration-300 ${
                      formData.contentTypes.includes(type)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-black/30 border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.contentTypes && <p className="text-red-400 text-sm mt-1">{errors.contentTypes}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Promotional Methods
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {promotionMethodOptions.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => toggleArrayValue('promotionMethods', method)}
                    className={`px-4 py-3 rounded-lg border text-left font-medium transition-all duration-300 ${
                      formData.promotionMethods.includes(method)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-black/30 border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Why do you want to partner with cheats-pro? *
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell us what interests you about our affiliate program..."
              />
              {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expected Monthly Promotion Volume
              </label>
              <select
                value={formData.monthlyVolume}
                onChange={(e) => updateFormData('monthlyVolume', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select expected volume</option>
                <option value="low">Low (1-10 referrals/month)</option>
                <option value="medium">Medium (11-50 referrals/month)</option>
                <option value="high">High (51-100 referrals/month)</option>
                <option value="very-high">Very High (100+ referrals/month)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Payment Method *
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select payment method</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="bank">Bank Transfer</option>
                <option value="other">Other (specify in comments)</option>
              </select>
              {errors.paymentMethod && <p className="text-red-400 text-sm mt-1">{errors.paymentMethod}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                placeholder="Any questions or additional information you'd like to share..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="application-form" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              Apply for Partnership
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Ready to start earning premium commissions? Let's get you set up as an affiliate partner.
          </p>
        </motion.div>

        <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep > step.number
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? <Check className="w-6 h-6" /> : step.icon}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className={`text-xs ${
                    currentStep >= step.number ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-600 mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/30 rounded-full h-2 mb-8">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-black/30 text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            {currentStep < 4 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-300"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium disabled:opacity-50 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}