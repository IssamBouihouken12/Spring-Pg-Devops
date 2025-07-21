import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '3rem 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>About Us</h3>
          <p style={{ color: '#999', lineHeight: '1.6' }}>
            Your trusted destination for quality products and exceptional shopping experience.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/home" style={{ color: '#999', textDecoration: 'none', ':hover': { color: '#fff' } }}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/cart" style={{ color: '#999', textDecoration: 'none', ':hover': { color: '#fff' } }}>
                Cart
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', padding: 0, color: '#999' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <i className="bi bi-envelope" style={{ marginRight: '0.5rem' }}></i>
              support@ecommerce.com
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <i className="bi bi-telephone" style={{ marginRight: '0.5rem' }}></i>
              +1 234 567 890
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <i className="bi bi-geo-alt" style={{ marginRight: '0.5rem' }}></i>
              123 Ecommerce Street, City
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Follow Us</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#999', fontSize: '1.5rem' }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" style={{ color: '#999', fontSize: '1.5rem' }}>
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" style={{ color: '#999', fontSize: '1.5rem' }}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" style={{ color: '#999', fontSize: '1.5rem' }}>
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '2rem',
        borderTop: '1px solid #333',
        color: '#999'
      }}>
        <p>&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 