'use client';

import { motion } from 'framer-motion';

interface MinimalisticBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function MinimalisticBackground({ 
  children, 
  className = "" 
}: MinimalisticBackgroundProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Base minimalistic dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0f0f0f] -z-50" />
      
      {/* Smoke dripping effect behind blur - rainy window aesthetic */}
      <div className="absolute inset-0 -z-40 overflow-hidden">
        {/* Smoke drips from top */}
        <div className="absolute top-0 left-0 right-0 h-screen">
          {/* Individual smoke drips across the width */}
          {Array.from({ length: 35 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0"
              style={{
                left: `${(i * 2.86) + (Math.random() * 2 - 1)}%`, // Distributed across width with slight randomness
                width: '2px',
                height: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            >
              {/* Main smoke drip trail */}
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{
                  background: `linear-gradient(180deg, 
                    rgba(255, 255, 255, 0.4) 0%,
                    rgba(240, 240, 240, 0.35) 10%,
                    rgba(220, 220, 220, 0.3) 20%,
                    rgba(200, 200, 200, 0.25) 35%,
                    rgba(180, 180, 180, 0.2) 50%,
                    rgba(160, 160, 160, 0.15) 65%,
                    rgba(140, 140, 140, 0.1) 80%,
                    rgba(120, 120, 120, 0.05) 90%,
                    transparent 100%
                  )`,
                }}
                animate={{
                  height: [0, `${40 + (i * 3) + Math.random() * 30}vh`],
                }}
                transition={{
                  duration: 2 + (i * 0.2),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
              
              {/* Drip droplet at the end */}
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(220,220,220,0.4) 50%, transparent 100%)`,
                  left: '-5px'
                }}
                animate={{
                  top: [`${35 + (i * 3) + Math.random() * 25}vh`, `${45 + (i * 3) + Math.random() * 35}vh`],
                  opacity: [0.8, 0.3],
                  scale: [1, 0.6]
                }}
                transition={{
                  duration: 2 + (i * 0.2),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.3 + 1.5
                }}
              />
            </motion.div>
          ))}
          
          {/* Wider background smoke columns for depth */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute top-0"
              style={{
                left: `${(i * 5.56) + 2.78}%`,
                width: '8px',
                opacity: 0.6
              }}
              animate={{
                height: [`${20 + Math.random() * 15}vh`, `${35 + Math.random() * 25}vh`],
              }}
              transition={{
                duration: 4 + (i * 0.5),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.8
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(180deg, 
                    rgba(255, 255, 255, 0.2) 0%,
                    rgba(200, 200, 200, 0.15) 30%,
                    rgba(160, 160, 160, 0.1) 60%,
                    transparent 100%
                  )`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Additional fine smoke streams for density */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`fine-${i}`}
              className="absolute top-0"
              style={{
                left: `${Math.random() * 100}%`,
                width: '1px',
                opacity: 0.4
              }}
              animate={{
                height: [`${Math.random() * 20}vh`, `${Math.random() * 40 + 30}vh`],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(180deg, 
                    rgba(255, 255, 255, 0.3) 0%,
                    rgba(220, 220, 220, 0.2) 40%,
                    rgba(180, 180, 180, 0.1) 70%,
                    transparent 100%
                  )`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Heavy emission areas with concentrated smoke */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`heavy-${i}`}
              className="absolute top-0"
              style={{
                left: `${i * 12.5 + Math.random() * 10}%`,
                width: '20px',
                opacity: 0.7
              }}
              animate={{
                height: [`${40 + Math.random() * 20}vh`, `${60 + Math.random() * 30}vh`],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.4
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(180deg, 
                    rgba(255, 255, 255, 0.25) 0%,
                    rgba(240, 240, 240, 0.2) 20%,
                    rgba(200, 200, 200, 0.15) 40%,
                    rgba(160, 160, 160, 0.1) 60%,
                    rgba(120, 120, 120, 0.05) 80%,
                    transparent 100%
                  )`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Rainy window blur effect overlay */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.02) 0%,
                rgba(240, 240, 240, 0.01) 50%,
                transparent 100%
              )
            `,
            backdropFilter: 'blur(80px) saturate(1.2)',
            filter: 'contrast(1.1) brightness(1.05)',
          }}
        />
        
        {/* Additional glass texture overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='glassNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23glassNoise)' opacity='0.08'/%3E%3C/svg%3E")`,
            backdropFilter: 'blur(120px)',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}