import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [role, setRole] = useState("customer"); // default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: handle login/signup logic here
    console.log("Form submitted:", { isLogin, role });

    // Redirect to dashboard after login/signup
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          {!isLogin && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="customer">Customer</option>
              <option value="provider">Service Provider</option>
            </select>
          )}

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Home;