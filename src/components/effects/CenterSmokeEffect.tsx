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
  direction: 'up' | 'down' | 'left' | 'right';
}

export default function CenterSmokeEffect() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: SmokeParticle[] = [];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      for (let i = 0; i < 16; i++) {
        const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        // Start particles from center area
        const startX = centerX + (Math.random() - 0.5) * 200;
        const startY = centerY + (Math.random() - 0.5) * 200;
        
        newParticles.push({
          id: Date.now() + i,
          x: startX,
          y: startY,
          size: Math.random() * 90 + 45,
          opacity: Math.random() * 0.2 + 0.06,
          duration: Math.random() * 15 + 12,
          direction,
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      generateParticles();
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => {
        let animateProps;
        
        switch (particle.direction) {
          case 'up':
            animateProps = {
              y: -window.innerHeight * 0.4,
              x: particle.x + (Math.random() - 0.5) * 150,
            };
            break;
          case 'down':
            animateProps = {
              y: window.innerHeight * 0.4,
              x: particle.x + (Math.random() - 0.5) * 150,
            };
            break;
          case 'left':
            animateProps = {
              x: -window.innerWidth * 0.3,
              y: particle.y + (Math.random() - 0.5) * 150,
            };
            break;
          case 'right':
            animateProps = {
              x: window.innerWidth * 0.3,
              y: particle.y + (Math.random() - 0.5) * 150,
            };
            break;
        }

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-gray-400/16 via-gray-500/24 to-gray-600/16 blur-xl"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              ...animateProps,
              opacity: [0, particle.opacity, particle.opacity, 0],
              scale: [0.2, 1, 1.5, 2],
            }}
            transition={{
              duration: particle.duration,
              ease: "easeOut",
              times: [0, 0.2, 0.7, 1],
            }}
          />
        );
      })}
      
      {/* Central ambient layer */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gray-700/10 to-transparent rounded-full"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional radial layers */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-gray-600/8 to-transparent rounded-full"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.3, 1],
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