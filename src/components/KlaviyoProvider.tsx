'use client';

import { useEffect } from 'react';
import { initKlaviyoTracking, trackPageView } from '@/lib/klaviyo-client';
import { usePathname } from 'next/navigation';

export default function KlaviyoProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Klaviyo tracking
    initKlaviyoTracking();
  }, []);

  useEffect(() => {
    // Track page views when pathname changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}