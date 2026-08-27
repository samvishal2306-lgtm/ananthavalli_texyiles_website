import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const Checkout = () => {
  const { cart, getCartSubtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    postcode: ""
  });

  const subtotal = getCartSubtotal();
  const isFreeShipping = subtotal >= 2000;
  const delivery = isFreeShipping ? 0 : 150;
  const total = subtotal + delivery;

  // Redirect to home if checkout is accessed with empty cart
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.postcode) {
      alert("Please fill in all required fields.");
      return;
    }

    // Format the order summary text
    let orderText = `*SRI ANANTHAVALLI TEXTILES - NEW ORDER*\n`;
    orderText += `------------------------------------\n`;
    orderText += `*Customer Name:* ${formData.name}\n`;
    orderText += `*Phone:* ${formData.phone}\n`;
    orderText += `*Shipping Address:* ${formData.address}\n`;
    if (formData.landmark) {
      orderText += `*Landmark:* ${formData.landmark}\n`;
    }
    orderText += `*City:* ${formData.city} - ${formData.postcode}\n`;
    orderText += `------------------------------------\n`;
    orderText += `*ITEMS ORDERED:*\n`;
    
    cart.forEach((item) => {
      const p = item.product;
      orderText += `- ${p.title} (${item.quantity} x ₹${p.currentPrice.toLocaleString()}) = ₹${(p.currentPrice * item.quantity).toLocaleString()}\n`;
    });
    
    orderText += `------------------------------------\n`;
    orderText += `*Subtotal:* ₹${subtotal.toLocaleString()}\n`;
    orderText += `*Delivery:* ${isFreeShipping ? "FREE" : `₹${delivery.toLocaleString()}`}\n`;
    orderText += `*Grand Total:* *₹${total.toLocaleString()}*\n`;
    orderText += `------------------------------------`;

    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/917010772778?text=${encodedText}`;

    // Redirect to WhatsApp link
    window.open(whatsappUrl, "_blank");
    
    // Clear cart and navigate back home
    clearCart();
    navigate("/");
  };

  return (
    <main style={{ padding: "60px 0", minHeight: "60vh" }}>
      <div className="container">
        <span className="section-label">SECURE PURCHASE</span>
        <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "32px" }}>Checkout</h2>

        <div className="checkout-layout" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "32px" }}>
          {/* Left Column: Form */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} style={{ backgroundColor: "var(--bg-card)", padding: "28px", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", boxShadow: "var(--box-shadow)" }}>
              <h3 className="font-serif" style={{ fontSize: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "20px" }}>
                Shipping Information
              </h3>

              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="name" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Full Name <span style={{ color: "#e25c5c" }}>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.95rem" }}
                  />
                </div>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="phone" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Phone Number <span style={{ color: "#e25c5c" }}>*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.95rem" }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                <label htmlFor="address" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Street Address <span style={{ color: "#e25c5c" }}>*</span></label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  placeholder="House number, apartment name, street name"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.95rem" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                <label htmlFor="landmark" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Landmark (Optional)</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  placeholder="Near temple, school, park etc."
                  value={formData.landmark}
                  onChange={handleChange}
                  style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.95rem" }}
                />
              </div>

              <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="city" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Town / City <span style={{ color: "#e25c5c" }}>*</span></label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.95rem" }}
                  />
                </div>
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="postcode" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Postcode / PIN <span style={{ color: "#e25c5c" }}>*</span></label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleChange}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.95rem" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-checkout"
                style={{ width: "100%", padding: "14px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
              >
                Confirm and Order via WhatsApp
              </button>
            </form>
          </div>

          {/* Right Column: Summary */}
          <div className="checkout-summary-section">
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
              <h3 className="font-serif" style={{ fontSize: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "20px" }}>
                Your Order
              </h3>

              <div className="checkout-items-list" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "20px" }}>
                {cart.map((item) => (
                  <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--text-dark)", maxWidth: "70%" }}>
                      {item.product.title} <strong style={{ color: "var(--secondary-color)", marginLeft: "4px" }}>x {item.quantity}</strong>
                    </span>
                    <span style={{ fontWeight: "600" }}>₹{(item.product.currentPrice * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Delivery</span>
                  <span>{isFreeShipping ? "FREE" : "₹150"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "14px", fontSize: "1.1rem", fontWeight: "700" }}>
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
