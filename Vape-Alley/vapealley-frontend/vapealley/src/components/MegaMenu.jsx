import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const MegaMenu = ({ title, sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a href="#" className="flex items-center gap-x-1 whitespace-nowrap">
        {title}
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </a>
      {isOpen && (
        <div className="mega-menu-container">
          <div className="mega-menu">
            <div className="mega-menu-content">
              {sections.map((section) => (
                <div key={section.title} className="mega-menu-section">
                  <div className="mega-menu-image-container">
                      <img src={section.image} alt={section.title} className="mega-menu-image" />
                  </div>
                  <div>
                    <h3 className="mega-menu-heading">{section.title}</h3>
                    <ul className="mega-menu-links">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a href={link.href} className="mega-menu-link">
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default MegaMenu;
