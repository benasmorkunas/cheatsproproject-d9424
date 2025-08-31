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
}

export default function TopSmokeEffect() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: SmokeParticle[] = [];
      
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: -50,
          size: Math.random() * 110 + 60,
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 18 + 15,
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      generateParticles();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-gray-400/20 via-gray-500/30 to-gray-600/20 blur-xl"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x - particle.size / 2,
            top: -particle.size,
          }}
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.4,
          }}
          animate={{
            y: window.innerHeight * 0.65,
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.4, 1, 1.4, 1.8],
            x: particle.x + (Math.random() - 0.5) * 250,
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
            times: [0, 0.12, 0.75, 1],
          }}
        />
      ))}
      
      {/* Top ambient layers */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-gray-700/10 to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-800/5 via-gray-600/3 to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
}