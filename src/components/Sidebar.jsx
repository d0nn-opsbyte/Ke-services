import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">KE services</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/services">Services</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default Sidebar;