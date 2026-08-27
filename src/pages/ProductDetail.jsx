import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";

export const ProductDetail = () => {
  const { productId } = useParams();
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === productId);

  // Sync wishlist status
  useEffect(() => {
    if (product) {
      const cached = localStorage.getItem("at_wishlist");
      const list = cached ? JSON.parse(cached) : [];
      setIsWishlisted(list.includes(product.id));
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [productId, product]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ minHeight: "60vh", padding: "80px 0", textAlign: "center" }}>
        <h2 className="font-serif">Product Not Found</h2>
        <p style={{ margin: "20px 0", color: "var(--text-muted)" }}>The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="btn-shop-now">Go back to storefront</Link>
      </div>
    );
  }

  const toggleWishlist = () => {
    const cached = localStorage.getItem("at_wishlist");
    let list = cached ? JSON.parse(cached) : [];
    
    if (list.includes(product.id)) {
      list = list.filter((id) => id !== product.id);
      setIsWishlisted(false);
    } else {
      list.push(product.id);
      setIsWishlisted(true);
    }
    localStorage.setItem("at_wishlist", JSON.stringify(list));
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main style={{ padding: "60px 0" }}>
      <div className="container">
        <div className="breadcrumb" style={{ marginBottom: "30px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <Link to="/">Home</Link> / 
          <Link to={`/category/${product.category}`} style={{ marginLeft: "8px", marginRight: "8px" }}>
            {product.categoryLabel}
          </Link> / 
          <span style={{ marginLeft: "8px", color: "var(--secondary-color)" }}>{product.title}</span>
        </div>

        <div className="product-details-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "60px" }}>
          {/* Left Column: Image wrapper */}
          <div className="product-image-section">
            <div className="detail-image-wrapper" style={{ borderRadius: "var(--border-radius)", overflow: "hidden", border: "1px solid var(--border-color)", backgroundColor: "#f9f9f9" }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", maxHeight: "600px" }}
              />
            </div>
          </div>

          {/* Right Column: Meta details and purchasing grid */}
          <div className="product-info-section" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <span className="product-category" style={{ fontSize: "0.9rem" }}>{product.categoryLabel}</span>
              <h1 className="font-serif" style={{ fontSize: "2rem", marginTop: "8px", color: "var(--text-dark)" }}>{product.title}</h1>
              
              <div className="product-rating" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                <span className="stars" style={{ color: "var(--secondary-color)" }}>{"★".repeat(Math.round(product.rating))}</span>
                <span className="rating-num" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <div className="detail-price-box" style={{ padding: "16px", backgroundColor: "rgba(212, 163, 115, 0.05)", borderRadius: "var(--border-radius-sm)", border: "1px dashed var(--secondary-color)" }}>
              <div className="product-price" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span className="current-price-large" style={{ fontSize: "1.75rem", fontWeight: "700" }}>₹{product.currentPrice.toLocaleString()}</span>
                {product.originalPrice > product.currentPrice && (
                  <>
                    <span className="original-price-large" style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "var(--text-muted)" }}>₹{product.originalPrice.toLocaleString()}</span>
                    <span className="discount-tag" style={{ padding: "4px 8px" }}>{product.discount}</span>
                  </>
                )}
              </div>
            </div>

            <p style={{ color: "var(--text-muted)", lineHeight: "1.7" }}>{product.description}</p>

            {/* Purchase Actions panel: matches the 3-column details actions grid */}
            <div className="purchase-actions-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 50px", gap: "12px", alignItems: "center", marginTop: "12px" }}>
              <button
                className="btn-add-to-cart-grid"
                onClick={() => addToCart(product, quantity)}
                style={{ width: "100%", margin: 0, padding: "14px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add to Bag
              </button>

              <div className="qty-counter" style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", overflow: "hidden", height: "100%" }}>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: "40px", height: "48px", border: "none", background: "none", cursor: "pointer", fontSize: "1.2rem" }}
                >
                  -
                </button>
                <span className="qty-num" style={{ flex: 1, textAlign: "center", fontWeight: "600" }}>{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: "40px", height: "48px", border: "none", background: "none", cursor: "pointer", fontSize: "1.2rem" }}
                >
                  +
                </button>
              </div>

              <button
                className={`btn-wishlist ${isWishlisted ? "active" : ""}`}
                onClick={toggleWishlist}
                title="Add to Wishlist"
                style={{
                  height: "48px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--border-radius-sm)",
                  background: "none",
                  cursor: "pointer",
                  color: isWishlisted ? "#e25c5c" : "inherit"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "#e25c5c" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
            </div>

            <button
              className="btn-buy-now"
              onClick={handleBuyNow}
              style={{ width: "100%", margin: 0, padding: "14px 20px", fontWeight: "700" }}
            >
              Buy It Now
            </button>
          </div>
        </div>

        {/* Tab Description / Checklist Details */}
        <div className="detail-tabs-section" style={{ marginTop: "40px", borderTop: "1px solid var(--border-color)", paddingTop: "40px" }}>
          <div className="tabs-header" style={{ display: "flex", gap: "24px", borderBottom: "1px solid var(--border-color)", marginBottom: "24px" }}>
            <button
              onClick={() => setActiveTab("details")}
              style={{
                background: "none",
                border: "none",
                paddingBottom: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                borderBottom: activeTab === "details" ? "2px solid var(--secondary-color)" : "none",
                color: activeTab === "details" ? "var(--secondary-color)" : "var(--text-muted)"
              }}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              style={{
                background: "none",
                border: "none",
                paddingBottom: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                borderBottom: activeTab === "specifications" ? "2px solid var(--secondary-color)" : "none",
                color: activeTab === "specifications" ? "var(--secondary-color)" : "var(--text-muted)"
              }}
            >
              Specifications
            </button>
          </div>

          <div className="tab-content" style={{ minHeight: "120px" }}>
            {activeTab === "details" ? (
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8" }}>{product.description}</p>
            ) : (
              <ul className="product-features-checklist" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", listStyle: "none", padding: 0 }}>
                {product.features && product.features.map((feat, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="section text-center" style={{ marginTop: "60px", borderTop: "1px solid var(--border-color)", paddingTop: "60px" }}>
            <span className="section-label">SRI ANANTHAVALLI TEXTILES</span>
            <h2 className="section-title font-serif">Related Products</h2>
            <p className="section-subtitle">You might also like these beautiful pieces from the same collection</p>
            <div className="divider"></div>
            
            <div className="products-grid">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
