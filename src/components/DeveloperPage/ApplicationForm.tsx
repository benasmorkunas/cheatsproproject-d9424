'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Target, Send, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface FormData {
  // Step 1
  name: string;
  email: string;
  location: string;
  portfolio: string;
  
  // Step 2
  experience: string;
  languages: string[];
  gameDevExperience: string;
  availableHours: string;
  
  // Step 3
  interests: string[];
  favoriteGames: string;
  cheatExperience: string;
  
  // Step 4
  motivation: string;
  availability: string;
  compensation: string;
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    location: '',
    portfolio: '',
    experience: '',
    languages: [],
    gameDevExperience: '',
    availableHours: '',
    interests: [],
    favoriteGames: '',
    cheatExperience: '',
    motivation: '',
    availability: '',
    compensation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Info', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Technical Background', icon: <Code className="w-5 h-5" /> },
    { number: 3, title: 'Specialization', icon: <Target className="w-5 h-5" /> },
    { number: 4, title: 'Final Details', icon: <Send className="w-5 h-5" /> }
  ];

  const programmingLanguages = [
    'C++', 'Python', 'JavaScript', 'TypeScript', 'C#', 'Rust', 'Assembly', 'Go'
  ];

  const specializations = [
    'Game Hacking', 'Anti-Detection', 'UI/UX Development', 'Backend Systems',
    'Memory Management', 'Network Programming', 'Game Engine Development'
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
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (formData.languages.length === 0) newErrors.languages = 'Select at least one language';
        if (!formData.availableHours) newErrors.availableHours = 'Available hours is required';
        break;
      case 3:
        if (formData.interests.length === 0) newErrors.interests = 'Select at least one area of interest';
        break;
      case 4:
        if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
        if (!formData.availability) newErrors.availability = 'Availability is required';
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
    alert('Application submitted successfully!');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayValue = (field: 'languages' | 'interests', value: string) => {
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location/Timezone
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., EST, GMT+2, New York"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Portfolio/GitHub Profile
              </label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={(e) => updateFormData('portfolio', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="https://github.com/yourprofile"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Years of Development Experience *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select experience level</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Programming Languages *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {programmingLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleArrayValue('languages', lang)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                      formData.languages.includes(lang)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              {errors.languages && <p className="text-red-400 text-sm mt-1">{errors.languages}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Game Development Experience
              </label>
              <textarea
                value={formData.gameDevExperience}
                onChange={(e) => updateFormData('gameDevExperience', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe any game development or modding experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Available Hours per Week *
              </label>
              <select
                value={formData.availableHours}
                onChange={(e) => updateFormData('availableHours', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select availability</option>
                <option value="10-20">10-20 hours</option>
                <option value="20-30">20-30 hours</option>
                <option value="30-40">30-40 hours</option>
                <option value="40+">40+ hours</option>
              </select>
              {errors.availableHours && <p className="text-red-400 text-sm mt-1">{errors.availableHours}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Areas of Interest *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleArrayValue('interests', spec)}
                    className={`px-4 py-3 rounded-lg border text-left font-medium transition-all duration-300 ${
                      formData.interests.includes(spec)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              {errors.interests && <p className="text-red-400 text-sm mt-1">{errors.interests}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Favorite Games
              </label>
              <input
                type="text"
                value={formData.favoriteGames}
                onChange={(e) => updateFormData('favoriteGames', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., CS:GO, Valorant, Apex Legends"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Previous Cheat/Mod Development Experience
              </label>
              <textarea
                value={formData.cheatExperience}
                onChange={(e) => updateFormData('cheatExperience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe any previous experience with game modifications, cheats, or related tools..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Why do you want to join our team? *
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Share your motivation and what excites you about this opportunity..."
              />
              {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Availability to Start *
              </label>
              <select
                value={formData.availability}
                onChange={(e) => updateFormData('availability', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select availability</option>
                <option value="immediately">Immediately</option>
                <option value="2weeks">Within 2 weeks</option>
                <option value="1month">Within 1 month</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.availability && <p className="text-red-400 text-sm mt-1">{errors.availability}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Compensation Expectations
              </label>
              <input
                type="text"
                value={formData.compensation}
                onChange={(e) => updateFormData('compensation', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., $50/hour, $5000/month, negotiable"
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
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Apply Now
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Ready to join our elite development team? Let's get started.
          </p>
        </motion.div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
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
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
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
              className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            {currentStep < 4 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300"
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