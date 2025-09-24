import React, { useState } from 'react';
import ProductCard from './ProductCard';

// Sample data organized by category, now including sale prices
const productData = {
  Devices: [
    { id: 1, name: 'VooPoo Argus G3', price: 9000, salePrice: 8099, image: 'https://via.placeholder.com/400x400/c800c8/000000?text=Argus+G3' },
    { id: 2, name: 'Uwell Caliburn G3', price: 8999, image: 'https://via.placeholder.com/400x400/a900a9/000000?text=Caliburn+G3' },
    { id: 3, name: 'OXVA Xlim SQ', price: 10629, salePrice: 9699, image: 'https://via.placeholder.com/400x400/8e008e/000000?text=Xlim+SQ' },
    { id: 4, name: 'Oxva Xlim Pro', price: 8700, salePrice: 7830, image: 'https://via.placeholder.com/400x400/c800c8/000000?text=Xlim+Pro' },
    { id: 5, name: 'VooPoo Argus G3 (New)', price: 3599, image: 'https://via.placeholder.com/400x400/a900a9/000000?text=Argus+G3' },
  ],
  'E-Juices': [
    { id: 6, name: 'Blue Razzle', price: 1999, image: 'https://via.placeholder.com/400x400/0000ff/ffffff?text=Juice1' },
    { id: 7, name: 'Mango Tango', price: 2199, salePrice: 1899, image: 'https://via.placeholder.com/400x400/0000ff/ffffff?text=Juice2' },
  ],
  Disposables: [
    { id: 8, name: 'Elf Bar 5000', price: 1599, image: 'https://via.placeholder.com/400x400/00ff00/000000?text=Elf+Bar' },
  ],
  Accessories: [
    { id: 9, name: 'Replacement Coils', price: 999, image: 'https://via.placeholder.com/400x400/ffff00/000000?text=Coils' },
  ],
};

const categories = ['Devices', 'E-Juices', 'Disposables', 'Accessories'];

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Devices');

  const displayedProducts = productData[activeCategory] || [];

  return (
    <div className="products-section-container">
      <h2 className="products-section-title">OUR PRODUCTS</h2>
      
      {/* Top Banner Image */}
      <div className="products-section-banner">
        <img src="/products.png" alt="Product Categories Banner" />
      </div>

      {/* Category Tabs */}
      <div className="products-section-tabs">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`product-tab ${activeCategory === category ? 'product-tab-active' : ''}`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Horizontally Scrolling Product Grid */}
      <div className="products-horizontal-scroll">
        <div className="products-section-grid-inner">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
