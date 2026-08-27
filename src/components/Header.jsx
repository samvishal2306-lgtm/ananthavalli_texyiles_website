import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const Header = () => {
  const { getCartCount } = useContext(CartContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsDrawerOpen(false);
    }
  };

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  // Theme Sync on Mount
  useEffect(() => {
    const isDark = localStorage.getItem("at_dark_mode") === "true";
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem("at_dark_mode", String(nextDark));
    if (nextDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  const totalCount = getCartCount();

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <button
            className="mobile-menu-toggle"
            id="mobile-menu-trigger"
            aria-label="Toggle menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
          
          <Link to="/" className="logo-section">
            <img src="/logo.jpg" alt="Logo" className="logo-img" />
            <div className="logo-text">
              <span className="brand-name">Sri Ananthavalli</span>
              <span className="brand-subtitle">Textiles · Thoothukudi</span>
            </div>
          </Link>
          
          <nav className="desktop-nav">
            <NavLink to="/" className={({ isActive }) => `nav-link home-btn ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            
            <div className="nav-item-dropdown">
              <Link to="/category/sarees" className="nav-link dropdown-toggle">
                Sarees
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron inline ml-1">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <Link to="/category/sarees" className="dropdown-item">Bridal Silk</Link>
                <Link to="/category/sarees" className="dropdown-item">Soft Silk</Link>
                <Link to="/category/sarees" className="dropdown-item">Kanjivaram Pattu</Link>
                <Link to="/category/sarees" className="dropdown-item">Party Wear</Link>
              </div>
            </div>
            
            <div className="nav-item-dropdown">
              <Link to="/category/womens-wear" className="nav-link dropdown-toggle">
                Women's Wear
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron inline ml-1">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <Link to="/category/womens-wear" className="dropdown-item">Lehenga Choli</Link>
                <Link to="/category/womens-wear" className="dropdown-item">Salwar Suits</Link>
                <Link to="/category/womens-wear" className="dropdown-item">Anarkali</Link>
                <Link to="/category/womens-wear" className="dropdown-item">Kurtis</Link>
              </div>
            </div>
            
            <div className="nav-item-dropdown">
              <Link to="/category/mens-wear" className="nav-link dropdown-toggle">
                Men's Wear
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron inline ml-1">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <Link to="/category/mens-wear" className="dropdown-item">Kurta Pyjama</Link>
                <Link to="/category/mens-wear" className="dropdown-item">Veshti & Shirt</Link>
                <Link to="/category/mens-wear" className="dropdown-item">Formal Shirts</Link>
                <Link to="/category/mens-wear" className="dropdown-item">Sherwani</Link>
              </div>
            </div>
            
            <div className="nav-item-dropdown">
              <Link to="/category/kids-wear" className="nav-link dropdown-toggle">
                Kids
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron inline ml-1">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <Link to="/category/kids-wear" className="dropdown-item">Pavadai Satini</Link>
                <Link to="/category/kids-wear" className="dropdown-item">Boys Kurta</Link>
                <Link to="/category/kids-wear" className="dropdown-item">Girls Frocks</Link>
                <Link to="/category/kids-wear" className="dropdown-item">Infant Ethnic</Link>
              </div>
            </div>
            
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About & Contact
            </NavLink>
          </nav>
          
          <div className="header-actions">
            <form onSubmit={handleSearchSubmit} className="header-search-form">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-submit-btn" aria-label="Submit search">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </form>

            <button className="icon-btn theme-toggle" title="Toggle theme" onClick={toggleTheme}>
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
            
            <Link to="/cart" className="icon-btn cart-btn" title="View Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
            </Link>
          </div>
        </div>
      </header>
      
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="mobile-nav-overlay" id="mobile-drawer" onClick={() => setIsDrawerOpen(false)}>
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <img src="/logo.jpg" alt="Logo" className="logo-img" />
              <span className="brand-name">Sri Ananthavalli</span>
              <button className="close-btn" id="mobile-drawer-close" onClick={() => setIsDrawerOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="mobile-nav-links">
              <form onSubmit={handleSearchSubmit} className="mobile-search-form" style={{ padding: "0 16px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 40px 10px 14px",
                      borderRadius: "var(--border-radius-sm)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "white",
                      fontSize: "0.9rem"
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.6)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}
                    aria-label="Submit search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </button>
                </div>
              </form>

              <Link to="/" className="mobile-nav-link">Home</Link>
              
              <div className="mobile-nav-group">
                <Link to="/category/sarees" className="mobile-nav-link group-title">Sarees</Link>
                <div className="mobile-nav-sublinks">
                  <Link to="/category/sarees" className="mobile-sublink">Bridal Silk</Link>
                  <Link to="/category/sarees" className="mobile-sublink">Soft Silk</Link>
                  <Link to="/category/sarees" className="mobile-sublink">Kanjivaram Pattu</Link>
                  <Link to="/category/sarees" className="mobile-sublink">Party Wear</Link>
                </div>
              </div>
              
              <div className="mobile-nav-group">
                <Link to="/category/womens-wear" className="mobile-nav-link group-title">Women's Wear</Link>
                <div className="mobile-nav-sublinks">
                  <Link to="/category/womens-wear" className="mobile-sublink">Lehenga Choli</Link>
                  <Link to="/category/womens-wear" className="mobile-sublink">Salwar Suits</Link>
                  <Link to="/category/womens-wear" className="mobile-sublink">Anarkali</Link>
                  <Link to="/category/womens-wear" className="mobile-sublink">Kurtis</Link>
                </div>
              </div>
              
              <div className="mobile-nav-group">
                <Link to="/category/mens-wear" className="mobile-nav-link group-title">Men's Wear</Link>
                <div className="mobile-nav-sublinks">
                  <Link to="/category/mens-wear" className="mobile-sublink">Kurta Pyjama</Link>
                  <Link to="/category/mens-wear" className="mobile-sublink">Veshti & Shirt</Link>
                  <Link to="/category/mens-wear" className="mobile-sublink">Formal Shirts</Link>
                  <Link to="/category/mens-wear" className="mobile-sublink">Sherwani</Link>
                </div>
              </div>
              
              <div className="mobile-nav-group">
                <Link to="/category/kids-wear" className="mobile-nav-link group-title">Kids Wear</Link>
                <div className="mobile-nav-sublinks">
                  <Link to="/category/kids-wear" className="mobile-sublink">Pavadai Satini</Link>
                  <Link to="/category/kids-wear" className="mobile-sublink">Boys Kurta</Link>
                  <Link to="/category/kids-wear" className="mobile-sublink">Girls Frocks</Link>
                  <Link to="/category/kids-wear" className="mobile-sublink">Infant Ethnic</Link>
                </div>
              </div>
              
              <Link to="/about" className="mobile-nav-link">About & Contact</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
