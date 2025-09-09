import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) return <p>Loading dashboard...</p>;

  return (<>

    <div className="layout">
      <Sidebar userId={user.id} role={user.role} />
      <div className="content">

        <h1>Ke-services</h1>

        <h3>Welcome, {user.name} 👋</h3>
        <p>
          {user.role === "buyer"
            ? "Go to 'My Orders' to see your service requests."
            : "Go to 'Requests' to manage incoming service requests."}
        </p>
      </div>
    </div>
    </>
  );
}

export default Dashboard;