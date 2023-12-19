// login.js

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      // Call the login function from the useAuth hook
      await login(email, password);
      alert('Login successful');
      // Redirect or perform other actions after successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Please check your username and password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
