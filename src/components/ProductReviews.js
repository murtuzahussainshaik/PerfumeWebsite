// src/components/ProductReviews.js
import React, { useState, useEffect } from "react";
import { getReviewsByProduct, addReview } from "../api/api";
import "./ProductReviews.css";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProduct(productId);
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = await addReview(productId, formData);
      setReviews([...reviews, newReview]);
      setFormData({
        userName: "",
        rating: 5,
        comment: "",
      });
      setShowForm(false);
    } catch (err) {
      setError("Failed to submit review");
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  if (loading) return <div className="loading">Loading reviews...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-reviews">
      <h3>Customer Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this product!</p>
      ) : (
        <>
          <div className="average-rating">
            <span className="avg-rating-number">
              {(
                reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length
              ).toFixed(1)}
            </span>
            <div className="avg-rating-stars">
              {renderStars(
                Math.round(
                  reviews.reduce((acc, review) => acc + review.rating, 0) /
                    reviews.length
                )
              )}
            </div>
            <span className="avg-rating-count">({reviews.length} reviews)</span>
          </div>

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <span className="review-user">{review.userName}</span>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {!showForm ? (
        <button className="btn btn-secondary" onClick={() => setShowForm(true)}>
          Write a Review
        </button>
      ) : (
        <div className="review-form-container">
          <h4>Write Your Review</h4>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Your Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating-select">
                {[5, 4, 3, 2, 1].map((num) => (
                  <label key={num} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={formData.rating === num}
                      onChange={handleChange}
                    />
                    {renderStars(num)}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
