import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Perform your login logic here
    // Set the user in state if login is successful
    setUser({ email });
    
  };

  const logout = async () => {
    // Perform your logout logic here
    // Set the user to null in state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
