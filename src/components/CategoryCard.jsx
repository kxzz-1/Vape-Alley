import React from 'react';

const CategoryCard = ({ category }) => {
  const { name, image, href } = category;

  return (
    <a href={href} className="group block">
      {/* Replaced h-64 with aspect-square to make the card a perfect square */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-900">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-50">
          <h3 className="text-2xl font-extrabold text-white drop-shadow-lg text-center">{name}</h3>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;