import { Metadata } from 'next';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import {
  HeroSection,
  WhyJoinUs,
  WhoWereLookingFor,
  ApplicationForm
} from '@/components/AffiliatePage';

export const metadata: Metadata = {
  title: 'Join Cheats-Pro Affiliate Program - Earn High Commissions | Up to 50% Commission',
  description: 'Earn up to 50% commission promoting premium gaming enhancement tools. Join our affiliate program with reliable payouts, marketing support, and dedicated management. Apply now!',
  keywords: 'affiliate program, gaming affiliate, commission earning, promote gaming tools, affiliate marketing, gaming influencer program, high commission rates, lifetime cookies',
  openGraph: {
    title: 'Join Cheats-Pro Affiliate Program - Earn Up to 50% Commission',
    description: 'Premium affiliate program for gaming content creators. High commission rates, lifetime cookies, and professional marketing support.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheats-Pro Affiliate Program - High Gaming Commissions',
    description: 'Earn premium commissions promoting undetected gaming tools. Up to 50% commission with lifetime tracking.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Structured data for affiliate program
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Cheats-Pro Affiliate Program",
  "description": "High-commission affiliate program for gaming enhancement tools",
  "url": "https://cheats-pro.com/affiliate-program",
  "serviceType": "Affiliate Marketing Program",
  "areaServed": "Worldwide",
  "offers": {
    "@type": "Offer",
    "description": "Up to 50% commission on gaming tool sales",
    "category": "Affiliate Commission"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Affiliate Benefits",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "High Commission Rates",
          "description": "Up to 50% commission on all sales"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Lifetime Cookie Tracking",
          "description": "Earn recurring commissions from referred customers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Marketing Support",
          "description": "Professional banners, content, and promotional materials"
        }
      }
    ]
  }
};

export default function AffiliateProgram() {
  return (
    <MinimalisticBackground>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      
      <main>
        <HeroSection />
        <WhyJoinUs />
        <WhoWereLookingFor />
        <ApplicationForm />
      </main>
      
      <Footer />
    </MinimalisticBackground>
  );
}