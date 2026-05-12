import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const loginAdmin = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/admin_signin",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (data.success) {

        // Save admin session
        localStorage.setItem("admin", JSON.stringify(data.admin));

        setMessage("Login successful");

        // Navigate to reservation page
        navigate("/bus-reservation");

      } else {

        setMessage("Invalid admin credentials");

      }

    } catch (error) {

      console.log(error);

      setMessage("Server error");

    }

  };

  return (
    <div
      style={{
        width: "400px",
        margin: "100px auto",
        padding: "30px",
        boxShadow: "0px 0px 10px gray",
        borderRadius: "10px"
      }}
    >

      <h2>Admin Login</h2>

      <form onSubmit={loginAdmin}>

        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100">
          Login
        </button>

      </form>

      <p style={{ marginTop: "20px", color: "red" }}>
        {message}
      </p>

    </div>
  );
}

export default AdminLogin;