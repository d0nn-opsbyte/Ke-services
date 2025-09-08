import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role; // Assuming user object has a role property

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("Please log in to view your orders");
      return;
    }

    fetch("http://localhost:3001/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        // Filter orders based on user role
        let filteredOrders = [];
        if (userRole === "buyer") {
          filteredOrders = data.filter((order) => order.buyerId === user.id);
        } else if (userRole === "seller") {
          filteredOrders = data.filter((order) => order.sellerId === user.id);
        } else {
          // Admin or other roles might see all orders
          filteredOrders = data;
        }
        
        setOrders(filteredOrders);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [user, userRole]);

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>{userRole === "seller" ? "Orders Received" : "My Orders"}</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>
            {userRole === "seller" 
              ? "You haven't received any orders yet." 
              : "You haven't placed any orders yet."}
          </p>
          <button 
            className="browse-services-btn"
            onClick={() => window.location.href = "/services"}
          >
            {userRole === "seller" ? "Manage Your Services" : "Browse Services"}
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} userRole={userRole} />
          ))}
        </div>
      )}
    </div>
  );
}

// Order Card Component
function OrderCard({ order, userRole }) {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [buyerDetails, setBuyerDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setDetailsLoading(true);
        
        // Fetch service details
        const serviceResponse = await fetch(`http://localhost:3001/services/${order.serviceId}`);
        const serviceData = await serviceResponse.json();
        setServiceDetails(serviceData);
        
        // Fetch seller details
        const sellerResponse = await fetch(`http://localhost:3001/users/${order.sellerId}`);
        const sellerData = await sellerResponse.json();
        setSellerDetails(sellerData);
        
        // Fetch buyer details if user is a seller
        if (userRole === "seller") {
          const buyerResponse = await fetch(`http://localhost:3001/users/${order.buyerId}`);
          const buyerData = await buyerResponse.json();
          setBuyerDetails(buyerData);
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order, userRole]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#28a745";
      case "in progress":
        return "#ffc107";
      case "pending":
        return "#17a2b8";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        // Update local state to reflect the change
        order.status = newStatus;
        if (newStatus === "completed") {
          order.completionDate = new Date().toISOString();
        }
        // Force re-render by creating a new array
        // This would work better if the state was managed in the parent component
        window.location.reload(); // Simple solution for demo purposes
      } else {
        console.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (detailsLoading) {
    return (
      <div className="order-card">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="order-card">
      <div className="order-header">
        <h3>{serviceDetails?.title || "Service details unavailable"}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {order.status}
        </span>
      </div>
      
      <div className="order-details">
        <div className="detail-row">
          <span className="label">Order ID:</span>
          <span className="value">#{order.id}</span>
        </div>
        
        {userRole === "buyer" && (
          <div className="detail-row">
            <span className="label">Seller:</span>
            <span className="value">
              {sellerDetails ? `${sellerDetails.profile?.firstName} ${sellerDetails.profile?.lastName}` : "Unknown seller"}
            </span>
          </div>
        )}
        
        {userRole === "seller" && (
          <div className="detail-row">
            <span className="label">Buyer:</span>
            <span className="value">
              {buyerDetails ? `${buyerDetails.profile?.firstName} ${buyerDetails.profile?.lastName}` : "Unknown buyer"}
            </span>
          </div>
        )}
        
        <div className="detail-row">
          <span className="label">Order Date:</span>
          <span className="value">
            {new Date(order.orderDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="label">Price:</span>
          <span className="value">${order.price} {order.currency || "USD"}</span>
        </div>
        
        {order.completionDate && (
          <div className="detail-row">
            <span className="label">Completed:</span>
            <span className="value">
              {new Date(order.completionDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      
      <div className="order-actions">
        <button className="btn btn-primary">View Details</button>
        <button className="btn btn-secondary">
          {userRole === "buyer" ? "Contact Seller" : "Contact Buyer"}
        </button>
        
        {userRole === "seller" && order.status === "pending" && (
          <button 
            className="btn btn-success"
            onClick={() => handleStatusUpdate("in progress")}
          >
            Start Working
          </button>
        )}
        
        {userRole === "seller" && order.status === "in progress" && (
          <button 
            className="btn btn-success"
            onClick={() => handleStatusUpdate("completed")}
          >
            Mark as Complete
          </button>
        )}
        
        {userRole === "buyer" && order.status === "in progress" && (
          <button 
            className="btn btn-success"
            onClick={() => handleStatusUpdate("completed")}
          >
            Confirm Completion
          </button>
        )}
      </div>
    </div>
  );
}

export default Orders;