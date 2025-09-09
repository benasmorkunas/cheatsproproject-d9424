'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

interface MinimalisticBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function MinimalisticBackground({ 
  children, 
  className = "" 
}: MinimalisticBackgroundProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate consistent random values for server and client
  const smokeData = useMemo(() => {
    const mainDrips = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      leftOffset: (i * 2.86) + (Math.sin(i * 0.7) * 2 - 1),
      height: 40 + (i * 3) + Math.sin(i * 1.2) * 30,
      dropletTop: 35 + (i * 3) + Math.sin(i * 0.9) * 25,
      dropletEnd: 45 + (i * 3) + Math.sin(i * 1.1) * 35,
    }));

    const fineStreams = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: (Math.sin(i * 2.3) * 0.5 + 0.5) * 100,
      startHeight: Math.abs(Math.sin(i * 1.8)) * 20,
      endHeight: Math.abs(Math.sin(i * 2.1)) * 40 + 30,
      duration: 3 + Math.abs(Math.sin(i * 1.5)) * 4,
      delay: Math.abs(Math.sin(i * 3.2)) * 5,
    }));

    const heavyAreas = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: i * 12.5 + Math.abs(Math.sin(i * 1.4)) * 10,
      startHeight: 40 + Math.abs(Math.sin(i * 2.2)) * 20,
      endHeight: 60 + Math.abs(Math.sin(i * 1.9)) * 30,
      duration: 2 + Math.abs(Math.sin(i * 2.5)) * 3,
    }));

    const bgColumns = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      startHeight: 20 + Math.abs(Math.sin(i * 1.6)) * 15,
      endHeight: 35 + Math.abs(Math.sin(i * 2.4)) * 25,
    }));

    // Add floating particles throughout the website - use deterministic values to avoid hydration mismatch
    const floatingParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: (Math.sin(i * 2.3) * 0.5 + 0.5) * 100,
      top: (Math.cos(i * 1.7) * 0.5 + 0.5) * 100,
      size: 1 + Math.abs(Math.sin(i * 1.1)) * 3,
      duration: 8 + Math.abs(Math.sin(i * 2.1)) * 12,
      delay: Math.abs(Math.sin(i * 3.7)) * 10,
      opacity: 0.1 + Math.abs(Math.sin(i * 1.9)) * 0.3,
    }));

    return { mainDrips, fineStreams, heavyAreas, bgColumns, floatingParticles };
  }, []);
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Base minimalistic dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0f0f0f] -z-50" />
      
      {/* Smoke dripping effect behind blur - rainy window aesthetic */}
      <div className="absolute inset-0 -z-40 overflow-hidden">
        {/* Smoke drips from top */}
        <div className="absolute top-0 left-0 right-0 h-screen">
          {/* Individual smoke drips across the width */}
          {smokeData.mainDrips.map((drip) => (
            <motion.div
              key={drip.id}
              className="absolute top-0"
              style={{
                left: `${drip.leftOffset}%`,
                width: '2px',
                height: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: drip.id * 0.1 }}
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
                  height: [0, `${drip.height}vh`],
                }}
                transition={{
                  duration: 2 + (drip.id * 0.2),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: drip.id * 0.3
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
                  top: [`${drip.dropletTop}vh`, `${drip.dropletEnd}vh`],
                  opacity: [0.8, 0.3],
                  scale: [1, 0.6]
                }}
                transition={{
                  duration: 2 + (drip.id * 0.2),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: drip.id * 0.3 + 1.5
                }}
              />
            </motion.div>
          ))}
          
          {/* Wider background smoke columns for depth */}
          {smokeData.bgColumns.map((col, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute top-0"
              style={{
                left: `${(i * 5.56) + 2.78}%`,
                width: '8px',
                opacity: 0.6
              }}
              animate={{
                height: [`${col.startHeight}vh`, `${col.endHeight}vh`],
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
          {smokeData.fineStreams.map((stream) => (
            <motion.div
              key={`fine-${stream.id}`}
              className="absolute top-0"
              style={{
                left: `${stream.left}%`,
                width: '1px',
                opacity: 0.4
              }}
              animate={{
                height: [`${stream.startHeight}vh`, `${stream.endHeight}vh`],
              }}
              transition={{
                duration: stream.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: stream.delay
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
          {smokeData.heavyAreas.map((area, i) => (
            <motion.div
              key={`heavy-${i}`}
              className="absolute top-0"
              style={{
                left: `${area.left}%`,
                width: '20px',
                opacity: 0.7
              }}
              animate={{
                height: [`${area.startHeight}vh`, `${area.endHeight}vh`],
              }}
              transition={{
                duration: area.duration,
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

      {/* Floating particles throughout the website */}
      {isClient && (
        <div className="absolute inset-0 -z-35 overflow-hidden pointer-events-none">
          {smokeData.floatingParticles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, rgba(240,240,240,${particle.opacity * 0.7}) 50%, transparent 100%)`,
            }}
            animate={{
              x: [0, Math.sin(particle.id) * 50, 0],
              y: [0, Math.cos(particle.id) * 30, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
        </div>
      )}
      
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