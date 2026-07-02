import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-content'>
          <Link to='/' className='logo'>
            <FiShoppingBag
              size={24}
              style={{ marginRight: "6px", color: "var(--primary)" }}
            />
            ShopHub
          </Link>
          <ul className='nav-links'>
            <li>
              <Link to='/'>
                <FiHome size={16} style={{ marginRight: "4px" }} />
                Shop
              </Link>
            </li>
            {user && (
              <li>
                <Link to='/orders'>
                  <FiPackage size={16} style={{ marginRight: "4px" }} />
                  Orders
                </Link>
              </li>
            )}
            <li>
              <Link to='/cart' className='cart-badge-container'>
                <FiShoppingCart size={16} style={{ marginRight: "4px" }} />
                Cart
                {getCartCount() > 0 && (
                  <span className='cart-badge'>{getCartCount()}</span>
                )}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span className='nav-user-greeting'>
                    Hi, <span className='nav-user-name'>{user.name}</span>
                  </span>
                </li>
                <li>
                  <button onClick={logout} className='btn btn-outline btn-sm'>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register' className='cursor-pointer text-white'>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
