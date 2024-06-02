// SignUp.js
import { useState } from "react";
import { toast } from "react-toastify";

import "./css/signup.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) { // If the response status is not ok (not 2xx)
        toast.error(data.message); // Show the error message from the server
        return;
      }
      toast.success("Signup successful!"); // Optionally, show a success message
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again."); // Show a generic error message
    }
  };
  
  

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign Up</h1>
        <p className="form-subtitle">
          Welcome to your new e-personal assistant app! Let&apos;s get started.
        </p>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </label>
        <button disabled={loading} type="submit">{loading ? 'Loading...' : 'Register'}</button>
        <p className="login-link">
          Already a user? <Link to='/signin'>Log in</Link> 
        </p>
      </form>
    </div>
  );
};

export default SignUp;
