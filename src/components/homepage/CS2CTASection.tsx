'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CS2CTASection() {
  const router = useRouter();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call to Action Section */}
        <motion.div
          className="text-center pt-16 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              GET ALL PREMIUM BF6 FEATURES IN ONE PACKAGE
            </span>
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Don't choose between individual BF6 hacks. Get everything you need to dominate Battlefield 6 with our comprehensive undetected cheat package featuring aimbot, wallhack ESP, and advanced battlefield tools.
          </p>
          <motion.button
            className="bg-gradient-to-r from-white via-gray-300 to-gray-500 hover:from-gray-100 hover:via-gray-400 hover:to-gray-600 text-black px-12 py-4 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/products/bf6')}
          >
            Get Undetected BF6 Hacks
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}