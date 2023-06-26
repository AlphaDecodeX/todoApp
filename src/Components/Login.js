import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./loginReducer";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
        console.log(response);
      const user = response.data.find((userData)=>userData.name === name && userData.password === password);
        if (user) {
        console.log("Login successful");
        dispatch(setUser(user));
        // Redirect to the homepage or any other desired page
        navigate("/home", {state: {username: name}});
      } else {
        console.error("Login failed");
        // Handle login failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error, e.g., show an error message
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div id="loginCard" className="loginCard">
      <h1>Login</h1>
      <div id="inputs" className="inputs">
        <input
          placeholder="Enter your Name"
          className="nameInput"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter your Password"
          className="passwordInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button className="login" onClick={handleLogin}>
          Login
        </button>
        <button className="signup" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
