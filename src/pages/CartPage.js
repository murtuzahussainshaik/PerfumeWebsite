// src/pages/CartPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart();
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity({
        id,
        size,
        quantity: newQuantity,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If on shipping info step, advance to payment step
    if (checkoutStep === 1) {
      setCheckoutStep(2);
      return;
    }

    // If on payment step, process the order
    if (checkoutStep === 2) {
      // Here you would typically send the order to your backend API
      // For this example, we'll just simulate a successful order
      setOrderComplete(true);
      clearCart();
    }
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      return (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      );
    }

    return (
      <div className="cart-items">
        <div className="cart-header">
          <span className="header-product">Product</span>
          <span className="header-size">Size</span>
          <span className="header-price">Price</span>
          <span className="header-quantity">Quantity</span>
          <span className="header-total">Total</span>
          <span className="header-actions"></span>
        </div>

        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="cart-item">
            <div className="item-product">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
              </div>
            </div>

            <div className="item-size">{item.size}</div>

            <div className="item-price">${item.price.toFixed(2)}</div>

            <div className="item-quantity">
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.size, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.id, item.size, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <div className="item-actions">
              <button
                className="remove-btn"
                onClick={() => removeFromCart({ id: item.id, size: item.size })}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="cart-summary">
          <div className="cart-totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="shipping">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="btn btn-secondary" onClick={() => clearCart()}>
              Clear Cart
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setCheckoutStep(1)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderShippingForm = () => {
    return (
      <div className="checkout-step shipping-step">
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">Zip/Postal Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCheckoutStep(0)}
            >
              Back to Cart
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderPaymentForm = () => {
    return (
      <div className="checkout-step payment-step">
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Items ({cart.length}):</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-item total">
              <span>Order Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCheckoutStep(1)}
            >
              Back to Shipping
            </button>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderOrderComplete = () => {
    return (
      <div className="order-complete">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase, {formData.name}!</p>
        <p>We've sent a confirmation email to {formData.email}.</p>
        <p>Your order will be shipped to your address shortly.</p>

        <div className="order-actions">
          <Link to="/" className="btn btn-secondary">
            Return to Home
          </Link>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="page-title">
          {orderComplete
            ? "Order Confirmation"
            : checkoutStep === 0
            ? "Your Shopping Cart"
            : "Checkout"}
        </h1>

        {orderComplete ? (
          renderOrderComplete()
        ) : (
          <>
            {checkoutStep === 0 && renderCartItems()}
            {checkoutStep === 1 && renderShippingForm()}
            {checkoutStep === 2 && renderPaymentForm()}

            {checkoutStep > 0 && !orderComplete && (
              <div className="checkout-progress">
                <div
                  className={`progress-step ${
                    checkoutStep >= 1 ? "active" : ""
                  } ${checkoutStep > 1 ? "completed" : ""}`}
                >
                  <div className="step-indicator">1</div>
                  <span>Shipping</span>
                </div>
                <div className="progress-line"></div>
                <div
                  className={`progress-step ${
                    checkoutStep >= 2 ? "active" : ""
                  }`}
                >
                  <div className="step-indicator">2</div>
                  <span>Payment</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
