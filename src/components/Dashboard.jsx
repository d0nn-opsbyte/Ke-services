import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`http://localhost:3001/services?sellerId=${id}`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [id]);

  return (
    <div className="layout">
      {user && <Sidebar userId={user.id} role={user.role} />}
      <div className="content">
        <h1>Seller Dashboard</h1>
        <h2>Your Services</h2>
        {services.length > 0 ? (
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p>KES {s.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No services yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;