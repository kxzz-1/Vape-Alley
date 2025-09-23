import React from 'react';
import ProductCard from './ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: 'Astro Disposable - 8000 Puffs',
    price: 22.99,
    image: '/carousel1.jpg',
  },
  {
    id: 2,
    name: 'Nebula E-Liquid - 60ml',
    price: 18.50,
    image: '/carousel2.jpg',
  },
  {
    id: 3,
    name: 'Galaxy Pro Pod System',
    price: 45.00,
    image: '/carousel3.jpg',
  },
  {
    id: 4,
    name: 'Cosmic Salt Nic - 30ml',
    price: 15.99,
    image: 'https://via.placeholder.com/400x400/8e008e/000000?text=Vape4',
  },
];

const FeaturedProducts = () => {
  return (
    <div className="w-full mt-16">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;