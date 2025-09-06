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
      features: [
        {
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Bind activation to any key combination you prefer',
          category: 'Controls'
        },
        {
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
      features: [
        {
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        },
        {
          icon: '📝',
          title: 'Player Name Overlays',
          description: 'Display enemy usernames for identification',
          category: 'Information'
        },
        {
          icon: '💚',
          title: 'Dynamic Health Bars',
          description: '4 display modes: Normal, Dynamic, Number variants',
          category: 'Health Info'
        },
        {
          icon: '🏷️',
          title: 'Smart Status Flags',
          description: 'Money, Defusing, Immunity, Flash status indicators',
          category: 'Status'
        },
        {
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'See enemy weapons and exact distance measurements',
          category: 'Intel'
        },
        {
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
      features: [
        {
          icon: '📍',
          title: 'Smart Trajectory Assistance',
          description: 'Perfect smoke and flash trajectories every time',
          category: 'Trajectories'
        },
        {
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
      features: [
        {
          icon: '📺',
          title: 'Full Stream-Proof Technology',
          description: 'Safe for streaming on Twitch, YouTube, and OBS',
          category: 'Streaming'
        },
        {
          icon: '☁️',
          title: 'Cloud Configuration Sync',
          description: 'Save and sync your settings across all devices',
          category: 'Cloud Features'
        },
        {
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
      features: [
        {
          icon: '👥',
          title: 'Aim At Teammates Control',
          description: 'Smart teammate detection to prevent friendly fire incidents',
          category: 'Safety'
        },
        {
          icon: '👁️',
          title: 'Visibility-Based Activation',
          description: 'Only aims when enemies are actually visible to you',
          category: 'Smart Targeting'
        },
        {
          icon: '🎮',
          title: 'Advanced Smoothing Algorithm',
          description: 'Natural mouse movement that mimics human aiming patterns',
          category: 'Anti-Detection'
        },
        {
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
      features: [
        {
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Bind activation to any key combination you prefer',
          category: 'Controls'
        },
        {
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
      features: [
        {
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        },
        {
          icon: '📝',
          title: 'Player Name Overlays',
          description: 'Display enemy usernames for identification',
          category: 'Information'
        },
        {
          icon: '💚',
          title: 'Dynamic Health Bars',
          description: '4 display modes: Normal, Dynamic, Number variants',
          category: 'Health Info'
        },
        {
          icon: '🏷️',
          title: 'Smart Status Flags',
          description: 'Money, Defusing, Immunity, Flash status indicators',
          category: 'Status'
        },
        {
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'See enemy weapons and exact distance measurements',
          category: 'Intel'
        },
        {
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
      features: [
        {
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings for instant loading',
          category: 'Settings'
        },
        {
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
      features: [
        {
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
          icon: '🔴',
          title: 'Head Dot Indicators',
          description: 'Precise headshot targeting assistance markers',
          category: 'Targeting'
        },
        {
          icon: '📝',
          title: 'Player Name Overlays',
          description: 'Display enemy usernames for identification',
          category: 'Information'
        },
        {
          icon: '💚',
          title: 'Dynamic Health Bars',
          description: '4 display modes: Normal, Dynamic, Number variants',
          category: 'Health Info'
        },
        {
          icon: '🏷️',
          title: 'Smart Status Flags',
          description: 'Money, Defusing, Immunity, Flash status indicators',
          category: 'Status'
        },
        {
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'See enemy weapons and exact distance measurements',
          category: 'Intel'
        },
        {
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
      features: [
        {
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings for instant loading',
          category: 'Settings'
        },
        {
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
      features: [
        {
          icon: '⏹️',
          title: 'Aimstop Key & Hotkey System',
          description: 'Instant control with customizable key bindings',
          category: 'Controls'
        },
        {
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Head, Chest, Pelvis targeting with X-Axis priority',
          category: 'Targeting'
        },
        {
          icon: '🎲',
          title: 'Package Chance Smoothing',
          description: 'Advanced smoothing algorithm for natural movement',
          category: 'Anti-Detection'
        },
        {
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional mouse movement smoothing technology',
          category: 'Advanced'
        },
        {
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
      features: [
        {
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'See recoil patterns displayed in real-time',
          category: 'Visual Aid'
        },
        {
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized recoil control for all weapon types',
          category: 'Weapons'
        },
        {
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
      features: [
        {
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Box, Filled Box, and Gradient Filled Box options',
          category: 'ESP'
        },
        {
          icon: '🦴',
          title: 'Advanced Skeleton Display',
          description: 'See enemy bone structure and pose through walls',
          category: 'ESP'
        },
        {
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
      features: [
        {
          icon: '📺',
          title: 'Full Stream-Proof Mode',
          description: 'Safe for streaming on all platforms',
          category: 'Streaming'
        },
        {
          icon: '☁️',
          title: 'Cloud Configuration Sync',
          description: 'Save and sync settings across devices',
          category: 'Cloud Features'
        },
        {
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
      features: [
        {
          icon: '⏹️',
          title: 'Aimstop Key & Hotkey System',
          description: 'Instant control with customizable key bindings',
          category: 'Controls'
        },
        {
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Head, Chest, Pelvis targeting with X-Axis priority',
          category: 'Targeting'
        },
        {
          icon: '🎲',
          title: 'Package Chance Control',
          description: 'Adjustable aim assistance probability settings',
          category: 'Control'
        },
        {
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional mouse movement smoothing technology',
          category: 'Advanced'
        },
        {
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
      features: [
        {
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'See recoil patterns displayed in real-time',
          category: 'Visual Aid'
        },
        {
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized recoil control for all weapon types',
          category: 'Weapons'
        },
        {
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
      features: [
        {
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings for instant loading',
          category: 'Settings'
        },
        {
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