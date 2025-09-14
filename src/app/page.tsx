import Header from '@/components/homepage/Header';
import BF6LaunchBanner from '@/components/common/BF6LaunchBanner';
import LandingPageSlider from '@/components/slider/LandingPageSlider';
import SectionTransition from '@/components/common/SectionTransition';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import BF6Section from '@/components/homepage/BF6Section';
import CS2CTASection from '@/components/homepage/CS2CTASection';
import PricingSection from '@/components/homepage/PricingSection';
import TrustElements from '@/components/homepage/TrustElements';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import LatestArticles from '@/components/homepage/LatestArticles';
import Footer from '@/components/homepage/Footer';
import MinimalisticBackground from '@/components/common/MinimalisticBackground';

export default function HomePage() {
  return (
    <MinimalisticBackground>
      <Header />
      <BF6LaunchBanner />
      <main className="pt-0">
        <LandingPageSlider />
        <TrustElements />
        <FeaturesSection />
        <PricingSection />
        <BF6Section />
        <CS2CTASection />
        <TestimonialsSection />
        <LatestArticles />
      </main>
      <Footer />
    </MinimalisticBackground>
  );
}
