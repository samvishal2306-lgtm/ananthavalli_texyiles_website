import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";

export const Category = () => {
  const { categoryId } = useParams();
  const { products, loading } = useContext(ProductContext);

  const getCategoryTitle = (id) => {
    switch (id) {
      case "sarees":
        return "Traditional Sarees";
      case "womens-wear":
        return "Women's Ethnic Wear";
      case "mens-wear":
        return "Men's Traditional Wear";
      case "kids-wear":
        return "Kids Traditionals";
      default:
        return "Our Collections";
    }
  };

  const filteredProducts = products.filter((p) => p.category === categoryId);

  return (
    <main style={{ minHeight: "60vh", padding: "60px 0" }}>
      <section className="section">
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: "20px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            <Link to="/" style={{ marginRight: "8px" }}>Home</Link> / 
            <span style={{ marginLeft: "8px", color: "var(--secondary-color)" }}>{getCategoryTitle(categoryId)}</span>
          </div>
          
          <span className="section-label">SRI ANANTHAVALLI TEXTILES</span>
          <h2 className="section-title font-serif">{getCategoryTitle(categoryId)}</h2>
          <p className="section-subtitle">Browse through our handpicked high-quality authentic collection</p>
          <div className="divider"></div>
          
          {loading ? (
            <p style={{ textAlign: "center", margin: "40px 0" }}>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", margin: "60px 0" }}>
              <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "20px" }}>
                No items available in this category yet.
              </p>
              <Link to="/" className="btn-shop-now" style={{ display: "inline-block" }}>
                Go Back to Home
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
