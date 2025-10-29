import React from 'react';
import { ShieldCheckIcon, FireIcon, BookOpenIcon, PowerIcon, QrCodeIcon, NoSymbolIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const InfoSection = () => {
  return (
    <div className="w-full mt-16 bg-gray-900/50 p-8 rounded-lg shadow-lg text-gray-300">
      {/* Vape Care & Safety Section */}
      <h2 className="text-3xl font-bold text-accent mb-8 text-center flex items-center justify-center">
        <ShieldCheckIcon className="h-7 w-7 mr-3" />
        Health & Safety Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {/* Tip 1 */}
        <div className="flex flex-col items-center p-4">
          <BookOpenIcon className="h-12 w-12 mb-4 text-primary" />
          <p>Always follow the manufacturer's instructions for use and handling of the vaping product.</p>
        </div>
        {/* Tip 2 */}
        <div className="flex flex-col items-center p-4">
          <PowerIcon className="h-12 w-12 mb-4 text-primary" />
          <p>Make sure to turn off your vape (5 clicks) when not in use to prevent accidental activation.</p>
        </div>
        {/* Tip 3 */}
        <div className="flex flex-col items-center p-4">
          <QrCodeIcon className="h-12 w-12 mb-4 text-primary" />
          <p>Verify your purchases through barcode scanning to ensure authenticity.</p>
        </div>
        {/* Tip 4 */}
        <div className="flex flex-col items-center p-4">
          <NoSymbolIcon className="h-12 w-12 mb-4 text-primary" />
          <p>Store the product out of reach of children and pets to prevent accidental ingestion or exposure.</p>
        </div>
        {/* Tip 5 */}
        <div className="flex flex-col items-center p-4">
          <ExclamationTriangleIcon className="h-12 w-12 mb-4 text-primary" />
          <p>Avoid using the product if it is damaged or malfunctioning.</p>
        </div>
        {/* Tip 6 */}
        <div className="flex flex-col items-center p-4">
          <FireIcon className="h-12 w-12 mb-4 text-primary" />
          <p>Keep the product away from open flames and other sources of ignition.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;