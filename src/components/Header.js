import React, { useState } from 'react';

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="url(#gradient1)" stroke="url(#gradient2)" strokeWidth="2"/>
                <circle cx="15" cy="15" r="3" fill="white" opacity="0.9"/>
                <circle cx="25" cy="15" r="3" fill="white" opacity="0.9"/>
                <circle cx="20" cy="28" r="3" fill="white" opacity="0.9"/>
                <path d="M15 15L25 15M15 15L20 28M25 15L20 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3A86FF"/>
                    <stop offset="100%" stopColor="#06D6A0"/>
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a75f5"/>
                    <stop offset="100%" stopColor="#05c695"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              Platform<span className="logo-highlight">Ease</span>
            </div>
          </div>
          
          <div className="nav-links">
            <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How It Works</a>
            <a href="#revenue" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('revenue'); }}>Revenue</a>
            <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </div>
          
          <div className="auth-buttons">
            <a href="#" className="btn btn-outline">Sign In</a>
            <a href="#" className="btn btn-primary">Get Started</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;