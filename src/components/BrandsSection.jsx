import React, { useState, useEffect } from 'react';

const BrandsSection = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/brands');
        if (response.ok) {
          const data = await response.json();
          // Filter for brands that have an image to display
          setBrands(data.filter(brand => brand.image));
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Duplicate the brands array to create a seamless loop effect
  const extendedBrands = brands.length > 0 ? [...brands, ...brands] : [];

  return (
    <div className="w-full mt-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Our Trusted Brands</h2>
      <div className="brands-scroller">
        <div className="brands-scroller-inner">
          {extendedBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="brand-logo">
              <img src={brand.image} alt={brand.name} className="h-20 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;