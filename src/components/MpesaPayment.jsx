import React, { useEffect, useState } from 'react'
import image from '../logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const MpesaPayment = () => {
  // declaring state variables
  const location = useLocation();
  const navigate = useNavigate();
  const { product,calculatedTotal } = location.state || {};

  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  
  // status messages 
  const [Loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // image url
  const img_url = "https://aronfungo.alwaysdata.net/static/images/"

  // Redirect if no product data
  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);



  // function to make payment
  const handlesubmit = async (e) => {
    e.preventDefault()
    
    // Validate phone number
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number (e.g., 0712345678)");
      return;
    }

    setLoading("Please wait as we process the transaction...")
    setError("")
    setSuccess("")
    
    try {
      // First, process MPESA payment
      const formData = new FormData();
      formData.append("phone", phone)
      formData.append("amount", calculatedTotal)
     

      // Make payment request
      const paymentResponse = await axios.post("https://modcom2026.alwaysdata.net/api/mpesa_payment", formData)
      
      if (paymentResponse.data.success || paymentResponse.data.message) {
        setSuccess(paymentResponse.data.message)
        
        // Clear loading and redirect to success page after 2 seconds
        setTimeout(() => {
          setLoading("")
          navigate('/');
        }, 2000);
      } else {
        setError(paymentResponse.data.message || "Payment failed. Please try again.");
        setLoading("");
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.response?.data?.message || error.message || "Payment processing failed. Please try again.");
      setLoading("");
    }
  }

  // Function to handle retry
  const handleRetry = () => {
    setError("");
    setSuccess("");
    setPhone("");
    setEmail("");
  }

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card shadow'>
            <div className='card-header bg-primary text-white'>
              <h3 className='mb-0'>Complete Your Booking</h3>
            </div>
            
            <div className='card-body'>
              {/* Loading, Success, Error Messages */}
              {Loading && (
                <div className='alert alert-info text-center'>
                  <div className='spinner-border spinner-border-sm me-2' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                  {Loading}
                </div>
              )}
              
              {success && (
                <div className='alert alert-success'>
                  <strong>Success!</strong> {success}
                  <div className='mt-2'>
                    <div className='spinner-border spinner-border-sm text-success me-2' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                    Redirecting to confirmation...
                  </div>
                </div>
              )}
              
              {error && (
                <div className='alert alert-danger'>
                  <strong>Error!</strong> {error}
                  <button className='btn btn-sm btn-outline-danger ms-3' onClick={handleRetry}>
                    Try Again
                  </button>
                </div>
              )}

              {/* Booking Summary */}
              <div className='booking-summary mb-4 p-3 bg-light rounded'>
                <h4>Booking Summary</h4>
                <div className='row'>
                  <div className='col-md-6'>
                    <img 
                      src={img_url + product?.product_photo} 
                      alt={product?.product_name}
                      className='img-fluid rounded mb-3'
                      style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className='col-md-6'>
                    <h5>{product?.product_name}</h5>
                    <p className='text-muted'>{product?.product_description}</p>
                    <hr />
                   
                    <h5 className='text-success'>Total Amount: KES {calculatedTotal}</h5>
                    
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className='payment-form'>
                <h4 className='mb-3'>LIPA NA MPESA</h4>
                <p className='text-muted'>Enter your MPESA registered phone number to receive payment prompt</p>
                
                <form onSubmit={handlesubmit}>
                  <div className='mb-3'>
                    <label className='form-label'>Phone Number</label>
                    <div className='input-group'>
                      <span className='input-group-text'>+254</span>
                      <input
                        type='tel'
                        placeholder='712345678'
                        className='form-control'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={Loading !== ""}
                      />
                    </div>
                    <small className='text-muted'>Example: 712345678 (without 0 or +254)</small>
                  </div>

                  

                  
                  <button 
                    type='submit' 
                    className='btn btn-success w-100'
                    disabled={Loading !== "" || !phone}
                  >
                    {Loading ? "Processing..." : `Pay KES ${calculatedTotal} via MPESA`}
                  </button>
                  
                  <button 
                    type='button'
                    className='btn btn-secondary w-100 mt-2'
                    onClick={() => navigate(-1)}
                    disabled={Loading !== ""}
                  >
                    Back to Seat Selection
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MpesaPayment