import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <h2>Ready to Monetize Your Domains?</h2>
        <p>
          Join domain owners and traffic experts who are already earning together through strategic partnerships. 
          Turn your unused domains into profitable websites with skilled bloggers and content creators.
        </p>
        <div className="cta-buttons">
          <a href="#" className="btn btn-light btn-large">
            <i className="fas fa-rocket"></i>
            Start Free Trial
          </a>
          <a href="#" className="btn btn-outline-light btn-large">
            <i className="fas fa-phone"></i>
            Schedule Demo
          </a>
        </div>
        <div className="cta-features">
          <div className="cta-feature">
            <i className="fas fa-check"></i>
            <span>No Credit Card Required</span>
          </div>
          <div className="cta-feature">
            <i className="fas fa-check"></i>
            <span>14-Day Free Trial</span>
          </div>
          <div className="cta-feature">
            <i className="fas fa-check"></i>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;