// src/components/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalQuantity } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          LUXE SCENT
        </Link>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                All Perfumes
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Women"
                onClick={() => setMenuOpen(false)}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Men"
                onClick={() => setMenuOpen(false)}
              >
                Men
              </Link>
            </li>
          </ul>
        </nav>

        <div className="cart-icon" onClick={() => navigate("/cart")}>
          <i className="fas fa-shopping-bag"></i>
          {getTotalQuantity() > 0 && (
            <span className="cart-count">{getTotalQuantity()}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
