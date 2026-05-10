import { Link } from 'react-router-dom'
import { ArrowRight, Images, Utensils, Building2, Cake, Sunset } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-gold-bar"></div>
        <div className="hero-bg">
          <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
            <pattern id="g" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.8" fill="#C4A46C"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#g)"/>
          </svg>
        </div>
        <div className="hero-inner">
          <div>
            <div className="hero-label">Mumbai · PAN India · Est. 2000</div>
            <h1>
              Pure Veg Catering Crafted for <em>Unforgettable</em> Celebrations
            </h1>
            <p className="hero-description">
              From intimate house parties to grand weddings, we bring premium vegetarian 
              catering experiences to every corner of India — with 26 years of culinary excellence.
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn-gold">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Services
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">26+</div>
                <div className="hero-stat-label">Years of Mastery</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">5000+</div>
                <div className="hero-stat-label">Events Curated</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">Pure Vegetarian</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-grid">
          <div className="stat-card">
            <h3 className="stat-value">5000+</h3>
            <p className="stat-label">Events Worldwide</p>
            <p className="stat-sublabel">Across 15+ cities</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">26+</h3>
            <p className="stat-label">Years of Mastery</p>
            <p className="stat-sublabel">Since 2000</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">100%</h3>
            <p className="stat-label">Pure Vegetarian</p>
            <p className="stat-sublabel">No compromises ever</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">PAN India</h3>
            <p className="stat-label">Service Reach</p>
            <p className="stat-sublabel">Trusted nationwide</p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">Catering Services for <em>Every Occasion</em></h2>
            <div className="divider"></div>
            <p className="section-sub">
              From a 25-guest house dinner to a 5,000-person outdoor wedding — we scale, 
              plan and execute with the same passion for detail.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Utensils size={32} strokeWidth={1.5} />
              </div>
              <h3>Wedding Catering</h3>
              <p>Grand ceremonies deserve grand spreads. Multi-cuisine menus, live counters & flawless banquet service.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Building2 size={32} strokeWidth={1.5} />
              </div>
              <h3>Corporate Events</h3>
              <p>Elevate every meeting, lunch and gala with curated menus tailored to your brand's standards.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Cake size={32} strokeWidth={1.5} />
              </div>
              <h3>Birthday Parties</h3>
              <p>From intimate soirées to lavish milestone celebrations — every detail food-forward.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Sunset size={32} strokeWidth={1.5} />
              </div>
              <h3>Outdoor Catering</h3>
              <p>Curated evening spreads with premium canapés, mocktails and live stations as the sun sets.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="section-inner">
          <h2>Ready to Plan Your <em>Perfect Event?</em></h2>
          <p>Get a free consultation and custom quote within 48 hours. No commitment needed.</p>
          <Link to="/contact" className="btn-gold">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
