import { useState, useMemo, type FormEvent } from 'react'
import axios from 'axios'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { parseJson } from '../lib/parseJson'
import { API_URL } from '../apiConfig'

type ContactPageJson = {
  hero?: {
    eyebrow?: string
    titleBefore?: string
    titleEmphasis?: string
    titleAfter?: string
    description?: string
  }
  connect?: { title?: string; subtitle?: string }
  form?: { title?: string; subtitle?: string }
}

const DEFAULT_PAGE: ContactPageJson = {
  hero: {
    eyebrow: 'Begin Your Journey',
    titleBefore: "Let's Create ",
    titleEmphasis: 'Magic',
    titleAfter: ' Together',
    description:
      "Share your vision with us, and we'll craft an unforgettable culinary experience that exceeds every expectation",
  },
  connect: {
    title: 'Connect With Us',
    subtitle:
      'Our dedicated team is ready to bring your vision to life. Reach out through any channel that suits you best.',
  },
  form: {
    title: 'Share Your Vision',
    subtitle: "Tell us about your event, and we'll design a bespoke experience",
  },
}

export default function Contact() {
  const { settings, loading } = useSiteSettings()
  const page = useMemo(() => {
    const raw = parseJson<Partial<ContactPageJson>>(settings.contact_page_json, {})
    return {
      hero: { ...DEFAULT_PAGE.hero, ...raw.hero },
      connect: { ...DEFAULT_PAGE.connect, ...raw.connect },
      form: { ...DEFAULT_PAGE.form, ...raw.form },
    }
  }, [settings.contact_page_json])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const location = settings.contact_location || 'Sion, Mumbai, Maharashtra'
  const phone = settings.contact_phone || '+91 99999 99999'
  const email = settings.contact_email || 'catering.services@gmail.com'
  const hours = settings.contact_hours || 'Available daily, 9:00 AM – 9:00 PM'
  const wa = (settings.contact_whatsapp || '919999999999').replace(/\D/g, '')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await axios.post(`${API_URL}/inquiries`, formData)
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        message: '',
      })

      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (loading && Object.keys(settings).length === 0) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  const h = page.hero || DEFAULT_PAGE.hero

  return (
    <>
      <section className="contact-hero-luxury">
        <div className="hero-overlay-pattern"></div>
        <div className="container">
          <div className="hero-content-center">
            <div className="decorative-line-top"></div>
            <p className="hero-eyebrow-luxury">{h.eyebrow}</p>
            <h1 className="hero-title-luxury">
              {h.titleBefore}
              <em>{h.titleEmphasis}</em>
              {h.titleAfter}
            </h1>
            <p className="hero-description-luxury">{h.description}</p>
            <div className="decorative-line-bottom"></div>
          </div>
        </div>
      </section>

      <section className="contact-section-luxury">
        <div className="container-luxury">
          <div className="contact-grid-luxury">
            <div className="contact-info-luxury">
              <div className="info-card-header">
                <h2>{page.connect?.title}</h2>
                <p className="info-subtitle">{page.connect?.subtitle}</p>
              </div>

              <div className="contact-methods">
                <div className="contact-item-luxury">
                  <div className="contact-icon-luxury">
                    <div className="icon-inner">
                      <MapPin size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="contact-details">
                    <h4>Our Location</h4>
                    <p className="detail-primary">{location}</p>
                    <p className="detail-secondary">Serving across India with excellence</p>
                  </div>
                </div>

                <div className="contact-item-luxury">
                  <div className="contact-icon-luxury">
                    <div className="icon-inner">
                      <Phone size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="contact-details">
                    <h4>Phone & WhatsApp</h4>
                    <p className="detail-primary">{phone}</p>
                    <p className="detail-secondary">{hours}</p>
                  </div>
                </div>

                <div className="contact-item-luxury">
                  <div className="contact-icon-luxury">
                    <div className="icon-inner">
                      <Mail size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="contact-details">
                    <h4>Email Address</h4>
                    <p className="detail-primary">{email}</p>
                    <p className="detail-secondary">We respond within 48 hours</p>
                  </div>
                </div>

                <div className="contact-item-luxury">
                  <div className="contact-icon-luxury">
                    <div className="icon-inner">
                      <Clock size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="contact-details">
                    <h4>Response Commitment</h4>
                    <p className="detail-primary">48-Hour Guarantee</p>
                    <p className="detail-secondary">Personalized consultation for every inquiry</p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta-luxury"
              >
                <MessageCircle size={20} strokeWidth={2} />
                <span>Start a Conversation on WhatsApp</span>
              </a>
            </div>

            <div className="contact-form-luxury-wrapper">
              <div className="form-header-luxury">
                <h2>{page.form?.title}</h2>
                <p>{page.form?.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form-luxury">
                <div className="form-group-luxury">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="input-luxury"
                  />
                </div>

                <div className="form-row-luxury">
                  <div className="form-group-luxury">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="input-luxury"
                    />
                  </div>

                  <div className="form-group-luxury">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 9999999999"
                      className="input-luxury"
                    />
                  </div>
                </div>

                <div className="form-row-luxury">
                  <div className="form-group-luxury">
                    <label htmlFor="eventType">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="input-luxury select-luxury"
                    >
                      <option value="">Choose your event type</option>
                      <option value="wedding">Wedding Celebration</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="outdoor">Outdoor Event</option>
                      <option value="other">Other Special Event</option>
                    </select>
                  </div>

                  <div className="form-group-luxury">
                    <label htmlFor="guestCount">Expected Guests</label>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      placeholder="Approximate count"
                      className="input-luxury"
                    />
                  </div>
                </div>

                <div className="form-group-luxury">
                  <label htmlFor="eventDate">Preferred Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="input-luxury"
                  />
                </div>

                <div className="form-group-luxury">
                  <label htmlFor="message">Your Vision</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Share your ideas, preferences, and any special requirements..."
                    className="input-luxury textarea-luxury"
                  />
                </div>

                <button type="submit" className="btn-submit-luxury" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <span className="spinner"></span>
                      Sending Your Inquiry...
                    </>
                  ) : (
                    'Submit Inquiry'
                  )}
                </button>

                {status === 'success' && (
                  <div className="form-message-luxury success">
                    <div className="message-icon">✓</div>
                    <div>
                      <h4>Thank You!</h4>
                      <p>
                        We&apos;ve received your inquiry and will respond within 24 hours with a personalized
                        consultation.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="form-message-luxury error">
                    <div className="message-icon">✗</div>
                    <div>
                      <h4>Submission Failed</h4>
                      <p>
                        We couldn&apos;t process your request. Please try again or contact us directly via phone or
                        email.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
