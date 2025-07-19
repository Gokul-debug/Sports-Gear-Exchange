import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import AddItem from './pages/AddItem';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail';
import Footer from './components/Footer';
import ManageItems from './pages/ManageItems';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/add-item" element={<AddItem refreshItems={function (): void {
                  throw new Error('Function not implemented.');
                } } />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/manage-items" element={<ManageItems />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;