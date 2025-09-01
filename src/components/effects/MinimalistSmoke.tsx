'use client';

import { useEffect, useState } from 'react';

interface SmokeParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  drift: number;
  driftEnd: number;
  driftFinal: number;
  delay: number;
}

export default function MinimalistSmoke() {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    // Create abundant smoke particles across entire top edge
    const createParticles = () => {
      const newParticles: SmokeParticle[] = [];
      
      // Significantly more particles for denser smoke effect
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: (i * 2) + Math.random() * 2, // Dense distribution across 0-100% width
          size: Math.random() * 80 + 30, // 30-110px (varied sizes)
          duration: Math.random() * 10 + 10, // 10-20s 
          drift: Math.random() * 25 - 12, // More drift for natural movement
          driftEnd: Math.random() * 35 - 17, 
          driftFinal: Math.random() * 45 - 22,
          delay: Math.random() * 15, // 0-15s delay (more staggered)
        });
      }
      
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <>
      {/* Smoke container - only covers top 70% */}
      <div className="smoke-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="smoke-particle"
            style={{
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              '--duration': `${particle.duration}s`,
              '--drift': `${particle.drift}px`,
              '--drift-end': `${particle.driftEnd}px`,
              '--drift-final': `${particle.driftFinal}px`,
              animationDelay: `${particle.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Global blur overlay for minimalistic effect */}
      <div className="smoke-blur-overlay" />
    </>
  );
}