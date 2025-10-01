import React from 'react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    name: 'Vapes',
    href: '#',
    image: '/vape.jpg', // Using images from /public
  },
  {
    name: 'Pods',
    href: '#',
    image: '/pod.png',
  },
  {
    name: 'Disposables',
    href: '#',
    image: '/disposable.png',
  },
  {
    name: 'E-Liquids',
    href: '#',
    image: '/eliquid.jpg',
  },
  {
    name: 'Coil & Tanks',
    href: '#',
    image: '/coil.jpg',
  }
];

const Categories = () => {
    return (
      <div className="w-full mt-16">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">Shop by Category</h2>
        {/* Updated grid for 5 columns on large screens */}
        <div className="homepage-categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    );
  };

export default Categories;