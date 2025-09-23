// src/components/Navbar.jsx
import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <a href="/" className="flex items-center gap-x-2">
          <img src="/logo.png" alt="Vape Alley Logo" className="h-10 w-10" />
          <span className="brand-name">
            Vape Alley
          </span>
        </a>

        {/* ... (Hamburger menu remains the same) ... */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* The ml-auto class pushes this entire block to the right */}
        <ul className={`nav-links ml-auto ${isOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#about">About Us</a></li>
          <li>
            <button
              type="button"
              onClick={onCartClick}
              aria-label="Open Shopping Cart"
              className="hover:text-neon-purple transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;