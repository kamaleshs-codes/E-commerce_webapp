import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("Product added to cart!");
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating || 5);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className='star'
          style={{ color: i <= rounded ? "#F59E0B" : "#E2E8F0" }}>
          ★
        </span>,
      );
    }
    return stars;
  };

  if (loading) {
    return <div className='loading'>Loading product...</div>;
  }

  if (!product) {
    return (
      <div className='empty-state' style={{ minHeight: "60vh" }}>
        <h3>Product not found</h3>
        <button className='btn btn-primary' onClick={() => navigate("/")}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className='product-detail'>
      <div className='container'>
        <button onClick={() => navigate("/")} className='detail-back-btn'>
          <FiArrowLeft size={16} style={{ marginRight: "6px" }} />
          Back to Shop
        </button>

        <div className='product-detail-grid'>
          <div className='product-detail-image-wrapper'>
            <img
              src={product.image}
              alt={product.name}
              className='product-detail-image'
            />
          </div>

          <div>
            <div className='detail-category'>{product.category}</div>
            <h1 className='detail-title'>{product.name}</h1>

            <div
              className='product-rating'
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}>
              <span className='stars'>{renderStars(product.rating)}</span>
              <span
                style={{
                  fontWeight: 600,
                  color: "var(--text)",
                  fontSize: "0.9rem",
                }}>
                {product.rating.toFixed(1)}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                ({product.numReviews} reviews)
              </span>
            </div>

            <div className='detail-price'>${product.price.toFixed(2)}</div>

            <p className='detail-description'>{product.description}</p>

            <div style={{ marginBottom: "2rem" }}>
              {product.stock > 0 ? (
                <span className='product-stock'>
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className='product-stock out-of-stock'>Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <label className='quantity-section-label'>Quantity:</label>
                <div className='quantity-controls'>
                  <button
                    className='quantity-btn'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </button>
                  <span className='quantity-value'>{quantity}</span>
                  <button
                    className='quantity-btn'
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }>
                    +
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
              <button
                className='btn btn-primary'
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  fontSize: "1.05rem",
                  padding: "0.875rem 1.5rem",
                }}>
                <FiShoppingCart size={18} style={{ marginRight: "6px" }} />
                Add to Cart
              </button>
              <button
                className='btn btn-secondary'
                onClick={() => {
                  addToCart(product, quantity);
                  navigate("/cart");
                }}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  fontSize: "1.05rem",
                  padding: "0.875rem 1.5rem",
                }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
