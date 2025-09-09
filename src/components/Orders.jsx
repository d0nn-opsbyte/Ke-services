import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

function Orders() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

    fetch("http://localhost:3001/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const cancelOrder = (orderId) => {
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "DELETE",
    }).then(() => setOrders(orders.filter((o) => o.id !== orderId)));
  };

  return (<>
    <BackButton id={id} />
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders
        .filter((o) => String(o.buyerId) === String(id))
        .map((o) => {
          const service = services.find((s) => String(s.id) === String(o.serviceId));
          return (
            <div key={o.id} className="order-card">
              <h3>{service?.title}</h3>
              <p>{service?.description}</p>
              <p><strong>KES {service?.price}</strong></p>
              <p className={`orders-status ${o.status}`}>Status: {o.status}</p>
              {o.status === "pending" && (
                <button onClick={() => cancelOrder(o.id)}>Cancel Order</button>
              )}
            </div>
          );
        })}
    </div>
  </>
  );
}

export default Orders;