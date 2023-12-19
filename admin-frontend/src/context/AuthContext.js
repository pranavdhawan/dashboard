import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null)
  const [sheetId, setSheetId] = useState(null)
  // const [sheetNames, setSheetNames] = useState([]);


  // const getName = async (arth) => {
  //   try {
  //     if (!arth) {
  //       return; // Wait until sheetId is available
  //     }

  //     const key = process.env.REACT_APP_KEY;
  //     const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${arth}?key=${key}`;
  //     const response = await fetch(endpoint);

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch data. Status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     if (!data.sheets || !data.sheets.length) {
  //       throw new Error("No sheets found in the spreadsheet.");
  //     }

  //     const names = data.sheets.map((sheet) => sheet.properties.title);
  //     setSheetNames(names);

  //     // // Store the names array in localStorage
  //     // localStorage.setItem("sheetNames", JSON.stringify(names));

  //     // setSelectedSheet(names[0]);
  //   } catch (error) {
  //     console.error("Error fetching sheet names:", error.message);
  //   }
  // };


  const login = async (email, password) => {
    try {
      const response = await fetch('https://apnabackend.onrender.com/api/login', {
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
    setSheetId(null)
    // setSheetNames(null)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, email, sheetId, setSheetId}}>
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
