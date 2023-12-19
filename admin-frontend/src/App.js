import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { user } = useAuth();

  // Check if user is not authenticated, then redirect to login page
  if (!user && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
    return <Navigate to="/login" />;
  }

  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
