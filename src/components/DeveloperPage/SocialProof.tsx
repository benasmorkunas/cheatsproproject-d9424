'use client';

import { motion } from 'framer-motion';
import { Star, Shield, Users, Clock, Award, Zap } from 'lucide-react';
import Image from 'next/image';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Senior Developer',
      image: '/api/placeholder/60/60',
      rating: 5,
      text: 'Working with cheats-pro has been an incredible journey. The technical challenges are fascinating, and the team is genuinely supportive. The revenue share model means I earn more as we succeed together.',
      joinedDate: '2022'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Game Security Specialist',
      image: '/api/placeholder/60/60',
      rating: 5,
      text: 'The flexibility to work remotely while tackling cutting-edge anti-detection systems is unmatched. The learning opportunities here have accelerated my career beyond what I thought possible.',
      joinedDate: '2023'
    },
    {
      name: 'David Kim',
      role: 'Full-Stack Developer',
      image: '/api/placeholder/60/60',
      rating: 5,
      text: 'From day one, I felt welcomed into an elite team that values innovation and quality. The compensation is competitive, and the work is genuinely exciting. Best career move I\'ve made.',
      joinedDate: '2023'
    }
  ];

  const trustIndicators = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Undetected Since 2019',
      subtitle: 'Proven track record of security',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '1000+ Active Users',
      subtitle: 'Global community trust',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Support',
      subtitle: 'Always available for our team',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Industry Leading',
      subtitle: 'Setting the standard for quality',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const techBadges = [
    'CS:GO', 'Valorant', 'Apex Legends', 'Call of Duty', 'Fortnite', 'PUBG',
    'Overwatch', 'Rainbow Six', 'Battlefield', 'Rust'
  ];

  const achievements = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: '99.9% Uptime',
      description: 'Reliable service delivery'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '15+ Team Members',
      description: 'Growing international team'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Zero Bans',
      description: 'Advanced detection evasion'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '4.9/5 Rating',
      description: 'Exceptional user satisfaction'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">




      </div>
    </section>
  );
}