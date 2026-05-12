import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer_backround">
      <div className="container py-4">
        <div className="row">

          {/* Brand / About */}
          <div className="col-md-4 mb-3">
            <h5 className="text-light text-decoration-none">Elite Booking services</h5>
            <p className="small text-light text-decoration-none">
             guaranted depatures  and real time tracking
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-light text-decoration-none">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/location" className="text-light text-decoration-none">Location</a></li>
              <li><a href="/products" className="text-light text-decoration-none">buses</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h5 className="text-light text-decoration-none">Contact</h5>
            <p className="small mb-1 text-light text-decoration-none">Email: support@Elitebooking.com</p>
            <p className="small mb-1 text-light text-decoration-none">Phone: +123 456 789</p>
            <p className="small text-light text-decoration-none">Location: Nairobi</p>
          </div>

        </div>
      </div>


      {/* Bottom Bar */}
      <div className="bg-secondary text-center py-2">
        <small>© {new Date().getFullYear()} Elite booking services. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer