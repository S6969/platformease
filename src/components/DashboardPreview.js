import React, { useEffect, useRef, useState } from 'react';

const DashboardPreview = () => {
  const chartRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const createDashboardChart = () => {
      const canvas = chartRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const data = [28, 35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 72];
      const maxVal = Math.max(...data);
      const minVal = Math.min(...data);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#3A86FF');
      gradient.addColorStop(1, '#06D6A0');

      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(58, 134, 255, 0.1)');
      bgGradient.addColorStop(1, 'rgba(6, 214, 160, 0.05)');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / data.length) * 0.7;
      const barSpacing = (width / data.length) * 0.3;

      data.forEach((value, index) => {
        const barHeight = ((value - minVal) / (maxVal - minVal)) * height * 0.8;
        const x = index * (barWidth + barSpacing) + barSpacing / 2;
        const y = height - barHeight - 10;

        ctx.shadowColor = '#3A86FF';
        ctx.shadowBlur = 5;
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.shadowBlur = 0;
      });
    };

    const statCards = document.querySelectorAll('.stat-card');
    const dashboardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          createDashboardChart();
        }
      });
    }, { threshold: 0.1 });

    statCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      dashboardObserver.observe(card);
    });

    createDashboardChart();

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
                  <canvas ref={chartRef} width="280" height="120"></canvas>
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