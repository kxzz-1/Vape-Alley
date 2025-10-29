import React from 'react';
import { MapPinIcon, BuildingStorefrontIcon, PhoneIcon } from '@heroicons/react/24/solid';

const LocationSection = () => {
  return (
    <div className="w-full mt-16">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center flex items-center justify-center">
        <MapPinIcon className="h-8 w-8 mr-3" />
        Find Us In-Store
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900/50 p-8 rounded-lg shadow-lg">
        {/* Left Column: Image and Info */}
        <div className="flex flex-col items-center text-center">
          <img 
            src="/store-front.jpg"
            alt="Vape Alley Store Front"
            className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
          />
          <h3 className="text-2xl font-bold text-white flex items-center justify-center mb-2">
            <BuildingStorefrontIcon className="h-7 w-7 mr-3 text-primary" />
            Vape Alley
          </h3>
          <p className="text-gray-400 mb-1">35D Commercial Market EME Society, Lahore</p>
          <p className="text-gray-400 flex items-center justify-center">
            <PhoneIcon className="h-4 w-4 mr-2" />
            +92 302 9356404
          </p>
        </div>
        {/* Right Column: Map */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg shadow-primary/30 border-2 border-primary/50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2313.2991184427256!2d74.21324632274622!3d31.436014518575313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ffbea8fa47a3%3A0x90356afadad8c3e9!2sVape%20Alley!5e0!3m2!1sen!2s!4v1758774779116!5m2!1sen!2s"
            className="absolute top-0 left-0 w-full h-full filter grayscale invert-[90%] hue-rotate-[180deg]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vape Alley Store Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;