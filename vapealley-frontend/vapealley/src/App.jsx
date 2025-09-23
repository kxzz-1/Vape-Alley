import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Footer from './components/Footer';

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
  const [cartItems, setCartItems] = useState(sampleCartItems);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    // The main container for your app's layout
    <div className="app-container flex flex-col min-h-screen">
      {/* This new div is ONLY for the background. It won't affect the layout. */}
      <div className="background-gradient-container" />

      <Navbar onCartClick={openCart} />
      <Cart isOpen={isCartOpen} onClose={closeCart} cartItems={cartItems} />

      <main className="p-8 pt-24 flex-grow">
        <Home />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

