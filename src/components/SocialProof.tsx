
import React, { useEffect } from 'react';

const SocialProof = () => {
  useEffect(() => {
    const chips = document.querySelectorAll('.chip');
    chips.forEach((chip, index) => {
      setTimeout(() => {
        chip.classList.remove('opacity-0', 'translate-y-2');
      }, index * 200);
    });
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-inter font-semibold text-gray-900 dark:text-white mb-4">
            Trusted by Growing Businesses
          </h3>
          <div className="overflow-x-auto">
            <ul className="flex space-x-6 justify-center min-w-max px-4">
              <li className="chip">
                <span className="text-xl">✅</span>
                <span className="font-medium">Trusted by 2,000+ entrepreneurs</span>
              </li>
              <li className="chip">
                <span className="text-xl">⭐</span>
                <span className="font-medium">4.8/5 average rating</span>
              </li>
              <li className="chip">
                <span className="text-xl">🌍</span>
                <span className="font-medium">500+ active partners</span>
              </li>
              <li className="chip">
                <span className="text-xl">🚀</span>
                <span className="font-medium">10,000+ projects launched</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of entrepreneurs and partners who are building the future together. 
            Start your journey with PlatformEase today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
