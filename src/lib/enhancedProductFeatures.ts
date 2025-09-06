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
      description: 'Professional-grade targeting with AI-powered precision',
      tierRequired: 'plus',
      features: [
        {
          id: 'aimbot-teammates',
          icon: '👥',
          title: 'Teammate Targeting Control',
          description: 'Smart detection to prevent friendly fire incidents',
          category: 'Safety',
          details: ['Toggle teammate targeting', 'Prevents accidents', 'Smart recognition'],
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Only Aiming',
          description: 'Only targets visible enemies for natural gameplay',
          category: 'Smart Targeting',
          details: ['Reduces suspicious behavior', 'Natural patterns', 'Line of sight detection'],
          tier: 'plus',
          highlight: true
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Human-Like Smoothing',
          description: 'Advanced smoothing algorithms mimic natural mouse movement',
          category: 'Anti-Detection',
          details: ['Multiple smoothness levels', 'Anti-cheat evasion', 'Customizable curves'],
          tier: 'plus',
          premium: true
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Precision FOV Control',
          description: 'Adjustable field of view for perfect targeting accuracy',
          category: 'Customization',
          details: ['Custom FOV radius', 'Pixel-perfect targeting', 'Dynamic adjustment'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'triggerbot',
      name: 'Smart Triggerbot',
      icon: '⚡',
      description: 'Intelligent auto-firing with human reaction delays',
      tierRequired: 'plus',
      features: [
        {
          id: 'triggerbot-hotkey',
          icon: '⌨️',
          title: 'Custom Hotkey System',
          description: 'Bind activation to any key combination',
          category: 'Controls',
          details: ['Any key binding', 'Toggle or hold modes', 'Multiple hotkeys'],
          tier: 'plus'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Human Reaction Delay',
          description: 'Adjustable delay mimics real human reaction time',
          category: 'Realism',
          details: ['1-500ms range', 'Randomization', 'Realistic timing'],
          tier: 'plus',
          highlight: true
        }
      ]
    },
    {
      id: 'visuals',
      name: 'Premium Visual Suite',
      icon: '👁️',
      description: 'Complete enemy detection and information system',
      tierRequired: 'lite',
      features: [
        {
          id: 'esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Various box styles for enemy highlighting',
          category: 'ESP',
          details: ['Standard boxes', 'Filled boxes', 'Gradient boxes', 'Custom colors'],
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization through walls',
          category: 'ESP',
          details: ['Full skeleton display', 'Pose detection', 'Color customization'],
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Precise head position indicators for targeting',
          category: 'Targeting',
          details: ['Headshot assistance', 'Size adjustment', 'Color options'],
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Show enemy usernames and team colors',
          category: 'Information',
          details: ['Username display', 'Team identification', 'Distance info'],
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Dynamic Health Bars',
          description: 'Real-time health visualization in multiple formats',
          category: 'Health Info',
          details: ['Normal bars', 'Dynamic bars', 'Numerical display', 'Color coding'],
          tier: 'all',
          highlight: true
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flag System',
          description: 'Real-time player status and activity indicators',
          category: 'Status',
          details: ['Money indicator', 'Defusing status', 'Immunity flags', 'Flash indicators'],
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Complete weapon and positioning data',
          category: 'Intel',
          details: ['Current weapon', 'Distance calculation', 'Spotted ESP', 'Movement tracking'],
          tier: 'all'
        }
      ]
    },
    {
      id: 'grenades',
      name: 'Grenade Helper Pro',
      icon: '💣',
      description: 'Professional grenade trajectory assistance',
      tierRequired: 'pro',
      features: [
        {
          id: 'grenade-helper',
          icon: '📍',
          title: 'Smart Trajectory Lines',
          description: 'Perfect smoke and flash trajectories every time',
          category: 'Trajectories',
          details: ['Landing predictions', 'Arc visualization', 'Bounce calculations'],
          tier: 'pro',
          premium: true
        },
        {
          id: 'grenade-custom',
          icon: '📁',
          title: 'Custom Lineup System',
          description: 'Record and save your personal grenade lineups',
          category: 'Custom Setup',
          details: ['Personal database', 'Quick access', 'Map-specific lineups'],
          tier: 'pro',
          premium: true
        }
      ]
    },
    {
      id: 'security',
      name: 'Professional Security',
      icon: '🛡️',
      description: 'Elite anti-detection and streaming protection',
      tierRequired: 'pro',
      features: [
        {
          id: 'streamproof',
          icon: '📺',
          title: 'Full Stream Protection',
          description: 'Completely undetectable during streaming',
          category: 'Streaming',
          details: ['OBS compatibility', 'Screen capture protection', 'Zero visibility'],
          tier: 'pro',
          premium: true,
          highlight: true
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Configuration',
          description: 'Secure cloud-based settings storage',
          category: 'Configuration',
          details: ['Cross-device sync', 'Automatic backups', 'Secure encryption'],
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
      description: 'Professional targeting assistance with smart controls',
      tierRequired: 'plus',
      features: [
        {
          id: 'aimbot-teammates',
          icon: '👥',
          title: 'Teammate Targeting Control',
          description: 'Smart detection to prevent friendly fire incidents',
          category: 'Safety',
          details: ['Toggle teammate targeting', 'Prevents accidents'],
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Only Aiming',
          description: 'Only targets visible enemies for natural gameplay',
          category: 'Smart Targeting',
          details: ['Reduces suspicious behavior', 'Natural patterns'],
          tier: 'plus'
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Human-Like Smoothing',
          description: 'Advanced smoothing algorithms mimic natural movement',
          category: 'Anti-Detection',
          details: ['Multiple smoothness levels', 'Anti-cheat evasion'],
          tier: 'plus'
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Precision FOV Control',
          description: 'Adjustable field of view for targeting accuracy',
          category: 'Customization',
          details: ['Custom FOV radius', 'Pixel-perfect targeting'],
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
          description: 'Bind activation to any key combination',
          category: 'Controls',
          details: ['Any key binding', 'Toggle or hold modes'],
          tier: 'plus'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Human Reaction Delay',
          description: 'Adjustable delay mimics human reaction time',
          category: 'Realism',
          details: ['1-500ms range', 'Randomization'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'visuals',
      name: 'Premium Visual Suite',
      icon: '👁️',
      description: 'Complete enemy detection system',
      tierRequired: 'lite',
      features: [
        {
          id: 'esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Various box styles for enemy highlighting',
          category: 'ESP',
          details: ['Standard boxes', 'Filled boxes', 'Gradient boxes'],
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization',
          category: 'ESP',
          details: ['Full skeleton display', 'Color customization'],
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Precise head position indicators',
          category: 'Targeting',
          details: ['Headshot assistance', 'Size adjustment'],
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Show enemy usernames and info',
          category: 'Information',
          details: ['Username display', 'Team colors'],
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Dynamic Health Bars',
          description: 'Real-time health visualization',
          category: 'Health Info',
          details: ['Multiple formats', 'Color coding'],
          tier: 'all'
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flag System',
          description: 'Player status indicators',
          category: 'Status',
          details: ['Money, defusing, immunity, flash status'],
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Weapon and positioning data',
          category: 'Intel',
          details: ['Weapon display', 'Distance info', 'Movement tracking'],
          tier: 'all'
        }
      ]
    },
    {
      id: 'config',
      name: 'Configuration System',
      icon: '⚙️',
      description: 'Advanced settings management',
      tierRequired: 'lite',
      features: [
        {
          id: 'config-save',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your perfect settings',
          category: 'Settings',
          details: ['Multiple profiles', 'Quick switching'],
          tier: 'all'
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Access configs from any device',
          category: 'Cloud Features',
          details: ['Cross-device sync', 'Automatic backups'],
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
      description: 'Core enemy detection features',
      tierRequired: 'lite',
      features: [
        {
          id: 'esp-boxes',
          icon: '📦',
          title: 'Multi-Style ESP Boxes',
          description: 'Various box styles for enemy highlighting',
          category: 'ESP',
          details: ['Standard boxes', 'Filled boxes', 'Gradient boxes'],
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization',
          category: 'ESP',
          details: ['Full skeleton display'],
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Head position indicators',
          category: 'Targeting',
          details: ['Headshot assistance'],
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Show enemy usernames',
          category: 'Information',
          details: ['Username display'],
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Health Bars',
          description: 'Real-time health visualization',
          category: 'Health Info',
          details: ['Multiple display modes'],
          tier: 'all'
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flags',
          description: 'Player status indicators',
          category: 'Status',
          details: ['Money, defusing, immunity, flash status'],
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Basic weapon and distance data',
          category: 'Intel',
          details: ['Weapon display', 'Distance calculation'],
          tier: 'all'
        }
      ]
    },
    {
      id: 'config',
      name: 'Configuration System',
      icon: '⚙️',
      description: 'Basic settings management',
      tierRequired: 'lite',
      features: [
        {
          id: 'config-save',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store your settings',
          category: 'Settings',
          details: ['Profile saving'],
          tier: 'all'
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Cloud-based configuration',
          category: 'Cloud Features',
          details: ['Basic cloud sync'],
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
      description: 'Machine learning powered targeting system',
      tierRequired: 'plus',
      features: [
        {
          id: 'ai-aimbot-keys',
          icon: '⌨️',
          title: 'Advanced Hotkey System',
          description: 'Aimstop key and customizable controls',
          category: 'Controls',
          details: ['Aimstop emergency key', 'Custom hotkey binding', 'Multiple modes'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-position',
          icon: '🎯',
          title: 'Smart Target Selection',
          description: 'AI-powered aim priority system',
          category: 'AI Targeting',
          details: ['Head priority', 'Chest targeting', 'Pelvis option', 'X-Axis mode'],
          tier: 'plus',
          premium: true
        },
        {
          id: 'ai-aimbot-smoothing',
          icon: '🎚️',
          title: 'Package Chance System',
          description: 'Advanced smoothing for natural movement',
          category: 'Anti-Detection',
          details: ['Probability-based smoothing', 'Human-like patterns', 'Customizable levels'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-pid',
          icon: '🎛️',
          title: 'PID Controller',
          description: 'Professional-grade mouse movement smoothing',
          category: 'Advanced Control',
          details: ['Advanced algorithms', 'Undetectable movement', 'Professional tuning'],
          tier: 'plus',
          premium: true,
          highlight: true
        },
        {
          id: 'ai-aimbot-prediction',
          icon: '🔮',
          title: 'Target Prediction AI',
          description: 'Predict enemy movement when out of sight',
          category: 'AI Features',
          details: ['Movement prediction', 'Behavioral analysis', 'Advanced algorithms'],
          tier: 'plus',
          premium: true
        }
      ]
    },
    {
      id: 'rcs',
      name: 'Recoil Control System',
      icon: '📊',
      description: 'Advanced recoil compensation technology',
      tierRequired: 'plus',
      features: [
        {
          id: 'rcs-pattern',
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'Real-time recoil pattern visualization',
          category: 'Visual Aid',
          details: ['Pattern display', 'Real-time feedback', 'Learning tool'],
          tier: 'plus'
        },
        {
          id: 'rcs-weapons',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized profiles for all weapon types',
          category: 'Weapons',
          details: ['8 weapon profiles', 'Auto-detection', 'Custom per weapon'],
          tier: 'plus',
          highlight: true
        },
        {
          id: 'rcs-intensity',
          icon: '⚡',
          title: 'Intensity Control',
          description: 'Fine-tune recoil compensation strength',
          category: 'Customization',
          details: ['0-100% intensity', 'Real-time adjustment', 'Per-weapon settings'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'visuals',
      name: 'Elite Visual System',
      icon: '👁️',
      description: 'Professional enemy detection suite',
      tierRequired: 'plus',
      features: [
        {
          id: 'bf6-esp-boxes',
          icon: '📦',
          title: 'Advanced ESP Boxes',
          description: 'Multiple box styles for enemy detection',
          category: 'ESP',
          details: ['Box ESP', 'Filled boxes', 'Gradient boxes'],
          tier: 'plus'
        },
        {
          id: 'bf6-esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization',
          category: 'ESP',
          details: ['Full skeleton', 'Color customization'],
          tier: 'plus'
        },
        {
          id: 'bf6-esp-head',
          icon: '🎯',
          title: 'Head Dot Targeting',
          description: 'Precise head targeting indicators',
          category: 'Targeting',
          details: ['Headshot assistance', 'Size adjustable'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'security',
      name: 'Professional Security',
      icon: '🛡️',
      description: 'Elite protection and configuration',
      tierRequired: 'pro',
      features: [
        {
          id: 'bf6-streamproof',
          icon: '📺',
          title: 'Full Stream Protection',
          description: 'Completely undetectable during streaming',
          category: 'Streaming',
          details: ['OBS compatibility', 'Screen capture protection'],
          tier: 'pro',
          premium: true
        },
        {
          id: 'bf6-config-save',
          icon: '💾',
          title: 'Advanced Config Management',
          description: 'Professional configuration system',
          category: 'Configuration',
          details: ['Multiple profiles', 'Quick switching', 'Scene-based configs'],
          tier: 'plus'
        },
        {
          id: 'bf6-config-cloud',
          icon: '☁️',
          title: 'Cloud Configuration',
          description: 'Secure cloud-based settings',
          category: 'Cloud Features',
          details: ['Cross-device access', 'Automatic backups', 'Secure encryption'],
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
      description: 'Smart targeting assistance system',
      tierRequired: 'plus',
      features: [
        {
          id: 'ai-aimbot-keys',
          icon: '⌨️',
          title: 'Advanced Hotkey System',
          description: 'Aimstop key and customizable controls',
          category: 'Controls',
          details: ['Aimstop emergency key', 'Custom hotkeys'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-position',
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Head, chest, and pelvis targeting options',
          category: 'Targeting',
          details: ['Head priority', 'Chest targeting', 'Pelvis option'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-smoothing',
          icon: '🎚️',
          title: 'Package Chance Control',
          description: 'Adjustable aim assistance probability',
          category: 'Control',
          details: ['Probability settings', 'Natural patterns'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-pid',
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional mouse movement smoothing',
          category: 'Advanced Control',
          details: ['Smooth movement', 'Professional algorithms'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-prediction',
          icon: '🔮',
          title: 'Target Prediction Algorithm',
          description: 'Intelligent movement prediction',
          category: 'AI Features',
          details: ['Movement analysis', 'Predictive targeting'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'rcs',
      name: 'Recoil Control System',
      icon: '📊',
      description: 'Advanced recoil management',
      tierRequired: 'plus',
      features: [
        {
          id: 'rcs-pattern',
          icon: '📊',
          title: 'Visual Recoil Patterns',
          description: 'Real-time pattern visualization',
          category: 'Visual Aid',
          details: ['Pattern display', 'Real-time feedback'],
          tier: 'plus'
        },
        {
          id: 'rcs-weapons',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized for all weapon types',
          category: 'Weapons',
          details: ['8 weapon profiles', 'Auto-detection'],
          tier: 'plus'
        },
        {
          id: 'rcs-intensity',
          icon: '⚡',
          title: 'Adjustable Intensity',
          description: 'Fine-tune compensation strength',
          category: 'Customization',
          details: ['0-100% intensity', 'Real-time adjustment'],
          tier: 'plus'
        }
      ]
    },
    {
      id: 'config',
      name: 'Configuration System',
      icon: '⚙️',
      description: 'Advanced settings management',
      tierRequired: 'plus',
      features: [
        {
          id: 'bf6-config-save',
          icon: '💾',
          title: 'Save Configuration',
          description: 'Store and manage settings',
          category: 'Configuration',
          details: ['Multiple profiles', 'Quick switching'],
          tier: 'plus'
        },
        {
          id: 'bf6-config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Cloud-based configuration system',
          category: 'Cloud Features',
          details: ['Access anywhere', 'Automatic backups'],
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