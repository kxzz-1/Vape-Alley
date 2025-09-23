// src/App.jsx

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home'; // 1. Import the new Home component

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
    <div>
      <Navbar onCartClick={openCart} />
      {/* This pt-24 class is crucial */}
      <main className="p-8 pt-24">
        <Home />
      </main>
    </div>
  );
}


export default App;