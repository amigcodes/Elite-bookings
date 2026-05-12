import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";
import Navbar from "./Navbar";

const Busreservation = () => {

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);
  const [total_seats, setTotalSeats] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Please wait...");
    setError("");
    setSuccess("");

    try {

      const formData = new FormData();

      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);
      formData.append("total_seats", total_seats);
      formData.append("location", location);
      

      const response = await axios.post(
        "https://aronfungo.alwaysdata.net/api/add_product",
        formData
      );

      setSuccess(response.data.success);

      // clear form
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);
      setTotalSeats("");

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }

    setLoading("");
  };

  return (
  <div
    className="row justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      backgroundColor: "#0f4b8fff", // Soft Gray
      padding: "20px",
    }}
  >
    <Navbar/>
    <div
      className="col-md-6 shadow p-4 mt-3"
      style={{
        backgroundColor: "#FFFFFF", // Card Background White
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(79, 70, 229, 0.15)",
      }}
    >
      {/* Heading */}
      <h2
        className="text-center mb-4"
        style={{
          color: "#4F46E5", // Indigo
          fontWeight: "700",
        }}
      >
        Bus Booking Panel
      </h2>

      {/* Alerts */}
      {loading && (
        <div
          className="alert"
          style={{
            backgroundColor: "#EEF2FF",
            color: "#4F46E5",
            borderRadius: "10px",
          }}
        >
          {loading}
        </div>
      )}

      {error && (
        <div
          className="alert"
          style={{
            backgroundColor: "#FFE4E6",
            color: "#F43F5E",
            border: "1px solid #F43F5E",
            borderRadius: "10px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="alert"
          style={{
            backgroundColor: "#DCFCE7",
            color: "#166534",
            borderRadius: "10px",
          }}
        >
          {success}
        </div>
      )}

      {/* Chatbot */}
      <div className="mb-4">
        <Chatbot />
      </div>

      {/* Navigation */}
      <nav className="mb-4 text-center">
        <Link
          to="/"
          className="btn"
          style={{
            background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
            color: "#FFFFFF",
            padding: "10px 24px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
         
        </Link>
      </nav>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Bus Type */}
        <input
          type="text"
          placeholder="Enter Bus Type"
          className="form-control"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={{
          
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "18px",
            color: "#111827",
          }}
        />
      {/* Choose Location */}
<input
  type="text"
  placeholder="Choose your location"
  className="form-control"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  style={{
    
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "18px",
    color: "#111827",
    backgroundColor: "#F9FAFB",
  }}
/>

        {/* Description */}
        <textarea
          placeholder="Describe the bus"
          className="form-control"
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}
          style={{
        
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "18px",
            color: "#111827",
            minHeight: "120px",
          }}
        ></textarea>

        {/* Booking Cost */}
        <input
          type="number"
          placeholder="Booking Cost"
          className="form-control"
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}
          required
          style={{
          
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "18px",
            color: "#111827",
          }}
        />

        {/* Total Seats */}
        <input
          type="number"
          placeholder="Total Seats"
          className="form-control"
          value={total_seats}
          onChange={(e) => setTotalSeats(e.target.value)}
          required
          style={{
           
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "18px",
            color: "#111827",
          }}
        />

        {/* File Upload */}
        <input
          type="file"
          className="form-control"
          onChange={(e) => setProductPhoto(e.target.files[0])}
          required
          style={{
           
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "25px",
            backgroundColor: "#F9FAFB",
            color: "#111827",
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-100"
          style={{
            background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
            color: "#FFFFFF",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
         BOOK SEATS
        </button>

      </form>
    </div>
  </div>
);
};

export default Busreservation;