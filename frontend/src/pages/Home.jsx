import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartShopping = () => {
    document
      .getElementById("products-grid-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <div className='loading'>Loading products...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-content'>
          <h1>Welcome to ShopHub</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <button
            className='btn btn-secondary btn-lg'
            onClick={handleStartShopping}>
            Start Shopping
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className='products-section' id='products-grid-section'>
        <div className='container'>
          <div className='section-header'>
            <h2>Featured Products</h2>
          </div>

          {/* Search Bar */}
          <div className='search-container'>
            <div className='search-input-wrapper'>
              <FiSearch size={18} className='search-icon' />
              <input
                type='text'
                className='search-input'
                placeholder='Search products by name or category...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className='filter-section'>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className='empty-state'>
              <h3>No products found</h3>
              <p>Try searching for something else or changing categories</p>
            </div>
          ) : (
            <div className='products-grid'>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
