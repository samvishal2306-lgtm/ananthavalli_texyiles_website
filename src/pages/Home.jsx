import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const { products, loading } = useContext(ProductContext);
  const [activeSlide, setActiveSlide] = useState(0);

  // Hero Slider Data
  const slides = [
    {
      image: "/slide1.jpg",
      label: "SRI ANANTHAVALLI TEXTILES · THOOTHUKUDI",
      title: "Kids Festival Wear",
      desc: "Dress your little ones in vibrant traditional sherwanis and ethnic styles."
    },
    {
      image: "/slide2.jpg",
      label: "PURE SILK · MATRIMONIAL WEAVES",
      title: "Premium Wedding Dress",
      desc: "Graceful traditional South Indian bridal sarees and groom shirts/veshtis."
    },
    {
      image: "/slide3.jpg",
      label: "ELEGANT HALF-SAREES & LEHENGAS",
      title: "New Women Collections",
      desc: "Stunning colors and rich embroidery for modern and classic styles."
    },
    {
      image: "/slide4.jpg",
      label: "KANCHIVARAM & PATTU HERITAGE",
      title: "Royal Sarees for Women",
      desc: "Exquisite handloom sarees crafted by certified master weavers."
    },
    {
      image: "/slide5.jpg",
      label: "FESTIVAL COTTON & SILK SETS",
      title: "Men's Ethnic Wear",
      desc: "Premium quality dhotis, cotton shirts, and ready-to-wear festival gift packs."
    }
  ];

  // Auto transition slides (resets timer when activeSlide changes due to user interaction)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, slides.length]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 14, minutes: 32, seconds: 45 }; // Reset timer loop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter lists for Bestsellers & New Arrivals
  const bestSellers = products.filter((p) => p.tag === "Hot").slice(0, 4);
  const newArrivals = products.filter((p) => p.tag === "New").slice(0, 4);

  // Categories Data
  const categoriesList = [
    {
      id: "sarees",
      title: "Sarees",
      desc: "Bridal Pattu, Soft Silk & Organza",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
      count: products.filter(p => p.category === "sarees").length
    },
    {
      id: "womens-wear",
      title: "Women's Wear",
      desc: "Lehengas, Anarkalis & Salwars",
      image: "https://cdn.pixabay.com/photo/2022/12/04/07/03/woman-7633843_1280.jpg",
      count: products.filter(p => p.category === "womens-wear").length
    },
    {
      id: "mens-wear",
      title: "Men's Wear",
      desc: "Kurta Pyjamas, Veshtis & Shirts",
      image: "https://www.charchaand.com/cdn/shop/files/AC2I4066.webp?v=1698476725",
      count: products.filter(p => p.category === "mens-wear").length
    },
    {
      id: "kids-wear",
      title: "Kids Collections",
      desc: "Pavadai Satinis & Boys Kurtas",
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?cs=srgb&dl=pexels-victoria-akvarel-1620760.jpg&fm=jpg",
      count: products.filter(p => p.category === "kids-wear").length
    }
  ];

  return (
    <main>
      {/* Hero Carousel Section */}
      <section className="hero-slider">
        <div className="slider-wrapper">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`slide-item ${idx === activeSlide ? "active" : ""}`}
            >
              <div className="slide-backdrop" style={{ backgroundImage: `url(${slide.image})` }}></div>
              <img src={slide.image} alt={slide.title} className="slide-main-img" />
              <div className="slide-overlay-gradient"></div>
              
              <div className="slide-content container">
                <span className="slide-subtitle">{slide.label}</span>
                <h1 className="slide-title font-serif">{slide.title}</h1>
                <p className="slide-desc">{slide.desc}</p>
                <Link to="/category/sarees" className="btn-shop-now">
                  Explore Collection
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <button
          className="slider-nav prev"
          aria-label="Previous slide"
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          className="slider-nav next"
          aria-label="Next slide"
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === activeSlide ? "active" : ""}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Countdown Promo Banner */}
      <div className="countdown-banner">
        <div className="countdown-container container">
          <div className="countdown-text">
            <span className="sale-tag">🔥 AADI OFFER</span> — Limited Time Offer!
          </div>
          <div className="timer-boxes">
            <div className="timer-box">
              <span className="time-num">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="time-lbl">Hours</span>
            </div>
            <div className="timer-box">
              <span className="time-num">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="time-lbl">Mins</span>
            </div>
            <div className="timer-box">
              <span className="time-num">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="time-lbl">Secs</span>
            </div>
          </div>
          <Link to="/category/sarees" className="btn-shop-now">
            Shop Now
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="section bg-light text-center">
        <div className="container">
          <span className="section-label">SRI ANANTHAVALLI TEXTILES</span>
          <h2 className="section-title font-serif">Shop by Category</h2>
          <p className="section-subtitle">Discover our exquisite range of authentic Indian textiles</p>
          <div className="divider"></div>
          
          <div className="category-grid">
            {categoriesList.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="category-card">
                <div className="category-img-wrapper">
                  <img src={cat.image} alt={cat.title} />
                </div>
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <span className="category-meta">{cat.count} Items Available</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Benefits & Core Stats */}
      <section className="section bg-dark text-white text-center">
        <div className="container">
          <span className="section-label gold">SRI ANANTHAVALLI TEXTILES</span>
          <h2 className="section-title font-serif text-white">Why Choose Sri Ananthavalli?</h2>
          <p className="section-subtitle opacity-75">Serving the textile needs of Tamil Nadu for generations</p>
          <div className="divider gold"></div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>On orders above ₹2,000 across South Tamil Nadu</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h3>100% Authentic</h3>
              <p>Genuine handloom and silk fabrics, certified quality</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🏅</div>
              <h3>Premium Quality</h3>
              <p>Curated from the finest weavers across Tamil Nadu</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>7-day hassle-free return and exchange policy</p>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num font-serif">22+</span>
              <span className="stat-lbl">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-num font-serif">50,000+</span>
              <span className="stat-lbl">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-num font-serif">5,000+</span>
              <span className="stat-lbl">Fabric Varieties</span>
            </div>
            <div className="stat-item">
              <span className="stat-num font-serif">100%</span>
              <span className="stat-lbl">Authentic Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="section text-center">
        <div className="container">
          <span className="section-label">SRI ANANTHAVALLI TEXTILES</span>
          <h2 className="section-title font-serif">Best Sellers</h2>
          <p className="section-subtitle">Our most loved pieces — chosen by thousands of happy customers</p>
          <div className="divider"></div>
          
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products-grid">
              {bestSellers.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="section bg-light text-center">
        <div className="container">
          <span className="section-label">SRI ANANTHAVALLI TEXTILES</span>
          <h2 className="section-title font-serif">New Arrivals</h2>
          <p className="section-subtitle">Fresh from the loom — the latest additions to our collection</p>
          <div className="divider"></div>
          
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products-grid">
              {newArrivals.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
