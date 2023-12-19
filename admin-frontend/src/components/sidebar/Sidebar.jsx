import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, Route, Routes, useNavigate} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Chart from "../chart/Chart";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ names, selectedSheet, setSelectedSheet }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');

    // Redirect or perform any other post-logout actions
  };


  const { dispatch } = useContext(DarkModeContext);

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
            <li key={index} style={{ textDecoration: "none", background: selectedSheet == site ? "#a190ef" : "transparent" }} onClick={() => setSelectedSheet(site)} >
              <DashboardIcon className="icon" />
              <span>{site}</span>
            </li>
          ))}


          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>{user && user.email}</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* <Routes>
        {sheetNames.map((site, index) => (
          <Route key={index} path={`/chart`} element={<Chart websiteName={site} data={null} />} />
        ))}
      </Routes> */}

    </div>
  );

};

export default Sidebar;
