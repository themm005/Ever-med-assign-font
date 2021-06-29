import "./login.css";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {AuthContext} from '../../context/AuthContextProvider'
import axios from '../../config/axios'
import localStorageService from '../../service/localStorageService'
import jwtDecode from "jwt-decode";


export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { setUser }   = useContext(AuthContext)
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      console.log('a')
      e.preventDefault();
      const res = await axios.post("/user/login", { username, password });
      localStorageService.setToken(res.data.token);
      const payload = jwtDecode(res.data.token);
      setUser(payload);
      history.push('/home')
    } catch (err) {
      if (err.response) {
        setError({ server: err.response.data.message });
      } 
    }
}
  return (
    <div className="login">
      <span style={{ fontSize: "30px", justifyContent: "flex-start" }}>
        Login
      </span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="InputlogIn"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="InputlogIn"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {error ? (
          <div style={{ fontSize: "12px", color: "red", margin: "0 auto" }}>
            {error.server}
          </div>
        ) : null}
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  );
}
