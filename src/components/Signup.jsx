import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Status messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);

      const response = await axios.post(
        "https://aronfungo.alwaysdata.net/api/signup",
        formData
      );

      setSuccess(response.data.success || "Signup successful! Redirecting to Signin...");

      // Clear form
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");

      // Redirect to Signin page after successful signup
      setTimeout(() => {
        navigate("/signin");
      }, 1800);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#3495d6ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="row justify-content-center w-100">
        <div
          className="col-md-6 shadow m-2 p-4"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.15)",
          }}
        >
          {/* Header */}
          <h1
            style={{
              color: "#4F46E5",
              textAlign: "center",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            Signup
          </h1>

          {/* Messages */}
          <div style={{ marginBottom: "20px", textAlign: "center", minHeight: "50px" }}>
            {success && <p style={{ color: "green", fontWeight: "600" }}>{success}</p>}
            {error && <p style={{ color: "#F43F5E", fontWeight: "600" }}>{error}</p>}
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "18px",
                border: "2px solid #eff2f7ff",
              }}
            />

            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "18px",
                border: "2px solid #eff2f7ff",
              }}
            />

            <input
              type="tel"
              placeholder="Enter phone number"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "18px",
                border: "2px solid #eff2f7ff",
              }}
            />

            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "25px",
                border: "2px solid #eff2f7ff",
              }}
            />

            {/* Signup Button */}
            <input
              type="submit"
              value={loading ? "Creating Account..." : "Signup"}
              disabled={loading}
              className="btn w-100"
              style={{
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                color: "#FFFFFF",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "16px",
              }}
            />

            {/* Signin Link */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Link
                to="/signin"
                style={{
                  color: "#F43F5E",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Already have an account? Signin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;