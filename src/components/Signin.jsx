import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const Signin = () => {
//  state variables
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  // status messages
  const[loading,setLoading] = useState("")
  const[success,setSuccess] = useState("")
  const[error,setError] = useState("")

  // navigation
  // const Navigate = useNavigate();


  // function signin
  const handleSignin = async(e) =>{
    e.preventDefault()
    setLoading("please wait....")
    try{
      // fetching user details
      const formData = new FormData();
      formData.append("email",email);
      formData.append("password",password)

      // adding base url
      const response = await axios.post("https://aronfungo.alwaysdata.net/api/signin",formData);

     if (response.data.user){
      setSuccess(response.data.message)

      // saving user in local storage
      localStorage.setItem("user",JSON.stringify(response.data.user))

      window.location.href = "/"
      setLoading("")
     }else{
      setError(error.message)
     }
    }catch(error){
      setError(error.message)
    }
  }


 return (
  <div
    className="row justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      backgroundColor: "#3495d6ff",
    }}
  >
    <div
      className="col-md-5 shadow"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(79, 70, 229, 0.15)",
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
        Signin
      </h1>

      {/* Messages */}
      <div
        style={{
          color: "#111827",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        
        
        <span style={{ color: "green" }}>{success}</span> <br />
        <span style={{ color: "#F43F5E" }}>{error}</span> <br />
        <span style={{ color: "#8B5CF6" }}>{loading && "Loading..."}</span>
      </div>

      {/* Signin Form */}
      <form onSubmit={handleSignin}>
        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: "2px solid #eff2f7ff",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "20px",
            color: "#111827",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            border: "2px solid #E5E7EB",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "25px",
            color: "#111827",
          }}
        />

        {/* Button */}
        <input
          type="submit"
          value={loading ? "Logging in..." : "Signin"}
          disabled={loading}
          className="btn w-100"
          style={{
            background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
            color: "#FFFFFF",
            border: "none",
            padding: "12px",
            borderRadius: "12px",
            fontWeight: "600",
            transition: "0.3s ease",
          }}
        />

        {/* Signup Link */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            to="/signup"
            style={{
              color: "#F43F5E",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Don't have an account? Signup
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
}



export default Signin