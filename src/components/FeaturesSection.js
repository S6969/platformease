import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-title">
          <h2>Advanced Platform Features</h2>
          <p>Powerful tools designed for successful domain-traffic partnerships and maximum revenue potential.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon icon-1">
              <i className="fas fa-brain"></i>
            </div>
            <div className="feature-text">
              <h3>Smart Domain-Traffic Matching</h3>
              <p>Advanced algorithms match domain niches with blogger expertise and audience demographics for maximum monetization potential.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon icon-2">
              <i className="fas fa-comments"></i>
            </div>
            <div className="feature-text">
              <h3>Partnership Communication</h3>
              <p>Built-in messaging system for domain owners and traffic experts to discuss content strategy, revenue goals, and collaboration details.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon icon-3">
              <i className="fas fa-file-contract"></i>
            </div>
            <div className="feature-text">
              <h3>Revenue Tracking</h3>
              <p>Real-time tracking of website performance, traffic metrics, and revenue generation with transparent profit sharing calculations.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon icon-1">
              <i className="fas fa-folder-open"></i>
            </div>
            <div className="feature-text">
              <h3>Domain Portfolio Manager</h3>
              <p>Manage multiple domains and hosting accounts, track which domains are available for partnerships, and monitor their performance.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon icon-2">
              <i className="fas fa-globe"></i>
            </div>
            <div className="feature-text">
              <h3>Content Creation Tools</h3>
              <p>Integrated tools for bloggers to create, schedule, and optimize content with SEO recommendations and monetization suggestions.</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon icon-3">
              <i className="fas fa-headset"></i>
            </div>
            <div className="feature-text">
              <h3>Monetization Optimization</h3>
              <p>AI-powered recommendations for ad placement, affiliate programs, and revenue optimization based on your domain niche and traffic patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;