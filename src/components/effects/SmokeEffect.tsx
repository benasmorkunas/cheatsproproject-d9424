'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
  driftX: number;
  driftXEnd: number;
  rotation: number;
  rotationEnd: number;
  driftDuration: number;
}

export default function SmokeEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer for performance
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Create particle
  const createParticle = useCallback((): Particle => {
    const baseWidth = Math.random() * 80 + 60; // 60-140px width
    const aspectRatio = 0.6 + Math.random() * 0.8; // 0.6-1.4 aspect ratio
    
    return {
      id: `particle-${Date.now()}-${Math.random()}`,
      x: Math.random() * 40 + 30, // Start from center-right area (30-70%)
      y: 0, // Start at top of viewport
      width: baseWidth,
      height: baseWidth * aspectRatio,
      duration: Math.random() * 8000 + 18000, // 18-26s
      driftX: (Math.random() - 0.5) * 40, // -20 to 20px mid drift
      driftXEnd: (Math.random() - 0.5) * 120, // -60 to 60px end drift
      rotation: Math.random() * 90, // 0-90deg mid rotation
      rotationEnd: Math.random() * 180 + 90, // 90-270deg end rotation
      driftDuration: Math.random() * 4000 + 6000, // 6-10s drift cycle
    };
  }, []);

  // Spawn particles
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setParticles([]);
      return;
    }

    intervalRef.current = setInterval(() => {
      setParticles(current => {
        // Remove expired particles
        const now = Date.now();
        const active = current.filter(p => {
          const age = now - parseInt(p.id.split('-')[1]);
          return age < p.duration;
        });

        // Add multiple particles if under limit for denser emission
        const particlesToAdd = [];
        const maxParticles = 12;
        
        if (active.length < maxParticles) {
          // Add 1-2 particles per interval for denser smoke
          const particleCount = Math.random() > 0.5 ? 2 : 1;
          for (let i = 0; i < particleCount && active.length + particlesToAdd.length < maxParticles; i++) {
            particlesToAdd.push(createParticle());
          }
        }
        
        return [...active, ...particlesToAdd];
      });
    }, 1500); // Spawn every 1.5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, prefersReducedMotion, createParticle]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -20 }}
      aria-hidden="true"
    >
      {/* Smoke particles behind everything */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="smoke-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            '--duration': `${particle.duration}ms`,
            '--drift-x': `${particle.driftX}px`,
            '--drift-x-end': `${particle.driftXEnd}px`,
            '--rotation': `${particle.rotation}deg`,
            '--rotation-end': `${particle.rotationEnd}deg`,
            '--drift-duration': `${particle.driftDuration}ms`,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Backdrop blur layer on top of smoke */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{ zIndex: -15 }}
      />
    </div>
  );
}