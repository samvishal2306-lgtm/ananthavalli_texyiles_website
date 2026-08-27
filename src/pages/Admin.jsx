import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const Admin = () => {
  const { products, saveProduct, deleteProduct, resetCatalog, uploadProductImage } = useContext(ProductContext);
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "sarees",
    categoryLabel: "Saree",
    currentPrice: "",
    originalPrice: "",
    tag: "",
    image: "",
    description: "",
    featuresStr: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "admin2004") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect admin passcode. Access denied.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditInit = (prod) => {
    setSelectedFile(null);
    setEditingId(prod.id);
    setFormData({
      title: prod.title,
      category: prod.category,
      categoryLabel: prod.categoryLabel,
      currentPrice: prod.currentPrice,
      originalPrice: prod.originalPrice,
      tag: prod.tag || "",
      image: prod.image,
      description: prod.description,
      featuresStr: prod.features ? prod.features.join(", ") : ""
    });
  };

  const handleCancelEdit = () => {
    setSelectedFile(null);
    setEditingId(null);
    setFormData({
      title: "",
      category: "sarees",
      categoryLabel: "Saree",
      currentPrice: "",
      originalPrice: "",
      tag: "",
      image: "",
      description: "",
      featuresStr: ""
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.currentPrice || !formData.image || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const priceNum = parseFloat(formData.currentPrice);
    const origPriceNum = formData.originalPrice ? parseFloat(formData.originalPrice) : priceNum;
    const discountPercent = origPriceNum > priceNum ? `${Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)}% OFF` : "";

    let finalImageUrl = formData.image;
    
    // Upload image if a physical file is selected
    if (selectedFile) {
      const uploadedUrl = await uploadProductImage(selectedFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }

    const updatedProduct = {
      id: editingId || String(Date.now()),
      title: formData.title,
      category: formData.category,
      categoryLabel: formData.categoryLabel || (formData.category === "sarees" ? "Saree" : "Ethnic Wear"),
      rating: editingId ? (products.find(p => p.id === editingId)?.rating || 4.5) : 4.5,
      reviewsCount: editingId ? (products.find(p => p.id === editingId)?.reviewsCount || 10) : 10,
      originalPrice: origPriceNum,
      currentPrice: priceNum,
      tag: formData.tag,
      discount: discountPercent,
      image: finalImageUrl,
      description: formData.description,
      features: formData.featuresStr.split(",").map(f => f.trim()).filter(Boolean)
    };

    let nextProducts = [];
    if (editingId) {
      nextProducts = products.map(p => p.id === editingId ? updatedProduct : p);
      await saveProduct(nextProducts, "PUT", editingId);
    } else {
      nextProducts = [...products, updatedProduct];
      await saveProduct(nextProducts, "POST");
    }

    handleCancelEdit();
  };

  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: "65vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "var(--bg-card)", padding: "40px", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h2 className="font-serif" style={{ fontSize: "1.75rem", marginBottom: "12px" }}>Admin Access</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "24px" }}>Enter the management credentials passcode</p>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              style={{ padding: "12px 16px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "1.05rem", textAlign: "center" }}
            />
            {authError && <p style={{ color: "#e25c5c", fontSize: "0.85rem", fontWeight: "600" }}>{authError}</p>}
            <button className="btn-checkout" type="submit" style={{ padding: "12px", width: "100%" }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "60px 0" }}>
      <div className="container">
        <div className="admin-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <span className="section-label">MANAGEMENT PANEL</span>
            <h2 className="font-serif" style={{ fontSize: "2rem", marginTop: "4px" }}>Catalog Admin Dashboard</h2>
          </div>
          <button
            className="btn-wishlist"
            onClick={resetCatalog}
            style={{
              padding: "10px 18px",
              border: "1px solid var(--secondary-color)",
              color: "var(--secondary-color)",
              background: "none",
              borderRadius: "var(--border-radius-sm)",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Reset Catalog to Defaults
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "32px" }}>
          {/* Add / Edit Product Form */}
          <div>
            <form onSubmit={handleFormSubmit} style={{ backgroundColor: "var(--bg-card)", padding: "28px", borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", boxShadow: "var(--box-shadow)" }}>
              <h3 className="font-serif" style={{ fontSize: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px", marginBottom: "20px" }}>
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Title *</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Category *</label>
                    <select name="category" value={formData.category} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }}>
                      <option value="sarees">Sarees</option>
                      <option value="womens-wear">Women's Wear</option>
                      <option value="mens-wear">Men's Wear</option>
                      <option value="kids-wear">Kids Wear</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Label *</label>
                    <input type="text" name="categoryLabel" required value={formData.categoryLabel} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Current Price (₹) *</label>
                    <input type="number" name="currentPrice" required value={formData.currentPrice} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Original Price (₹)</label>
                    <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Tag (e.g. Hot, Sale, New)</label>
                    <input type="text" name="tag" value={formData.tag} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Product Image *</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ fontSize: "0.8rem", padding: "4px 0" }}
                      />
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", alignSelf: "center", margin: "2px 0" }}>— OR —</span>
                      <input
                        type="text"
                        name="image"
                        placeholder="Paste image URL here"
                        value={formData.image && !formData.image.startsWith("data:") ? formData.image : ""}
                        onChange={handleFormChange}
                        style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", fontSize: "0.85rem" }}
                      />
                      {formData.image && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                          <img
                            src={formData.image}
                            alt="Preview"
                            style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "4px", border: "1px solid var(--border-color)" }}
                          />
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>
                            {formData.image.startsWith("data:") ? "Local Upload (Base64)" : "Image URL Loaded"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Description *</label>
                  <textarea name="description" required rows="3" value={formData.description} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)", resize: "vertical" }}></textarea>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontWeight: "600", fontSize: "0.85rem" }}>Features (comma separated)</label>
                  <input type="text" name="featuresStr" placeholder="e.g. Pure Silk, Gold Zari, Dry Clean Only" value={formData.featuresStr} onChange={handleFormChange} style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius-sm)" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                <button type="submit" className="btn-checkout" style={{ flex: 1, padding: "10px" }}>
                  {editingId ? "Save Changes" : "Create Product"}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} style={{ padding: "10px", border: "1px solid var(--border-color)", background: "none", borderRadius: "var(--border-radius-sm)", cursor: "pointer" }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Current Products List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 className="font-serif" style={{ fontSize: "1.25rem" }}>Catalog Products ({products.length})</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "600px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", padding: "12px", backgroundColor: "white" }}>
              {products.map((p) => (
                <div key={p.id} style={{ display: "flex", gap: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--border-color)", alignItems: "center" }}>
                  <img src={p.image} alt={p.title} style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "50%", border: "1px solid var(--border-color)" }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: "600", fontSize: "0.95rem" }}>{p.title}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      ₹{p.currentPrice.toLocaleString()} | Category: {p.categoryLabel}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEditInit(p)}
                      style={{ padding: "6px 12px", fontSize: "0.8rem", border: "1px solid var(--border-color)", background: "none", borderRadius: "var(--border-radius-sm)", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      style={{ padding: "6px 12px", fontSize: "0.8rem", border: "1px solid #e25c5c", color: "#e25c5c", background: "none", borderRadius: "var(--border-radius-sm)", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
