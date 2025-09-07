'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Clock, Activity, Server, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/homepage/Header';
import { formatPrice } from '@/lib/utils';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cheats = [
    {
      id: 'cs2',
      name: 'CS2 Cheats',
      game: 'Counter-Strike 2',
      status: 'undetected',
      lastUpdate: '2024-08-24 09:15:00',
      version: 'v3.2.1',
      features: [
        { name: 'Wallhack/ESP', status: 'operational' },
        { name: 'Aimbot', status: 'operational' },
        { name: 'Grenade Helper', status: 'operational' },
        { name: 'Triggerbot', status: 'operational' },
        { name: 'Stream-proof', status: 'operational' }
      ],
      uptime: '99.98%',
      color: 'green',
      logo: '/images/cs2-cheats-status-logo.webp'
    },
    {
      id: 'bf6',
      name: 'BF6 Hacks',
      game: 'Battlefield 6',
      status: 'undetected',
      lastUpdate: '2024-08-24 08:45:00',
      version: 'v2.1.8',
      features: [
        { name: 'ESP/Wallhack', status: 'operational' },
        { name: 'Aimbot', status: 'operational' },
        { name: 'No Recoil', status: 'operational' },
        { name: 'PID Controller', status: 'operational' },
        { name: 'Target Prediction', status: 'operational' }
      ],
      uptime: '99.95%',
      color: 'green',
      logo: '/images/bf6-cheats-status-logo.webp'
    }
  ];

  const systemStatus = [
    { name: 'API Servers', status: 'operational', responseTime: '47ms' },
    { name: 'Authentication', status: 'operational', responseTime: '23ms' },
    { name: 'Download Servers', status: 'operational', responseTime: '31ms' },
    { name: 'Payment System', status: 'operational', responseTime: '89ms' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'undetected':
      case 'operational':
        return 'text-green-400';
      case 'maintenance':
        return 'text-yellow-400';
      case 'detected':
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'undetected':
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'maintenance':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'detected':
      case 'down':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <MinimalisticBackground>
      <Header />
      {/* Header */}
      <section className="relative py-16 pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-white">SYSTEM</span>{' '}
                <span className="bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                  STATUS
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Real-time status of Cheats-Pro Undetected Cheats Shop products
            </p>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 inline-block">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">All Systems Operational</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{currentTime?.toLocaleString() || 'Loading...'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cheat Status */}
        <section className="mb-16">

          <div className="grid md:grid-cols-2 gap-8">
            {cheats.map((cheat, index) => (
              <motion.div
                key={cheat.id}
                className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={cheat.logo}
                        alt={`${cheat.name} Logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{cheat.name}</h3>
                      <p className="text-gray-400">{cheat.game}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(cheat.status)}
                      <span className={`font-bold text-lg capitalize ${getStatusColor(cheat.status)}`}>
                        {cheat.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Uptime: {cheat.uptime}
                    </div>
                  </div>
                </div>

                {/* Status Details */}
                <div className="bg-black/30 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Version:</span>
                      <span className="text-white ml-2 font-medium">{cheat.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Update:</span>
                      <span className="text-white ml-2 font-medium">
                        {new Date(cheat.lastUpdate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Status */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Features Status</h4>
                  <div className="space-y-3">
                    {cheat.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-300">{feature.name}</span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(feature.status)}
                          <span className={`text-sm capitalize ${getStatusColor(feature.status)}`}>
                            {feature.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Undetected Badge */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 font-semibold">
                        Undetected - Safe to Use
                      </span>
                    </div>
                  </div>
                  
                  {/* Purchase Section */}
                  <div>
                    {/* Pricing Boxes */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-black/20 rounded-lg px-3 py-2 text-center">
                        <div className="text-xs flex justify-center items-center space-x-2">
                          <span className="text-gray-400">1 Day</span>
                          <span className="text-white font-medium">
                            {cheat.id === 'cs2' ? formatPrice('7.99') : formatPrice('7.99')}
                          </span>
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-lg px-3 py-2 text-center">
                        <div className="text-xs flex justify-center items-center space-x-2">
                          <span className="text-gray-400">7 Days</span>
                          <span className="text-white font-medium">
                            {cheat.id === 'cs2' ? formatPrice('19.99') : formatPrice('19.99')}
                          </span>
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-lg px-3 py-2 text-center">
                        <div className="text-xs flex justify-center items-center space-x-2">
                          <span className="text-gray-400">30 Days</span>
                          <span className="text-white font-medium">
                            {cheat.id === 'cs2' ? formatPrice('39.99') : formatPrice('39.99')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Purchase Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Purchase Now</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* System Infrastructure */}
        <section className="mb-16">

          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-4">
              {systemStatus.map((system, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 px-6 bg-black/30 rounded-xl hover:bg-black/40 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <Server className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">{system.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-gray-400 text-sm">
                      Response: {system.responseTime}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(system.status)}
                      <span className={`capitalize font-medium ${getStatusColor(system.status)}`}>
                        {system.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Overall Statistics */}
        <section>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.98%</div>
              <div className="text-gray-400">Overall Uptime</div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-gray-300 mb-2">47ms</div>
              <div className="text-gray-400">Avg Response Time</div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-gray-300 mb-2">0</div>
              <div className="text-gray-400">Detections This Month</div>
            </div>
            
          </motion.div>
        </section>

        {/* Status History */}
        <section className="mt-16">
          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Support?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is available 24/7 to help with any issues
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Discord Support
              </motion.button>
              
              <motion.button
                className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </MinimalisticBackground>
  );
}