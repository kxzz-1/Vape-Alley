import React, { useState, useRef, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ProductsSection = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Devices');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFading, setIsFading] = useState(false);
  const [arrowStyle, setArrowStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const tabsRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:3000/api/products'),
          fetch('http://localhost:3000/api/categories')
        ]);

        let fetchedCategories = [];
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          fetchedCategories = categoriesData.map(c => c.name);
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);

          // Fallback: if no categories in DB, extract from products to ensure tabs show up
          if (fetchedCategories.length === 0 && productsData.length > 0) {
            fetchedCategories = [...new Set(productsData.map(p => p.category))];
          }
        }
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = useCallback((category) => {
    if (category === activeCategory) return;

    setIsFading(true);
    // Wait for the fade-out animation to complete before changing the content
    setTimeout(() => {
      setActiveCategory(category);
      setIsFading(false);
    }, 200); // This duration should match the CSS transition duration
  }, [activeCategory]);

  const displayedProducts = products.filter(p => p.category === activeCategory);

  // --- Effect for positioning the tab arrow ---
  // This effect calculates the position for the pointer arrow
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeTabElement) {
        const { offsetLeft, clientWidth, scrollLeft } = activeTabElement;
        const tabsScrollLeft = tabsRef.current.scrollLeft;
        setArrowStyle({
          // Adjust for the scroll position of the tabs container
          left: `${offsetLeft - tabsScrollLeft + clientWidth / 2}px`,
        });
      }
    }
  }, [activeCategory]);

  // --- Effect for auto-scrolling the carousel ---
  const scrollNext = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth;
      // If scrolled to the end, loop back to the start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    // Reset scroll to the beginning when category changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }

    // Set up the interval for auto-scrolling
    const interval = setInterval(() => {
      if (!isHovering) {
        scrollNext();
      }
    }, 4000); // Change slide every 4 seconds

    // Clean up the interval on component unmount or when dependencies change
    return () => clearInterval(interval);
  }, [activeCategory, isHovering, scrollNext]);

  if (isLoading) {
    return (
      <div className="products-section-container flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="products-section-container">
      <h2 className="products-section-title">OUR PRODUCTS</h2>
      
      {/* Top Banner Image */}
      <div className="products-section-banner">
        <img src="/sale-banner.png" alt="Product Categories Banner" />
      </div>

      {/* Unified container for tabs and products */}
      <div className="product-display-container">
        {/* Tabs Container */}
        <div className="relative">
          <div ref={tabsRef} className="products-section-tabs">
            {categories.map((category) => (
              <button
                key={category}
                data-category={category}
                onClick={() => handleCategoryChange(category)}
                className={`product-tab ${activeCategory === category ? 'product-tab-active' : ''}`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
          {/* The pointer arrow, now positioned relative to the tabs */}
          <div className="product-display-arrow" style={arrowStyle}></div>
        </div>
        
        {/* Product Scroller */}
        <div className="product-scroller-outer">
          <div 
            ref={scrollContainerRef}
            className={`products-horizontal-scroll ${isFading ? 'opacity-0' : 'opacity-100'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
      {/* View All Button */}
      <div className="text-center mt-8">
          <Link 
              to={`/products/${activeCategory.toLowerCase().replace(' ', '-')}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105"
          >
              View All {activeCategory}
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
          </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
