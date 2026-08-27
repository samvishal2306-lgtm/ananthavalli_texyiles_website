import React, { useState } from "react";

export const About = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    // Simulate contact form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main style={{ padding: "60px 0" }}>
      <div className="container">
        {/* Heritage Section */}
        <section style={{ marginBottom: "60px" }}>
          <span className="section-label">OUR STORY</span>
          <h2 className="font-serif" style={{ fontSize: "2.2rem", marginBottom: "20px" }}>Sri Ananthavalli Textiles</h2>
          <div className="divider" style={{ margin: "0 0 24px 0" }}></div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", alignItems: "center" }}>
            <div style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.05rem" }}>
              <p style={{ marginBottom: "16px" }}>
                Founded in <strong>2004</strong> in the coastal town of <strong>Thoothukudi</strong> by <strong>Mr. Subramaniyam</strong>, Sri Ananthavalli Textiles has been a cornerstone of traditional South Indian fashion and premium handlooms for over <strong>22 years</strong>.
              </p>
              <p style={{ marginBottom: "16px" }}>
                We curate only the finest Kanjivaram silk sarees, premium cotton veshtis, and exquisite ethnic wear directly from master weavers across Tamil Nadu, ensuring authentic craftsmanship, certified quality, and generational reliability.
              </p>
              <p>
                Our commitment to premium service, free regional shipping, and customer happiness remains as strong today as it was on our very first day. Thank you for making us a part of your celebrations and heritage.
              </p>
            </div>
            <div>
              <img
                src="/logo.jpg"
                alt="Store Heritage Logo"
                style={{
                  width: "100%",
                  maxHeight: "350px",
                  objectFit: "contain",
                  borderRadius: "var(--border-radius)",
                  border: "4px double var(--secondary-color)",
                  padding: "10px"
                }}
              />
            </div>
          </div>
        </section>

        {/* Contact and Location Section */}
        <section className="section bg-light" style={{ padding: "40px", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" }}>
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="font-serif" style={{ fontSize: "1.85rem", marginBottom: "24px" }}>Contact & Location</h2>
          
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px" }}>
            {/* Left: Contact Form */}
            <div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="name" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", backgroundColor: "white" }}
                  />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="email" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", backgroundColor: "white" }}
                  />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="message" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Message</label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", backgroundColor: "white", resize: "vertical" }}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-checkout"
                  style={{ width: "100%", padding: "12px 20px" }}
                >
                  Send Message
                </button>
                
                {submitted && (
                  <p className="text-green" style={{ fontWeight: "600", textAlign: "center", marginTop: "10px" }}>
                    Thank you! Your message has been received. We will get back to you shortly.
                  </p>
                )}
              </form>
            </div>

            {/* Right: Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: "1.2rem", color: "var(--secondary-color)", marginBottom: "12px" }}>Store Address</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.7" }}>
                  Sri Ananthavalli Textiles<br />
                  Great Cotton Road, Thoothukudi,<br />
                  Tamil Nadu, India - 628001
                </p>
              </div>

              <div>
                <h3 className="font-serif" style={{ fontSize: "1.2rem", color: "var(--secondary-color)", marginBottom: "12px" }}>Customer Support</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.7" }}>
                  <strong>Phone / WhatsApp:</strong> <a href="https://wa.me/917010772778" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-color)" }}>+91 70107 72778</a><br />
                  <strong>Email Support:</strong> <a href="mailto:sriananthavallitextiles@gmail.com" style={{ color: "var(--primary-color)" }}>sriananthavallitextiles@gmail.com</a>
                </p>
              </div>

              <div>
                <h3 className="font-serif" style={{ fontSize: "1.2rem", color: "var(--secondary-color)", marginBottom: "12px" }}>Store Timing</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.7" }}>
                  Monday - Sunday: 9:00 AM - 9:30 PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
