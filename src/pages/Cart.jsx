import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartSubtotal } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = getCartSubtotal();
  const shippingThreshold = 2000;
  const isFreeShipping = subtotal >= shippingThreshold;
  const progressPercent = Math.min((subtotal / shippingThreshold) * 100, 100);
  const difference = shippingThreshold - subtotal;

  if (cart.length === 0) {
    return (
      <main style={{ minHeight: "60vh", padding: "80px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-label">YOUR CART</span>
          <h2 className="font-serif" style={{ fontSize: "2.2rem", margin: "16px 0" }}>Your Shopping Cart is Empty</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
            Add some beautiful textiles or traditional clothing from our collections to get started!
          </p>
          <Link to="/" className="btn-shop-now">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "60px 0", minHeight: "60vh" }}>
      <div className="container">
        <span className="section-label">SHOPPING BAG</span>
        <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "32px" }}>Shopping Cart</h2>

        {/* Free Shipping Indicator Bar */}
        <div
          className="shipping-indicator"
          style={{
            padding: "20px",
            backgroundColor: "rgba(212, 163, 115, 0.05)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--border-radius)",
            marginBottom: "32px"
          }}
        >
          <p style={{ fontWeight: "600", marginBottom: "12px", fontSize: "0.95rem" }}>
            {isFreeShipping ? (
              <span className="text-green">🎉 Congratulations! You qualify for FREE shipping across South Tamil Nadu.</span>
            ) : (
              <span>Buy <strong>₹{difference.toLocaleString()}</strong> more to get <strong>FREE SHIPPING!</strong></span>
            )}
          </p>
          <div
            className="progress-bar"
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            <div
              className="progress-fill"
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "var(--secondary-color)",
                transition: "width 0.4s ease"
              }}
            ></div>
          </div>
        </div>

        <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "2.2fr 1.2fr", gap: "32px" }}>
          {/* Left Column: Cart items */}
          <div className="cart-items-section">
            <div className="cart-items-header" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "12px", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: "600" }}>
              <span>Product</span>
              <span style={{ textAlign: "center" }}>Quantity</span>
              <span style={{ textAlign: "right" }}>Total</span>
            </div>

            <div className="cart-items-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cart.map((item) => {
                const prod = item.product;
                const itemTotal = prod.currentPrice * item.quantity;
                
                return (
                  <div
                    key={prod.id}
                    className="cart-item-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr",
                      alignItems: "center",
                      borderBottom: "1px solid var(--border-color)",
                      paddingBottom: "20px"
                    }}
                  >
                    {/* Item info */}
                    <div className="cart-item-info" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <img
                        src={prod.image}
                        alt={prod.title}
                        style={{ width: "70px", height: "90px", objectFit: "cover", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--border-color)" }}
                      />
                      <div>
                        <h4 style={{ fontWeight: "600", fontSize: "1rem", marginBottom: "4px" }}>
                          <Link to={`/product/${prod.id}`}>{prod.title}</Link>
                        </h4>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                          Category: {prod.categoryLabel}
                        </span>
                        <div className="cart-item-price-unit" style={{ fontSize: "0.9rem" }}>
                          <span>₹{prod.currentPrice.toLocaleString()}</span>
                          {prod.originalPrice > prod.currentPrice && (
                            <span className="cart-item-orig-price" style={{ textDecoration: "line-through", color: "var(--text-muted)", fontSize: "0.8rem", marginLeft: "6px" }}>
                              ₹{prod.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Picker */}
                    <div className="cart-item-qty">
                      <div className="qty-counter mini">
                        <button
                          className="qty-btn btn-minus"
                          onClick={() => updateQuantity(prod.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button
                          className="qty-btn btn-plus"
                          onClick={() => updateQuantity(prod.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="cart-item-total-actions">
                      <span style={{ fontWeight: "600" }}>₹{itemTotal.toLocaleString()}</span>
                      <button
                        className="btn-remove-item"
                        onClick={() => removeFromCart(prod.id)}
                        title="Remove Item"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#e25c5c",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ marginTop: "24px" }}>
              <Link to="/" style={{ color: "var(--secondary-color)", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Order summary */}
          <div className="cart-summary-section">
            <div
              className="summary-box"
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "24px",
                borderRadius: "var(--border-radius)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--box-shadow)"
              }}
            >
              <h3 className="font-serif" style={{ fontSize: "1.3rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "20px" }}>
                Order Summary
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                  <span style={{ fontWeight: "600" }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Delivery</span>
                  <span>{isFreeShipping ? "FREE" : "₹150"}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "16px",
                    fontSize: "1.15rem",
                    fontWeight: "700",
                    color: "var(--text-dark)"
                  }}
                >
                  <span>Grand Total</span>
                  <span>₹{(isFreeShipping ? subtotal : subtotal + 150).toLocaleString()}</span>
                </div>
              </div>

              <button
                className="btn-checkout"
                onClick={() => navigate("/checkout")}
                style={{ width: "100%", padding: "14px 20px", display: "block" }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
