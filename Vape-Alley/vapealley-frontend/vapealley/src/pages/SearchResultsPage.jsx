import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CustomDropdown from '../components/CustomDropdown';

// --- Mock Data (In a real app, this would come from an API call) ---
const allProducts = [
    { id: 1, name: 'VooPoo Argus G3', price: 9000, salePrice: 8099, image: '/argus-g3.png' },
    { id: 2, name: 'Uwell Caliburn G3', price: 8999, image: '/caliburn-g3.jpg' },
    { id: 3, name: 'OXVA Xlim SQ', price: 10629, salePrice: 9699, image: '/xlim-sq.png' },
    { id: 4, name: 'Oxva Xlim Pro', price: 8700, salePrice: 7830, image: '/xlim-pro.jpg' },
    { id: 5, name: 'VooPoo Argus G3 (New)', price: 3599, image: '/g3new.png' },
    { id: 6, name: 'Blue Razzle E-Juice', price: 1999, image: 'https://via.placeholder.com/400x400/0000ff/ffffff?text=Juice1' },
    { id: 7, name: 'Mango Tango E-Juice', price: 2199, salePrice: 1899, image: 'https://via.placeholder.com/400x400/0000ff/ffffff?text=Juice2' },
    { id: 8, name: 'Elf Bar 5000 Disposable', price: 1599, image: 'https://via.placeholder.com/400x400/00ff00/000000?text=Elf+Bar' },
    { id: 9, name: 'Replacement Coils', price: 999, image: 'https://via.placeholder.com/400x400/ffff00/000000?text=Coils' },
];

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
        <div className="relative z-10">
          <CustomDropdown
            options={sortOptions}
            selected={sortOption}
            setSelected={setSortOption}
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid gap-6">
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