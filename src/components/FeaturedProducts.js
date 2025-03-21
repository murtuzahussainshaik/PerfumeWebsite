// src/components/FeaturedProducts.js
import React, { useState, useEffect } from "react";
import { getFeaturedProducts } from "../api/api";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load featured products");
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading)
    return <div className="loading">Loading featured products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="featured-products">
      <h2>Featured Perfumes</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
