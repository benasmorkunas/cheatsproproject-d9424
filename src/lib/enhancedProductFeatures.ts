// Enhanced comprehensive product features for all tiers
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  details?: string[];
  premium?: boolean;
  tier?: 'lite' | 'plus' | 'pro' | 'all';
  highlight?: boolean;
}

export interface FeatureCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: Feature[];
  tierRequired?: 'lite' | 'plus' | 'pro';
}

export const comprehensiveFeatures: Record<string, FeatureCategory[]> = {
  // CS2 PRO VERSION
  'cs2-pro': [
    {
      id: 'aimbot',
      name: 'Advanced Aimbot System',
      icon: '🎯',
      description: 'Professional CS2 aimbot with human-like precision, anti-detection smoothing & teammate protection',
      tierRequired: 'plus',
      features: [
        {
          id: 'aimbot-teammates',
          icon: '👥',
          title: 'Teammate Targeting Control',
          description: 'Advanced teammate protection system automatically detects friendly players to prevent team kills',
          category: 'Safety',
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Only Aiming',
          description: 'Visibility-only targeting creates natural gameplay patterns using line of sight detection',
          category: 'Smart Targeting',
          tier: 'plus',
          highlight: true
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Human-Like Smoothing',
          description: 'Elite smoothing technology mimics natural human mouse movement patterns with multiple levels',
          category: 'Anti-Detection',
          tier: 'plus',
          premium: true
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Precision FOV Control',
          description: 'Customizable radius settings with pixel-perfect crosshair placement for maximum advantage',
          category: 'Customization',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'triggerbot',
      name: 'Smart Triggerbot',
      icon: '⚡',
      description: 'Intelligent auto-firing system with customizable delays and advanced reaction timing control',
      tierRequired: 'plus',
      features: [
        {
          id: 'triggerbot-hotkey',
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Professional CS2 triggerbot hotkey system supports unlimited custom key bindings with flexible modes',
          category: 'Controls',
          tier: 'plus'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Human Reaction Delay',
          description: 'Elite CS2 triggerbot human reaction delay system features customizable 1-500ms timing range',
          category: 'Realism',
          tier: 'plus',
          highlight: true
        }
      ]
    },
    {
      id: 'visuals',
      name: 'Premium Visual Suite',
      icon: '👁️',
      description: 'Complete CS2 ESP wallhack system with enemy detection, health bars & tactical information display',
      tierRequired: 'lite',
      features: [
        {
          id: 'esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Premium CS2 ESP wallhack system featuring multiple visual box styles with custom color selection',
          category: 'ESP',
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Advanced CS2 ESP wallhack skeleton system displays complete enemy bone structure through walls',
          category: 'ESP',
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Professional CS2 ESP wallhack head dot targeting system provides precise headshot assistance',
          category: 'Targeting',
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Premium CS2 ESP wallhack player name display system shows enemy usernames with team colors',
          category: 'Information',
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Dynamic Health Bars',
          description: 'Advanced CS2 ESP wallhack health bar system features multiple display modes for instant assessment',
          category: 'Health Info',
          tier: 'all',
          highlight: true
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flag System',
          description: 'Elite CS2 ESP wallhack status flag system displays critical player information including money',
          category: 'Status',
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Professional CS2 ESP wallhack weapon and distance system displays current enemy weapons',
          category: 'Intel',
          tier: 'all'
        }
      ]
    },
    {
      id: 'grenades',
      name: 'Grenade Helper Pro',
      icon: '💣',
      description: 'Advanced trajectory assistance for perfect smoke lineups and tactical grenade placement',
      tierRequired: 'pro',
      features: [
        {
          id: 'grenade-helper',
          icon: '📍',
          title: 'Smart Trajectory Lines',
          description: 'Advanced CS2 grenade helper trajectory system features precise landing predictions with visual arc',
          category: 'Trajectories',
          tier: 'pro',
          premium: true
        },
        {
          id: 'grenade-custom',
          icon: '📁',
          title: 'Custom Lineup System',
          description: 'Elite CS2 grenade helper custom lineup system allows you to record and save personal trajectories',
          category: 'Custom Setup',
          tier: 'pro',
          premium: true
        }
      ]
    },
    {
      id: 'security',
      name: 'Professional Security',
      icon: '🛡️',
      description: 'Elite anti-detection technology with stream-proof mode and secure cloud configuration sync',
      tierRequired: 'pro',
      features: [
        {
          id: 'streamproof',
          icon: '📺',
          title: 'Full Stream Protection',
          description: 'Professional CS2 hack stream protection system ensures complete invisibility during live streaming',
          category: 'Streaming',
          tier: 'pro',
          premium: true,
          highlight: true
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Configuration',
          description: 'Advanced CS2 hack cloud configuration system provides secure cross-device synchronization',
          category: 'Configuration',
          tier: 'all'
        }
      ]
    }
  ],

  // CS2 PLUS VERSION  
  'cs2-plus': [
    {
      id: 'aimbot',
      name: 'Advanced Aimbot System',
      icon: '🎯',
      description: 'Professional CS2 aimbot with human-like precision, anti-detection smoothing & teammate protection',
      tierRequired: 'plus',
      features: [
        {
          id: 'aimbot-teammates',
          icon: '👥',
          title: 'Teammate Targeting Control',
          description: 'Advanced CS2 aimbot teammate protection system automatically detects friendly players',
          category: 'Safety',
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Only Aiming',
          description: 'Professional CS2 aimbot with visibility-only targeting creates natural gameplay patterns',
          category: 'Smart Targeting',
          tier: 'plus'
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Human-Like Smoothing',
          description: 'Elite CS2 aimbot smoothing technology uses advanced algorithms to mimic natural movement patterns',
          category: 'Anti-Detection',
          tier: 'plus'
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Precision FOV Control',
          description: 'Advanced CS2 aimbot FOV control system with customizable radius settings for precise targeting',
          category: 'Customization',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'triggerbot',
      name: 'Smart Triggerbot',
      icon: '⚡',
      description: 'Intelligent auto-firing system',
      tierRequired: 'plus',
      features: [
        {
          id: 'triggerbot-hotkey',
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Professional CS2 triggerbot hotkey system supports unlimited custom key bindings',
          category: 'Controls',
          tier: 'plus'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Human Reaction Delay',
          description: 'Elite CS2 triggerbot human reaction delay system features customizable 1-500ms timing range',
          category: 'Realism',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'visuals',
      name: 'Premium Visual Suite',
      icon: '👁️',
      description: 'Complete CS2 ESP wallhack system with enemy detection, health bars & tactical information display',
      tierRequired: 'lite',
      features: [
        {
          id: 'esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Premium CS2 ESP wallhack system featuring multiple visual box styles with custom color selection',
          category: 'ESP',
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Advanced CS2 ESP wallhack skeleton system displays complete enemy bone structure through walls',
          category: 'ESP',
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Professional CS2 ESP wallhack head dot targeting system provides precise headshot assistance',
          category: 'Targeting',
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Premium CS2 ESP wallhack player name display system shows enemy usernames with team colors',
          category: 'Information',
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Dynamic Health Bars',
          description: 'Advanced CS2 ESP wallhack health bar system features multiple display modes for instant assessment',
          category: 'Health Info',
          tier: 'all'
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flag System',
          description: 'Elite CS2 ESP wallhack status flag system displays critical player information including money',
          category: 'Status',
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Professional CS2 ESP wallhack weapon and distance system displays current enemy weapons',
          category: 'Intel',
          tier: 'all'
        }
      ]
    },
    {
      id: 'config',
      name: 'Configuration System',
      icon: '⚙️',
      description: 'Elite anti-detection technology with stream-proof mode and secure cloud configuration sync',
      tierRequired: 'lite',
      features: [
        {
          id: 'config-save',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Advanced CS2 hack configuration management system allows multiple profile creation with instant switching',
          category: 'Settings',
          tier: 'all'
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Premium CS2 hack cloud storage system provides secure cross-device synchronization with automatic backup',
          category: 'Cloud Features',
          tier: 'all'
        }
      ]
    }
  ],

  // CS2 LITE VERSION
  'cs2-lite': [
    {
      id: 'visuals',
      name: 'Essential Visual Suite',
      icon: '👁️',
      description: 'Complete CS2 ESP wallhack system with enemy detection, health bars & tactical information display',
      tierRequired: 'lite',
      features: [
        {
          id: 'esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Essential CS2 ESP wallhack system featuring multiple visual box styles for clear enemy detection',
          category: 'ESP',
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Basic CS2 ESP wallhack skeleton system displays enemy bone structure through walls',
          category: 'ESP',
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Essential CS2 ESP wallhack head dot targeting system provides basic headshot assistance',
          category: 'Targeting',
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Basic CS2 ESP wallhack player name display system shows enemy usernames for player identification',
          category: 'Information',
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Health Bars',
          description: 'Essential CS2 ESP wallhack health bar system features multiple display modes for health monitoring',
          category: 'Health Info',
          tier: 'all'
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flags',
          description: 'Basic CS2 ESP wallhack status flag system displays essential player information including money',
          category: 'Status',
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Essential CS2 ESP wallhack weapon and distance system displays basic enemy weapon information',
          category: 'Intel',
          tier: 'all'
        }
      ]
    },
    {
      id: 'config',
      name: 'Configuration System',
      icon: '⚙️',
      description: 'Elite anti-detection technology with stream-proof mode and secure cloud configuration sync',
      tierRequired: 'lite',
      features: [
        {
          id: 'config-save',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Basic CS2 hack configuration system allows profile saving functionality to store your settings',
          category: 'Settings',
          tier: 'all'
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Essential CS2 hack cloud storage system provides basic synchronization functionality across devices',
          category: 'Cloud Features',
          tier: 'all'
        }
      ]
    }
  ],

  // BF6 PRO VERSION
  'bf6-pro': [
    {
      id: 'ai-aimbot',
      name: 'AI-Powered Aimbot',
      icon: '🤖',
      description: 'Machine learning aimbot with target prediction, PID controller & advanced movement algorithms',
      tierRequired: 'plus',
      features: [
        {
          id: 'ai-aimbot-keys',
          icon: '⌨️',
          title: 'Advanced Hotkey System',
          description: 'Advanced BF6 aimbot hotkey system features emergency aimstop functionality with unlimited custom keys',
          category: 'Controls',
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-position',
          icon: '🎯',
          title: 'Smart Target Selection',
          description: 'Professional BF6 aimbot AI targeting system features intelligent head priority and chest targeting',
          category: 'AI Targeting',
          tier: 'plus',
          premium: true
        },
        {
          id: 'ai-aimbot-smoothing',
          icon: '🎚️',
          title: 'Package Chance System',
          description: 'Elite BF6 aimbot package chance system uses advanced probability-based smoothing algorithms',
          category: 'Anti-Detection',
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-pid',
          icon: '🎛️',
          title: 'PID Controller',
          description: 'Professional BF6 aimbot PID controller system utilizes advanced mathematical algorithms',
          category: 'Advanced Control',
          tier: 'plus',
          premium: true,
          highlight: true
        },
        {
          id: 'ai-aimbot-prediction',
          icon: '🔮',
          title: 'Target Prediction AI',
          description: 'Advanced BF6 aimbot target prediction AI uses machine learning to analyze enemy movement patterns',
          category: 'AI Features',
          tier: 'plus',
          premium: true
        }
      ]
    },
    {
      id: 'rcs',
      name: 'Recoil Control System',
      icon: '📊',
      description: 'Advanced weapon stabilization with visual patterns and 8 optimized weapon profile systems',
      tierRequired: 'plus',
      features: [
        {
          id: 'rcs-pattern',
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'Advanced BF6 recoil control system features visual pattern display with real-time feedback mechanisms',
          category: 'Visual Aid',
          tier: 'plus'
        },
        {
          id: 'rcs-weapons',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Elite BF6 recoil control system includes eight optimized weapon profiles with automatic detection',
          category: 'Weapons',
          tier: 'plus',
          highlight: true
        },
        {
          id: 'rcs-intensity',
          icon: '⚡',
          title: 'Intensity Control',
          description: 'Professional BF6 recoil control intensity system offers complete 0-100% compensation control',
          category: 'Customization',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'visuals',
      name: 'Elite Visual System',
      icon: '👁️',
      description: 'Professional BF6 ESP features with bone structure visualization and enemy detection through walls',
      tierRequired: 'plus',
      features: [
        {
          id: 'bf6-esp-boxes',
          icon: '📦',
          title: 'Advanced ESP Boxes',
          description: 'Advanced BF6 ESP wallhack system features multiple box styles for crystal-clear enemy detection',
          category: 'ESP',
          tier: 'plus'
        },
        {
          id: 'bf6-esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Elite BF6 ESP wallhack skeleton system displays complete enemy bone structure through walls',
          category: 'ESP',
          tier: 'plus'
        },
        {
          id: 'bf6-esp-head',
          icon: '🎯',
          title: 'Head Dot Targeting',
          description: 'Professional BF6 ESP wallhack head dot targeting system provides precise headshot assistance',
          category: 'Targeting',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'security',
      name: 'Professional Security',
      icon: '🛡️',
      description: 'Elite security suite with stream protection, cloud sync and professional configuration management',
      tierRequired: 'pro',
      features: [
        {
          id: 'bf6-streamproof',
          icon: '📺',
          title: 'Full Stream Protection',
          description: 'Professional BF6 hack stream protection system ensures complete invisibility during live streaming',
          category: 'Streaming',
          tier: 'pro',
          premium: true
        },
        {
          id: 'bf6-config-save',
          icon: '💾',
          title: 'Advanced Config Management',
          description: 'Advanced BF6 hack configuration management system provides multiple profile creation with instant switching',
          category: 'Configuration',
          tier: 'plus'
        },
        {
          id: 'bf6-config-cloud',
          icon: '☁️',
          title: 'Cloud Configuration',
          description: 'Elite BF6 hack cloud configuration system provides secure cross-device access with automatic backup',
          category: 'Cloud Features',
          tier: 'plus'
        }
      ]
    }
  ],

  // BF6 PLUS VERSION
  'bf6-plus': [
    {
      id: 'ai-aimbot',
      name: 'AI-Powered Aimbot',
      icon: '🤖',
      description: 'Professional CS2 aimbot with human-like precision, anti-detection smoothing & teammate protection',
      tierRequired: 'plus',
      features: [
        {
          id: 'ai-aimbot-keys',
          icon: '⌨️',
          title: 'Advanced Hotkey System',
          description: 'Advanced BF6 aimbot hotkey system features emergency aimstop functionality with unlimited custom keys',
          category: 'Controls',
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-position',
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Professional BF6 aimbot multi-position targeting system features intelligent head priority selection',
          category: 'Targeting',
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-smoothing',
          icon: '🎚️',
          title: 'Package Chance Control',
          description: 'Elite BF6 aimbot package chance control system uses advanced probability settings for authentic aiming',
          category: 'Control',
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-pid',
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional BF6 aimbot PID controller system utilizes advanced mathematical algorithms',
          category: 'Advanced Control',
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-prediction',
          icon: '🔮',
          title: 'Target Prediction Algorithm',
          description: 'Advanced BF6 aimbot target prediction algorithm uses intelligent movement analysis',
          category: 'AI Features',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'rcs',
      name: 'Recoil Control System',
      icon: '📊',
      description: 'Advanced weapon stabilization with visual patterns and 8 optimized weapon profile systems',
      tierRequired: 'plus',
      features: [
        {
          id: 'rcs-pattern',
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'Advanced BF6 recoil control system features visual pattern display with real-time feedback mechanisms',
          category: 'Visual Aid',
          tier: 'plus'
        },
        {
          id: 'rcs-weapons',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Elite BF6 recoil control system includes eight optimized weapon profiles with automatic detection',
          category: 'Weapons',
          tier: 'plus'
        },
        {
          id: 'rcs-intensity',
          icon: '⚡',
          title: 'Adjustable Intensity',
          description: 'Professional BF6 recoil control intensity system offers complete 0-100% compensation control',
          category: 'Customization',
          tier: 'plus'
        }
      ]
    },
    {
      id: 'config',
      name: 'Configuration System',
      icon: '⚙️',
      description: 'Elite anti-detection technology with stream-proof mode and secure cloud configuration sync',
      tierRequired: 'plus',
      features: [
        {
          id: 'bf6-config-save',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Advanced BF6 hack configuration management system provides multiple profile creation with instant switching',
          category: 'Configuration',
          tier: 'plus'
        },
        {
          id: 'bf6-config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Premium BF6 hack cloud storage system provides secure access from anywhere with automatic backup',
          category: 'Cloud Features',
          tier: 'plus'
        }
      ]
    }
  ]
};

// Helper functions for the enhanced system
export function getEnhancedProductFeatures(productId: string): FeatureCategory[] {
  const productType = productId.replace(/-\d+day$/, '');
  return comprehensiveFeatures[productType] || [];
}

export function getTierFromProductId(productId: string): 'lite' | 'plus' | 'pro' {
  if (productId.includes('lite')) return 'lite';
  if (productId.includes('plus')) return 'plus';
  if (productId.includes('pro')) return 'pro';
  return 'lite';
}

export function getTierLabel(tier: string): string {
  const labels = {
    lite: 'Lite',
    plus: 'Plus', 
    pro: 'Pro'
  };
  return labels[tier as keyof typeof labels] || 'Unknown';
}

export function getTierColor(tier: string): string {
  const colors = {
    lite: 'text-blue-400',
    plus: 'text-purple-400',
    pro: 'text-yellow-400'
  };
  return colors[tier as keyof typeof colors] || 'text-gray-400';
}

export function getFeatureCountByTier(productId: string): { total: number; premium: number; highlight: number } {
  const categories = getEnhancedProductFeatures(productId);
  let total = 0;
  let premium = 0;
  let highlight = 0;

  categories.forEach(category => {
    category.features.forEach(feature => {
      total++;
      if (feature.premium) premium++;
      if (feature.highlight) highlight++;
    });
  });

  return { total, premium, highlight };
}