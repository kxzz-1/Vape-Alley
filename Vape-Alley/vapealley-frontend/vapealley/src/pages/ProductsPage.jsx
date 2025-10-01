import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CustomDropdown from '../components/CustomDropdown'; // Import the new component
import { ChevronRightIcon } from '@heroicons/react/24/solid';

// In a real app, this data would come from a global state/context or an API call
const allProducts = {
  Devices: [
    { id: 1, name: 'VooPoo Argus G3', price: 9000, salePrice: 8099, image: '/argus-g3.png' },
    { id: 2, name: 'Uwell Caliburn G3', price: 8999, image: '/caliburn-g3.jpg' },
    { id: 3, name: 'OXVA Xlim SQ', price: 10629, salePrice: 9699, image: '/xlim-sq.png' },
    { id: 4, name: 'Oxva Xlim Pro', price: 8700, salePrice: 7830, image: '/xlim-pro.jpg' },
    { id: 5, name: 'VooPoo Argus G3 (New)', price: 3599, image: '/g3new.png' },
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

const categoryOptions = [
  { value: 'all', label: 'All' },
  { value: 'devices', label: 'Devices' },
  { value: 'e-juices', label: 'E-Juices' },
  { value: 'disposables', label: 'Disposables' },
  { value: 'accessories', label: 'Accessories' },
];

const categories = categoryOptions.map(c => c.label);

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Alphabetically, A-Z' },
];

const ProductsPage = ({ addToCart }) => {
  const { category: urlCategory } = useParams();
  const [sortOption, setSortOption] = useState('featured');
  const navigate = useNavigate();

  // Capitalize the first letter for display and matching
  const activeCategory = useMemo(() => {
    if (!urlCategory || urlCategory === 'all') return 'All';
    const formatted = urlCategory.replace('-', ' ');
    // Handle multi-word categories like 'e-juices'
    return formatted.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, [urlCategory]);

  const productsToDisplay = useMemo(() => {
    let products = [];
    if (activeCategory === 'All') {
      products = Object.values(allProducts).flat();
    } else {
      products = allProducts[activeCategory] || [];
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

  const handleCategoryChange = (categoryValue) => {
    // Navigate to the new category URL
    navigate(`/products/${categoryValue}`);
  };

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
        <aside className="hidden lg:block lg:col-span-1 bg-gray-900/50 p-6 rounded-xl self-start">
          <h2 className="text-xl font-bold text-accent mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map(cat => <CategoryLink key={cat} cat={cat} />)}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-1 lg:col-span-3">
          <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-white">
              {activeCategory} Products
            </h1>
            <div className="flex items-center gap-4">
              {/* Category Dropdown for Mobile */}
              <div className="lg:hidden">
                <CustomDropdown
                  options={categoryOptions}
                  selected={urlCategory || 'all'}
                  setSelected={handleCategoryChange}
                />
              </div>
              {/* Sort Dropdown */}
              <CustomDropdown
                options={sortOptions}
                selected={sortOption}
                setSelected={setSortOption}
              />
            </div>
          </div>

          {productsToDisplay.length > 0 ? (
            <div className="products-grid gap-6">
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