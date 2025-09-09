'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  opacity?: number;
  sizeMultiplier?: number;
  speedMultiplier?: number;
  customColors?: string[];
}

export default function FloatingParticles({ 
  count = 38, 
  className = "",
  opacity = 1,
  sizeMultiplier = 3,
  speedMultiplier = 1,
  customColors
}: FloatingParticlesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      let color = 'rgba(255,255,255';
      if (customColors && customColors.length > 0) {
        // Interpolate between custom colors based on particle index
        const colorIndex = Math.abs(Math.sin(i * 1.4)) * (customColors.length - 1);
        const baseColorIndex = Math.floor(colorIndex);
        const nextColorIndex = Math.min(baseColorIndex + 1, customColors.length - 1);
        const t = colorIndex - baseColorIndex;
        
        const baseColor = customColors[baseColorIndex];
        const nextColor = customColors[nextColorIndex];
        
        // Simple color interpolation
        const baseR = parseInt(baseColor.slice(1, 3), 16);
        const baseG = parseInt(baseColor.slice(3, 5), 16);
        const baseB = parseInt(baseColor.slice(5, 7), 16);
        
        const nextR = parseInt(nextColor.slice(1, 3), 16);
        const nextG = parseInt(nextColor.slice(3, 5), 16);
        const nextB = parseInt(nextColor.slice(5, 7), 16);
        
        const r = Math.round(baseR + (nextR - baseR) * t);
        const g = Math.round(baseG + (nextG - baseG) * t);
        const b = Math.round(baseB + (nextB - baseB) * t);
        
        color = `rgba(${r},${g},${b}`;
      }
      
      return {
        id: i,
        left: (Math.sin(i * 2.3) * 0.5 + 0.5) * 100,
        top: (Math.cos(i * 1.7) * 0.5 + 0.5) * 100,
        size: (1 + Math.abs(Math.sin(i * 1.1)) * 3) * sizeMultiplier,
        duration: (8 + Math.abs(Math.sin(i * 2.1)) * 12) / speedMultiplier,
        delay: Math.abs(Math.sin(i * 3.7)) * 10,
        opacity: (0.1 + Math.abs(Math.sin(i * 1.9)) * 0.3) * opacity,
        color: color,
      };
    });
  }, [count, opacity, sizeMultiplier, speedMultiplier, customColors]);

  if (!isClient) return null;

  return (
    <div className={`absolute inset-0 -z-35 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color},${particle.opacity}) 0%, ${particle.color},${particle.opacity * 0.7}) 50%, transparent 100%)`,
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
  );
}