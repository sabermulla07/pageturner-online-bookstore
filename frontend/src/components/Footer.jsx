import React from 'react';
import { BookOpen, Heart, ShieldCheck, Truck, RefreshCw, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="features-bar">
        <div className="container features-grid">
          <div className="feature-item">
            <Truck className="feature-icon" size={24} />
            <div>
              <h4>Free Express Delivery</h4>
              <p>On all bookstore orders above $35</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck className="feature-icon" size={24} />
            <div>
              <h4>100% Genuine Books</h4>
              <p>Direct from verified publishers</p>
            </div>
          </div>
          <div className="feature-item">
            <RefreshCw className="feature-icon" size={24} />
            <div>
              <h4>Easy 14-Day Returns</h4>
              <p>Hassle-free replacement policy</p>
            </div>
          </div>
          <div className="feature-item">
            <PhoneCall className="feature-icon" size={24} />
            <div>
              <h4>24/7 Student Support</h4>
              <p>Dedicated academic hotline</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <BookOpen className="brand-icon" size={28} />
            <span>PageTurner</span>
          </div>
          <p className="brand-desc">
            Your premier online bookstore for computer science textbooks, bestselling fiction, academic references, and personal growth literature.
          </p>
          <div className="tech-badge-group">
            <span className="tech-badge">React 19</span>
            <span className="tech-badge">Spring Boot</span>
            <span className="tech-badge">MySQL</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/catalogue">Book Catalogue</Link></li>
            <li><Link to="/login">User Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Popular Genres</h4>
          <ul>
            <li><Link to="/catalogue?category=Computer+Science">Computer Science</Link></li>
            <li><Link to="/catalogue?category=Fiction">Fiction & Novels</Link></li>
            <li><Link to="/catalogue?category=Self+Help">Self Improvement</Link></li>
            <li><Link to="/catalogue?category=Business">Business & Startups</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact & Location</h4>
          <p>Vishwakarma Institute of Technology (VIT)</p>
          <p>Bibwewadi, Pune, Maharashtra 411037</p>
          <p>Email: support@pageturner-vit.edu</p>
          <p>Web Technologies Lab Assignment 07</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; {new Date().getFullYear()} PageTurner Book Store. Designed for Web Technologies Lab.</p>
          <p className="designer-tag">Designed with <Heart size={14} className="heart-icon" /> by Saber Mulla</p>
        </div>
      </div>
    </footer>
  );
}
