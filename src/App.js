import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProcessTimeline from './components/ProcessTimeline';
import DashboardPreview from './components/DashboardPreview';
import FeaturesSection from './components/FeaturesSection';
import RevenueSection from './components/RevenueSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header isScrolled={isScrolled} />
      <HeroSection />
      <ProcessTimeline />
      <RevenueSection />
      <DashboardPreview />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;