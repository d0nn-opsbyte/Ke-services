import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar({ userId, role }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar Drawer */}
      <div className={`Sidebar ${isOpen ? "open" : ""}`}>
        <h2>KE Services</h2>
        <nav>
          {role === "seller" && (
            <Link to={`/Dashboard/${userId}`} onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          )}
          <Link to={`/Services/${userId}`} onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link to={`/Orders/${userId}`} onClick={() => setIsOpen(false)}>
            Orders
          </Link>
          <Link to={`/Wallet/${userId}`} onClick={() => setIsOpen(false)}>
            Wallet
          </Link>
          <Link to={`/Profile/${userId}`} onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Link to={`/Requests/${userId}`} onClick={() => setIsOpen(false)}>
            Requests
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)}>
              Logout
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;