import bus1 from '../components/images/bus1.png'
import bus9 from '../components/images/bus9.webp'
import bus7 from '../components/images/bus7.webp'
import bus8 from '../components/images/bus8.webp'

const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide row justify-content-center" data-bs-ride="carousel">
      
      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3"></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bus1} className="d-block w-500px" height="400px" width="1500px" alt="slide 1" />
        </div>
        <div className="carousel-item">
          <img src={bus9} className="d-block w-500px" height="400px"  width="1500px" alt="slide 2" />
        </div>
        <div className="carousel-item">
          <img src={bus7} className="d-block w-500px" height="400px"  width="1500px"alt="slide 3" />
        </div>
         <div className="carousel-item">
          <img src={bus8} className="d-block w-500px" height="400px" width="1500px" alt="slide 3" />
        </div>
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon "></span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>
  )
}

export default Carousel