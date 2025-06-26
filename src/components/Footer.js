import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="url(#footerGradient1)" stroke="url(#footerGradient2)" strokeWidth="2"/>
                  <circle cx="15" cy="15" r="3" fill="white" opacity="0.9"/>
                  <circle cx="25" cy="15" r="3" fill="white" opacity="0.9"/>
                  <circle cx="20" cy="28" r="3" fill="white" opacity="0.9"/>
                  <path d="M15 15L25 15M15 15L20 28M25 15L20 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="footerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3A86FF"/>
                      <stop offset="100%" stopColor="#06D6A0"/>
                    </linearGradient>
                    <linearGradient id="footerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
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
            <p>Connecting entrepreneurs with strategic partners for sustainable business growth.</p>
          </div>
          
          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; 2025 PlatformEase. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;