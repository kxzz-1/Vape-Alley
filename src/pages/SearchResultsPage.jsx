import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CustomDropdown from '../components/CustomDropdown';
import { allProducts } from '../../productData.js';

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Alphabetically, A-Z' },
];

const SearchResultsPage = ({ addToCart }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortOption, setSortOption] = useState('relevance');

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    
    const lowerCaseQuery = query.toLowerCase();
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );

    // Sorting logic
    switch (sortOption) {
      case 'price-asc':
        return [...results].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-desc':
        return [...results].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case 'name-asc':
        return [...results].sort((a, b) => a.name.localeCompare(b.name));
      default: // 'relevance'
        return results;
    }
  }, [query, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">
          Search results for "<span className="text-accent">{query}</span>"
        </h1>
        <div className="w-48">
          <div className="relative z-10">
            <CustomDropdown
              options={sortOptions}
              selected={sortOption}
              setSelected={setSortOption}
            />
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-900/50 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">No products found</h2>
          <p className="text-gray-400 mt-2">Try a different search term or browse our categories.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;