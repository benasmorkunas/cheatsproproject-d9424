import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cheats-pro.com'),
  title: 'CS2 Cheats FAQ | Cheats-Pro | Secure & Easy Setup',
  description: 'Find answers to common questions about Cheats-Pro CS2 cheats, installation, safety features, payment methods, and customer support. Join 50,000+ satisfied customers.',
  keywords: 'CS2 cheats FAQ, Counter-Strike 2 hacks questions, game cheats help, CS2 aimbot installation, wallhack safety, gaming software support',
  openGraph: {
    title: 'CS2 Cheats FAQ - Cheats-Pro',
    description: 'Get instant answers to your CS2 cheats questions. Safe, undetectable software with 24/7 support.',
    url: 'https://cheats-pro.com/faq',
    siteName: 'Cheats-Pro',
    images: [
      {
        url: '/images/cheatsprologo.webp',
        width: 600,
        height: 200,
        alt: 'Cheats-Pro Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CS2 Cheats FAQ - Cheats-Pro',
    description: 'Get instant answers to your CS2 cheats questions. Safe, undetectable software with 24/7 support.',
    images: ['/images/cheatsprologo.webp']
  },
  alternates: {
    canonical: 'https://cheats-pro.com/faq'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who are we?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cheats-Pro is the leading provider of premium gaming software with over 50,000+ satisfied customers worldwide. We specialize in secure, undetectable cheats for CS2 and other popular games. Our team consists of experienced developers with 5+ years in the gaming industry, ensuring top-quality products and 24/7 customer support."
                }
              },
              {
                "@type": "Question", 
                "name": "Are Cheats-Pro products currently safe to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, absolutely! Our products feature advanced anti-detection technology with a 99.9% safety record. We monitor game updates 24/7 and push automatic updates within 2-4 hours of any game patches. All our cheats use kernel-level protection and sophisticated bypass methods. We offer a full refund guarantee if you experience any detection issues within 30 days."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer free trials for CS2 cheats?", 
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a 24-hour trial period for first-time customers on select packages. This allows you to test our aimbot accuracy, wallhack clarity, and overall performance risk-free. Trial access includes full features with no limitations. Simply create an account and verify your payment method to start your trial instantly."
                }
              },
              {
                "@type": "Question",
                "name": "How do I purchase your CS2 cheats?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Purchasing is simple and secure: 1) Browse our product catalog and select your desired package, 2) Add to cart and proceed to checkout, 3) Complete payment using any of our 10+ payment methods, 4) Receive instant download access via email within 5 minutes, 5) Follow our easy setup guide to get started. All purchases include lifetime updates and priority support."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept all major payment methods for maximum convenience: Credit/Debit Cards (Visa, MasterCard, AMEX), PayPal, Cryptocurrency (Bitcoin, Ethereum, USDT), Bank Transfers, and various regional payment systems. All transactions are secured with 256-bit SSL encryption and processed through verified payment gateways."
                }
              },
              {
                "@type": "Question",
                "name": "Is the firmware easy to install?", 
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Installation takes just 3-5 minutes with our automated installer! Our software includes: 1) One-click installation wizard, 2) Automatic driver setup, 3) Built-in compatibility checker, 4) Step-by-step video tutorials, 5) Live chat support during setup. No technical knowledge required - if you can install a game, you can install our cheats."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}