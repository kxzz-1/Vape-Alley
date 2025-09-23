import React, { useState } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const productCategories = [
  { name: 'Vapes', href: '#' },
  { name: 'Pods', href: '#' },
  { name: 'E-Liquids', href: '#' },
  { name: 'Disposables', href: '#' },
  { name: 'Coil & Tanks', href: '#' },
];

const Navbar = ({ onCartClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        {/* Left Section: Logo and Brand Name */}
        <div className="flex-1">
          <a href="/" className="flex items-center gap-x-2">
            <img src="/logo.png" alt="Vape Alley Logo" className="h-10 w-10" />
            <span className="brand-name">Vape Alley</span>
          </a>
        </div>

        {/* Center Section: Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a href="#products" className="flex items-center gap-x-1">
                Products
              </a>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {productCategories.map((item) => (
                    <a key={item.name} href={item.href} className="dropdown-item">
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>

        {/* Right Section: Icons (hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-x-6">
          <button type="button" aria-label="Search" className="icon-button">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button type="button" onClick={onCartClick} aria-label="Open Shopping Cart" className="icon-button">
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Hamburger Menu (Corrected) */}
        <div className="md:hidden flex-1 flex justify-end">
            <button onClick={toggleMobileMenu} className="hamburger">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About Us</a>
            {/* You can add mobile-specific search and cart buttons here if you wish */}
        </div>
      )}
    </header>
  );
};

export default Navbar;
