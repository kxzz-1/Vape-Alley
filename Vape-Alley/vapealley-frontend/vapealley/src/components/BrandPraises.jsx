import React from 'react';
import { CheckBadgeIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const BrandPraises = () => {
  return (
    <div className="w-full mt-16 bg-gray-900/50 p-8 rounded-lg shadow-lg text-gray-300">
      <h2 className="text-3xl font-bold text-accent mb-6 text-center">Why Choose Vape Alley?</h2>
      <p className="text-center mb-8 max-w-3xl mx-auto">
        We are more than just a vape shop; we are a community of enthusiasts dedicated to providing the highest quality vaping experience. Our commitment to excellence is reflected in every product we offer and every interaction we have with our customers.
      </p>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <CheckBadgeIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-semibold text-white mb-2">Unmatched Quality</h3>
          <p className="text-gray-400">We source our products directly from trusted manufacturers, ensuring every item is 100% authentic. Verify your purchases with our barcode scanning system for complete peace of mind.</p>
        </div>
        <div>
          <SparklesIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-semibold text-white mb-2">Expertly Curated Selection</h3>
          <p className="text-gray-400">From the latest in <a href="#devices" className="text-primary font-semibold hover:underline">pod systems</a> to a wide array of flavorful <a href="#disposables" className="text-primary font-semibold hover:underline">disposable vapes</a>, our collection is hand-picked to meet the diverse needs of our community.</p>
        </div>
        <div>
          <UserGroupIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-semibold text-white mb-2">Customer-Centric Service</h3>
          <p className="text-gray-400">Your satisfaction is our priority. Our knowledgeable team is always here to help you find the perfect product and answer any questions you may have.</p>
        </div>
      </div>
    </div>
  );
};

export default BrandPraises;