// SignIn.js
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

import "./css/signin.css";
import OAuth from "../pages/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false); // Add state to toggle password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message)); 
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data)); // Pass the user data as the payload
      navigate("/");
      toast.success("Signin successful!");
    } catch (error) {
      dispatch(signInFailure(error.toString())); // Dispatch signInFailure with the client error message
      toast.error("An error occurred. Please try again.");
    }
  };


  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign In</h1>
        <p className="form-subtitle">
          Welcome back! Please sign in to continue.
        </p>
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
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"} // Change type based on state
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: "black" }}
            >
              {" "}
              {/* Add onClick handler to toggle state */}
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              {/* Change icon based on state */}
            </i>
          </div>
        </label>
        <button disabled={loading} type="submit">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
        <p className="signup-link">
          New user? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
