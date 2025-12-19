import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ addToCart }) => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const brandParam = searchParams.get('brand');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          fetch('http://localhost:3000/api/products'),
          fetch('http://localhost:3000/api/categories'),
          fetch('http://localhost:3000/api/brands')
        ]);

        if (productsRes.ok) setProducts(await productsRes.json());
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
        if (brandsRes.ok) setBrands(await brandsRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
        // Try to match case-insensitive
        const found = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
        if (found) {
            setSelectedCategory(found.name);
        } else if (category.toLowerCase() === 'all') {
            setSelectedCategory('All');
        } else {
            // Fallback: capitalize first letter if not found in list but passed in URL
            setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
        }
    } else {
        setSelectedCategory('All');
    }
  }, [category, categories]);

  useEffect(() => {
      if (brandParam) {
          setSelectedBrand(brandParam);
      }
  }, [brandParam]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Products</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 sticky top-24">
                {/* Categories */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Categories</h3>
                    <div className="space-y-2">
                        <button 
                            onClick={() => setSelectedCategory('All')}
                            className={`block w-full text-left text-sm transition-colors ${selectedCategory === 'All' ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`block w-full text-left text-sm transition-colors ${selectedCategory === cat.name ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Brands */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Brands</h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        <button 
                            onClick={() => setSelectedBrand('All')}
                            className={`block w-full text-left text-sm transition-colors ${selectedBrand === 'All' ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                            All Brands
                        </button>
                        {brands.map(brand => (
                            <button 
                                key={brand.id}
                                onClick={() => setSelectedBrand(brand.name)}
                                className={`block w-full text-left text-sm transition-colors ${selectedBrand === brand.name ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}
                            >
                                {brand.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-400 bg-gray-900/30 rounded-xl border border-gray-800">
                    <p className="text-xl">No products found matching your criteria.</p>
                    <button onClick={() => {setSelectedCategory('All'); setSelectedBrand('All');}} className="mt-4 text-accent hover:underline">Clear Filters</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
