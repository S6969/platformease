import React, { useEffect, useRef } from 'react';

const RevenueSection = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createRevenueChart = () => {
      const canvas = chartRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const data = [42, 58, 67, 73, 81, 89, 95, 102, 110, 118, 125, 132];
      const maxVal = Math.max(...data);
      const minVal = Math.min(...data);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#06D6A0');
      gradient.addColorStop(1, '#3A86FF');

      const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
      areaGradient.addColorStop(0, 'rgba(6, 214, 160, 0.3)');
      areaGradient.addColorStop(1, 'rgba(58, 134, 255, 0.1)');

      ctx.beginPath();
      const stepX = width / (data.length - 1);

      data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - ((value - minVal) / (maxVal - minVal)) * height * 0.8 - height * 0.1;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = areaGradient;
      ctx.fill();

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();

      data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - ((value - minVal) / (maxVal - minVal)) * height * 0.8 - height * 0.1;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;

      data.forEach((value, index) => {
        const x = index * stepX;
        const y = height - ((value - minVal) / (maxVal - minVal)) * height * 0.8 - height * 0.1;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    };

    createRevenueChart();
  }, []);

  return (
    <section className="section revenue-section" id="revenue">
      <div className="container">
        <div className="revenue-container">
          <div className="revenue-illustration">
            <div className="revenue-chart">
              <canvas ref={chartRef} width="400" height="300"></canvas>
            </div>
            <div className="chart-labels">
              <div className="chart-label label-platform">
                <div className="label-color" style={{background: 'var(--secondary)'}}></div>
                <span>Platform Revenue</span>
              </div>
              <div className="chart-label label-partner">
                <div className="label-color" style={{background: 'var(--primary)'}}></div>
                <span>Partner Success</span>
              </div>
            </div>
          </div>
          
          <div className="revenue-content">
            <h2>
              Fair <span>Revenue Sharing</span>
            </h2>
            <p>
              Domain owners provide the hosting foundation while traffic experts bring content creation skills and audience reach. Revenue is shared transparently based on contribution.
            </p>
            <p>
              PlatformEase takes a small commission only when partnerships generate actual revenue from advertising, affiliate marketing, or other monetization methods.
            </p>
            
            <div className="revenue-features">
              <div className="revenue-feature">
                <i className="fas fa-percent"></i>
                <div>
                  <h4>Domain Owner Share</h4>
                  <p>40-50% revenue share for providing hosting and domain</p>
                </div>
              </div>
              <div className="revenue-feature">
                <i className="fas fa-edit"></i>
                <div>
                  <h4>Traffic Expert Share</h4>
                  <p>40-50% revenue share for content creation and traffic</p>
                </div>
              </div>
              <div className="revenue-feature">
                <i className="fas fa-handshake"></i>
                <div>
                  <h4>Platform Commission</h4>
                  <p>5-10% platform fee only on successful revenue generation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueSection;