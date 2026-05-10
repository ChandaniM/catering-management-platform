import { Link } from 'react-router-dom'
import { Utensils, Building2, Cake, TreePine, Film, Anchor, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Wedding Catering',
    icon: Utensils,
    description: 'Your wedding deserves a feast that matches the grandeur of the occasion. From traditional thalis to pan-Indian buffets, live chaat and dessert stations.',
    features: ['Multi-cuisine live counters', 'Custom bridal menus', 'Jain-friendly options', 'Royal table setup', 'Trained banquet staff', 'Capacity: 50-5000+ guests'],
    capacity: '50 - 5000+ guests',
  },
  {
    title: 'Corporate Catering',
    icon: Building2,
    description: 'From boardroom lunches and team meetings to product launches and annual gala dinners - we deliver corporate catering that reflects your brand.',
    features: ['Working lunch setups', 'Gala dinner service', 'Health-conscious menus', 'Branded presentations', 'Punctual delivery', 'Capacity: 25-2000+ guests'],
    capacity: '25 - 2000+ guests',
  },
  {
    title: 'Birthday Parties',
    icon: Cake,
    description: 'From intimate soirees to lavish milestone celebrations - every detail food-forward with customized themes and menus.',
    features: ['Themed party menus', 'Birthday cake specials', 'Interactive food stations', 'Kids-friendly options', 'Dessert bars', 'Capacity: 25-500 guests'],
    capacity: '25 - 500 guests',
  },
  {
    title: 'Outdoor Catering',
    icon: TreePine,
    description: 'Curated evening spreads with premium canapes, mocktails and live stations perfect for garden parties and outdoor events.',
    features: ['Mobile kitchen setup', 'Weather-proof arrangements', 'BBQ and grill stations', 'Scenic presentation', 'Open-air dining', 'Capacity: 50-1000+ guests'],
    capacity: '50 - 1000+ guests',
  },
  {
    title: 'Film and Media Catering',
    icon: Film,
    description: 'Keep your cast and crew energized through long shooting days. Hygienic, delicious meal services for productions across India.',
    features: ['Bulk meal production', 'Multiple shift timings', 'On-set setup and service', 'Special dietary options', 'Hygienically packed', 'Capacity: 50-500+ crew'],
    capacity: '50 - 500+ crew',
  },
  {
    title: 'Yacht Catering',
    icon: Anchor,
    description: 'Mumbai harbour as the backdrop. Curated spreads with elegant canapes, mezze stations, and premium live cooking for floating soirees.',
    features: ['Canape and mezze spreads', 'Live cooking stations', 'Maritime-safe packaging', 'White-glove service', 'Mocktail pairings', 'Capacity: 25-150 guests'],
    capacity: '25 - 150 guests',
  },
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <p className="hero-eyebrow">Our Services</p>
        <h1 className="hero-title">Curated Catering for <em>Every Occasion</em></h1>
        <p className="hero-description">
          From intimate gatherings to grand celebrations, we offer comprehensive catering solutions 
          tailored to make every occasion extraordinary.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-detail">
        <div className="section-inner">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="service-detail-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                  <div className="service-icon" style={{ fontSize: '3rem' }}>
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <div className="service-detail-content" style={{ flex: 1 }}>
                    <h2>{service.title}</h2>
                    <p className="service-detail-desc">{service.description}</p>
                    <div className="service-features">
                      <h4>Features & Specialties:</h4>
                      <ul>
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem' }}>
                      Enquire Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="section-inner">
          <h2>Don't See Your Event Type? <em>Let's Talk.</em></h2>
          <p>We cater every kind of occasion — just reach out and we'll customise a package for you.</p>
          <Link to="/contact" className="btn-gold">
            Get a Custom Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
