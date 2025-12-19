import React, { useState, useEffect, Fragment } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, XMarkIcon, ChevronDownIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import MegaMenu from './MegaMenu'; // Import the new MegaMenu component

// --- Mobile Accordion Item Component ---
const AccordionItem = ({ title, items, closeMenu }) => {
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
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <Link key={item.name} to={item.href} onClick={closeMenu} className="flex items-center gap-3 group">
                <div className="h-8 w-8 bg-white rounded-full p-0.5 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-gray-800 font-bold text-xs">{item.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-gray-300 group-hover:text-accent text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ user, onCartClick, isMobileMenuOpen, setMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandMenus, setBrandMenus] = useState({
    devices: [],
    eJuice: [],
    disposables: [],
    accessories: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/brands');
        if (response.ok) {
          const brands = await response.json();
          const newMenus = { devices: [], eJuice: [], disposables: [], accessories: [] };

          brands.forEach(brand => {
            const brandItem = {
              name: brand.name,
              image: brand.image,
              href: `/search?q=${encodeURIComponent(brand.name)}`
            };

            brand.categories.forEach(cat => {
              const catName = cat.name.toLowerCase();
              if (catName.includes('device') || catName.includes('mod') || catName.includes('pod') || catName.includes('vape')) {
                newMenus.devices.push(brandItem);
              } else if (catName.includes('juice') || catName.includes('liquid')) {
                newMenus.eJuice.push(brandItem);
              } else if (catName.includes('disposable')) {
                newMenus.disposables.push(brandItem);
              } else if (catName.includes('access') || catName.includes('coil') || catName.includes('tank')) {
                newMenus.accessories.push(brandItem);
              }
            });
          });
          setBrandMenus(newMenus);
        }
      } catch (error) {
        console.error("Failed to fetch brands for menu", error);
      }
    };
    fetchBrands();
  }, []);

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
            <MegaMenu title="Devices" items={brandMenus.devices} />
            <MegaMenu title="E-Juice" items={brandMenus.eJuice} />
            <MegaMenu title="Disposables" items={brandMenus.disposables} />
            <MegaMenu title="Accessories" items={brandMenus.accessories} />
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
          <Link to="/admin" aria-label="Admin Panel" className="icon-button">
            <Squares2X2Icon className="h-6 w-6" />
          </Link>
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
                  <AccordionItem title="Devices" items={brandMenus.devices} closeMenu={() => setMobileMenuOpen(false)} />
                  <AccordionItem title="E-Juice" items={brandMenus.eJuice} closeMenu={() => setMobileMenuOpen(false)} />
                  <AccordionItem title="Disposables" items={brandMenus.disposables} closeMenu={() => setMobileMenuOpen(false)} />
                  <AccordionItem title="Accessories" items={brandMenus.accessories} closeMenu={() => setMobileMenuOpen(false)} />
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full py-2 text-lg text-accent hover:text-white flex items-center gap-2"><Squares2X2Icon className="h-5 w-5" /> Admin Panel</Link>
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
