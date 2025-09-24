import React from 'react';

// A simple component for social media icons. You can replace the SVGs with icons from a library if you prefer.
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: About */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-x-2">
              <img src="/logo.png" alt="Vape Alley Logo" className="h-10 w-10" />
              <span className="brand-name">Vape Alley</span>
            </a>
            <p className="text-gray-400">Your one-stop shop for the best vaping products and accessories in Pakistan.</p>
            {/* Social Media Icons */}
            <div className="footer-socials">
              <SocialIcon href="#">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.161 3.096a6.402 6.402 0 00-6.402 6.402 6.402 6.402 0 006.402 6.402 6.402 6.402 0 006.402-6.402c0-3.536-2.866-6.402-6.402-6.402zM12 15.11a3.11 3.11 0 110-6.22 3.11 3.11 0 010 6.22zm4.352-7.194a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z" clipRule="evenodd" /></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Products</a></li>
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="footer-heading">Customer Service</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">My Account</a></li>
              <li><a href="#" className="footer-link">Order History</a></li>
              <li><a href="#" className="footer-link">Track Order</a></li>
            </ul>
          </div>
          {/* Column 3: Categories */}
          <div>
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Vapes</a></li>
              <li><a href="#" className="footer-link">Pods</a></li>
              <li><a href="#" className="footer-link">E-Liquids</a></li>
              <li><a href="#" className="footer-link">Disposables</a></li>
              <li><a href="#" className="footer-link">Coil & Tanks</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-links">
              <li className="text-gray-400">Lahore, Punjab, Pakistan</li>
              <li className="text-gray-400">Email: contact@vapealley.com</li>
              <li className="text-gray-400">Phone: +92 302 9356404</li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} Vape Alley. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
