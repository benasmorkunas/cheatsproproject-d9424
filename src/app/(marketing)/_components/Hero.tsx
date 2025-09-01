'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Shield, Zap, Target } from 'lucide-react';
import SmokeEmitter from './SmokeEmitter';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Shield,
      text: 'Undetected & Secure'
    },
    {
      icon: Zap,
      text: 'Instant Activation'
    },
    {
      icon: Target,
      text: 'Precision Tools'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 lg:py-32 overflow-hidden">
      {/* Background Smoke Effect */}
      <div className="absolute inset-0 z-0">
        <SmokeEmitter />
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px]">
          
          {/* Left Column - Text Content */}
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary tracking-loose">
                PROFESSIONAL GRADE
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-display-2xl font-bold text-foreground">
                <span className="block">Advanced Gaming</span>
                <span className="block bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Enhancement Suite
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-foreground-muted leading-relaxed tracking-loose max-w-2xl">
                Professional tools designed for competitive advantage. 
                Undetected, reliable, and built for serious players.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm ${
                    isLoaded ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${
              isLoaded ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '600ms' }}>
              <Button
                size="lg"
                className="btn-primary px-8 py-4 text-lg font-semibold group"
              >
                Get Access Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-medium border-border/50 bg-card/20 hover:bg-card/40 backdrop-blur-sm"
              >
                View Features
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className={`flex items-center gap-6 pt-6 border-t border-border/30 ${
              isLoaded ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ animationDelay: '800ms' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-foreground-muted">Uptime</div>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-foreground-muted">Support</div>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5K+</div>
                <div className="text-sm text-foreground-muted">Users</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className={`relative flex items-center justify-center lg:justify-end ${
            isLoaded ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '400ms' }}>
            
            {/* Product Image Container */}
            <div className="relative z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl scale-105 animate-pulse" />
                
                {/* Main Image */}
                <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 border border-border/50 backdrop-blur-sm shadow-2xl">
                  <picture>
                    <source srcSet="/images/bf6-pro-logo.webp" type="image/webp" />
                    <Image
                      src="/images/bf6-pro-logo.png"
                      alt="BF6 Pro Enhancement Suite"
                      width={400}
                      height={300}
                      className="w-full h-auto max-w-sm mx-auto"
                      priority
                      onLoad={() => setIsLoaded(true)}
                    />
                  </picture>
                  
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-success/20 border border-success/30 rounded-full">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-success">Online</span>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full animate-pulse opacity-60" />
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-cyan-400 rounded-full animate-pulse opacity-40" 
                     style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute inset-0 z-10">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-foreground-muted">
          <span className="text-xs tracking-looser uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}