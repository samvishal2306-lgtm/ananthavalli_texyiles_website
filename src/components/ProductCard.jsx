import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate("/cart");
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <div className="product-img-wrapper" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.image} alt={product.title} />
        {product.tag && (
          <span className={`product-badge ${product.tag.toLowerCase()}`}>
            {product.tag}
          </span>
        )}
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.categoryLabel}</span>
        <h3 className="product-title" onClick={() => navigate(`/product/${product.id}`)}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        
        <div className="product-rating">
          <span className="stars">{"★".repeat(Math.round(product.rating))}</span>
          <span className="rating-num">({product.reviewsCount})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">₹{product.currentPrice.toLocaleString()}</span>
          {product.originalPrice > product.currentPrice && (
            <>
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              <span className="discount-tag">{product.discount}</span>
            </>
          )}
        </div>
        
        <div className="product-actions" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "16px" }}>
          <button className="btn-buy-now" onClick={handleBuyNow} style={{ width: "100%", margin: 0 }}>
            Buy Now
          </button>
          <button className="btn-add-to-cart-grid" onClick={handleAddToCart} style={{ width: "100%", margin: 0 }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
