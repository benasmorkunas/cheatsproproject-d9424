// Enhanced product features mapping for all variants
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

export const productFeatures: Record<string, FeatureCategory[]> = {
  'cs2-pro': [
    {
      id: 'aimbot',
      name: '🎯 Advanced Aimbot System',
      icon: '🎯',
      description: 'Advanced targeting assistance with human-like precision',
      tierRequired: 'plus',
      features: [
        {
          id: 'aimbot-teammates',
          icon: '👥',
          title: 'Aim At Teammates Control',
          description: 'Smart teammate detection to prevent friendly fire incidents',
          category: 'Safety',
          details: ['Toggle teammate targeting', 'Prevents friendly fire accidents'],
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Based Activation',
          description: 'Only aims when enemies are actually visible to you',
          category: 'Smart Targeting',
          details: ['Reduces suspicious behavior', 'Natural aiming patterns'],
          tier: 'plus'
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Advanced Smoothing Algorithm',
          description: 'Natural mouse movement that mimics human aiming patterns',
          category: 'Anti-Detection',
          details: ['Customizable smoothness levels', 'Anti-detection algorithms'],
          tier: 'plus',
          premium: true
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Customizable FOV Circle',
          description: 'Adjustable field of view for precise targeting control',
          category: 'Customization',
          details: ['Customizable FOV radius', 'Pixel-perfect targeting'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'triggerbot',
      name: '⚡ Smart Triggerbot',
      icon: '⚡',
      description: 'Intelligent auto-firing system with customizable settings',
      features: [
        {
          id: 'triggerbot-hotkey',
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Bind activation to any key combination you prefer',
          category: 'Controls'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Adjustable Trigger Delay',
          description: 'Fine-tune reaction timing from 1-500ms for realism',
          category: 'Timing'
        }
      ]
    },
    {
      id: 'visuals',
      name: '👁️ Premium Visual Suite',
      icon: '👁️',
      description: 'Advanced visual enhancements and ESP features',
      features: [
        {
          id: 'multi-style-esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          id: 'advanced-skeleton-display',
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          id: 'head-dot-indicators',
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        },
        {
          id: 'player-name-overlays',
          icon: '📝',
          title: 'Player Name Overlays',
          description: 'Display enemy usernames for identification',
          category: 'Information'
        },
        {
          id: 'dynamic-health-bars',
          icon: '💚',
          title: 'Dynamic Health Bars',
          description: '4 display modes: Normal, Dynamic, Number variants',
          category: 'Health Info'
        },
        {
          id: 'smart-status-flags',
          icon: '🏷️',
          title: 'Smart Status Flags',
          description: 'Money, Defusing, Immunity, Flash status indicators',
          category: 'Status'
        },
        {
          id: 'weapon-distance-info',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'See enemy weapons and exact distance measurements',
          category: 'Intel'
        },
        {
          id: 'spotted-enemy-tracking',
          icon: '👀',
          title: 'Spotted Enemy Tracking',
          description: 'Enhanced ESP for spotted targets with step tracking',
          category: 'Tracking'
        }
      ]
    },
    {
      id: 'grenade',
      name: '💣 Exclusive Grenade Helper',
      icon: '💣',
      description: 'Advanced grenade trajectory assistance and utility tools',
      features: [
        {
          id: 'smart-trajectory-assistance',
          icon: '📍',
          title: 'Smart Trajectory Assistance',
          description: 'Perfect smoke and flash trajectories every time',
          category: 'Trajectories'
        },
        {
          id: 'custom-lineup-recording',
          icon: '📁',
          title: 'Custom Lineup Recording',
          description: 'Record and save your own grenade lineups for any map',
          category: 'Custom Setup'
        }
      ]
    },
    {
      id: 'professional',
      name: '🛡️ Professional Features',
      icon: '🛡️',
      description: 'Professional-grade features for advanced users',
      features: [
        {
          id: 'full-stream-proof-technology',
          icon: '📺',
          title: 'Full Stream-Proof Technology',
          description: 'Safe for streaming on Twitch, YouTube, and OBS',
          category: 'Streaming'
        },
        {
          id: 'cloud-configuration-sync',
          icon: '☁️',
          title: 'Cloud Configuration Sync',
          description: 'Save and sync your settings across all devices',
          category: 'Cloud Features'
        },
        {
          id: 'instant-config-save-load',
          icon: '💾',
          title: 'Instant Config Save/Load',
          description: 'Quick setup switching for different game modes',
          category: 'Configuration'
        }
      ]
    }
  ],

  'cs2-plus': [
    {
      id: 'aimbot',
      name: '🎯 Advanced Aimbot System',
      icon: '🎯',
      description: 'Advanced targeting assistance with human-like precision',
      features: [
        {
          id: 'aim-at-teammates-control',
          icon: '👥',
          title: 'Aim At Teammates Control',
          description: 'Smart teammate detection to prevent friendly fire incidents',
          category: 'Safety'
        },
        {
          id: 'visibility-based-activation',
          icon: '👁️',
          title: 'Visibility-Based Activation',
          description: 'Only aims when enemies are actually visible to you',
          category: 'Smart Targeting'
        },
        {
          id: 'advanced-smoothing-algorithm',
          icon: '🎮',
          title: 'Advanced Smoothing Algorithm',
          description: 'Natural mouse movement that mimics human aiming patterns',
          category: 'Anti-Detection'
        },
        {
          id: 'customizable-fov-circle',
          icon: '🔍',
          title: 'Customizable FOV Circle',
          description: 'Adjustable field of view for precise targeting control',
          category: 'Customization'
        }
      ]
    },
    {
      id: 'triggerbot',
      name: '⚡ Smart Triggerbot',
      icon: '⚡',
      description: 'Intelligent auto-firing system with customizable settings',
      features: [
        {
          id: 'triggerbot-hotkey',
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Bind activation to any key combination you prefer',
          category: 'Controls'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Adjustable Trigger Delay',
          description: 'Fine-tune reaction timing from 1-500ms for realism',
          category: 'Timing'
        }
      ]
    },
    {
      id: 'visuals',
      name: '👁️ Premium Visual Suite',
      icon: '👁️',
      description: 'Advanced visual enhancements and ESP features',
      features: [
        {
          id: 'multi-style-esp-boxes-plus',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          id: 'advanced-skeleton-display-plus',
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          id: 'head-dot-indicators-plus',
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        },
        {
          id: 'player-name-overlays-plus',
          icon: '📝',
          title: 'Player Name Overlays',
          description: 'Display enemy usernames for identification',
          category: 'Information'
        },
        {
          id: 'dynamic-health-bars-plus',
          icon: '💚',
          title: 'Dynamic Health Bars',
          description: '4 display modes: Normal, Dynamic, Number variants',
          category: 'Health Info'
        },
        {
          id: 'smart-status-flags-plus',
          icon: '🏷️',
          title: 'Smart Status Flags',
          description: 'Money, Defusing, Immunity, Flash status indicators',
          category: 'Status'
        },
        {
          id: 'weapon-distance-info-plus',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'See enemy weapons and exact distance measurements',
          category: 'Intel'
        },
        {
          id: 'spotted-enemy-tracking-plus',
          icon: '👀',
          title: 'Spotted Enemy Tracking',
          description: 'Enhanced ESP for spotted targets with step tracking',
          category: 'Tracking'
        }
      ]
    },
    {
      id: 'config',
      name: '⚙️ Advanced Configuration',
      icon: '⚙️',
      description: 'Customizable settings and configuration options',
      features: [
        {
          id: 'save-configuration',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings for instant loading',
          category: 'Settings'
        },
        {
          id: 'cloud-based-storage',
          icon: '☁️',
          title: 'Cloud-Based Storage',
          description: 'Access your configs from any device, anywhere',
          category: 'Cloud Features'
        }
      ]
    }
  ],

  'cs2-lite': [
    {
      id: 'visuals',
      name: '👁️ Essential Visual Suite',
      icon: '👁️',
      description: 'Essential visual features and ESP functionality',
      features: [
        {
          id: 'multi-style-esp-boxes-lite',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          id: 'advanced-skeleton-display-lite',
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          id: 'head-dot-indicators-lite',
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        },
        {
          id: 'player-name-overlays-lite',
          icon: '📝',
          title: 'Player Name Overlays',
          description: 'Display enemy usernames for identification',
          category: 'Information'
        },
        {
          id: 'dynamic-health-bars-lite',
          icon: '💚',
          title: 'Dynamic Health Bars',
          description: '4 display modes: Normal, Dynamic, Number variants',
          category: 'Health Info'
        },
        {
          id: 'smart-status-flags-lite',
          icon: '🏷️',
          title: 'Smart Status Flags',
          description: 'Money, Defusing, Immunity, Flash status indicators',
          category: 'Status'
        },
        {
          id: 'weapon-distance-info-lite',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'See enemy weapons and exact distance measurements',
          category: 'Intel'
        },
        {
          id: 'spotted-enemy-tracking-lite',
          icon: '👀',
          title: 'Spotted Enemy Tracking',
          description: 'Enhanced ESP for spotted targets with step tracking',
          category: 'Tracking'
        }
      ]
    },
    {
      id: 'config',
      name: '⚙️ Basic Configuration',
      icon: '⚙️',
      description: 'Basic configuration and setup options',
      features: [
        {
          id: 'save-configuration-lite',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings for instant loading',
          category: 'Settings'
        },
        {
          id: 'cloud-based-storage-lite',
          icon: '☁️',
          title: 'Cloud-Based Storage',
          description: 'Access your configs from any device, anywhere',
          category: 'Cloud Features'
        }
      ]
    }
  ],

  'bf6-pro': [
    {
      id: 'aimbot',
      name: '🤖 AI-Powered Aimbot',
      icon: '🤖',
      description: 'AI-powered targeting system with advanced algorithms',
      features: [
        {
          id: 'aimstop-key-hotkey-system',
          icon: '⏹️',
          title: 'Aimstop Key & Hotkey System',
          description: 'Instant control with customizable key bindings',
          category: 'Controls'
        },
        {
          id: 'multi-position-targeting',
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Head, Chest, Pelvis targeting with X-Axis priority',
          category: 'Targeting'
        },
        {
          id: 'package-chance-smoothing',
          icon: '🎲',
          title: 'Package Chance Smoothing',
          description: 'Advanced smoothing algorithm for natural movement',
          category: 'Anti-Detection'
        },
        {
          id: 'pid-controller-system',
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional mouse movement smoothing technology',
          category: 'Advanced'
        },
        {
          id: 'target-prediction-ai',
          icon: '🔮',
          title: 'Target Prediction AI',
          description: 'Predict enemy movement even when out of sight',
          category: 'AI Features'
        }
      ]
    },
    {
      id: 'rcs',
      name: '🎯 Recoil Control System',
      icon: '🎯',
      description: 'Advanced recoil control and weapon stabilization',
      features: [
        {
          id: 'visual-recoil-patterns',
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'See recoil patterns displayed in real-time',
          category: 'Visual Aid'
        },
        {
          id: 'eight-weapon-profiles',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized recoil control for all weapon types',
          category: 'Weapons'
        },
        {
          id: 'adjustable-intensity',
          icon: '⚡',
          title: 'Adjustable Intensity',
          description: 'Fine-tune recoil compensation for your play style',
          category: 'Customization'
        }
      ]
    },
    {
      id: 'visuals',
      name: '👁️ Elite Visual System',
      icon: '👁️',
      description: 'Elite-grade visual enhancements and ESP features',
      features: [
        {
          id: 'multi-style-esp-boxes-bf6-pro',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          id: 'advanced-skeleton-display-bf6-pro',
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          id: 'head-dot-indicators-bf6-pro',
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        }
      ]
    },
    {
      id: 'professional',
      name: '🛡️ Professional Features',
      icon: '🛡️',
      description: 'Professional-grade features for advanced users',
      features: [
        {
          id: 'full-stream-proof-mode',
          icon: '📺',
          title: 'Full Stream-Proof Mode',
          description: 'Safe for streaming on all platforms',
          category: 'Streaming'
        },
        {
          id: 'cloud-configuration-sync-bf6-pro',
          icon: '☁️',
          title: 'Cloud Configuration Sync',
          description: 'Save and sync settings across devices',
          category: 'Cloud Features'
        },
        {
          id: 'instant-config-management',
          icon: '💾',
          title: 'Instant Config Management',
          description: 'Quick save/load for different scenarios',
          category: 'Configuration'
        }
      ]
    }
  ],

  'bf6-plus': [
    {
      id: 'aimbot',
      name: '🤖 AI-Powered Aimbot',
      icon: '🤖',
      description: 'AI-powered targeting system with advanced algorithms',
      features: [
        {
          id: 'aimstop-key-hotkey-system-plus',
          icon: '⏹️',
          title: 'Aimstop Key & Hotkey System',
          description: 'Instant control with customizable key bindings',
          category: 'Controls'
        },
        {
          id: 'multi-position-targeting-plus',
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Head, Chest, Pelvis targeting with X-Axis priority',
          category: 'Targeting'
        },
        {
          id: 'package-chance-control',
          icon: '🎲',
          title: 'Package Chance Control',
          description: 'Adjustable aim assistance probability settings',
          category: 'Control'
        },
        {
          id: 'pid-controller-system-plus',
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional mouse movement smoothing technology',
          category: 'Advanced'
        },
        {
          id: 'target-prediction-algorithm',
          icon: '🔮',
          title: 'Target Prediction Algorithm',
          description: 'Predict enemy movement patterns intelligently',
          category: 'AI Features'
        }
      ]
    },
    {
      id: 'rcs',
      name: '🎯 Recoil Control System',
      icon: '🎯',
      description: 'Advanced recoil control and weapon stabilization',
      features: [
        {
          id: 'visual-recoil-patterns-plus',
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'See recoil patterns displayed in real-time',
          category: 'Visual Aid'
        },
        {
          id: 'eight-weapon-profiles-plus',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized recoil control for all weapon types',
          category: 'Weapons'
        },
        {
          id: 'adjustable-intensity-plus',
          icon: '⚡',
          title: 'Adjustable Intensity',
          description: 'Fine-tune recoil compensation for your play style',
          category: 'Customization'
        }
      ]
    },
    {
      id: 'config',
      name: '⚙️ Advanced Configuration',
      icon: '⚙️',
      description: 'Customizable settings and configuration options',
      features: [
        {
          id: 'save-configuration-plus',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings for instant loading',
          category: 'Settings'
        },
        {
          id: 'cloud-based-storage-plus',
          icon: '☁️',
          title: 'Cloud-Based Storage',
          description: 'Access your configs from any device, anywhere',
          category: 'Cloud Features'
        }
      ]
    }
  ]
};

// Get features for a specific product
export function getProductFeatures(productId: string): FeatureCategory[] {
  // Extract the product type (e.g., cs2-pro, bf6-plus)
  const productType = productId.replace(/-\d+day$/, '');
  return productFeatures[productType] || [];
}

// Get feature count for a product
export function getFeatureCount(productId: string): number {
  const categories = getProductFeatures(productId);
  return categories.reduce((total, category) => total + category.features.length, 0);
}

// Get unique categories for a product
export function getFeatureCategories(productId: string): string[] {
  const categories = getProductFeatures(productId);
  const allCategories = categories.flatMap(cat => 
    cat.features.map(f => f.category)
  );
  return [...new Set(allCategories)];
}