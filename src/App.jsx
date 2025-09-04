import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Services from "./components/Services";
import Bookings from "./components/Bookings";
import Wallet from "./components/Wallet";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Sidebar stays on the left */}
      <Sidebar />

      {/* Main content area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;