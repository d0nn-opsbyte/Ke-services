import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    // Fetch logged in user
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    // Fetch services for seller
    fetch(`http://localhost:3001/services?sellerId=${id}`)
      .then((res) => res.json())
      .then((data) => setServices(data));

    // Fetch buyer orders
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewService({ ...newService, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  // Add new service
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = { ...newService, sellerId: parseInt(id) };

    fetch("http://localhost:3001/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceData),
    })
      .then((res) => res.json())
      .then((data) => {
        setServices([...services, data]);
        setNewService({ title: "", description: "", price: "", image: "" });
      });
  };

  return (
    <div className="layout">
      {user && <Sidebar userId={user.id} role={user.role} />}

      <div className="content">
        <h1>{user?.role === "seller" ? "Seller Dashboard" : "Buyer Dashboard"}</h1>

        {/* Profile Section */}
        {user && (
          <div className="profile-card">
            <img
              src={user.profilePic || "https://via.placeholder.com/100"}
              alt="Profile"
              className="profile-pic"
            />
            <h2>{user.username}</h2>
            <p>Role: {user.role}</p>
          </div>
        )}

        {/* Seller Dashboard */}
        {user?.role === "seller" && (
          <>
            <div className="form-container">
              <h2>Add New Service</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Service Title"
                  value={newService.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Service Description"
                  value={newService.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (KES)"
                  value={newService.price}
                  onChange={handleChange}
                  required
                />

                <input type="file" accept="image/*" onChange={handleFileChange} />

                {newService.image && (
                  <img
                    src={newService.image}
                    alt="Preview"
                    className="service-img"
                  />
                )}

                <button type="submit">Add Service</button>
              </form>
            </div>

            <h2>Your Services</h2>
            {services.length > 0 ? (
              <ul>
                {services.map((s) => (
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
            ) : (
              <p>No services yet.</p>
            )}
          </>
        )}

        {/* Buyer Dashboard */}
        {user?.role === "buyer" && (
          <>
            <h2>Your Orders</h2>
            <ul>
              {orders
                .filter((o) => parseInt(o.buyerId) === parseInt(id))
                .map((o) => (
                  <li key={o.id} className="service-item">
                    <h3>Service ID: {o.serviceId}</h3>
                    <p>Status: {o.status}</p>
                    <p>
                      Ordered on:{" "}
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;