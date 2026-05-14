import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './SeatSelector.css';
// import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const SeatSelector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState(null);
  
  
  
  const fetchSeats = async () => {
    try {
      const productId = product.product_id || product.id;
      const response = await axios.get(`https://aronfungo.alwaysdata.net/api/get_bus_seats/${productId}`);
      setSeats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching seats:', err);
      setError('Failed to load seats');
      setLoading(false);
    }
  };
  
  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;
    
    const isSelected = selectedSeats.find(s => s.seat_id === seat.seat_id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.seat_id !== seat.seat_id));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can only book up to 6 seats per transaction');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    if (!isLoggedIn) {
      alert('Please login first to complete booking');
      navigate('/signin', { 
        state: { 
          redirectTo: '/select-seats',
          product: product 
        } 
      });
      return;
    }
    
    // Navigate to M-PESA payment page with booking details
    navigate('//makepayment', {
      state: {
        product: product,
        calculatedTotal: selectedSeats.length * parseFloat(product?.product_cost || 0)
      }
    });
  };
  useEffect(() => {
    if (!product) {
      navigate('/getproduct');
      return;
    }
    fetchSeats();
    
    // Check login status
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (storedUser || token || storedUsername) {
      setIsLoggedIn(true);
      try {
        const user = storedUser ? JSON.parse(storedUser) : { username: storedUsername };
        // setUserData(user);
        setUsername(user.username || storedUsername);
      } catch (e) {
        setUsername(storedUsername);
      }
    }
  }, [product]);
  
  const getSeatColor = (seat) => {
    if (seat.status === 'booked') return 'seat booked';
    if (selectedSeats.find(s => s.seat_id === seat.seat_id)) return 'seat selected';
    return 'seat available';
  };
  
  const totalAmount = selectedSeats.length * parseFloat(product?.product_cost || 0);
  
  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="text-muted">Loading seats...</h5>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-danger text-center shadow-sm">{error}</div>
          <div className="text-center">
            <button className="btn btn-primary btn-lg px-4" onClick={() => navigate('/getproduct')}>
              ← Back to Buses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => navigate('/getproduct')}>
                    Buses
                  </button>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Select Seats
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row g-4">
          {/* Bus Layout Section */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-gradient bg-primary text-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-bus-front me-2"></i>
                  Select Your Seats {username && <span className="text-warning">({username})</span>}
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="bus-layout">
                  <div className="bus-front text-center py-3 rounded-3 mb-4 shadow-sm">
                    <h5 className="mb-0">
                      <span className="fs-3">🚌</span> BUS FRONT
                    </h5>
                  </div>
                  
                  <div className="seats-grid mb-4">
                    {seats.map((seat) => (
                      <div
                        key={seat.seat_id}
                        className={getSeatColor(seat)}
                        onClick={() => handleSeatClick(seat)}
                        title={`Seat ${seat.seat_number} - ${seat.status === 'booked' ? 'Already Booked' : 'Click to select'}`}
                      >
                        <span className="seat-number fw-bold">{seat.seat_number}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bus-back text-center py-3 rounded-3 shadow-sm">
                    <h5 className="mb-0">BUS BACK</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Summary Section */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: '20px' }}>
              {/* Booking Summary Card */}
              <div className="card shadow-sm border-0 rounded-4 mb-4">
                <div className="card-header bg-gradient bg-success text-white py-3">
                  <h5 className="mb-0">
                    <i className="bi bi-receipt me-2"></i>
                    Booking Summary
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="mb-3 pb-2 border-bottom">
                    <h6 className="text-primary mb-1">{product.product_name}</h6>
                    <small className="text-muted">{product.product_description}</small>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="mb-3">
                      <i className="bi bi-chair me-2"></i>
                      Selected Seats:
                    </h6>
                    {selectedSeats.length > 0 ? (
                      <>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {selectedSeats.map(seat => (
                            <div key={seat.seat_id} className="badge bg-warning text-dark p-2 d-inline-flex align-items-center">
                              <span className="fw-bold me-2">Seat {seat.seat_number}</span>
                              <button 
                                className="btn btn-sm p-0 text-dark"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSeats(selectedSeats.filter(s => s.seat_id !== seat.seat_id));
                                }}
                                style={{ width: '20px', height: '20px', lineHeight: '1' }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <hr />
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Price per seat:</span>
                            <span className="fw-semibold">KES {parseFloat(product.product_cost).toLocaleString()}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Number of seats:</span>
                            <span className="fw-semibold">{selectedSeats.length}</span>
                          </div>
                          <div className="d-flex justify-content-between pt-2 border-top mt-2">
                            <span className="h6 mb-0">Total Amount:</span>
                            <span className="h5 text-success mb-0 fw-bold">
                              KES {totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <i className="bi bi-chair fs-1 text-muted"></i>
                        <p className="text-muted mt-2 mb-0">No seats selected</p>
                        <small className="text-muted">Click on available seats above</small>
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="btn btn-success w-100 py-2 fw-bold mb-2"
                    onClick={handleProceedToPayment}
                    disabled={selectedSeats.length === 0}
                  >
                    <i className="bi bi-lock me-2"></i>
                    Continue to Payment ({selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''})
                  </button>
                  
                  <button
                    className="btn btn-outline-secondary w-100 py-2"
                    onClick={() => navigate('/getproduct')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Buses
                  </button>
                </div>
              </div>
              
              {/* Seat Legend Card */}
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-gradient bg-secondary text-white py-3">
                  <h6 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Seat Legend
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-around">
                    <div className="text-center">
                      <div className="seat available-small mx-auto mb-2"></div>
                      <small className="text-muted">Available</small>
                    </div>
                    <div className="text-center">
                      <div className="seat selected-small mx-auto mb-2"></div>
                      <small className="text-muted">Selected</small>
                    </div>
                    <div className="text-center">
                      <div className="seat booked-small mx-auto mb-2"></div>
                      <small className="text-muted">Booked</small>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Info Card */}
              <div className="card mt-3 bg-info bg-opacity-10 border-0 rounded-4">
                <div className="card-body">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    You can select up to 6 seats per transaction. Click on any available seat to select or deselect.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;