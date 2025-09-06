'use client';

import { motion } from 'framer-motion';

interface AnimatedIconProps {
  type: string;
  className?: string;
  size?: number;
}

export default function AnimatedIcon({ type, className = '', size = 48 }: AnimatedIconProps) {
  const baseStyles = {
    width: size,
    height: size,
    className: `inline-block ${className}`,
  };

  switch (type) {
    case 'crosshair':
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#crosshairGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="24"
            y1="8"
            x2="24"
            y2="16"
            stroke="url(#crosshairGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.line
            x1="24"
            y1="32"
            x2="24"
            y2="40"
            stroke="url(#crosshairGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.line
            x1="8"
            y1="24"
            x2="16"
            y2="24"
            stroke="url(#crosshairGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.line
            x1="32"
            y1="24"
            x2="40"
            y2="24"
            stroke="url(#crosshairGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="2"
            fill="url(#crosshairGradient)"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="crosshairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#ff8e8e" />
            </linearGradient>
          </defs>
        </motion.svg>
      );

    case 'radar':
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
        >
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#radarGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="24"
            cy="24"
            r="15"
            stroke="url(#radarGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: "easeOut" }}
          />
          <motion.circle
            cx="24"
            cy="24"
            r="10"
            stroke="url(#radarGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeOut" }}
          />
          <motion.line
            x1="24"
            y1="4"
            x2="24"
            y2="44"
            stroke="url(#radarGradient)"
            strokeWidth="1"
            opacity="0.5"
          />
          <motion.line
            x1="4"
            y1="24"
            x2="44"
            y2="24"
            stroke="url(#radarGradient)"
            strokeWidth="1"
            opacity="0.5"
          />
          <motion.line
            x1="24"
            y1="24"
            x2="38"
            y2="10"
            stroke="url(#radarSweep)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '24px 24px' }}
          />
          <motion.circle cx="32" cy="16" r="2" fill="#4ade80" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          <motion.circle cx="18" cy="30" r="2" fill="#f87171" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="30" cy="32" r="2" fill="#60a5fa" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
        </motion.svg>
      );

    case 'shield':
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
        >
          <motion.path
            d="M24 4L36 10V22C36 32 30 40 24 44C18 40 12 32 12 22V10L24 4Z"
            fill="url(#shieldGradient)"
            stroke="url(#shieldStroke)"
            strokeWidth="2"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M18 22L22 26L30 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.circle
            cx="24"
            cy="24"
            r="25"
            stroke="url(#shieldGlow)"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="shieldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <radialGradient id="shieldGlow">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </motion.svg>
      );

    case 'speed':
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
        >
          <motion.circle
            cx="24"
            cy="24"
            r="18"
            stroke="url(#speedGradient)"
            strokeWidth="2"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M24 8C30 8 35 11 38 16"
            stroke="url(#speedAccent)"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '24px 24px' }}
          />
          <motion.path
            d="M10 32C13 37 18 40 24 40"
            stroke="url(#speedAccent)"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '24px 24px' }}
          />
          <motion.line
            x1="24"
            y1="24"
            x2="32"
            y2="16"
            stroke="url(#speedPointer)"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '24px 24px' }}
          />
          <motion.circle
            cx="24"
            cy="24"
            r="3"
            fill="url(#speedCenter)"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="speedAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="speedPointer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <radialGradient id="speedCenter">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
          </defs>
        </motion.svg>
      );

    case 'brain':
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
        >
          <motion.path
            d="M16 12C12 12 10 15 12 18C8 18 8 22 12 24C10 26 12 30 16 30C18 32 22 32 24 30C26 32 30 32 32 30C36 30 38 26 36 24C40 22 40 18 36 18C38 15 36 12 32 12C30 10 26 10 24 12C22 10 18 10 16 12Z"
            fill="url(#brainGradient)"
            stroke="url(#brainStroke)"
            strokeWidth="1"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="1"
            fill="#a855f7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="24"
            cy="20"
            r="1"
            fill="#a855f7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle
            cx="30"
            cy="18"
            r="1"
            fill="#a855f7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.circle
            cx="20"
            cy="25"
            r="1"
            fill="#a855f7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
          />
          <motion.circle
            cx="28"
            cy="25"
            r="1"
            fill="#a855f7"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
          />
          <motion.path
            d="M18 18L24 20M24 20L30 18M20 25L28 25"
            stroke="#a855f7"
            strokeWidth="0.5"
            opacity="0.5"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="brainStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </motion.svg>
      );

    case 'rocket':
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
        >
          <motion.path
            d="M24 4L28 12L36 16L28 20L24 28L20 20L12 16L20 12L24 4Z"
            fill="url(#rocketGradient)"
            stroke="url(#rocketStroke)"
            strokeWidth="2"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="24"
            cy="36"
            rx="8"
            ry="4"
            fill="url(#flameGradient)"
            animate={{ 
              scaleY: [1, 1.5, 1], 
              opacity: [0.8, 1, 0.8] 
            }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="24"
            cy="38"
            rx="4"
            ry="2"
            fill="url(#flameCore)"
            animate={{ 
              scaleY: [1, 1.8, 1], 
              opacity: [0.9, 1, 0.9] 
            }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="24"
            cy="16"
            r="2"
            fill="white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M16 24L18 26M30 24L32 26M20 28L22 30M26 28L28 30"
            stroke="#fbbf24"
            strokeWidth="1"
            strokeLinecap="round"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="rocketStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="flameCore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </motion.svg>
      );

    default:
      return (
        <motion.svg
          {...baseStyles}
          viewBox="0 0 48 48"
          fill="none"
        >
          <motion.circle
            cx="24"
            cy="24"
            r="18"
            fill="url(#defaultGradient)"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.text
            x="24"
            y="28"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            ?
          </motion.text>
          <defs>
            <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
          </defs>
        </motion.svg>
      );
  }
}

// Helper function to map emoji/string to icon type
export function getIconType(iconString: string): string {
  const iconMap: { [key: string]: string } = {
    '🎯': 'crosshair',
    '🔍': 'radar', 
    '🛡️': 'shield',
    '⚡': 'speed',
    '🧠': 'brain',
    '🚀': 'rocket',
    'aimbot': 'crosshair',
    'esp': 'radar',
    'wallhack': 'radar',
    'protection': 'shield',
    'speed': 'speed',
    'ai': 'brain',
    'boost': 'rocket',
  };
  
  return iconMap[iconString.toLowerCase()] || 'default';
}