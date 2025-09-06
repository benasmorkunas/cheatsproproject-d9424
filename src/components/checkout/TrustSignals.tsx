'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  CreditCard, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  Award,
  Headphones,
  RefreshCw,
  Zap
} from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    title: 'SSL Secured',
    description: '256-bit encryption',
    color: 'text-green-400'
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description: 'GDPR compliant',
    color: 'text-gray-400'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'PCI DSS certified',
    color: 'text-gray-400'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Verified & tested',
    color: 'text-yellow-400'
  }
];

const features = [
  {
    icon: CheckCircle,
    title: 'Buy Now, Pay Later with Klarna',
    description: 'Pay in 4 installments - no interest, no fees when you pay on time',
    color: 'text-pink-400'
  },
  {
    icon: Zap,
    title: 'Instant Download',
    description: 'Get your cheats immediately after payment',
    color: 'text-yellow-400'
  },
  {
    icon: RefreshCw,
    title: 'Lifetime Updates',
    description: 'Free updates for all future game versions',
    color: 'text-gray-400'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert support whenever you need help',
    color: 'text-green-400'
  }
];

const testimonials = [
  {
    name: 'Alex M.',
    rating: 5,
    comment: 'Amazing cheats, work perfectly! Customer support is top-notch.',
    verified: true,
    timeAgo: '2 days ago'
  },
  {
    name: 'Sarah K.',
    rating: 5,
    comment: 'Best gaming experience ever. Instant delivery and easy setup.',
    verified: true,
    timeAgo: '1 week ago'
  },
  {
    name: 'Mike R.',
    rating: 5,
    comment: 'Undetected and reliable. Worth every penny!',
    verified: true,
    timeAgo: '3 days ago'
  }
];

const stats = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '99.9%', label: 'Uptime' },
  { number: '4.9/5', label: 'Average Rating' },
  { number: '24/7', label: 'Support Available' }
];

export default function TrustSignals() {
  return (
    <div className="space-y-6">
      {/* Security Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Shield className="w-5 h-5 text-green-400 mr-2" />
          Secure & Trusted
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg"
              >
                <IconComponent className={`w-6 h-6 ${badge.color}`} />
                <div>
                  <p className="text-white text-sm font-medium">{badge.title}</p>
                  <p className="text-gray-400 text-xs">{badge.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>





      {/* Support Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-gradient-to-r from-gray-600/10 to-gray-700/10 border border-gray-500/20 rounded-2xl p-6"
      >
        <div className="text-center">
          <Clock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-gray-300 text-sm mb-4">
            Our expert support team is available 24/7 to assist you with any questions or issues.
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Support Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Avg. response: 5 min</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}