import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Handshake, X } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    // Show welcome tooltip for first-time visitors
    const hasVisited = localStorage.getItem('platformease-visited');
    if (!hasVisited) {
      setTimeout(() => setShowWelcomeTooltip(true), 2000);
      localStorage.setItem('platformease-visited', 'true');
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (role: string) => {
    console.log(`Selected role: ${role}`);
    localStorage.setItem('user-role', role);
    navigate('/role-selection');
  };

  const handleStartProject = () => {
    navigate('/role-selection');
  };

  const handleKeyDown = (e: React.KeyboardEvent, role: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(role);
    }
  };

  const dismissTooltip = () => {
    setShowWelcomeTooltip(false);
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Welcome Tooltip */}
      {showWelcomeTooltip && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-sm mx-4 animate-fade-in">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">👋</span>
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Hi there! Not sure where to start? Tap on <strong>Entrepreneur</strong> if you have a project idea, or <strong>Partner</strong> if you want to join one!
              </p>
            </div>
            <button
              onClick={dismissTooltip}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16" data-animate="fade-in">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-inter font-bold leading-tight text-gray-900 dark:text-white mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              PlatformEase
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            Build smarter, faster—together.
          </p>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Whether you're an entrepreneur ready to launch an idea or a partner looking to contribute your expertise, 
            PlatformEase helps you connect, collaborate, and create in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div
            className="card"
            role="button"
            aria-pressed="false"
            tabIndex={0}
            onClick={() => handleCardClick('entrepreneur')}
            onKeyDown={(e) => handleKeyDown(e, 'entrepreneur')}
            data-animate="fade-in"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 mx-auto">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-inter font-semibold text-gray-900 dark:text-white mb-4 text-center">
              🚀 Entrepreneur
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Start your next big idea without coding headaches. Choose from AI-powered templates and go live fast.
            </p>
            <span className="learn-more text-blue-600 dark:text-blue-400 font-semibold text-center block">
              Start Your Free Project →
            </span>
          </div>

          <div
            className="card"
            role="button"
            aria-pressed="false"
            tabIndex={0}
            onClick={() => handleCardClick('partner')}
            onKeyDown={(e) => handleKeyDown(e, 'partner')}
            data-animate="fade-in"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full mb-6 mx-auto">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-inter font-semibold text-gray-900 dark:text-white mb-4 text-center">
              🤝 Partner
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Join a growing network of experts. Collaborate, earn, and grow your impact—one project at a time.
            </p>
            <span className="learn-more text-violet-600 dark:text-violet-400 font-semibold text-center block">
              Explore Partner Roles →
            </span>
          </div>
        </div>

        <div className="text-center space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
          <button 
            className="btn-primary w-full md:w-auto"
            onClick={handleStartProject}
          >
            Start Your Free Project
          </button>
          <button 
            className="btn-outline w-full md:w-auto"
            onClick={() => navigate('/role-selection')}
          >
            Explore Partner Roles
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
