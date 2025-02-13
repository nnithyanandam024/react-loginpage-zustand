import React, { useState } from "react";
import { create } from "zustand";
import Orb from "./Orb";
import "../styles/Orb.css";
import "../styles/Login.css";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, user, login, logout } = useAuthStore();
  const VALID_USERS = [
    { username: "admin", password: "12345" },
    { username: "mithun", password: "12345" },
    { username: "murugan", password: "12345" },
    { username: "sabareesh", password: "12345" },
    { username: "nithyanandam", password: "12345" }
  ];
  
  const handleLogin = () => {
    // Check if the provided username and password match any user in the array
    const isValidUser = VALID_USERS.some(
      (user) => user.username === username && user.password === password
    );
  
    if (isValidUser) {
      login({ username }); // Log in the user
    } else {
      alert("Invalid username or password."); // Show an error message
    }
  
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="orb-login-container">
      <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
      <div className="login-box">
        {!isLoggedIn ? (
          <>
            <h2 className="login-title">Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button onClick={handleLogin} className="login-button login-button-login">
              Login
            </button>
          </>
        ) : (
          <>
            <h2 className="login-title">Welcome, {user.username}!</h2>
            <p className="login-username">Logged in as: <strong>{user.username}</strong></p>
            <button onClick={handleLogout} className="login-button login-button-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
