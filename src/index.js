import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthProvider } from "./context/AuthContext";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGSPYQG1H4HpxzZ6XvXWovBddtFLJFcTY",
  authDomain: "monetiseup.firebaseapp.com",
  projectId: "monetiseup",
  storageBucket: "monetiseup.appspot.com",
  messagingSenderId: "823531976989",
  appId: "1:823531976989:web:f926aa4161dfa7e3c0c9f4",
  measurementId: "G-R150WLTDSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
