import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";
import { api } from "../../lip/fetch-config";

const Register = () => {
    const [credentials, setCredentials] = useState({
      username: undefined,
      password: undefined,
      email: undefined,
      country: undefined,
      city: undefined,
      phone: undefined,
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await api.post("/api/auth/register", credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/login");

      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    };
  
    const { loading, error, dispatch } = useContext(AuthContext);
  
    return (
      <div className="register">
        <div className="linkHome">
      <Link to="/">
      <h3>Home</h3>
      </Link>
      </div>
        <div className="registerContainer">
          <div className="formContainer">
            <h2 className="title">Register</h2>
            <input
              type="text"
              className="lInput"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            />
            <input
              type="password"
              className="lInput"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
  
            <input
              type="text"
              className="lInput"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <input
              type="text"
              className="lInput"
              placeholder="Country"
              id="country"
              onChange={handleChange}
            />
            <input
              type="text"
              className="lInput"
              placeholder="City"
              id="city"
              onChange={handleChange}
            />
            <input
              type="text"
              className="lInput"
              placeholder="Phone"
              id="phone"
              onChange={handleChange}
            />
  
            <button
              className="lButton"
              onClick={handleClick}
              disabled={loading}
            >
              Register
            </button>
            {error && <span>{error.message}</span>}
  
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Register;