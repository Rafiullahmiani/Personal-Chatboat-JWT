import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

  async function loginUser(email, password) {
    try {
      const res = await axios.post("http://localhost:5050/login", {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log("Login success token:", token);

       navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        console.error("Login failed:", err.response.data.err);
      } else {
        console.error("Network erroe:", err.message);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await loginUser(email, password);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center min-h-screen gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-64"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      
    </div>
  );
}

export default LoginForm;
