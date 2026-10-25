import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RefreshCcw, BookOpen, AlertCircle } from 'lucide-react';
import { bookApi } from '../services/api';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';

export default function CataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // Filters State
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);

  // Fetch Categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const catList = await bookApi.getCategories();
        if (catList && catList.length > 0) {
          setCategories(['All', ...catList]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadCategories();
  }, []);

  // Fetch Books whenever search/category/price/sort change
  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const data = await bookApi.getBooks({
          search,
          category: selectedCategory,
          maxPrice,
          sortBy
        });
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [search, selectedCategory, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setMaxPrice(100);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="catalogue-page">
      {/* Catalogue Header */}
      <div className="catalogue-header">
        <div className="container">
          <span className="page-tag">Online Bookstore Inventory</span>
          <h1 className="page-title">Book Catalogue</h1>
          <p className="page-subtitle">
            Browse our wide selection of engineering textbooks, technical manuals, classic literature, and global bestsellers.
          </p>
        </div>
      </div>

      <div className="container catalogue-layout">
        {/* Mobile filter toggle */}
        <div className="mobile-filter-bar">
          <button
            className="btn-filter-toggle"
            onClick={() => setIsFilterOpenMobile(!isFilterOpenMobile)}
          >
            <SlidersHorizontal size={18} />
            <span>{isFilterOpenMobile ? 'Hide Filters' : 'Show Filters & Sort'}</span>
          </button>
          <span className="results-count-badge">
            {books.length} {books.length === 1 ? 'Book' : 'Books'} Available
          </span>
        </div>

        {/* Sidebar Filters */}
        <aside className={`catalogue-sidebar ${isFilterOpenMobile ? 'mobile-visible' : ''}`}>
          <div className="sidebar-card">
            <div className="sidebar-header">
              <div className="sidebar-title">
                <Filter size={18} /> Filters
              </div>
              <button onClick={handleResetFilters} className="btn-reset-filter" title="Reset all">
                <RefreshCcw size={14} /> Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="filter-group">
              <label className="filter-label">Search Books</label>
              <div className="filter-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Title, author, or ISBN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Categories</label>
              <div className="category-pill-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchParams(cat !== 'All' ? { category: cat } : {});
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="filter-group">
              <div className="price-label-row">
                <label className="filter-label">Max Price</label>
                <span className="price-tag-value">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="slider-range-labels">
                <span>$10</span>
                <span>$60</span>
                <span>$120</span>
              </div>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="featured">Featured / Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="title_asc">Title: A to Z</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Book Listing Area */}
        <main className="catalogue-main">
          {/* Top Bar for Desktop */}
          <div className="catalogue-top-bar desktop-only">
            <div className="active-filter-summary">
              Showing <strong>{books.length}</strong> {books.length === 1 ? 'book' : 'books'}
              {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
              {search && <span> matching "<strong>{search}</strong>"</span>}
            </div>

            <div className="top-bar-sort">
              <label>Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="top-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="title_asc">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Book Grid */}
          {loading ? (
            <div className="catalogue-loading">
              <div className="spinner"></div>
              <p>Searching bookstore catalog...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="catalogue-empty">
              <BookOpen size={48} className="empty-icon" />
              <h3>No books match your criteria</h3>
              <p>Try searching for a different keyword or relaxing your category / price filters.</p>
              <button onClick={handleResetFilters} className="btn-primary reset-cta-btn">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="catalogue-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onQuickView={setSelectedBook} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Book Quick View / Detail Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
