import { Link } from "react-router-dom";

function Sidebar({ userId, role }) {
  return (
    <div className="sidebar">
      <h2>KE Services</h2>
      <nav>
        {role === "seller" && (
          <Link to={`/dashboard/${userId}`}>Dashboard</Link>
        )}
        <Link to={`/services/${userId}`}>Services</Link>
        <Link to={`/orders/${userId}`}>Orders</Link>
        <Link to={`/wallet/${userId}`}>Wallet</Link>
        <Link to="/">Logout</Link>
      </nav>
    </div>
  );
}

export default Sidebar;