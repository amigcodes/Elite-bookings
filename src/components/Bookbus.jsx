import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chatbot from "./Chatbot";
import Carousel from './Carousel';
import Navbar from './Navbar';

const Getproduct = () => {
  const [products, setproduct] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("")
  const [visiblecount, setVisibleCount] = useState(6)

  const img_url = "https://aronfungo.alwaysdata.net/static/images/"

  const filtered_products = products.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()) ||
    item.product_description.toLowerCase().includes(search.toLowerCase())
  )

  const navigate = useNavigate()
  
  const getproduct = async () => {
    setLoading("please wait we are finding the buses available...")
    try {
      const response = await axios.get("https://aronfungo.alwaysdata.net/api/get_product_details")
      setproduct(response.data)
      console.log(response.data)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }
  
  useEffect(() => {
    getproduct()
  }, []);
  
  return (
    <div className='row'>
      <Navbar/>
      <Carousel/>
      <h3>Buses available for booking</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search buses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {loading && <div className="alert alert-info">{loading}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <Chatbot/>
      
      {filtered_products.slice(0, visiblecount).map((product) => (
        <div className='col-md-3 justify-content-center mb-4' width="50%" height="60%" key={product.id}>
          <div className='card shadow card-margin'>
            <img className='mt-4 product_img' src={img_url + product.product_photo} alt={product.product_photo}/>
            <div className='card-body'>
              <h5 className='mt-2'>{product.product_name}</h5>
              <p className='text-muted'>{product.product_description}</p>
              <b className='text-warning'>{product.product_cost} sh</b><br />
              <b className="text-success">
                Seats Available: {product.available_seats || 0}
              </b>
              <p className="text-muted">
                Booked: {product.booked_seats || 0} / {product.total_seats || 0}
              </p>
              <button 
                className='btn btn-dark mt-2 w-100' 
                onClick={() => navigate("/select-seats", { state: { product } })}
              >
                Select Seats
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center mt-3">
        {visiblecount < filtered_products.length && (
          <button className="btn btn-danger" onClick={() => setVisibleCount(visiblecount + 3)}>
            load more
          </button>
        )}
      </div>
    </div>
  )
}

export default Getproduct