import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Pay265</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Categories</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="signin-btn">Sign In</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Buy and Sell Online</h1>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search for products" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Black Headphones" />
            <p className="product-name">Black Headphones</p>
            <p className="product-price">$99</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150/0000FF" alt="Blue T-Shirt" />
            <p className="product-name">Blue T-Shirt</p>
            <p className="product-price">$25</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Wristwatch" />
            <p className="product-name">Wristwatch</p>
            <p className="product-price">$150</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Leather Tote Bag" />
            <p className="product-name">Leather Tote Bag</p>
            <p className="product-price">$80</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
