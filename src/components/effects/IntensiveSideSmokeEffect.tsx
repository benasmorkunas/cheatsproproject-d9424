'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  fromLeft: boolean;
}

export default function IntensiveSideSmokeEffect() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: SmokeParticle[] = [];
      
      // Generate more particles for intensive effect
      for (let i = 0; i < 20; i++) {
        const fromLeft = Math.random() > 0.5;
        newParticles.push({
          id: Date.now() + i,
          x: fromLeft ? -60 : window.innerWidth + 60,
          y: window.innerHeight * 0.25 + Math.random() * (window.innerHeight * 0.5),
          size: Math.random() * 130 + 70,
          opacity: Math.random() * 0.35 + 0.1,
          duration: Math.random() * 22 + 18,
          fromLeft,
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    // Longer refresh interval for more intensive effect
    const interval = setInterval(() => {
      generateParticles();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-gray-400/25 via-gray-500/35 to-gray-600/25 blur-xl"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.fromLeft ? -particle.size : window.innerWidth,
            top: particle.y - particle.size / 2,
          }}
          initial={{
            x: 0,
            opacity: 0,
            scale: 0.2,
          }}
          animate={{
            x: particle.fromLeft ? window.innerWidth * 0.45 : -window.innerWidth * 0.45,
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.2, 1, 1.5, 2.2],
            y: 0, // Keep strictly horizontal
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
            times: [0, 0.15, 0.7, 1],
          }}
        />
      ))}
      
      {/* Intensive ambient side layers */}
      <motion.div
        className="absolute left-0 top-1/4 h-1/2 w-96 bg-gradient-to-r from-gray-700/12 to-transparent"
        animate={{
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute right-0 top-1/4 h-1/2 w-96 bg-gradient-to-l from-gray-700/12 to-transparent"
        animate={{
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Additional intensive layers */}
      <motion.div
        className="absolute left-0 top-1/3 h-1/3 w-80 bg-gradient-to-r from-gray-600/8 to-transparent"
        animate={{
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute right-0 top-1/3 h-1/3 w-80 bg-gradient-to-l from-gray-600/8 to-transparent"
        animate={{
          opacity: [0.12, 0.32, 0.12],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
}