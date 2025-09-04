import React from "react";

function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}


export default Login;