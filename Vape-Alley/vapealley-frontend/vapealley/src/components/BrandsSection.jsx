import React from 'react';

const brands = [
  {
    name: 'VooPoo',
    logo: '/voopoo-logo.png',
  },
  {
    name: 'Vaporesso',
    logo: '/vaporesso-logo.png',
  },
  {
    name: 'Smok',
    logo: '/smok-logo.png',
  },
  {
    name: 'Uwell',
    logo: '/uwell-logo.png',
  },
  {
    name: 'Geek Vape',
    logo: '/GeekVape-Logo.png',
  },
  {
    name: 'Oxva',
    logo: '/oxva-logo.png',
  },
  {
    name: 'Tokyo',
    logo: '/tokyo-logo.png',
  },
];

const BrandsSection = () => {
  // Duplicate the brands array to create a seamless loop effect
  const extendedBrands = [...brands, ...brands];

  return (
    <div className="w-full mt-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Our Trusted Brands</h2>
      <div className="brands-scroller">
        <div className="brands-scroller-inner">
          {extendedBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="brand-logo">
              <img src={brand.logo} alt={brand.name} className="h-20 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;