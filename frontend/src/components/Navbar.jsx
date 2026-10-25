import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingBag, User, LogOut, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-wrap">
            <BookOpen className="logo-icon" size={24} />
          </div>
          <div className="logo-text">
            <span className="logo-title">PageTurner</span>
            <span className="logo-subtitle">Online Book Store</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/catalogue" className={`nav-link ${isActive('/catalogue') ? 'active' : ''}`}>
            Catalogue
          </Link>
        </div>

        {/* Right side actions */}
        <div className="nav-actions desktop-only">
          <Link to="/cart" className="cart-btn" title="View Cart">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <div className="user-pill">
                <User size={16} />
                <span className="user-name">{user.fullName.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout" title="Logout">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn-primary">
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="mobile-toggle">
          <Link to="/cart" className="cart-btn mobile-cart-btn" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-icon-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link
            to="/"
            className={`mobile-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/catalogue"
            className={`mobile-link ${isActive('/catalogue') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Catalogue
          </Link>

          {user ? (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <User size={18} />
                <span>Signed in as <strong>{user.fullName}</strong></span>
              </div>
              <button onClick={handleLogout} className="btn-logout-mobile">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="mobile-auth-section">
              <Link
                to="/login"
                className="btn-secondary mobile-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/register"
                className="btn-primary mobile-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus size={16} /> Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
