import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage'; // Import the new page
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AgeVerificationModal from './components/AgeVerificationModal';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isAgeVerified, setAgeVerified] = useState(sessionStorage.getItem('isAgeVerified') === 'true');

  const handleAgeVerification = () => {
    sessionStorage.setItem('isAgeVerified', 'true');
    setAgeVerified(true);
  };

  // Effect to handle body scroll based on modal state
  useEffect(() => {
    const isOverlayVisible = !isAgeVerified || isCartOpen || isMobileMenuOpen;
    document.body.style.overflow = isOverlayVisible ? 'hidden' : 'auto';
  }, [isAgeVerified, isCartOpen, isMobileMenuOpen]);

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

  // We need to wrap the login/logout logic in a component to use the `useNavigate` hook
  const AuthWrapper = () => {
    const navigate = useNavigate();

    const handleLogin = (credentials) => {
      // In a real app, you'd validate this against a backend
      setUser({
        name: 'John Doe', // Mock name
        email: credentials.email
      });
      navigate('/account');
    };

    const handleLogout = () => {
      setUser(null);
      navigate('/');
    };

    return (
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/products/:category" element={<ProductsPage addToCart={addToCart} />} />
        <Route path="/product/:productId" element={<ProductDetailsPage addToCart={addToCart} />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateCartQuantity} />} />
        <Route path="/search" element={<SearchResultsPage addToCart={addToCart} />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<UserProfilePage user={user} onLogout={handleLogout} />} />
        <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
      </Routes>
    );
  };

  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <div className="background-gradient-container" />

        {!isAgeVerified && (
          <AgeVerificationModal onVerify={handleAgeVerification} />
        )}

        <Navbar user={user} onCartClick={openCart} isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Cart
          isOpen={isCartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
        />

        <main className="pt-[72px] w-full flex-grow">
          <AuthWrapper />
        </main>
        
        <Footer />

        <WhatsAppButton isOverlayOpen={isOverlayOpen} />
      </div>
    </Router>
  );
}

export default App;
