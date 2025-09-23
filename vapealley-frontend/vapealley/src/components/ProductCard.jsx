import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
  const { name, price, image } = product;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-800 lg:aspect-none group-hover:opacity-75 h-60">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-200">
          {name}
        </h3>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-lg font-semibold text-accent">${price.toFixed(2)}</p>
          <button className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-hover transition-colors">
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;