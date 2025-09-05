import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch("http://localhost:3001/services")
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [id]);

  if (!user) return <p>Loading dashboard...</p>;

  // Cancel order (buyer)
  const cancelOrder = (orderId) => {
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "DELETE",
    }).then(() => {
      setOrders(orders.filter((o) => o.id !== orderId));
    });
  };

  // Mark order finished (seller)
  const finishOrder = (orderId) => {
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "finished" }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
      });
  };

  return (
    <div className="layout">
      <Sidebar userId={user.id} role={user.role} />
      <div className="content">
        <h1>Welcome, {user.name} 👋</h1>

        {/* Buyer Dashboard */}
        {user.role === "buyer" && (
          <>
            <h2>Your Orders</h2>
            <ul>
              {orders
                .filter((o) => String(o.buyerId) === String(id))
                .map((o) => {
                  const service = services.find(
                    (s) => String(s.id) === String(o.serviceId)
                  );
                  return (
                    <li key={o.id} className="service-item">
                      {service && (
                        <img
                          src={service.image || "https://via.placeholder.com/150"}
                          alt={service.title}
                          className="service-img"
                        />
                      )}
                      <h3>{service?.title}</h3>
                      <p>{service?.description}</p>
                      <p><strong>KES {service?.price}</strong></p>
                      <p>Status: {o.status}</p>
                      {o.status === "pending" && (
                        <button onClick={() => cancelOrder(o.id)}>
                          Cancel Order
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </>
        )}

        {/* Seller Dashboard */}
        {user.role === "seller" && (
          <>
            <h2>Your Services</h2>
            <ul>
              {services
                .filter((s) => String(s.sellerId) === String(id))
                .map((s) => (
                  <li key={s.id} className="service-item">
                    <img
                      src={s.image || "https://via.placeholder.com/150"}
                      alt={s.title}
                      className="service-img"
                    />
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <p><strong>KES {s.price}</strong></p>
                  </li>
                ))}
            </ul>

            <h2>Incoming Orders</h2>
            <ul>
              {orders
                .filter((o) => {
                  const service = services.find(
                    (s) => String(s.id) === String(o.serviceId)
                  );
                  return service && String(service.sellerId) === String(id);
                })
                .map((o) => {
                  const service = services.find(
                    (s) => String(s.id) === String(o.serviceId)
                  );
                  return (
                    <li key={o.id} className="service-item">
                      <h3>{service?.title}</h3>
                      <p>Status: {o.status}</p>
                      {o.status === "pending" && (
                        <button onClick={() => finishOrder(o.id)}>
                          Mark as Finished
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;