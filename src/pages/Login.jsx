import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../stylesheet/signup.css";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Both email and password are required"); // Error handling
    }

    try {
      const url = "https://pennywise-ztjn.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { message, success, token, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home"); // Redirect to dashboard or another page upon successful login
        }, 3000);
      } else if (error) {
        handleError(error);
      } else if (message) {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message || "Login failed");
    }
  };

  return (
    <div className="signup-container">
      {" "}
      <form className="signup-form" onSubmit={handleLogin}>
        {" "}
        <h1>Login Form</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={loginInfo.email}
            autoFocus
          />
        </div>
        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn">
          Login
        </button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
