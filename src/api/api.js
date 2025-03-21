// src/api/api.js
import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    throw error;
  }
};

export const addReview = async (productId, review) => {
  try {
    const response = await axios.post(
      `${API_URL}/reviews/${productId}`,
      review
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};
