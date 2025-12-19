import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import ProductsSection from '../components/ProductSection'; // Import the new component
import LocationSection from '../components/LocationSection';
import InfoSection from '../components/InfoSection';
import BrandPraises from '../components/BrandPraises';
import BrandsSection from '../components/BrandsSection';  

const Home = ({ addToCart }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/carousel');
        if (response.ok) {
          const data = await response.json();
          setSlides(data.filter(slide => slide.isActive));
        }
      } catch (error) {
        console.error("Error fetching carousel slides:", error);
      }
    };
    fetchSlides();
  }, []);

  return (
    <>
      {/* Carousel is now full-width by default */}
      {slides.length > 0 && <Carousel slides={slides} />}
      {/* All subsequent sections are wrapped in a single container for consistent padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BrandsSection />
        <ProductsSection addToCart={addToCart} />
        <LocationSection />
        <InfoSection />
        <BrandPraises />
      </div>
    </>
  );
};

export default Home;