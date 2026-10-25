import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, UserPlus, AlertCircle, CheckCircle, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegistrationPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!formData.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    try {
      const res = await register(formData);
      if (res.success) {
        setSuccess('Registration successful! User record saved to MySQL database. Redirecting to login...');
        setTimeout(() => {
          navigate('/login', { state: { message: 'Registration successful! You may now sign in with your credentials.' } });
        }, 1500);
      } else {
        setError(res.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred while contacting Spring Boot backend.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card register-card">
          <div className="auth-header">
            <div className="auth-badge-icon">
              <UserPlus size={26} />
            </div>
            <h2>Create New Account</h2>
            <p>Join PageTurner to buy books, leave reviews, and enjoy personalized recommendations.</p>
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
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="reg-name">Full Name <span className="req">*</span></label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="reg-name"
                  type="text"
                  name="fullName"
                  placeholder="e.g. Saber Mulla"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="reg-email">Email Address <span className="req">*</span></label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  placeholder="e.g. saber@vit.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone & Address Grid */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="reg-phone">Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={18} className="field-icon" />
                  <input
                    id="reg-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-address">Delivery Address</label>
                <div className="input-with-icon">
                  <MapPin size={18} className="field-icon" />
                  <input
                    id="reg-address"
                    type="text"
                    name="address"
                    placeholder="Pune, Maharashtra"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="reg-pass">Password <span className="req">*</span></label>
                <div className="input-with-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    id="reg-pass"
                    type="password"
                    name="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirm">Confirm Password <span className="req">*</span></label>
                <div className="input-with-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    id="reg-confirm"
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-type password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit-auth" disabled={loading}>
              {loading ? (
                <span className="spinner-sm"></span>
              ) : (
                <>
                  <UserPlus size={18} /> Register Account (MySQL)
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already registered?{' '}
              <Link to="/login" className="auth-switch-link">
                Sign in to your account <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>

        {/* Side Info Box */}
        <div className="auth-side-card">
          <div className="side-icon-tag">
            <Database size={24} />
          </div>
          <h3>MySQL Database Connected</h3>
          <p>
            Your account is securely saved directly into the MySQL <code>users</code> table via Spring Data JPA and Hibernate.
          </p>
          <ul className="side-points">
            <li><ShieldCheck size={16} /> Server-side duplicate email protection</li>
            <li><ShieldCheck size={16} /> Instant authorization and session storage</li>
            <li><ShieldCheck size={16} /> Full integration with the bookstore catalogue</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
