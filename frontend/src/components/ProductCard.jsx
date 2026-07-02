import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
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

  return (
    <div
      className='product-card'
      onClick={() => navigate(`/product/${product._id}`)}>
      <div className='product-image-wrapper'>
        <img src={product.image} alt={product.name} className='product-image' />
      </div>
      <div className='product-info'>
        <div className='product-category'>{product.category}</div>
        <h3 className='product-name'>{product.name}</h3>
        <div className='product-rating'>
          <span className='stars'>{renderStars(product.rating)}</span>
          <span className='reviews-count'>({product.numReviews})</span>
        </div>
        <div className='product-price'>${product.price.toFixed(2)}</div>
        <button
          className='btn btn-primary'
          onClick={handleAddToCart}
          style={{ width: "100%", marginTop: "auto" }}>
          <FiShoppingCart size={16} style={{ marginRight: "4px" }} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
