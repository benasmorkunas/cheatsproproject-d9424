'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'ProGamer_2024',
    rating: 5,
    comment: 'These CS2 cheats are absolutely insane! Been using for 3 months with zero detections. Customer support is top-notch too!',
    verified: true,
    timeAgo: '2 days ago'
  },
  {
    name: 'VeteranPlayer',
    rating: 5,
    comment: 'Been through many cheat providers, but cheats-pro is different. Professional quality, regular updates, and the community is amazing.',
    verified: true,
    timeAgo: '1 week ago'
  },
  {
    name: 'QuickScope99',
    rating: 5,
    comment: 'Installation was super easy (literally 3 minutes) and everything works perfectly. You can make it as subtle or obvious as you want.',
    verified: true,
    timeAgo: '3 days ago'
  }
];

export default function CustomerReviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Star className="w-5 h-5 text-yellow-400 mr-2" />
        Customer Reviews
      </h3>
      
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-4 bg-black/20 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{testimonial.name}</p>
                  {testimonial.verified && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">Verified</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-2">{testimonial.comment}</p>
            <p className="text-gray-500 text-xs">{testimonial.timeAgo}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-1 mb-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          4.9 out of 5 based on 230+ reviews
        </p>
      </div>
    </motion.div>
  );
}