import { Metadata } from 'next';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';
import {
  HeroSection,
  WhyJoinUs,
  WhoWereLookingFor,
  ApplicationForm
} from '@/components/DeveloperPage';

export const metadata: Metadata = {
  title: 'For Developers - Join Cheats-Pro Team | Remote Gaming Development Jobs',
  description: 'Join the elite cheats-pro development team. Build undetected gaming tools with competitive pay, remote work, and revenue sharing. Apply now for exciting game development opportunities.',
  keywords: 'game development jobs, remote developer jobs, gaming cheat development, anti-cheat systems, C++ developer, Python developer, game security, reverse engineering jobs',
  openGraph: {
    title: 'For Developers - Join Cheats-Pro Team',
    description: 'Build undetected gaming tools with our elite remote development team. Competitive pay and revenue sharing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Developers - Join Cheats-Pro Team',
    description: 'Join our elite remote development team building cutting-edge gaming tools.',
  }
};

export default function ForDevelopersPage() {
  return (
    <MinimalisticBackground>
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