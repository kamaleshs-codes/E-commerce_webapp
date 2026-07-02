import React, { useState, useEffect } from "react";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/myorders");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "pending",
      processing: "processing",
      shipped: "shipped",
      delivered: "delivered",
    };
    return colors[status] || "pending";
  };

  if (loading) {
    return <div className='loading'>Loading orders...</div>;
  }

  return (
    <div className='orders-page'>
      <div className='container'>
        <h1 style={{ marginBottom: "1.5rem" }}>My Orders</h1>

        {orders.length === 0 ? (
          <div className='empty-state'>
            <FiPackage
              size={64}
              style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}
            />
            <h3>No orders yet</h3>
            <p>Start shopping to see your orders here.</p>
            <button className='btn btn-primary' onClick={() => navigate("/")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className='orders-list'>
            {orders.map((order) => (
              <div key={order._id} className='order-card'>
                <div className='order-header'>
                  <div className='order-header-info'>
                    <h3>Order #{order._id.slice(-8)}</h3>
                    <p>
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`order-status ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        padding: "1rem 0",
                        borderBottom:
                          index < order.orderItems.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "75px",
                          height: "75px",
                          objectFit: "cover",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border)",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--text)",
                            marginBottom: "0.25rem",
                          }}>
                          {item.name}
                        </h4>
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.85rem",
                          }}>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div style={{ fontWeight: 700, color: "var(--text)" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--border)",
                  }}>
                  <div>
                    <p
                      style={{
                        marginBottom: "0.25rem",
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                      }}>
                      Shipping to:
                    </p>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        marginBottom: "0.25rem",
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                      }}>
                      Total Amount:
                    </p>
                    <p
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--primary)",
                      }}>
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
