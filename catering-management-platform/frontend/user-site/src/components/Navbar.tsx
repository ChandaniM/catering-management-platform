import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          <span className="brand-name">Saffron <span className="gold">&</span> Sage</span>
          <span className="brand-tagline">Pure Veg Catering · Est. 2000</span>
        </Link>
            <div className="nav-links">
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
              <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
              <Link to="/testimonials" className={location.pathname === '/testimonials' ? 'active' : ''}>Testimonials</Link>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
              <Link to="/contact" className="btn-primary">Get a Quote</Link>
            </div>
      </div>
    </nav>
  )
}
