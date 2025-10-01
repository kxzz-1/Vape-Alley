import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage'; // Import the new page
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Sample data for demonstration
const sampleCartItems = [
  {
    id: 1,
    name: 'Neon Disposable Vape',
    price: 19.99,
    quantity: 2,
    image: 'https://via.placeholder.com/150/9d00ff/ffffff?text=Vape1',
  },
  {
    id: 2,
    name: 'Purple Haze E-Liquid',
    price: 24.50,
    quantity: 1,
    image: 'https://via.placeholder.com/150/ff00ee/ffffff?text=Vape2',
  },
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const addToCart = (productToAdd, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Add new item to cart
      return [...prevItems, { ...productToAdd, quantity }];
    });
    // Automatically open the cart to show the user the item was added
    openCart();
  };

  // A single flag to determine if any overlay is open
  const isOverlayOpen = isCartOpen || isMobileMenuOpen;

  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <div className="background-gradient-container" />

        <Navbar onCartClick={openCart} isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Cart
          isOpen={isCartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
        />

        <main className="pt-[72px] w-full flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/products/:category" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/product/:productId" element={<ProductDetailsPage addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onRemove={removeFromCart} />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account" element={<UserProfilePage />} />
            <Route path="/search" element={<SearchResultsPage addToCart={addToCart} />} />
          </Routes>
        </main>
        
        <Footer />

        <WhatsAppButton isOverlayOpen={isOverlayOpen} />
      </div>
    </Router>
  );
}

export default App;
