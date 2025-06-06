// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import { CartProvider, useCart } from './context/CartContext';
import NavbarComponent from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';

function AppContent() {
  const { getItemsCount } = useCart();

  return (
    <div className="App d-flex flex-column min-vh-100">
      <NavbarComponent cartItemsCount={getItemsCount()} />
      
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;