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
  origin: 'bottom' | 'left' | 'right';
}

export default function BottomSideSmokeEffect() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: SmokeParticle[] = [];
      
      for (let i = 0; i < 15; i++) {
        const origins: ('bottom' | 'left' | 'right')[] = ['bottom', 'left', 'right'];
        const origin = origins[Math.floor(Math.random() * origins.length)];
        
        let x, y;
        switch (origin) {
          case 'bottom':
            x = Math.random() * window.innerWidth;
            y = window.innerHeight + 50;
            break;
          case 'left':
            x = -50;
            y = window.innerHeight * 0.3 + Math.random() * (window.innerHeight * 0.4);
            break;
          case 'right':
            x = window.innerWidth + 50;
            y = window.innerHeight * 0.3 + Math.random() * (window.innerHeight * 0.4);
            break;
        }
        
        newParticles.push({
          id: Date.now() + i,
          x,
          y,
          size: Math.random() * 110 + 55,
          opacity: Math.random() * 0.22 + 0.08,
          duration: Math.random() * 16 + 14,
          origin,
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
      {particles.map((particle) => {
        let animateProps;
        let initialPosition;
        
        switch (particle.origin) {
          case 'bottom':
            initialPosition = { bottom: -particle.size, left: particle.x };
            animateProps = {
              y: -window.innerHeight * 0.7,
              x: particle.x + (Math.random() - 0.5) * 250,
            };
            break;
          case 'left':
            initialPosition = { left: -particle.size, top: particle.y - particle.size / 2 };
            animateProps = {
              x: window.innerWidth * 0.35,
              y: particle.y + (Math.random() - 0.5) * 120,
            };
            break;
          case 'right':
            initialPosition = { left: window.innerWidth, top: particle.y - particle.size / 2 };
            animateProps = {
              x: -window.innerWidth * 0.35,
              y: particle.y + (Math.random() - 0.5) * 120,
            };
            break;
        }

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-gray-400/18 via-gray-500/28 to-gray-600/18 blur-xl"
            style={{
              width: particle.size,
              height: particle.size,
              ...initialPosition,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              ...animateProps,
              opacity: [0, particle.opacity, particle.opacity, 0],
              scale: [0.4, 1, 1.4, 1.9],
            }}
            transition={{
              duration: particle.duration,
              ease: "easeOut",
              times: [0, 0.12, 0.75, 1],
            }}
          />
        );
      })}
      
      {/* Bottom ambient layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-gray-700/12 to-transparent"
        animate={{
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Side ambient layers */}
      <motion.div
        className="absolute left-0 top-1/3 bottom-1/3 w-72 bg-gradient-to-r from-gray-700/8 to-transparent"
        animate={{
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute right-0 top-1/3 bottom-1/3 w-72 bg-gradient-to-l from-gray-700/8 to-transparent"
        animate={{
          opacity: [0.12, 0.28, 0.12],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}