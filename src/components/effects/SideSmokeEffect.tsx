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

export default function SideSmokeEffect() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: SmokeParticle[] = [];
      
      for (let i = 0; i < 12; i++) {
        const fromLeft = Math.random() > 0.5;
        newParticles.push({
          id: Date.now() + i,
          x: fromLeft ? -50 : window.innerWidth + 50,
          y: window.innerHeight * 0.3 + Math.random() * (window.innerHeight * 0.4),
          size: Math.random() * 100 + 50,
          opacity: Math.random() * 0.5 + 0.25,
          duration: Math.random() * 18 + 12,
          fromLeft,
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      generateParticles();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-gray-200/30 via-gray-300/40 to-gray-400/20 blur-lg"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.fromLeft ? -particle.size : window.innerWidth,
            top: particle.y - particle.size / 2,
          }}
          initial={{
            x: 0,
            opacity: 0,
            scale: 0.3,
          }}
          animate={{
            x: particle.fromLeft ? window.innerWidth * 0.4 : -window.innerWidth * 0.4,
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.3, 1, 1.3, 1.8],
            y: 0,
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
            times: [0, 0.15, 0.4, 1],
          }}
        />
      ))}
      
      {/* Ambient side layers - strictly horizontal */}
      <motion.div
        className="absolute left-0 top-1/3 h-1/3 w-80 bg-gradient-to-r from-gray-200/12 to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute right-0 top-1/3 h-1/3 w-80 bg-gradient-to-l from-gray-200/12 to-transparent"
        animate={{
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
}