import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Star, Quote } from 'lucide-react'
import axios from 'axios'
import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { parseJson } from '../lib/parseJson'
import { useRefetchOnFocus } from '../lib/useRefetchOnFocus'
import { API_URL } from '../apiConfig'

interface Testimonial {
  id: number
  name: string
  event?: string
  content: string
  rating: number
  image?: string
  active: boolean
}

type HeroStat = { number: string; label: string }

type TestimonialsHero = {
  label?: string
  titleBefore?: string
  titleEmphasis?: string
  description?: string
  stats?: HeroStat[]
}

type Mid = { title?: string; subtitle?: string }

type Cta = {
  badge?: string
  titleBefore?: string
  titleEmphasis?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

const DEFAULT_HERO: TestimonialsHero = {
  label: 'Client Stories',
  titleBefore: 'Voices of ',
  titleEmphasis: 'Excellence',
  description:
    'Over 26 years of culinary artistry, creating memories that last a lifetime. Discover why discerning clients trust us with their most precious moments.',
  stats: [
    { number: '26+', label: 'Years of Excellence' },
    { number: '5000+', label: 'Events Catered' },
    { number: '100%', label: 'Client Satisfaction' },
  ],
}

const DEFAULT_MID: Mid = {
  title: 'What Makes Us Different',
  subtitle:
    'Every testimonial represents a relationship built on trust, quality, and exceptional service',
}

const DEFAULT_CTA: Cta = {
  badge: 'Join Our Story',
  titleBefore: 'Your Success Story ',
  titleEmphasis: 'Begins Here',
  description:
    'Join our distinguished family of satisfied clients who have experienced the perfect blend of culinary excellence and impeccable service',
  primaryLabel: 'Start Your Journey',
  primaryHref: '/contact',
  secondaryLabel: 'View Our Portfolio',
  secondaryHref: '/gallery',
}

export default function Testimonials() {
  const { settings, loading: settingsLoading } = useSiteSettings()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [listLoading, setListLoading] = useState(true)

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get<Testimonial[]>(`${API_URL}/testimonials/active`, {
        params: { _t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      })
      setTestimonials(response.data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setListLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchList()
  }, [fetchList])

  useRefetchOnFocus(fetchList, { pollMs: 12_000 })

  const hero = useMemo(() => {
    const raw = parseJson<Partial<TestimonialsHero>>(settings.testimonials_hero_json, {})
    return {
      ...DEFAULT_HERO,
      ...raw,
      stats: raw.stats && raw.stats.length > 0 ? raw.stats : DEFAULT_HERO.stats,
    }
  }, [settings.testimonials_hero_json])

  const mid = useMemo(
    () => ({ ...DEFAULT_MID, ...parseJson<Partial<Mid>>(settings.testimonials_mid_json, {}) }),
    [settings.testimonials_mid_json],
  )

  const cta = useMemo(
    () => ({ ...DEFAULT_CTA, ...parseJson<Partial<Cta>>(settings.testimonials_cta_json, {}) }),
    [settings.testimonials_cta_json],
  )

  if ((settingsLoading && Object.keys(settings).length === 0) || listLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  const statsRow = hero.stats?.length ? hero.stats : DEFAULT_HERO.stats!

  return (
    <>
      <section className="testimonials-hero-luxury">
        <div className="testimonials-hero-bg"></div>
        <div className="container">
          <div className="testimonials-hero-content">
            <div className="decorative-accent"></div>
            <p className="testimonials-label-luxury">{hero.label}</p>
            <h1 className="testimonials-title-luxury">
              {hero.titleBefore}
              <em>{hero.titleEmphasis}</em>
            </h1>
            <p className="testimonials-description-luxury">{hero.description}</p>
            <div className="testimonials-stats-luxury">
              {statsRow.flatMap((s, i) => [
                i > 0 ? <div key={`div-${i}`} className="stat-divider" /> : null,
                <div key={s.label} className="stat-item-luxury">
                  <span className="stat-number">{s.number}</span>
                  <span className="stat-label">{s.label}</span>
                </div>,
              ])}
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section-luxury">
        <div className="container">
          <div className="section-intro-luxury">
            <h2>{mid.title}</h2>
            <p>{mid.subtitle}</p>
          </div>

          <div className="testimonials-grid-luxury">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id ?? index} className="testimonial-card-luxury">
                <div className="card-top-accent"></div>
                <div className="testimonial-quote-luxury">
                  <Quote size={40} strokeWidth={1} />
                </div>
                <div className="testimonial-rating-luxury">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="var(--color-gold)"
                      stroke="var(--color-gold)"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <p className="testimonial-text-luxury">{testimonial.content}</p>
                <div className="testimonial-author-luxury">
                  <div className="author-avatar-luxury">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                      />
                    ) : (
                      <span>{testimonial.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="author-info-luxury">
                    <h4 className="author-name-luxury">{testimonial.name}</h4>
                    <p className="author-event-luxury">{testimonial.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-cta-luxury">
        <div className="cta-overlay-pattern"></div>
        <div className="container">
          <div className="cta-content-center">
            <div className="cta-badge">{cta.badge}</div>
            <h2 className="cta-title-luxury">
              {cta.titleBefore}
              <em>{cta.titleEmphasis}</em>
            </h2>
            <p className="cta-description-luxury">{cta.description}</p>
            <div className="cta-buttons">
              {cta.primaryHref?.startsWith('/') ? (
                <Link to={cta.primaryHref} className="btn-cta-primary-luxury">
                  {cta.primaryLabel}
                </Link>
              ) : (
                <a href={cta.primaryHref || '/contact'} className="btn-cta-primary-luxury">
                  {cta.primaryLabel}
                </a>
              )}
              {cta.secondaryHref?.startsWith('/') ? (
                <Link to={cta.secondaryHref} className="btn-cta-secondary-luxury">
                  {cta.secondaryLabel}
                </Link>
              ) : (
                <a href={cta.secondaryHref || '/gallery'} className="btn-cta-secondary-luxury">
                  {cta.secondaryLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
