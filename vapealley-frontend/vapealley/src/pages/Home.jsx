import React from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import ProductsSection from '../components/ProductSection'; // Import the new component
import LocationSection from '../components/LocationSection';
import InfoSection from '../components/InfoSection';
import BrandPraises from '../components/BrandPraises';

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

const Home = () => {
  return (
    <>
      {/* This container is now slightly wider than the content below on large screens */}
      <div className="w-full md:px-6 lg:px-8">
        <Carousel slides={slides} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Categories />
        <ProductsSection />
        <LocationSection />
        <InfoSection />
        <BrandPraises />
      </div>
    </>
  );
};

export default Home;