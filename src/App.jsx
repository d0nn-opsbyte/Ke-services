import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Services from "./components/Services";
import Wallet from "./components/Wallet";
import Profile from "./components/Profile";
import Orders from "./components/Orders";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Pass user id as param */}
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/services/:id" element={<Services />} />
        <Route path="/wallet/:id" element={<Wallet />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/orders/:id" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;