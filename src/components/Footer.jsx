import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col info-col">
          <div className="footer-logo">
            <img src="/logo.jpg" alt="Logo" className="logo-img" />
            <span className="footer-brand">Sri Ananthavalli Textiles</span>
          </div>
          <p className="footer-tagline">
            Serving the exquisite handloom, silk, and fashion needs of Tamil Nadu for generations. Crafted with love, woven with excellence.
          </p>
          <div className="social-links">
            <a
              href="https://instagram.com/thoothukudiananthavalli"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/917010772778"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col links-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home Storefront</Link></li>
            <li><Link to="/category/sarees">Traditional Sarees</Link></li>
            <li><Link to="/category/womens-wear">Women's Wear</Link></li>
            <li><Link to="/category/mens-wear">Men's Ethnic Wear</Link></li>
            <li><Link to="/category/kids-wear">Kids Collections</Link></li>
          </ul>
        </div>
        
        <div className="footer-col links-col">
          <h3>Information</h3>
          <ul>
            <li><Link to="/about">About Our Heritage</Link></li>
            <li><Link to="/about">Store Location</Link></li>
            <li><Link to="/about">Contact & Support</Link></li>
          </ul>
        </div>
        
        <div className="footer-col contact-col">
          <h3>Contact Details</h3>
          <ul className="contact-info-list">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Great Cotton Road, Thoothukudi, Tamil Nadu, India</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="https://wa.me/917010772778" target="_blank" rel="noopener noreferrer">+91 70107 72778</a>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <a href="mailto:sriananthavallitextiles@gmail.com">sriananthavallitextiles@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sri Ananthavalli Textiles. All Rights Reserved. Crafted for Premium Experience.</p>
      </div>
    </footer>
  );
};
