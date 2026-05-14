import { Link } from 'react-router-dom'
import { useSiteSettings } from '../contexts/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const email = settings.contact_email || 'catering.services@gmail.com'
  const phone = settings.contact_phone || '+91 99999 99999'
  const location = settings.contact_location || 'Sion, Mumbai'
  const blurb =
    settings.contact_footer_blurb ||
    '26 years of crafting unforgettable vegetarian catering experiences across India. From weddings to corporate galas — we bring passion to every plate.'

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>
            Saffron <span className="gold">&</span> Sage
          </h3>
          <p
            style={{
              fontSize: '0.6rem',
              color: 'rgba(201, 168, 76, 0.5)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Pure Veg Catering · Mumbai · Est. 2000
          </p>
          <p style={{ marginTop: '1rem' }}>{blurb}</p>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <Link to="/services">Wedding Catering</Link>
          <Link to="/services">Corporate Events</Link>
          <Link to="/services">Birthday Parties</Link>
          <Link to="/services">Outdoor Catering</Link>
          <Link to="/services">Film Catering</Link>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{location}</p>
          <p>Serving PAN India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Saffron & Sage Pure Veg Catering. All rights reserved. Mumbai, India.</p>
      </div>
    </footer>
  )
}
