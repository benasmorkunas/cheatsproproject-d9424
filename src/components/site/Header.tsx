'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, Menu, X, Shield } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Support', href: '#support' },
    { name: 'Status', href: '/status' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container-width section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors focus-ring rounded-lg"
            >
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">BF6 Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground-muted hover:text-foreground transition-colors focus-ring rounded-md px-3 py-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Theme Toggle & CTA */}
            <div className="flex items-center gap-4">
              
              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-10 border-border/50 bg-card/20 hover:bg-card/40 backdrop-blur-sm"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}

              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <Button className="btn-primary">
                  Get Access
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden w-10 h-10 border-border/50 bg-card/20 hover:bg-card/40 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl">
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-lg font-bold">BF6 Pro</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-lg font-medium text-foreground hover:text-primary transition-colors focus-ring rounded-lg px-3 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <Button 
                  className="w-full btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}