import type { Metadata } from 'next';
import Header from '@/components/site/Header';
import Hero from './_components/Hero';

export const metadata: Metadata = {
  title: 'BF6 Pro - Advanced Gaming Enhancement Suite',
  description: 'Professional gaming tools and enhancements for Battlefield 6. Undetected, reliable, and feature-rich gaming experience.',
  keywords: ['bf6', 'battlefield', 'gaming', 'enhancement', 'tools', 'professional', 'competitive'],
  authors: [{ name: 'BF6 Pro Team' }],
  openGraph: {
    title: 'BF6 Pro - Advanced Gaming Enhancement Suite',
    description: 'Professional gaming tools and enhancements for Battlefield 6. Undetected, reliable, and feature-rich.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/bf6-pro-logo.webp',
        width: 1200,
        height: 630,
        alt: 'BF6 Pro Enhancement Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BF6 Pro - Advanced Gaming Enhancement Suite',
    description: 'Professional gaming tools and enhancements for Battlefield 6.',
    images: ['/images/bf6-pro-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function MarketingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BF6 Pro',
            description: 'Professional gaming tools and enhancements for Battlefield 6',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Windows',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '5000',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BF6 Pro Team',
            },
          }),
        }}
      />

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          
          {/* Additional sections can be added here */}
          <section id="features" className="py-20">
            <div className="container-width section-padding">
              <div className="text-center">
                <h2 className="text-display-lg font-bold text-foreground mb-8">
                  Coming Soon
                </h2>
                <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                  More sections and features will be added to showcase the full capabilities 
                  of the BF6 Pro enhancement suite.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}