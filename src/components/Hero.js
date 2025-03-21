// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Your Signature Scent</h1>
        <p>
          Explore our collection of luxury perfumes crafted with the finest
          ingredients
        </p>
        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
          {/* <Link to="/products?category=Featured" className="btn btn-secondary">
            Featured Perfumes
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
