import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Orders() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch current user
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    // Fetch all orders
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

    // Fetch all services
    fetch("http://localhost:3001/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [id]);

  const getServiceDetails = (serviceId) =>
    services.find((s) => s.id === serviceId);

  // ✅ Mark order as finished (seller only)
  const finishOrder = (orderId) => {
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders(
          orders.map((o) => (o.id === orderId ? updatedOrder : o))
        );
      });
  };

  return (
    <div className="layout">
      {user && <Sidebar userId={user.id} role={user.role} />}
      <div className="content">
        <h1>Orders</h1>

        {/* ================= BUYER ORDERS ================= */}
        {user && user.role === "buyer" && (
          <>
            <h2>Your Orders</h2>
            <ul className="orders-list">
              {orders
                .filter((o) => parseInt(o.buyerId) === parseInt(id))
                .map((o) => {
                  const service = getServiceDetails(o.serviceId);
                  return (
                    <li key={o.id}>
                      <h3>{service?.title}</h3>
                      <p>{service?.description}</p>
                      <p>Status: {o.status}</p>
                      <p>
                        Ordered on:{" "}
                        {new Date(o.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </>
        )}

        {/* ================= SELLER ORDERS ================= */}
        {user && user.role === "seller" && (
          <>
            <h2>Orders for Your Services</h2>
            <ul className="orders-list">
              {orders
                .filter((o) => {
                  const service = getServiceDetails(o.serviceId);
                  return service?.sellerId === parseInt(id);
                })
                .map((o) => {
                  const service = getServiceDetails(o.serviceId);
                  return (
                    <li key={o.id}>
                      <h3>{service?.title}</h3>
                      <p>Ordered by Buyer ID: {o.buyerId}</p>
                      <p>Status: {o.status}</p>
                      <p>
                        Ordered on:{" "}
                        {new Date(o.createdAt).toLocaleDateString()}
                      </p>
                      {o.status !== "completed" && (
                        <button
                          className="finish-btn"
                          onClick={() => finishOrder(o.id)}
                        >
                          Mark as Finished
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>

            {/* ================= SELLER SERVICES ================= */}
            <h2>Your Services</h2>
            <ul className="services-list">
              {services
                .filter((s) => s.sellerId === parseInt(id))
                .map((s) => (
                  <li key={s.id}>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <p>KES {s.price}</p>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;