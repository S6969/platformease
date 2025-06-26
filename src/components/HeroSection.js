import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const statsRef = useRef([]);

  useEffect(() => {
    const animateNumber = (element, target) => {
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        if (target >= 100000) {
          element.textContent = '$' + (current / 1000).toFixed(0) + 'K+';
        } else if (target >= 1000) {
          element.textContent = (current / 1000).toFixed(1) + 'K+';
        } else {
          element.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach((stat, index) => {
            const targets = [2000, 3000, 500000];
            setTimeout(() => {
              animateNumber(stat, targets[index]);
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero section" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Connect <span className="gradient-text">Domain Owners</span> with <span className="gradient-text">Traffic Experts</span>
            </h1>
            <p className="hero-description">
              PlatformEase connects entrepreneurs who own domains and hosting with skilled bloggers and traffic generators. Transform your unused domains into profitable ventures through strategic partnerships.
            </p>
            <div className="hero-buttons">
              <a href="#" className="btn btn-primary btn-large">
                <i className="fas fa-rocket"></i>
                Start Connecting
              </a>
              <a href="#" className="btn btn-secondary btn-large">
                <i className="fas fa-play"></i>
                Watch Demo
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">0</div>
                <div className="stat-label">Domain Owners</div>
              </div>
              <div className="stat">
                <div className="stat-number">0</div>
                <div className="stat-label">Traffic Experts</div>
              </div>
              <div className="stat">
                <div className="stat-number">0</div>
                <div className="stat-label">Revenue Generated</div>
              </div>
            </div>
            
            <div className="trust-badges">
              <div className="badge">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Partnerships</span>
              </div>
              <div className="badge">
                <i className="fas fa-chart-line"></i>
                <span>Verified Results</span>
              </div>
              <div className="badge">
                <i className="fas fa-users"></i>
                <span>5000+ Active Users</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="graphic">
              <div className="floating-elements">
                <div className="floating-card card-1">
                  <i className="fas fa-globe"></i>
                  <span>Domain Owner</span>
                </div>
                <div className="floating-card card-2">
                  <i className="fas fa-handshake"></i>
                  <span>Partnership</span>
                </div>
                <div className="floating-card card-3">
                  <i className="fas fa-bullhorn"></i>
                  <span>Traffic Expert</span>
                </div>
              </div>
              <div className="connection-lines">
                <svg className="connection-svg" viewBox="0 0 400 300">
                  <path d="M50 100 Q200 50 350 100" stroke="url(#connectionGradient)" strokeWidth="3" fill="none" className="connection-path"/>
                  <path d="M50 200 Q200 150 350 200" stroke="url(#connectionGradient)" strokeWidth="3" fill="none" className="connection-path"/>
                  <path d="M200 100 L200 200" stroke="url(#connectionGradient)" strokeWidth="3" className="connection-path"/>
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3A86FF" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#06D6A0" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="background-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;