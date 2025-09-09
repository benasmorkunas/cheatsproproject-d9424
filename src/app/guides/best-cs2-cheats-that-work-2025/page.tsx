import BestCheatsArticleContent from '@/components/guides/BestCheatsArticleContent';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import { Shield, Target, Eye } from 'lucide-react';

export default function BestCS2CheatsThatWork2025Article() {
  const comparisonFeatures = [
    { feature: 'Box ESP (All Types)', lite: true, plus: true, external: true },
    { feature: 'Skeleton + Snaplines', lite: true, plus: true, external: false },
    { feature: 'Health & Distance', lite: true, plus: true, external: true },
    { feature: 'Grenade ESP', lite: true, plus: true, external: false },
    { feature: 'Legit Aimbot', lite: false, plus: true, external: false },
    { feature: 'Triggerbot', lite: false, plus: true, external: false },
    { feature: 'Aim Only When Spotted', lite: false, plus: true, external: false },
    { feature: 'Price Range', lite: '$3.99/day', plus: '$5.99/day', external: 'Free-$40' }
  ];

  const detectionRisks = [
    { risk: 'VAC Detection', lite: 'Very Low', plus: 'Low', external: 'Minimal' },
    { risk: 'Overwatch Reports', lite: 'Very Low', plus: 'Medium', external: 'Low' },
    { risk: 'Community Reports', lite: 'Low', plus: 'Low', external: 'Very Low' },
    { risk: 'Account Safety', lite: 'Excellent', plus: 'Good', external: 'Excellent' }
  ];

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Undetected Performance',
      description: 'Private builds with proven safety records and regular updates',
      color: '#6B8A7A'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Subtle Aimbot Assistance',
      description: 'Smoothing, low FOV, and aim-on-spotted settings for legit play',
      color: '#825D8D'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Visual ESP & Wallhacks',
      description: 'See player positions, health, and utility without detection',
      color: '#6B7A9A'
    }
  ];

  return (
    <MinimalisticBackground>
      <Header />
      <main className="pt-0">
        <BestCheatsArticleContent 
          comparisonFeatures={comparisonFeatures}
          detectionRisks={detectionRisks}
          features={features}
        />
      </main>
      <Footer />
    </MinimalisticBackground>
  );
}

export async function generateMetadata() {
  return {
    title: 'Best CS2 Cheats That Actually Work in 2025 - Undetected & Safe',
    description: 'Discover the best working CS2 cheats for ranked play in 2025. Compare private wallhacks, ESP overlays, and legit aimbots that stay undetected. Safe cheating for competitive players.',
    keywords: 'best CS2 cheats 2025, working CS2 hacks, undetected CS2 cheats, CS2 wallhack, CS2 ESP, legit CS2 aimbot, private CS2 cheats, safe CS2 hacks, Counter-Strike 2 cheats',
    openGraph: {
      title: 'Best CS2 Cheats That Actually Work in 2025',
      description: 'Compare the best working CS2 cheats with detailed safety analysis and feature comparisons. Find undetected private builds for competitive play.',
      type: 'article',
      publishedTime: '2025-01-16T00:00:00.000Z',
      authors: ['CS2 Expert Team'],
      tags: ['CS2', 'Cheats', 'Gaming', 'Esports', 'Counter-Strike']
    }
  };
}