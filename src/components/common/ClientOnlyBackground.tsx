'use client';

import { motion } from 'framer-motion';

interface ClientOnlyBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientOnlyBackground({ 
  children, 
  className = "" 
}: ClientOnlyBackgroundProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Base minimalistic dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0f0f0f] -z-50" />
      
      {/* Enhanced smoke animation covering entire top side with maximum blur */}
      <div className="absolute inset-0 -z-40 overflow-hidden">
        {/* Comprehensive smoke coverage across entire top */}
        <motion.div
          className="absolute -top-32 left-0 right-0 h-[70vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {/* Full-width smoke base layer with grain texture - covers entire top */}
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(255, 255, 255, 0.25) 0%,
                  rgba(240, 240, 240, 0.20) 15%,
                  rgba(200, 200, 200, 0.15) 35%,
                  rgba(160, 160, 160, 0.10) 50%,
                  rgba(120, 120, 120, 0.05) 65%,
                  transparent 70%
                ),
                radial-gradient(ellipse 2000px 800px at 0% -20%, 
                  rgba(255, 255, 255, 0.35) 0%, 
                  rgba(220, 220, 220, 0.20) 25%,
                  rgba(180, 180, 180, 0.10) 45%,
                  transparent 65%
                ),
                radial-gradient(ellipse 2200px 900px at 25% -25%, 
                  rgba(245, 245, 245, 0.30) 0%, 
                  rgba(200, 200, 200, 0.18) 30%,
                  rgba(150, 150, 150, 0.08) 55%,
                  transparent 70%
                ),
                radial-gradient(ellipse 2400px 1000px at 50% -30%, 
                  rgba(255, 255, 255, 0.40) 0%, 
                  rgba(230, 230, 230, 0.25) 20%,
                  rgba(190, 190, 190, 0.12) 40%,
                  rgba(140, 140, 140, 0.06) 60%,
                  transparent 68%
                ),
                radial-gradient(ellipse 2200px 900px at 75% -25%, 
                  rgba(240, 240, 240, 0.32) 0%, 
                  rgba(195, 195, 195, 0.18) 28%,
                  rgba(155, 155, 155, 0.09) 52%,
                  transparent 70%
                ),
                radial-gradient(ellipse 2000px 800px at 100% -20%, 
                  rgba(255, 255, 255, 0.38) 0%, 
                  rgba(215, 215, 215, 0.22) 26%,
                  rgba(175, 175, 175, 0.11) 48%,
                  transparent 68%
                )
              `,
              filter: 'blur(400px) contrast(1.2)',
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary full-coverage layer */}
          <motion.div
            className="absolute inset-0 opacity-45"
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(230, 230, 230, 0.18) 0%,
                  rgba(200, 200, 200, 0.12) 20%,
                  rgba(170, 170, 170, 0.08) 40%,
                  rgba(140, 140, 140, 0.04) 60%,
                  transparent 70%
                ),
                radial-gradient(ellipse 1800px 700px at 12% -18%, 
                  rgba(220, 220, 220, 0.25) 0%, 
                  rgba(180, 180, 180, 0.15) 32%,
                  rgba(140, 140, 140, 0.08) 58%,
                  transparent 75%
                ),
                radial-gradient(ellipse 2000px 800px at 38% -22%, 
                  rgba(235, 235, 235, 0.22) 0%, 
                  rgba(190, 190, 190, 0.13) 35%,
                  rgba(145, 145, 145, 0.06) 62%,
                  transparent 78%
                ),
                radial-gradient(ellipse 2100px 850px at 62% -24%, 
                  rgba(225, 225, 225, 0.24) 0%, 
                  rgba(185, 185, 185, 0.14) 33%,
                  rgba(143, 143, 143, 0.07) 60%,
                  transparent 76%
                ),
                radial-gradient(ellipse 1900px 750px at 88% -19%, 
                  rgba(240, 240, 240, 0.26) 0%, 
                  rgba(195, 195, 195, 0.15) 31%,
                  rgba(150, 150, 150, 0.08) 57%,
                  transparent 74%
                )
              `,
              filter: 'blur(600px) contrast(1.3) brightness(1.1)',
            }}
            animate={{
              opacity: [0.45, 0.65, 0.45],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* Tertiary subtle layer */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(210, 210, 210, 0.12) 0%,
                  rgba(180, 180, 180, 0.08) 25%,
                  rgba(150, 150, 150, 0.05) 50%,
                  transparent 70%
                ),
                radial-gradient(ellipse 2500px 1200px at 20% -35%, 
                  rgba(200, 200, 200, 0.18) 0%, 
                  rgba(160, 160, 160, 0.10) 40%,
                  rgba(120, 120, 120, 0.05) 70%,
                  transparent 85%
                ),
                radial-gradient(ellipse 2600px 1300px at 80% -40%, 
                  rgba(215, 215, 215, 0.20) 0%, 
                  rgba(170, 170, 170, 0.12) 38%,
                  rgba(125, 125, 125, 0.06) 68%,
                  transparent 83%
                )
              `,
              filter: 'blur(750px) contrast(1.4) saturate(1.2)',
            }}
            animate={{
              opacity: [0.30, 0.50, 0.30],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          
          {/* Floating smoke particles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const xValues = [0, (i * 25) - 100, (i * 15) - 75, 0];
            const yValues = [0, 40 + (i * 10), 80 + (i * 15), 120 + (i * 20)];
            return (
              <motion.div
                key={i}
                className="absolute top-0 opacity-20"
                style={{
                  left: `${i * 12.5}%`,
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)`,
                  filter: 'blur(300px) contrast(1.3)'
                }}
                animate={{
                  x: xValues,
                  y: yValues,
                  opacity: [0.20, 0.35, 0.20, 0],
                  scale: [1, 1.8 + (i * 0.1), 2.5 + (i * 0.15), 3.2 + (i * 0.2)]
                }}
                transition={{
                  duration: 20 + (i * 2),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            );
          })}
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}