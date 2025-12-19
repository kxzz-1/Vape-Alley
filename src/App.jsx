import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
import AdminPanel from './components/AdminPanel';

const ProtectedRoute = ({ user, children, adminOnly }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Separated component to handle routing and auth logic
// This prevents re-renders of the Router when App state changes
const AppRoutes = ({ addToCart, cartItems, removeFromCart, updateCartQuantity, clearCart, user, setUser }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        if (userData.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/account');
        }
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Login failed. Please check your credentials.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login.' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleSignup = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        if (data.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/account');
        }
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Signup failed.' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An error occurred during signup.' };
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home addToCart={addToCart} />} />
      <Route path="/products/:category" element={<ProductsPage addToCart={addToCart} />} />
      <Route path="/product/:productId" element={<ProductDetailsPage addToCart={addToCart} />} />
      <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateCartQuantity} onClearCart={clearCart} />} />
      <Route path="/search" element={<SearchResultsPage addToCart={addToCart} />} />
      <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupPage handleSignup={handleSignup} />} />
      <Route path="/account" element={<UserProfilePage user={user} onLogout={handleLogout} />} />
      <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
      <Route path="/admin" element={
        <ProtectedRoute user={user} adminOnly={true}>
          <AdminPanel />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Initialize cart from localStorage for guests
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
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

  // Sync cart to localStorage for persistence (Guest mode)
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/cart', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          if (response.ok) {
            const serverCart = await response.json();
            // If server cart is empty but local has items (just logged in), we could merge.
            // For simplicity, we'll prioritize server cart if it has items, 
            // or keep local if server is empty (and maybe sync later).
            // Here we just set server cart as truth.
            if (serverCart.length > 0) {
                setCartItems(serverCart);
            }
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
      fetchCart();
    }
  }, [user]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const removeFromCart = async (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    if (user) {
      try {
        await fetch(`http://localhost:3000/api/cart/${productId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      if (user) {
        try {
          await fetch(`http://localhost:3000/api/cart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ quantity: newQuantity })
          });
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    }
  };

  const addToCart = async (productToAdd, quantity) => {
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

    if (user) {
      try {
        await fetch('http://localhost:3000/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
          body: JSON.stringify({ 
            productId: productToAdd.id, 
            quantity, 
            selectedColor: productToAdd.selectedColor 
          })
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      try {
        await fetch('http://localhost:3000/api/cart', {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  // A single flag to determine if any overlay is open
  const isOverlayOpen = isCartOpen || isMobileMenuOpen;

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
          <AppRoutes 
            addToCart={addToCart} 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateCartQuantity={updateCartQuantity} 
            clearCart={clearCart}
            user={user} 
            setUser={setUser} 
          />
        </main>
        
        <Footer />

        <WhatsAppButton isOverlayOpen={isOverlayOpen} />
      </div>
    </Router>
  );
}

export default App;
