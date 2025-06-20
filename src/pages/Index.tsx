import { Suspense } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <main>
          <HeroSection />
          <SocialProof />
        </main>
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
