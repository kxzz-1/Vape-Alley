import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CustomDropdown from '../components/CustomDropdown'; // Import the new component
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { allProducts, categories } from '../../productData.js';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Alphabetically, A-Z' },
];

const ProductsPage = ({ addToCart }) => {
  const { category: urlCategory } = useParams();
  const [sortOption, setSortOption] = useState('featured');

  // Capitalize the first letter for display and matching
  const activeCategory = useMemo(() => {
    if (!urlCategory || urlCategory === 'all') return 'All';
    // Find the correct category from the list, matching case-insensitively.
    // This handles 'e-juices' correctly becoming 'E-Juices'.
    const foundCategory = categories.find(c => c.toLowerCase().replace(' ', '-') === urlCategory.toLowerCase());
    return foundCategory || 'All';
  }, [urlCategory]);

  const productsToDisplay = useMemo(() => {
    let products = [];
    if (activeCategory === 'All') {
      products = allProducts;
    } else {
      products = allProducts.filter(p => p.category === activeCategory);
    }

    // Sorting logic
    switch (sortOption) {
      case 'price-asc':
        return [...products].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-desc':
        return [...products].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      case 'name-asc':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products; // 'featured' or default
    }
  }, [activeCategory, sortOption]);

  const CategoryLink = ({ cat }) => {
    const to = `/products/${cat.toLowerCase().replace(' ', '-')}`;
    const isActive = cat === activeCategory;
    return (
      <Link
        to={to}
        className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
          isActive ? 'bg-primary text-white' : 'hover:bg-gray-800/50 text-gray-300'
        }`}
      >
        {cat}
      </Link>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-accent">Home</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2" />
        <Link to="/products/all" className="hover:text-accent">Products</Link>
        {activeCategory !== 'All' && (
          <>
            <ChevronRightIcon className="h-4 w-4 mx-2" />
            <span className="text-white">{activeCategory}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-gray-900/50 p-6 rounded-xl self-start">
          <h2 className="text-xl font-bold text-accent mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map(cat => <CategoryLink key={cat} cat={cat} />)}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              {activeCategory} Products
            </h1>
            <div className="relative z-10">
              {/* Sort Dropdown */}
              <CustomDropdown
                options={sortOptions}
                selected={sortOption}
                setSelected={setSortOption}
              />
            </div>
          </div>

          {productsToDisplay.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {productsToDisplay.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-900/50 rounded-lg">
              <p className="text-gray-400">No products found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;