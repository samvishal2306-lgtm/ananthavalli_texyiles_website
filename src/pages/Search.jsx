import React, { useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { products, loading } = useContext(ProductContext);

  // Normalize query for casing
  const normalizedQuery = query.trim().toLowerCase();

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (!normalizedQuery) return false;
    return (
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery) ||
      p.categoryLabel.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      (p.features && p.features.some(f => f.toLowerCase().includes(normalizedQuery)))
    );
  });

  return (
    <main style={{ minHeight: "65vh", padding: "60px 0" }}>
      <div className="container">
        <div className="breadcrumb" style={{ marginBottom: "20px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <Link to="/" style={{ marginRight: "8px" }}>Home</Link> / 
          <span style={{ marginLeft: "8px", color: "var(--secondary-color)" }}>Search Results</span>
        </div>

        <span className="section-label">CATALOG SEARCH</span>
        <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "8px" }}>
          {query ? `Search Results for "${query}"` : "Search Our Collections"}
        </h2>
        <p className="section-subtitle">
          {query
            ? `Found ${filteredProducts.length} items matching your query`
            : "Type in a keyword to search for sarees, ethnic wear, shirts, and kids collections"}
        </p>
        <div className="divider"></div>

        {loading ? (
          <p style={{ textAlign: "center", margin: "40px 0" }}>Searching catalog...</p>
        ) : !query ? (
          <div style={{ textAlign: "center", margin: "60px 0" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "20px" }}>
              Please enter a search term in the search bar above.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", margin: "60px 0" }}>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "32px" }}>
              No products found matching your search.
            </p>
            <div style={{ maxWidth: "450px", margin: "0 auto", padding: "24px", border: "1px dashed var(--border-color)", borderRadius: "var(--border-radius-sm)", backgroundColor: "var(--bg-card)" }}>
              <h4 style={{ fontWeight: "600", marginBottom: "12px" }}>Try searching for:</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                <Link to="/search?q=Saree" style={{ padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "20px", fontSize: "0.85rem", backgroundColor: "white" }}>Sarees</Link>
                <Link to="/search?q=Silk" style={{ padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "20px", fontSize: "0.85rem", backgroundColor: "white" }}>Silk</Link>
                <Link to="/search?q=Shirt" style={{ padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "20px", fontSize: "0.85rem", backgroundColor: "white" }}>Shirts</Link>
                <Link to="/search?q=Veshti" style={{ padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "20px", fontSize: "0.85rem", backgroundColor: "white" }}>Veshtis</Link>
                <Link to="/search?q=Kids" style={{ padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "20px", fontSize: "0.85rem", backgroundColor: "white" }}>Kids Collections</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
