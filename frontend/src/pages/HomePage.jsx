import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, BookCheck, ShieldCheck, Flame, BookOpen, Star } from 'lucide-react';
import { bookApi } from '../services/api';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFeatured() {
      try {
        const books = await bookApi.getFeatured();
        setFeaturedBooks(books.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/catalogue');
    }
  };

  const categories = [
    { name: 'Computer Science', icon: '💻', count: '120+ Titles', desc: 'Software, Algorithms & Web Dev' },
    { name: 'Fiction', icon: '📖', count: '90+ Titles', desc: 'Classics, Thrillers & Dystopian' },
    { name: 'Self Help', icon: '🌱', count: '75+ Titles', desc: 'Habits, Productivity & Mindset' },
    { name: 'Business', icon: '💼', count: '60+ Titles', desc: 'Startups, Economics & Leadership' },
    { name: 'Science & History', icon: '🔬', count: '50+ Titles', desc: 'Evolution, Space & Human Heritage' },
    { name: 'Literature', icon: '🖋️', count: '85+ Titles', desc: 'Poetry, Philosophy & Memoirs' }
  ];

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={16} /> <span>Spring Boot & React Powered Bookstore</span>
            </div>
            <h1 className="hero-title">
              Expand Your Mind with <span className="gradient-text">World-Class Books</span>
            </h1>
            <p className="hero-description">
              Explore thousands of curated academic textbooks, technical programming manuals, gripping fiction, and personal growth bestsellers. Fast delivery and secure checkout.
            </p>

            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <Search className="hero-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by book title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
              <button type="submit" className="hero-search-btn">
                Search
              </button>
            </form>

            {/* Quick Metrics */}
            <div className="hero-metrics">
              <div className="metric-box">
                <span className="metric-number">10,000+</span>
                <span className="metric-label">Books Sold</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-number">4.9 / 5.0</span>
                <span className="metric-label">Reader Rating</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-number">100%</span>
                <span className="metric-label">Authentic Copies</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="hero-card-glow"></div>
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80"
                alt="Featured Book Showcase"
                className="hero-main-img"
              />
              <div className="floating-badge badge-top-right">
                <Flame size={18} className="badge-flame" />
                <div>
                  <strong>Bestseller</strong>
                  <span>Top Tech Reads</span>
                </div>
              </div>
              <div className="floating-badge badge-bottom-left">
                <BookCheck size={18} className="badge-check" />
                <div>
                  <strong>Verified Quality</strong>
                  <span>Direct Publisher Prints</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag">Browse by Department</span>
              <h2 className="section-title">Explore Popular Categories</h2>
            </div>
            <Link to="/catalogue" className="view-all-link">
              View All Books <ArrowRight size={18} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="category-card"
                onClick={() => navigate(`/catalogue?category=${encodeURIComponent(cat.name)}`)}
              >
                <div className="cat-icon">{cat.icon}</div>
                <h3 className="cat-name">{cat.name}</h3>
                <p className="cat-desc">{cat.desc}</p>
                <span className="cat-count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag">Curated Collection</span>
              <h2 className="section-title">Editor's Choice & Featured Books</h2>
            </div>
            <Link to="/catalogue" className="view-all-link">
              Explore Full Catalogue <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="loading-spinner-wrap">
              <div className="spinner"></div>
              <p>Loading curated catalogue...</p>
            </div>
          ) : (
            <div className="books-grid">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} onQuickView={setSelectedBook} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <span className="promo-pill">Special Academic Offer</span>
              <h2>VIT Pune Student & Faculty Discount</h2>
              <p>
                Get 20% off all engineering, programming, and mathematics textbooks with instant delivery across campus.
              </p>
              <div className="promo-actions">
                <Link to="/catalogue?category=Computer+Science" className="btn-banner-primary">
                  Shop Computer Science Books
                </Link>
                <Link to="/register" className="btn-banner-outline">
                  Register Student Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Modal View */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
