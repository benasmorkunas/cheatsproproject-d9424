'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface SmokeParticle {
  id: string;
  x: number;
  y: number;
  driftX: number;
  scale: number;
  duration: number;
  delay: number;
}

interface SmokeEmitterProps {
  className?: string;
  disabled?: boolean;
}

export default function SmokeEmitter({ className = '', disabled = false }: SmokeEmitterProps) {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleCountRef = useRef(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for performance
  useEffect(() => {
    if (!containerRef.current || disabled || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [disabled, prefersReducedMotion]);

  // Create new particle
  const createParticle = useCallback((): SmokeParticle => {
    const id = `particle-${Date.now()}-${Math.random()}`;
    const x = Math.random() * 100; // 0-100% of container width
    const y = Math.random() * 10 + 5; // 5-15% from top
    const driftX = (Math.random() - 0.5) * 40; // -20 to 20px drift
    const scale = Math.random() * 0.5 + 0.8; // 0.8-1.3 scale
    const duration = Math.random() * 5000 + 15000; // 15-20 seconds
    const delay = Math.random() * 1000; // 0-1 second delay

    return {
      id,
      x,
      y,
      driftX,
      scale,
      duration,
      delay
    };
  }, []);

  // Spawn particles
  useEffect(() => {
    if (!isVisible || disabled || prefersReducedMotion) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setParticles([]);
      return;
    }

    const maxParticles = isMobile ? 3 : 6;
    const spawnInterval = isMobile ? 3500 : 2500; // Slower on mobile

    intervalRef.current = setInterval(() => {
      setParticles(current => {
        // Remove expired particles
        const now = Date.now();
        const active = current.filter(p => {
          const age = now - parseInt(p.id.split('-')[1]);
          return age < p.duration + p.delay;
        });

        // Add new particle if under limit
        if (active.length < maxParticles) {
          const newParticle = createParticle();
          particleCountRef.current++;
          return [...active, newParticle];
        }

        return active;
      });
    }, spawnInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, disabled, prefersReducedMotion, isMobile, createParticle]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (disabled || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="smoke-particle absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${40 + Math.random() * 20}px`,
            height: `${40 + Math.random() * 20}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 70%, transparent 100%)`,
            filter: 'blur(1.5px)',
            mixBlendMode: 'screen',
            transform: `scale(${particle.scale})`,
            animation: `smoke-rise ${particle.duration}ms ease-out ${particle.delay}ms forwards`,
            '--drift-x': `${particle.driftX}px`,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            transform3d: 'translate3d(0, 0, 0)',
          } as React.CSSProperties}
        />
      ))}
      
      {/* Performance debugging (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs text-white/50 bg-black/20 px-2 py-1 rounded">
          Particles: {particles.length} | Total: {particleCountRef.current}
        </div>
      )}
    </div>
  );
}