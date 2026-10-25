import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, CheckCircle, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(location.state?.error || '');
  const [success, setSuccess] = useState(location.state?.message || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      setSuccess(`Welcome back, ${res.user.fullName}! Redirecting to catalogue...`);
      setTimeout(() => {
        navigate('/catalogue');
      }, 1000);
    } else {
      setError(res.message || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleDemoFill = () => {
    setEmail('demo@bookstore.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge-icon">
              <LogIn size={26} />
            </div>
            <h2>Sign In to PageTurner</h2>
            <p>Access your orders, saved books, and exclusive student reading perks.</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <CheckCircle size={18} className="alert-icon" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="e.g. saber@vit.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="login-password">Password</label>
                <span className="helper-hint">MySQL Authenticated</span>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit-auth" disabled={loading}>
              {loading ? (
                <span className="spinner-sm"></span>
              ) : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo account fast fill */}
          <div className="demo-login-box">
            <p className="demo-title">Test Demo Credentials (MySQL Seeded):</p>
            <div className="demo-creds">
              <code>demo@bookstore.com</code> / <code>password123</code>
            </div>
            <button type="button" onClick={handleDemoFill} className="btn-demo-fill">
              Auto-fill Demo Credentials
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-switch-link">
                Register here <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>

        {/* Side Info Box */}
        <div className="auth-side-card">
          <div className="side-icon-tag">
            <BookOpen size={24} />
          </div>
          <h3>Your Personal Reading Hub</h3>
          <p>
            Keep track of all your favorite books, textbooks, semester reading lists, and seamless checkout with MySQL database persistence.
          </p>
          <ul className="side-points">
            <li><ShieldCheck size={16} /> Secure Spring Boot RESTful verification</li>
            <li><ShieldCheck size={16} /> Instant cart synchronization across sessions</li>
            <li><ShieldCheck size={16} /> Real-time stock status and order tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
