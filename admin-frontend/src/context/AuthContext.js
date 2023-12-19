import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null)

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:1337/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    
      const data = await response.json();

      if (data.user) {
        localStorage.setItem('token', data.user);
        alert('Login successful');
        setUser(email);
        setEmail({email})
      } else {
        alert('Please check your username and password');
      }
    } catch (error) {
      alert('Please check your username and password');
    }
  };

  const logout = async () => {
    // Perform your logout logic here
    // Set the user to null in state
    setUser(null);
    setEmail(null)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, email}}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
