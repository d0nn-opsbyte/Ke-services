import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

function Requests() {
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

  return (<>
    <BackButton />
    <div className="orders-container">
      <h2>Incoming Requests</h2>
      {orders
        .filter((o) => {
          const service = services.find((s) => String(s.id) === String(o.serviceId));
          return service && String(service.sellerId) === String(id);
        })
        .map((o) => {
          const service = services.find((s) => String(s.id) === String(o.serviceId));
          return (
            <div key={o.id} className="order-card">
              <h3>{service?.title}</h3>
              <p>Buyer ID: {o.buyerId}</p>
              <p className={`orders-status ${o.status}`}>Status: {o.status}</p>
              {o.status === "pending" && (
                <button onClick={() => finishOrder(o.id)}>Mark as Finished</button>
              )}
            </div>
          );
        })}
    </div>
    </>
  );
}

export default Requests;