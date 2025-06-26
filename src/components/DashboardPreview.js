import React, { useEffect, useState } from 'react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {

    const statCards = document.querySelectorAll('.stat-card');
    const dashboardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });

    statCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      dashboardObserver.observe(card);
    });

    return () => dashboardObserver.disconnect();
  }, []);

  return (
    <section className="section dashboard-preview">
      <div className="container">
        <div className="section-title">
          <h2>Partnership Dashboard</h2>
          <p>Monitor your partnerships, track performance, and optimize revenue in real-time.</p>
        </div>
        
        <div className="dashboard-mockup">
          <div className="dashboard-header">
            <div className="dashboard-nav">
              {['Overview', 'Partnerships', 'Analytics', 'Revenue'].map(tab => (
                <div 
                  key={tab}
                  className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="dashboard-user">
              <div className="user-avatar"></div>
              <span>Welcome, John</span>
            </div>
          </div>
          
          <div className="dashboard-content">
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon primary">
                  <i className="fas fa-globe"></i>
                </div>
                <div className="stat-info">
                  <h3>12</h3>
                  <p>Active Domains</p>
                  <div className="stat-action-btn">Manage Domains</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon secondary">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <h3>8</h3>
                  <p>Traffic Partners</p>
                  <div className="stat-action-btn">Find Partners</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon accent">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-info">
                  <h3>$4,250</h3>
                  <p>Monthly Revenue</p>
                  <div className="stat-action-btn">View Details</div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-actions">
              <div className="action-section">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <div className="action-btn primary">
                    <i className="fas fa-plus"></i>
                    <span>Add New Domain</span>
                  </div>
                  <div className="action-btn secondary">
                    <i className="fas fa-handshake"></i>
                    <span>Create Partnership</span>
                  </div>
                  <div className="action-btn accent">
                    <i className="fas fa-chart-line"></i>
                    <span>View Analytics</span>
                  </div>
                  <div className="action-btn outline">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-charts">
              <div className="chart-container">
                <h4>Revenue Trends</h4>
                <div className="mini-chart">
                  <div className="css-chart">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '75%'}}></div>
                    <div className="chart-bar" style={{height: '45%'}}></div>
                    <div className="chart-bar" style={{height: '85%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                    <div className="chart-bar" style={{height: '65%'}}></div>
                    <div className="chart-bar" style={{height: '95%'}}></div>
                  </div>
                </div>
              </div>
              <div className="partnership-list">
                <h4>Recent Partnerships</h4>
                <div className="partnership-item">
                  <div className="partnership-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="partnership-info">
                    <strong>Sarah (Content Expert)</strong>
                    <p>TechBlog.com • +15% traffic this month</p>
                  </div>
                  <div className="partnership-status success">Active</div>
                </div>
                <div className="partnership-item">
                  <div className="partnership-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="partnership-info">
                    <strong>Mike (SEO Specialist)</strong>
                    <p>HealthTips.com • +28% revenue</p>
                  </div>
                  <div className="partnership-status success">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;