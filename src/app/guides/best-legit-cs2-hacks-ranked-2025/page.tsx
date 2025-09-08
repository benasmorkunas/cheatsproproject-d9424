import ArticleContent from '@/components/guides/ArticleContent';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import { Shield, Target, Eye } from 'lucide-react';

export default function BestLegitCS2HacksArticle() {
  const comparisonFeatures = [
    { feature: 'ESP Overlays', lite: true, plus: true, external: true },
    { feature: 'Aimbot Support', lite: false, plus: true, external: false },
    { feature: 'Triggerbot', lite: false, plus: true, external: false },
    { feature: 'Stream-Safe', lite: true, plus: true, external: true },
    { feature: 'Injection-Free', lite: false, plus: false, external: true },
    { feature: 'Advanced ESP', lite: false, plus: true, external: false },
    { feature: 'Grenade Helper', lite: false, plus: true, external: false },
    { feature: 'Price Range', lite: '$3.99/day', plus: '$5.99/day', external: 'Free-$50' }
  ];

  const detectionRisks = [
    { risk: 'VAC Detection', lite: 'Very Low', plus: 'Low', external: 'Minimal' },
    { risk: 'Overwatch Reports', lite: 'Low', plus: 'Medium', external: 'Low' },
    { risk: 'HWID Bans', lite: 'Very Low', plus: 'Low', external: 'None' },
    { risk: 'Account Suspension', lite: 'Rare', plus: 'Uncommon', external: 'Very Rare' }
  ];

  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Visual ESP Only',
      description: 'Clean overlays without intrusive aimbot features',
      color: '#6B8A7A'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Smooth Aim Assist',
      description: 'Natural-looking aim correction with FOV limits',
      color: '#825D8D'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Undetected Status',
      description: 'Private builds with regular security updates',
      color: '#6B7A9A'
    }
  ];

  return (
    <MinimalisticBackground>
      <Header />
      <main className="pt-0">
        <ArticleContent 
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
    title: 'Best Legit CS2 Hacks for Ranked Play in 2025 - Undetected & Safe',
    description: 'Discover the top legit CS2 hacks for competitive ranked play in 2025. Compare ESP overlays, aimbot features, and undetected private builds. Stay safe while climbing ranks.',
    keywords: 'legit CS2 hacks, CS2 wallhack, CS2 ESP, undetected CS2 cheats, ranked CS2 hacks, CS2 aimbot, Counter-Strike 2 hacks, private CS2 cheats, CS2 legit cheats 2025',
    openGraph: {
      title: 'Best Legit CS2 Hacks for Ranked Play in 2025',
      description: 'Compare the best legit CS2 hacks with detailed feature tables and detection risk analysis. Find the perfect cheat for competitive play.',
      type: 'article',
      publishedTime: '2025-01-15T00:00:00.000Z',
      authors: ['CS2 Expert Team'],
      tags: ['CS2', 'Hacks', 'Gaming', 'Esports', 'Counter-Strike']
    }
  };
}