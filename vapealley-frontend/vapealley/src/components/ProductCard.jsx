import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
  const { name, price, salePrice, image } = product;

  // Function to format the price with commas
  const formatPrice = (num) => `Rs ${num.toLocaleString()}`;

  return (
    <div className="group relative flex w-48 flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-gray-800 group-hover:opacity-75">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-1 p-3 text-center">
        <h3 className="text-xs font-medium text-gray-200 h-8">
          {name}
        </h3>
        <div className="flex flex-1 flex-col justify-end">
          {/* Price section with conditional sale price */}
          <div className="h-10">
            {salePrice ? (
              <>
                <p className="text-xs text-gray-500 line-through">{formatPrice(price)}</p>
                <p className="text-base font-semibold text-accent">{formatPrice(salePrice)}</p>
              </>
            ) : (
              <p className="text-lg font-semibold text-accent">{formatPrice(price)}</p>
            )}
          </div>
          <button className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors">
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;