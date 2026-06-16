import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderItems = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }));

      const orderData = {
        orderItems,
        shippingAddress: shippingData,
        totalPrice: getCartTotal() * 1.1 // Including tax
      };

      await api.post('/orders', orderData);
      
      clearCart();
      alert('Order placed successfully!');
      navigate(`/orders`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 style={{marginBottom: '1.5rem'}}>Checkout</h1>
        
        {error && (
          <div className="alert-box alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <div className="cart-grid">
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700}}>Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingData.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main Street"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingData.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingData.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingData.country}
                  onChange={handleChange}
                  required
                  placeholder="United States"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-secondary btn-lg" 
                style={{width: '100%', marginTop: '1.5rem'}}
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div style={{marginBottom: '1.5rem'}}>
              {cartItems.map(item => (
                <div key={item._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.9rem'
                }}>
                  <span style={{fontWeight: 500}}>{item.name} x {item.quantity}</span>
                  <span style={{fontWeight: 600, color: 'var(--text)'}}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
