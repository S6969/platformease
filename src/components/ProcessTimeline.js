import React, { useEffect, useRef } from 'react';

const ProcessTimeline = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateX(0)';
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px) rotateX(10deg)';
      item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-title">
          <h2>How It Works</h2>
          <p>Simple, effective partnership model. Connect domain owners with traffic experts in four strategic steps.</p>
        </div>
        
        <div className="process-timeline" ref={timelineRef}>
          <div className="timeline-item" data-step="1">
            <div className="timeline-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="timeline-content">
              <h3>Create Your Profile</h3>
              <p>Join as a domain owner with hosting resources or as a traffic expert with proven skills.</p>
              <div className="timeline-features">
                <span className="feature-tag">Profile Verification</span>
                <span className="feature-tag">Skill Assessment</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item" data-step="2">
            <div className="timeline-icon">
              <i className="fas fa-search"></i>
            </div>
            <div className="timeline-content">
              <h3>Smart Matching</h3>
              <p>Our AI-powered system matches domain owners with compatible traffic experts based on niche, goals, and experience.</p>
              <div className="timeline-features">
                <span className="feature-tag">AI Matching</span>
                <span className="feature-tag">Compatibility Score</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item" data-step="3">
            <div className="timeline-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <div className="timeline-content">
              <h3>Start Partnership</h3>
              <p>Establish clear agreements, revenue sharing terms, and begin collaborative content creation.</p>
              <div className="timeline-features">
                <span className="feature-tag">Contract Templates</span>
                <span className="feature-tag">Revenue Tracking</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item" data-step="4">
            <div className="timeline-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="timeline-content">
              <h3>Track & Optimize</h3>
              <p>Monitor performance, track revenue, and optimize your partnership for maximum profitability.</p>
              <div className="timeline-features">
                <span className="feature-tag">Real-time Analytics</span>
                <span className="feature-tag">Performance Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;