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
          description: 'Smart detection to prevent friendly fire incidents',
          category: 'Safety',
          details: ['Advanced CS2 aimbot teammate protection system automatically detects friendly players to prevent accidental team kills using smart recognition algorithms. This undetected Counter-Strike 2 cheat ensures your CS2 hack maintains tactical advantage while avoiding suspicious friendly fire incidents in competitive gameplay.'],
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Only Aiming',
          description: 'Only targets visible enemies for natural gameplay',
          category: 'Smart Targeting',
          details: ['Professional CS2 aimbot with visibility-only targeting creates natural gameplay patterns by only activating when enemies are actually visible using advanced line of sight detection. This premium Counter-Strike 2 cheat mimics human reaction patterns, making your CS2 hack completely undetected by VAC and other anti-cheat systems.'],
          tier: 'plus',
          highlight: true
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Human-Like Smoothing',
          description: 'Advanced smoothing algorithms mimic natural mouse movement',
          category: 'Anti-Detection',
          details: ['Elite CS2 aimbot smoothing technology uses advanced algorithms to mimic natural human mouse movement patterns with multiple smoothness levels and customizable curves. This undetected Counter-Strike 2 cheat ensures your CS2 hack remains completely invisible to VAC while maintaining deadly accuracy in competitive matches.'],
          tier: 'plus',
          premium: true
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Precision FOV Control',
          description: 'Adjustable field of view for perfect targeting accuracy',
          category: 'Customization',
          details: ['Advanced CS2 aimbot FOV control system with customizable radius settings allows precise targeting accuracy and pixel-perfect crosshair placement for maximum competitive advantage. This professional Counter-Strike 2 cheat features dynamic field of view adjustment technology that ensures your CS2 hack remains undetected while delivering tactical supremacy in competitive gameplay.'],
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
          description: 'Bind activation to any key combination',
          category: 'Controls',
          details: ['Professional CS2 triggerbot hotkey system supports unlimited custom key bindings with flexible toggle and hold mode activation options for ultimate gaming control. This undetected Counter-Strike 2 cheat allows multiple hotkey configurations, ensuring your CS2 hack provides seamless activation without interfering with competitive gameplay performance and anti-cheat detection.'],
          tier: 'plus'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Human Reaction Delay',
          description: 'Adjustable delay mimics real human reaction time',
          category: 'Realism',
          details: ['Elite CS2 triggerbot human reaction delay system features customizable 1-500ms timing range with advanced randomization algorithms that perfectly mimic natural human response patterns. This undetected Counter-Strike 2 cheat ensures your CS2 hack maintains realistic shooting timing, providing tactical advantage while remaining completely invisible to VAC and competitive anti-cheat systems.'],
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
          description: 'Various box styles for enemy highlighting',
          category: 'ESP',
          details: ['Premium CS2 ESP wallhack system featuring multiple visual box styles including standard outlines, filled boxes, and gradient-filled options with custom color selection for crystal-clear enemy visualization. This undetected Counter-Strike 2 cheat helps you track enemy positions and movement patterns through walls, providing maximum competitive advantage and superior map awareness.'],
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization through walls',
          category: 'ESP',
          details: ['Advanced CS2 ESP wallhack skeleton system displays complete enemy bone structure through walls with intelligent pose detection and full color customization options for crystal-clear enemy visualization. This premium Counter-Strike 2 cheat provides undetected skeleton tracking that helps you monitor enemy movement patterns and positioning, giving you maximum tactical advantage in competitive matches.'],
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Precise head position indicators for targeting',
          category: 'Targeting',
          details: ['Professional CS2 ESP wallhack head dot targeting system provides precise headshot assistance with fully adjustable size and color customization for optimal enemy head position visualization. This undetected Counter-Strike 2 cheat enhances your CS2 hack accuracy by highlighting exact head locations through walls, ensuring perfect headshot placement and competitive dominance.'],
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Show enemy usernames and team colors',
          category: 'Information',
          details: ['Premium CS2 ESP wallhack player name display system shows enemy usernames with intelligent team identification colors and real-time distance calculation for complete battlefield awareness. This undetected Counter-Strike 2 cheat provides essential tactical information through your CS2 hack, helping you identify threats and coordinate strategic gameplay in competitive matches.'],
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Dynamic Health Bars',
          description: 'Real-time health visualization in multiple formats',
          category: 'Health Info',
          details: ['Advanced CS2 ESP wallhack health bar system features multiple display modes including normal bars, dynamic bars, numerical display, and intelligent color coding for instant enemy health assessment. This professional Counter-Strike 2 cheat provides real-time health visualization through your CS2 hack, enabling tactical decision-making and strategic advantage in competitive gameplay scenarios.'],
          tier: 'all',
          highlight: true
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flag System',
          description: 'Real-time player status and activity indicators',
          category: 'Status',
          details: ['Elite CS2 ESP wallhack status flag system displays critical player information including money indicators, defusing status, immunity flags, and flash indicators for complete battlefield intelligence. This undetected Counter-Strike 2 cheat provides comprehensive tactical awareness through your CS2 hack, ensuring you have all necessary information for strategic decision-making and competitive dominance.'],
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Complete weapon and positioning data',
          category: 'Intel',
          details: ['Professional CS2 ESP wallhack weapon and distance system displays current enemy weapons with precise distance calculations, spotted ESP indicators, and advanced movement tracking capabilities. This premium Counter-Strike 2 cheat provides complete enemy intelligence through your CS2 hack, helping you assess threats and plan tactical approaches for maximum competitive advantage.'],
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
          description: 'Perfect smoke and flash trajectories every time',
          category: 'Trajectories',
          details: ['Advanced CS2 grenade helper trajectory system features precise landing predictions with visual arc display and intelligent bounce calculations for perfect smoke and flash lineups every time. This professional Counter-Strike 2 cheat provides undetected trajectory assistance through your CS2 hack, ensuring tactical grenade placement and strategic advantage in competitive gameplay scenarios.'],
          tier: 'pro',
          premium: true
        },
        {
          id: 'grenade-custom',
          icon: '📁',
          title: 'Custom Lineup System',
          description: 'Record and save your personal grenade lineups',
          category: 'Custom Setup',
          details: ['Elite CS2 grenade helper custom lineup system allows you to record and save personal grenade trajectories in a comprehensive database with quick access and map-specific organization. This premium Counter-Strike 2 cheat stores your favorite lineups through your CS2 hack, providing instant access to proven smoke and flash strategies for competitive dominance.'],
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
          description: 'Completely undetectable during streaming',
          category: 'Streaming',
          details: ['Professional CS2 hack stream protection system ensures complete invisibility during live streaming with full OBS compatibility and advanced screen capture protection technology. This elite Counter-Strike 2 cheat provides zero-visibility streaming mode for your CS2 hack, allowing content creators to maintain their reputation while enjoying undetected competitive advantages.'],
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
          details: ['Advanced CS2 hack cloud configuration system provides secure cross-device synchronization with automatic backups and military-grade encryption for your settings and profiles. This professional Counter-Strike 2 cheat ensures your CS2 hack configurations are safely stored and accessible from any device, maintaining consistency and security across all gaming setups.'],
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
          description: 'Smart detection to prevent friendly fire incidents',
          category: 'Safety',
          details: ['Advanced CS2 aimbot teammate protection system automatically detects friendly players to prevent accidental team kills using smart recognition algorithms. This undetected Counter-Strike 2 cheat ensures your CS2 hack maintains tactical advantage while avoiding suspicious friendly fire incidents in competitive gameplay.'],
          tier: 'plus'
        },
        {
          id: 'aimbot-spotted',
          icon: '👁️',
          title: 'Visibility-Only Aiming',
          description: 'Only targets visible enemies for natural gameplay',
          category: 'Smart Targeting',
          details: ['Professional CS2 aimbot with visibility-only targeting creates natural gameplay patterns by only activating when enemies are actually visible using advanced line of sight detection. This premium Counter-Strike 2 cheat mimics human reaction patterns, making your CS2 hack completely undetected by VAC and other anti-cheat systems.'],
          tier: 'plus'
        },
        {
          id: 'aimbot-smoothing',
          icon: '🎮',
          title: 'Human-Like Smoothing',
          description: 'Advanced smoothing algorithms mimic natural movement',
          category: 'Anti-Detection',
          details: ['Elite CS2 aimbot smoothing technology uses advanced algorithms to mimic natural human mouse movement patterns with multiple smoothness levels and customizable curves. This undetected Counter-Strike 2 cheat ensures your CS2 hack remains completely invisible to VAC while maintaining deadly accuracy in competitive matches.'],
          tier: 'plus'
        },
        {
          id: 'aimbot-fov',
          icon: '🔍',
          title: 'Precision FOV Control',
          description: 'Adjustable field of view for targeting accuracy',
          category: 'Customization',
          details: ['Advanced CS2 aimbot FOV control system with customizable radius settings allows precise targeting accuracy and pixel-perfect crosshair placement for maximum competitive advantage. This professional Counter-Strike 2 cheat features dynamic field of view adjustment technology that ensures your CS2 hack remains undetected while delivering tactical supremacy.'],
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
          details: ['Professional CS2 triggerbot hotkey system supports unlimited custom key bindings with flexible toggle and hold mode activation options for ultimate gaming control. This undetected Counter-Strike 2 cheat allows multiple hotkey configurations, ensuring your CS2 hack provides seamless activation without interfering with competitive gameplay performance.'],
          tier: 'plus'
        },
        {
          id: 'triggerbot-delay',
          icon: '⏱️',
          title: 'Human Reaction Delay',
          description: 'Adjustable delay mimics human reaction time',
          category: 'Realism',
          details: ['Elite CS2 triggerbot human reaction delay system features customizable 1-500ms timing range with advanced randomization algorithms that perfectly mimic natural human response patterns. This undetected Counter-Strike 2 cheat ensures your CS2 hack maintains realistic shooting timing, providing tactical advantage while remaining invisible to anti-cheat systems.'],
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
          description: 'Various box styles for enemy highlighting',
          category: 'ESP',
          details: ['Premium CS2 ESP wallhack system featuring multiple visual box styles including standard outlines, filled boxes, and gradient-filled options with custom color selection for crystal-clear enemy visualization. This undetected Counter-Strike 2 cheat helps you track enemy positions and movement patterns through walls, providing maximum competitive advantage and superior map awareness.'],
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization',
          category: 'ESP',
          details: ['Advanced CS2 ESP wallhack skeleton system displays complete enemy bone structure through walls with intelligent pose detection and full color customization options for crystal-clear enemy visualization. This premium Counter-Strike 2 cheat provides undetected skeleton tracking that helps you monitor enemy movement patterns and positioning for tactical advantage.'],
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Precise head position indicators',
          category: 'Targeting',
          details: ['Professional CS2 ESP wallhack head dot targeting system provides precise headshot assistance with fully adjustable size and color customization for optimal enemy head position visualization. This undetected Counter-Strike 2 cheat enhances your CS2 hack accuracy by highlighting exact head locations through walls, ensuring perfect headshot placement and competitive dominance.'],
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Show enemy usernames and info',
          category: 'Information',
          details: ['Premium CS2 ESP wallhack player name display system shows enemy usernames with intelligent team identification colors and real-time distance calculation for complete battlefield awareness. This undetected Counter-Strike 2 cheat provides essential tactical information through your CS2 hack, helping you identify threats and coordinate strategic gameplay in competitive matches.'],
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Dynamic Health Bars',
          description: 'Real-time health visualization',
          category: 'Health Info',
          details: ['Advanced CS2 ESP wallhack health bar system features multiple display modes including normal bars, dynamic bars, numerical display, and intelligent color coding for instant enemy health assessment. This professional Counter-Strike 2 cheat provides real-time health visualization through your CS2 hack, enabling tactical decision-making and strategic advantage in competitive gameplay.'],
          tier: 'all'
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flag System',
          description: 'Player status indicators',
          category: 'Status',
          details: ['Elite CS2 ESP wallhack status flag system displays critical player information including money indicators, defusing status, immunity flags, and flash indicators for complete battlefield intelligence. This undetected Counter-Strike 2 cheat provides comprehensive tactical awareness through your CS2 hack, ensuring you have all necessary information for strategic decision-making and competitive dominance.'],
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Weapon and positioning data',
          category: 'Intel',
          details: ['Professional CS2 ESP wallhack weapon and distance system displays current enemy weapons with precise distance calculations, spotted ESP indicators, and advanced movement tracking capabilities. This premium Counter-Strike 2 cheat provides complete enemy intelligence through your CS2 hack, helping you assess threats and plan tactical approaches for maximum competitive advantage.'],
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
          description: 'Store your perfect settings',
          category: 'Settings',
          details: ['Advanced CS2 hack configuration management system allows multiple profile creation with instant switching capabilities for different game modes and competitive scenarios. This professional Counter-Strike 2 cheat provides seamless configuration control for your CS2 hack, ensuring optimal settings adaptation for various gameplay situations and tactical requirements.'],
          tier: 'all'
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Access configs from any device',
          category: 'Cloud Features',
          details: ['Premium CS2 hack cloud storage system provides secure cross-device synchronization with automatic backup functionality for your settings and profiles across all gaming devices. This undetected Counter-Strike 2 cheat ensures your CS2 hack configurations remain consistent and accessible, maintaining optimal performance and tactical advantage regardless of your gaming setup.'],
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
          description: 'Various box styles for enemy highlighting',
          category: 'ESP',
          details: ['Essential CS2 ESP wallhack system featuring multiple visual box styles including standard outlines, filled boxes, and gradient-filled options for clear enemy detection and visualization. This undetected Counter-Strike 2 cheat provides basic yet effective enemy highlighting through walls, giving you essential tactical advantage for improved competitive performance and map awareness.'],
          tier: 'all'
        },
        {
          id: 'esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization',
          category: 'ESP',
          details: ['Basic CS2 ESP wallhack skeleton system displays enemy bone structure through walls for clear visualization of player poses and positioning patterns. This undetected Counter-Strike 2 cheat provides essential skeleton tracking that helps you monitor enemy movement and body positioning, ensuring tactical awareness in competitive gameplay.'],
          tier: 'all'
        },
        {
          id: 'esp-head-dot',
          icon: '🎯',
          title: 'Head Dot Markers',
          description: 'Head position indicators',
          category: 'Targeting',
          details: ['Essential CS2 ESP wallhack head dot targeting system provides basic headshot assistance by highlighting enemy head positions for improved targeting accuracy. This undetected Counter-Strike 2 cheat enhances your CS2 hack precision by marking exact head locations through walls, helping you achieve better headshot performance in competitive matches.'],
          tier: 'all'
        },
        {
          id: 'esp-names',
          icon: '📝',
          title: 'Player Name Display',
          description: 'Show enemy usernames',
          category: 'Information',
          details: ['Basic CS2 ESP wallhack player name display system shows enemy usernames for essential player identification and team recognition during competitive gameplay. This undetected Counter-Strike 2 cheat provides fundamental tactical information through your CS2 hack, helping you identify opponents and track enemy players across different rounds.'],
          tier: 'all'
        },
        {
          id: 'esp-healthbar',
          icon: '❤️',
          title: 'Health Bars',
          description: 'Real-time health visualization',
          category: 'Health Info',
          details: ['Essential CS2 ESP wallhack health bar system features multiple display modes for real-time enemy health monitoring and tactical assessment during competitive gameplay. This undetected Counter-Strike 2 cheat provides basic health visualization through your CS2 hack, enabling better decision-making and strategic advantage when engaging opponents.'],
          tier: 'all'
        },
        {
          id: 'esp-flags',
          icon: '🏷️',
          title: 'Status Flags',
          description: 'Player status indicators',
          category: 'Status',
          details: ['Basic CS2 ESP wallhack status flag system displays essential player information including money, defusing status, immunity, and flash indicators for fundamental battlefield awareness. This undetected Counter-Strike 2 cheat provides core tactical information through your CS2 hack, ensuring you have basic situational awareness for competitive decision-making.'],
          tier: 'all'
        },
        {
          id: 'esp-weapons',
          icon: '🔫',
          title: 'Weapon & Distance Info',
          description: 'Basic weapon and distance data',
          category: 'Intel',
          details: ['Essential CS2 ESP wallhack weapon and distance system displays basic enemy weapon information with distance calculations for fundamental tactical intelligence. This undetected Counter-Strike 2 cheat provides core enemy intelligence through your CS2 hack, helping you assess basic threat levels and plan engagement strategies in competitive matches.'],
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
          description: 'Store your settings',
          category: 'Settings',
          details: ['Basic CS2 hack configuration system allows profile saving functionality to store your preferred settings and maintain consistent gameplay experience across different sessions. This undetected Counter-Strike 2 cheat provides essential configuration management for your CS2 hack, ensuring your basic settings are preserved and easily accessible for competitive gaming.'],
          tier: 'all'
        },
        {
          id: 'config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Cloud-based configuration',
          category: 'Cloud Features',
          details: ['Essential CS2 hack cloud storage system provides basic synchronization functionality to access your configuration settings from different devices and gaming setups. This undetected Counter-Strike 2 cheat ensures your CS2 hack settings remain available across platforms, providing consistent performance and tactical advantage regardless of your gaming location.'],
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
          description: 'Aimstop key and customizable controls',
          category: 'Controls',
          details: ['Advanced BF6 aimbot hotkey system features emergency aimstop functionality with unlimited custom key binding options and multiple activation modes for ultimate control during intense Battlefield 6 combat scenarios. This undetected Battlefield 6 cheat provides professional hotkey management for your BF6 hack, ensuring seamless aimbot control without interfering with competitive gameplay performance and anti-cheat detection.'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-position',
          icon: '🎯',
          title: 'Smart Target Selection',
          description: 'AI-powered aim priority system',
          category: 'AI Targeting',
          details: ['Professional BF6 aimbot AI targeting system features intelligent head priority selection, chest targeting options, pelvis targeting modes, and advanced X-Axis aiming for maximum versatility in combat situations. This elite Battlefield 6 cheat uses machine learning algorithms in your BF6 hack to automatically select optimal target zones, ensuring deadly accuracy and tactical superiority in competitive matches.'],
          tier: 'plus',
          premium: true
        },
        {
          id: 'ai-aimbot-smoothing',
          icon: '🎚️',
          title: 'Package Chance System',
          description: 'Advanced smoothing for natural movement',
          category: 'Anti-Detection',
          details: ['Elite BF6 aimbot package chance system uses advanced probability-based smoothing algorithms to create authentic human-like movement patterns with fully customizable smoothness levels. This undetected Battlefield 6 cheat ensures your BF6 hack maintains natural aiming behavior that perfectly mimics human players, providing maximum accuracy while remaining completely invisible to anti-cheat systems.'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-pid',
          icon: '🎛️',
          title: 'PID Controller',
          description: 'Professional-grade mouse movement smoothing',
          category: 'Advanced Control',
          details: ['Professional BF6 aimbot PID controller system utilizes advanced mathematical algorithms for undetectable mouse movement with professional-grade tuning capabilities for perfect aim smoothing. This elite Battlefield 6 cheat provides industry-leading movement control through your BF6 hack, ensuring flawless targeting precision while maintaining complete invisibility from anti-cheat detection systems.'],
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
          details: ['Advanced BF6 aimbot target prediction AI uses machine learning to analyze enemy movement patterns and predict player positions when targets move out of sight or behind cover. This professional Battlefield 6 cheat provides predictive targeting through your BF6 hack, giving you tactical advantage by anticipating enemy movements and maintaining accuracy in dynamic combat scenarios.'],
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
          description: 'Real-time recoil pattern visualization',
          category: 'Visual Aid',
          details: ['Advanced BF6 recoil control system features visual pattern display with real-time feedback mechanisms and integrated learning tools for mastering weapon recoil patterns across all Battlefield 6 weapons. This professional Battlefield 6 cheat provides comprehensive recoil visualization through your BF6 hack, helping you understand and control weapon spray patterns for maximum accuracy and competitive advantage.'],
          tier: 'plus'
        },
        {
          id: 'rcs-weapons',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized profiles for all weapon types',
          category: 'Weapons',
          details: ['Elite BF6 recoil control system includes eight optimized weapon profiles with automatic weapon detection technology and custom per-weapon settings for every firearm in Battlefield 6. This professional Battlefield 6 cheat provides intelligent weapon recognition through your BF6 hack, automatically adjusting recoil compensation based on your current weapon for perfect spray control and tactical superiority.'],
          tier: 'plus',
          highlight: true
        },
        {
          id: 'rcs-intensity',
          icon: '⚡',
          title: 'Intensity Control',
          description: 'Fine-tune recoil compensation strength',
          category: 'Customization',
          details: ['Professional BF6 recoil control intensity system offers complete 0-100% compensation control with real-time adjustment capabilities and individual per-weapon settings for ultimate customization. This advanced Battlefield 6 cheat provides precise recoil management through your BF6 hack, allowing fine-tuned control over compensation strength to match your playstyle and weapon preferences.'],
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
          description: 'Multiple box styles for enemy detection',
          category: 'ESP',
          details: ['Advanced BF6 ESP wallhack system features multiple box styles including standard outlines, filled boxes, and gradient-filled options for crystal-clear enemy detection and visualization through walls and cover. This professional Battlefield 6 cheat provides comprehensive enemy highlighting through your BF6 hack, ensuring maximum battlefield awareness and tactical advantage in competitive Battlefield 6 matches.'],
          tier: 'plus'
        },
        {
          id: 'bf6-esp-skeleton',
          icon: '🦴',
          title: 'Skeleton ESP',
          description: 'Bone structure visualization',
          category: 'ESP',
          details: ['Elite BF6 ESP wallhack skeleton system displays complete enemy bone structure through walls and obstacles with full color customization options for optimal enemy visualization and pose detection. This professional Battlefield 6 cheat provides advanced skeleton tracking through your BF6 hack, helping you monitor enemy movement patterns and positioning for tactical advantage in combat scenarios.'],
          tier: 'plus'
        },
        {
          id: 'bf6-esp-head',
          icon: '🎯',
          title: 'Head Dot Targeting',
          description: 'Precise head targeting indicators',
          category: 'Targeting',
          details: ['Professional BF6 ESP wallhack head dot targeting system provides precise headshot assistance with fully adjustable size settings for optimal enemy head position visualization and targeting accuracy. This undetected Battlefield 6 cheat enhances your BF6 hack precision by highlighting exact head locations through walls, ensuring perfect headshot placement and competitive dominance in Battlefield 6 matches.'],
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
          description: 'Completely undetectable during streaming',
          category: 'Streaming',
          details: ['Professional BF6 hack stream protection system ensures complete invisibility during live streaming with full OBS compatibility and advanced screen capture protection technology for content creators. This elite Battlefield 6 cheat provides zero-visibility streaming mode for your BF6 hack, allowing streamers to maintain their reputation while enjoying undetected competitive advantages in Battlefield 6.'],
          tier: 'pro',
          premium: true
        },
        {
          id: 'bf6-config-save',
          icon: '💾',
          title: 'Advanced Config Management',
          description: 'Professional configuration system',
          category: 'Configuration',
          details: ['Advanced BF6 hack configuration management system provides multiple profile creation with instant switching capabilities and scene-based configurations for different game modes and combat scenarios. This professional Battlefield 6 cheat offers comprehensive settings control for your BF6 hack, ensuring optimal configuration adaptation for various battlefield situations and tactical requirements.'],
          tier: 'plus'
        },
        {
          id: 'bf6-config-cloud',
          icon: '☁️',
          title: 'Cloud Configuration',
          description: 'Secure cloud-based settings',
          category: 'Cloud Features',
          details: ['Elite BF6 hack cloud configuration system provides secure cross-device access with automatic backup functionality and military-grade encryption for your settings and profiles across all gaming devices. This professional Battlefield 6 cheat ensures your BF6 hack configurations remain safely stored and accessible from any platform, maintaining consistency and security across all gaming setups.'],
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
          description: 'Aimstop key and customizable controls',
          category: 'Controls',
          details: ['Advanced BF6 aimbot hotkey system features emergency aimstop functionality with unlimited custom key binding options for ultimate control during intense Battlefield 6 combat scenarios. This undetected Battlefield 6 cheat provides professional hotkey management for your BF6 hack, ensuring seamless aimbot control without interfering with competitive gameplay performance.'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-position',
          icon: '🎯',
          title: 'Multi-Position Targeting',
          description: 'Head, chest, and pelvis targeting options',
          category: 'Targeting',
          details: ['Professional BF6 aimbot multi-position targeting system features intelligent head priority selection, chest targeting options, and pelvis targeting modes for maximum versatility in combat situations. This elite Battlefield 6 cheat provides versatile target selection through your BF6 hack, ensuring optimal targeting zones for different combat scenarios and enemy positions.'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-smoothing',
          icon: '🎚️',
          title: 'Package Chance Control',
          description: 'Adjustable aim assistance probability',
          category: 'Control',
          details: ['Elite BF6 aimbot package chance control system uses advanced probability settings to create authentic natural aiming patterns that perfectly mimic human player behavior. This undetected Battlefield 6 cheat ensures your BF6 hack maintains realistic aiming behavior with customizable probability levels, providing accuracy while remaining invisible to anti-cheat systems.'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-pid',
          icon: '🎛️',
          title: 'PID Controller System',
          description: 'Professional mouse movement smoothing',
          category: 'Advanced Control',
          details: ['Professional BF6 aimbot PID controller system utilizes advanced mathematical algorithms for smooth mouse movement and professional-grade aiming control with industry-leading precision. This elite Battlefield 6 cheat provides superior movement control through your BF6 hack, ensuring flawless targeting accuracy while maintaining complete invisibility from anti-cheat detection.'],
          tier: 'plus'
        },
        {
          id: 'ai-aimbot-prediction',
          icon: '🔮',
          title: 'Target Prediction Algorithm',
          description: 'Intelligent movement prediction',
          category: 'AI Features',
          details: ['Advanced BF6 aimbot target prediction algorithm uses intelligent movement analysis to predict enemy positions and provide predictive targeting capabilities for enhanced combat performance. This professional Battlefield 6 cheat offers predictive aiming through your BF6 hack, giving you tactical advantage by anticipating enemy movements in dynamic combat scenarios.'],
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
          description: 'Real-time pattern visualization',
          category: 'Visual Aid',
          details: ['Advanced BF6 recoil control system features visual pattern display with real-time feedback mechanisms for mastering weapon recoil patterns across all Battlefield 6 weapons. This professional Battlefield 6 cheat provides comprehensive recoil visualization through your BF6 hack, helping you control weapon spray patterns for maximum accuracy.'],
          tier: 'plus'
        },
        {
          id: 'rcs-weapons',
          icon: '🔫',
          title: 'Eight Weapon Profiles',
          description: 'Optimized for all weapon types',
          category: 'Weapons',
          details: ['Elite BF6 recoil control system includes eight optimized weapon profiles with automatic weapon detection technology for every firearm type in Battlefield 6. This professional Battlefield 6 cheat provides intelligent weapon recognition through your BF6 hack, automatically adjusting recoil compensation based on your current weapon for perfect spray control.'],
          tier: 'plus'
        },
        {
          id: 'rcs-intensity',
          icon: '⚡',
          title: 'Adjustable Intensity',
          description: 'Fine-tune compensation strength',
          category: 'Customization',
          details: ['Professional BF6 recoil control intensity system offers complete 0-100% compensation control with real-time adjustment capabilities for ultimate recoil management customization. This advanced Battlefield 6 cheat provides precise recoil control through your BF6 hack, allowing fine-tuned compensation strength to match your playstyle and weapon preferences.'],
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
          description: 'Store and manage settings',
          category: 'Configuration',
          details: ['Advanced BF6 hack configuration management system provides multiple profile creation with instant switching capabilities for different game modes and competitive scenarios. This professional Battlefield 6 cheat offers comprehensive settings control for your BF6 hack, ensuring optimal configuration adaptation for various battlefield situations and tactical requirements.'],
          tier: 'plus'
        },
        {
          id: 'bf6-config-cloud',
          icon: '☁️',
          title: 'Cloud Storage',
          description: 'Cloud-based configuration system',
          category: 'Cloud Features',
          details: ['Premium BF6 hack cloud storage system provides secure access from anywhere with automatic backup functionality for your settings and profiles across all gaming devices. This undetected Battlefield 6 cheat ensures your BF6 hack configurations remain consistent and accessible, maintaining optimal performance and tactical advantage regardless of your gaming setup.'],
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