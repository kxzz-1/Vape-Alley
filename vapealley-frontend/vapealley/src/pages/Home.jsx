import React from 'react';
import Carousel from '../components/Carousel';
import ProductsSection from '../components/ProductSection'; // Import the new component
import LocationSection from '../components/LocationSection';
import InfoSection from '../components/InfoSection';
import BrandPraises from '../components/BrandPraises';
import BrandsSection from '../components/BrandsSection';  

const slides = [
  {
    image: '/carousel1.jpg',
    title: 'New Arrivals',
    subtitle: 'Check out the latest gear.'
  },
  {
    image: '/carousel2.jpg',
    title: 'Exclusive Deals',
    subtitle: 'Limited-time offers available now.'
  },
  {
    image: '/carousel3.jpg',
    title: 'Premium E-Liquids',
    subtitle: 'A flavor for every taste.'
  },
];

const Home = ({ addToCart }) => {
  return (
    <>
      {/* Carousel is now full-width by default */}
      <Carousel slides={slides} />
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