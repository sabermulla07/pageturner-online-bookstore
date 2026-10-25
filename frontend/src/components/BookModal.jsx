import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, BookOpen, Hash, Tag, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookModal({ book, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!book) return null;

  const handleAdd = () => {
    addToCart(book, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-col">
            <img
              src={book.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}
              alt={book.title}
              className="modal-book-img"
            />
          </div>

          <div className="modal-info-col">
            <div className="modal-category">
              <Tag size={14} /> {book.category}
            </div>

            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by <strong>{book.author}</strong></p>

            <div className="modal-rating-row">
              <div className="stars-wrap">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(book.rating || 4) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="rating-num">{(book.rating || 4.5).toFixed(1)} / 5.0</span>
              <span className="stock-indicator in-stock">
                <Layers size={14} /> {book.stock || 40} Copies in Stock
              </span>
            </div>

            <div className="modal-price">${Number(book.price).toFixed(2)}</div>

            <p className="modal-description">
              {book.description || 'An inspiring and insightful book carefully curated for your reading collection. High quality edition with clear typography and premium binding.'}
            </p>

            <div className="modal-meta-specs">
              <div className="spec-item">
                <Hash size={14} /> <strong>ISBN:</strong> {book.isbn || '978-0132350884'}
              </div>
              <div className="spec-item">
                <BookOpen size={14} /> <strong>Format:</strong> Hardcover & Paperback Available
              </div>
            </div>

            <div className="modal-actions-row">
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <button
                className={`btn-add-cart-large ${added ? 'btn-added' : ''}`}
                onClick={handleAdd}
                disabled={added}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart (${(book.price * quantity).toFixed(2)})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
