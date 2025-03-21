// src/pages/HomePage.js
import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <div className="content-container">
        <FeaturedProducts />

        <section className="about-section">
          <div className="about-content">
            <h2>About LUXE SCENT</h2>
            <p>
              At LUXE SCENT, we believe that fragrance is more than just a
              scent—it's an expression of your personality, a memory in the
              making, and a sensorial journey that accompanies you throughout
              your day.
            </p>
            <p>
              Our curated collection features the finest perfumes from around
              the world, selected for their exceptional quality, unique
              character, and ability to inspire and delight.
            </p>
          </div>
          <div className="about-image">
            <img
              src="data:image/jpeg;base64,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"
              alt="Luxury perfume bottles"
            />
          </div>
        </section>

        <section className="categories-section">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <img
                src="https://t3.ftcdn.net/jpg/12/39/06/16/360_F_1239061636_tZctt1VHH2gphZz3ZGa8JW4QbF0zVlbX.jpg"
                alt="Women's perfumes"
              />
              <div className="category-overlay">
                <h3>Women's Collection</h3>
                <a href="/products?category=Women" className="btn">
                  Explore
                </a>
              </div>
            </div>
            <div className="category-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojCukqUbQNdD6fjkqdY3jvSmnEmE1UtHSeBmD9Rk61hINkSPxuMBdyJ1TeRRFalIEWRc&usqp=CAU"
                alt="Men's perfumes"
              />
              <div className="category-overlay">
                <h3>Men's Collection</h3>
                <a href="/products?category=Men" className="btn">
                  Explore
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
