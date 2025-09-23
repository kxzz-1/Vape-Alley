import React from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';

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
      <Carousel slides={slides} />
      <Categories />
      <FeaturedProducts />
    </>
  );
};

export default Home;