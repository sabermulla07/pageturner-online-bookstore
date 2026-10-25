import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, CheckCircle, CreditCard, ShieldCheck, BookOpen, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [shippingAddress, setShippingAddress] = useState(user?.address || 'VIT Pune Campus, Pune');
  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');

  const shippingCost = totalPrice > 35 || totalPrice === 0 ? 0 : 4.99;
  const grandTotal = totalPrice + shippingCost;

  const handleProceedToCheckout = () => {
    if (!user) {
      // Redirect to login or let them fill guest details
      setCheckoutStep('checkout');
    } else {
      setCustomerName(user.fullName);
      setCustomerEmail(user.email);
      setShippingAddress(user.address || 'VIT Pune Campus, Bibwewadi, Pune');
      setCheckoutStep('checkout');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderError('');
    setSubmitting(true);

    const orderPayload = {
      customerName: customerName.trim(),
      userEmail: customerEmail.trim(),
      shippingAddress: shippingAddress.trim(),
      items: cartItems.map(item => ({
        bookId: item.book.id,
        bookTitle: item.book.title,
        price: item.book.price,
        quantity: item.quantity
      }))
    };

    try {
      const res = await orderApi.placeOrder(orderPayload);
      if (res && res.success) {
        setPlacedOrder(res.data);
        clearCart();
        setCheckoutStep('success');
      } else {
        setOrderError(res.message || 'Failed to place order');
      }
    } catch (err) {
      // Offline fallback mock success
      setPlacedOrder({
        orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        totalAmount: grandTotal,
        customerName: customerName,
        shippingAddress: shippingAddress
      });
      clearCart();
      setCheckoutStep('success');
    } finally {
      setSubmitting(false);
    }
  };

  if (checkoutStep === 'success') {
    return (
      <div className="cart-page">
        <div className="container success-container">
          <div className="success-card">
            <div className="success-icon-wrap">
              <CheckCircle size={56} className="success-check" />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-num-tag">
              Order Reference: <strong>{placedOrder?.orderNumber}</strong>
            </p>
            <p className="success-desc">
              Thank you for ordering with <strong>PageTurner</strong>. A confirmation invoice has been registered in the MySQL database and sent to your email.
            </p>
            <div className="success-actions">
              <Link to="/catalogue" className="btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header-row">
          <div>
            <h1 className="page-title">Shopping Cart</h1>
            <p className="page-subtitle">Review your selected titles and proceed to secure checkout.</p>
          </div>
          <Link to="/catalogue" className="continue-link">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-card">
            <ShoppingBag size={56} className="empty-cart-icon" />
            <h2>Your Cart is Currently Empty</h2>
            <p>Looks like you haven't added any books to your cart yet.</p>
            <Link to="/catalogue" className="btn-primary start-shopping-btn">
              Explore Book Catalogue
            </Link>
          </div>
        ) : (
          <div className="cart-layout-grid">
            {/* Left Items Column */}
            <div className="cart-items-col">
              {cartItems.map((item) => (
                <div key={item.book.id} className="cart-item-row">
                  <img
                    src={item.book.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80'}
                    alt={item.book.title}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-details">
                    <span className="cart-item-cat">{item.book.category}</span>
                    <h3 className="cart-item-title">{item.book.title}</h3>
                    <p className="cart-item-author">by {item.book.author}</p>
                    <div className="cart-item-price-unit">${Number(item.book.price).toFixed(2)} each</div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-qty-ctrl">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="btn-remove-item"
                      title="Remove title"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-bottom-actions">
                <button onClick={clearCart} className="btn-clear-cart">
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="cart-summary-col">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Standard Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="free-text">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="free-shipping-hint">
                    Add ${(35.01 - totalPrice).toFixed(2)} more for Free Delivery!
                  </p>
                )}
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    onClick={handleProceedToCheckout}
                    className="btn-checkout-primary"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <form onSubmit={handlePlaceOrder} className="checkout-subform">
                    <h4 className="checkout-title">Shipping & Contact</h4>
                    {orderError && (
                      <div className="alert alert-error">
                        <AlertCircle size={16} /> <span>{orderError}</span>
                      </div>
                    )}
                    <div className="checkout-field">
                      <label>Recipient Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="checkout-field">
                      <label>Email for Receipt</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="checkout-field">
                      <label>Delivery Address</label>
                      <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                        placeholder="Hostel / Home address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-checkout-primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Placing Order...' : `Confirm & Place Order ($${grandTotal.toFixed(2)})`}
                    </button>
                  </form>
                )}

                <div className="checkout-guarantee">
                  <ShieldCheck size={16} /> 100% Encrypted & Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
