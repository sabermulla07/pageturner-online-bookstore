import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookCard({ book, onQuickView }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="book-card">
      <div className="book-cover-wrap" onClick={() => onQuickView(book)}>
        <img
          src={book.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'}
          alt={book.title}
          className="book-cover"
          loading="lazy"
        />
        <span className="book-category-tag">{book.category}</span>
        <button
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(book);
          }}
          title="Quick View"
        >
          <Eye size={16} /> Quick View
        </button>
      </div>

      <div className="book-info">
        <div className="book-meta-top">
          <div className="rating-badge">
            <Star size={14} className="star-icon" />
            <span>{book.rating || 4.5}</span>
          </div>
          {book.stock && book.stock > 0 ? (
            <span className="stock-badge in-stock">In Stock</span>
          ) : (
            <span className="stock-badge out-stock">Out of Stock</span>
          )}
        </div>

        <h3 className="book-title" title={book.title} onClick={() => onQuickView(book)}>
          {book.title}
        </h3>
        <p className="book-author">by {book.author}</p>

        <div className="book-pricing-row">
          <div className="book-price">${Number(book.price).toFixed(2)}</div>
          <button
            className={`btn-add-cart ${added ? 'btn-added' : ''}`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
