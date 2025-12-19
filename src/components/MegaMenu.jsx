import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const MegaMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-x-1 whitespace-nowrap">
        {title}
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="mega-menu-container">
          <div className="mega-menu">
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {items && items.map((item) => (
                <Link key={item.name} to={item.href} className="flex items-center gap-3 group p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="h-8 w-8 bg-white rounded-full p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-gray-800 font-bold text-xs">{item.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-accent font-medium truncate">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default MegaMenu;
