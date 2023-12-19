import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ names, selectedSheet, setSelectedSheet }) => {
  const { user, logout, email } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {names.map((site, index) => (
            <li
              key={index}
              style={{
                textDecoration: "none",
                background: selectedSheet === site ? "#a190ef" : "transparent",
              }}
              onClick={() => setSelectedSheet(site)}
            >
              <DashboardIcon className="icon" />
              <span>{site}</span>
            </li>
          ))}
          <p className="title">USER</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>{email}</span>
          </li> */}
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
