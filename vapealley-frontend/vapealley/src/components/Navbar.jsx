import React, { useState } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
import MegaMenu from './MegaMenu'; // Import the new MegaMenu component

// --- Data for the new Mega Menus ---
const devicesMenu = [
    {
        title: 'Mods',
        image: '/carousel1.jpg',
        links: [
            { name: 'VooPoo', href: '#' },
            { name: 'Vaporesso', href: '#' },
            { name: 'Smok', href: '#' },
        ],
    },
    {
        title: 'Pods',
        image: '/carousel2.jpg',
        links: [
            { name: 'Oxva', href: '#' },
            { name: 'Geek Vape', href: '#' },
            { name: 'Uwell', href: '#' },
        ],
    },
];

const eJuiceMenu = [
    {
        title: 'Freebase',
        image: '/carousel3.jpg',
        links: [
            { name: 'Fruity Flavors', href: '#' },
            { name: 'Dessert Flavors', href: '#' },
            { name: 'Menthol', href: '#' },
        ],
    },
    {
        title: 'Nic Salts',
        image: 'https://via.placeholder.com/400x400/8e008e/000000?text=Vape4',
        links: [
            { name: 'High Nicotine', href: '#' },
            { name: 'Smooth Blends', href: '#' },
            { name: 'Tobacco Flavors', href: '#' },
        ],
    },
];

const disposablesMenu = [
    {
        title: 'By Puff Count',
        image: '/disposable.png',
        links: [
            { name: 'Up to 3000 Puffs', href: '#' },
            { name: '3000-6000 Puffs', href: '#' },
            { name: '6000+ Puffs', href: '#' },
        ],
    },
    {
        title: 'Popular Brands',
        image: 'https://via.placeholder.com/400x400/ff6347/ffffff?text=Dispo',
        links: [
            { name: 'Elf Bar', href: '#' },
            { name: 'Lost Mary', href: '#' },
            { name: 'Waka', href: '#' },
        ],
    },
];

const accessoriesMenu = [
    {
        title: 'Coils & Tanks',
        image: '/coil.jpg',
        links: [
            { name: 'Replacement Coils', href: '#' },
            { name: 'Sub-Ohm Tanks', href: '#' },
            { name: 'RDA / RTA', href: '#' },
        ],
    },
    {
        title: 'Other Gear',
        image: 'https://via.placeholder.com/400x400/4682b4/ffffff?text=Gear',
        links: [
            { name: 'Batteries & Chargers', href: '#' },
            { name: 'Drip Tips', href: '#' },
            { name: 'Cases & Lanyards', href: '#' },
        ],
    },
];

const Navbar = ({ onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        {/* Left Section */}
        <div className="flex-1">
          <a href="/" className="flex items-center gap-x-2">
            <img src="/logo.png" alt="Vape Alley Logo" className="h-10 w-10" />
            <span className="brand-name">Vape Alley</span>
          </a>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <MegaMenu title="Devices" sections={devicesMenu} />
            <MegaMenu title="E-Juice" sections={eJuiceMenu} />
            <MegaMenu title="Disposables" sections={disposablesMenu} />
            <MegaMenu title="Accessories" sections={accessoriesMenu} />
          </ul>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-x-6">
          <button type="button" aria-label="Search" className="icon-button">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button type="button" onClick={onCartClick} aria-label="Open Shopping Cart" className="icon-button">
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          <button type="button" aria-label="My Account" className="icon-button">
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Hamburger Menu */}
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
            <a href="#devices">Devices</a>
            <a href="#ejuice">E-Juice</a>
            <a href="#disposables">Disposables</a>
            <a href="#accessories">Accessories</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
