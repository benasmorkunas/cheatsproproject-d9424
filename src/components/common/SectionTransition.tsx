'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface SectionTransitionProps {
  showScrollHint?: boolean;
}

export default function SectionTransition({ showScrollHint = false }: SectionTransitionProps) {
  return (
    <div className="relative h-16 overflow-hidden">
      {showScrollHint && (
        <motion.div
          className="absolute left-1/2 bottom-8 transform -translate-x-1/2"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <ChevronDown className="w-5 h-5 text-gray-400/70" />
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">Scroll</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}