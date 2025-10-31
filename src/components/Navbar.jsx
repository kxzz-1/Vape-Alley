import React, { useState, Fragment } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import MegaMenu from './MegaMenu'; // Import the new MegaMenu component

// --- Data for the new Mega Menus ---
const devicesMenu = [
    {
        title: 'Mods',
        image: '/mod-banner.webp',
        links: [ // Example links, can be more specific
            { name: 'VooPoo', href: '/products/devices' },
            { name: 'Vaporesso', href: '/products/devices' },
            { name: 'Smok', href: '/products/devices' },
        ],
    },
    {
        title: 'Pods',
        image: '/pod-banner.webp',
        links: [ // Example links
            { name: 'Oxva', href: '/products/devices' },
            { name: 'Geek Vape', href: '/products/devices' },
            { name: 'Uwell', href: '/products/devices' },
        ],
    },
];

const eJuiceMenu = [
    {
        title: 'Freebase',
        image: '/freebase.webp',
        links: [ // Example links
            { name: 'Fruity Flavors', href: '/products/e-juices' },
            { name: 'Dessert Flavors', href: '/products/e-juices' },
            { name: 'Menthol', href: '/products/e-juices' },
        ],
    },
    {
        title: 'Nic Salts',
        image: '/nicsalt.webp',
        links: [ // Example links
            { name: 'High Nicotine', href: '/products/e-juices' },
            { name: 'Smooth Blends', href: '/products/e-juices' },
            { name: 'Tobacco Flavors', href: '/products/e-juices' },
        ],
    },
];

const disposablesMenu = [
    {
        title: 'By Puff Count',
        image: '/disposable.png',
        links: [ // Example links
            { name: 'Up to 3000 Puffs', href: '/products/disposables' },
            { name: '3000-6000 Puffs', href: '/products/disposables' },
            { name: '6000+ Puffs', href: '/products/disposables' },
        ],
    }
];

const accessoriesMenu = [
    {
        title: 'Coils & Tanks',
        image: '/accessories.webp',
        links: [ // Example links
            { name: 'Replacement Coils', href: '/products/accessories' },
            { name: 'Sub-Ohm Tanks', href: '/products/accessories' },
            { name: 'RDA / RTA', href: '/products/accessories' },
        ],
    }
];

// --- Mobile Accordion Item Component ---
const AccordionItem = ({ title, sections, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-primary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-xl text-accent hover:text-white"
      >
        <span>{title}</span>
        <ChevronDownIcon className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-4 pb-4 space-y-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-2">{section.title}</h4>
              <div className="flex flex-col space-y-2">
                {section.links.map((link) => (
                  <Link key={link.name} to={link.href} onClick={closeMenu} className="text-gray-300 hover:text-accent">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = ({ user, onCartClick, isMobileMenuOpen, setMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false); // Close mobile menu on search
    }
  };

  return (
    <header>
      <nav className="navbar">
        {/* Left Section */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center gap-x-2">
            <img src="/logo.png" alt="Vape Alley Logo" className="h-10 w-10" />
            <span className="brand-name">Vape Alley</span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <MegaMenu title="Devices" sections={devicesMenu} />
            <MegaMenu title="E-Juice" sections={eJuiceMenu} />
            <MegaMenu title="Disposables" sections={disposablesMenu} />
            <MegaMenu title="Accessories" sections={accessoriesMenu} />
          </ul>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-x-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-gray-800/50 text-white placeholder-gray-500 rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-accent transition-all w-40 focus:w-56"
            />
            <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>
          <button type="button" onClick={onCartClick} aria-label="Open Shopping Cart" className="icon-button">
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          <Link to={user ? "/account" : "/login"} aria-label="My Account" className="icon-button">
            <UserIcon className="h-6 w-6" />
          </Link> 
        </div>
        
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex-1 flex justify-end items-center gap-x-4">
            <button type="button" onClick={onCartClick} aria-label="Open Shopping Cart" className="icon-button">
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            {/* Animated Hamburger/Close Icon */}
            <button onClick={() => setMobileMenuOpen(true)} className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Open main menu">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
            </button>
        </div>
      </nav>
      
      {/* Animated Full-Screen Mobile Menu */}
      <Transition.Root show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={() => setMobileMenuOpen(false)}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          {/* Menu Panel */}
          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
                {/* Header with Close Button */}
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="mt-2 space-y-6 px-4 py-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-gray-800/50 text-white placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  </form>

                  <div className="space-y-6 border-t border-primary/20 pt-6">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="w-full py-2 text-lg text-accent hover:text-white">Home</Link>
                  <AccordionItem title="Devices" sections={devicesMenu} closeMenu={() => setMobileMenuOpen(false)} />
                  <AccordionItem title="E-Juice" sections={eJuiceMenu} closeMenu={() => setMobileMenuOpen(false)} />
                  <AccordionItem title="Disposables" sections={disposablesMenu} closeMenu={() => setMobileMenuOpen(false)} />
                  <AccordionItem title="Accessories" sections={accessoriesMenu} closeMenu={() => setMobileMenuOpen(false)} />
                    </div>
                </div>

                {/* Account Button */}
                <div className="space-y-6 border-t border-primary/20 px-4 py-6">
                  <NavLink to={user ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-x-3 py-3 rounded-lg bg-primary hover:bg-primary-hover transition-colors text-white font-bold">
                    <UserIcon className="h-6 w-6" /> My Account
                  </NavLink>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Navbar;
