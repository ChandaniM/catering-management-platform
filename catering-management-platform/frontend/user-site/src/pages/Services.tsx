import { useState, useEffect, useCallback, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { Utensils, Building2, Cake, TreePine, Film, Anchor, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { parseJson } from '../lib/parseJson'
import { useRefetchOnFocus } from '../lib/useRefetchOnFocus'
import { API_URL } from '../apiConfig'

interface Service {
  id: number
  title: string
  description: string
  icon?: string
  features: string
  capacity?: string
  active: boolean
}

const iconMap: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  '💒': Utensils,
  '🏢': Building2,
  '🎂': Cake,
  '🌳': TreePine,
  '🎬': Film,
  '⚓': Anchor,
}

type ServicesHero = {
  eyebrow?: string
  titleBefore?: string
  titleEmphasis?: string
  sub?: string
}

type ServicesCta = {
  titleBefore?: string
  titleEmphasis?: string
  description?: string
  buttonText?: string
}

const DEFAULT_HERO: ServicesHero = {
  eyebrow: 'Our Services',
  titleBefore: 'Curated Catering for ',
  titleEmphasis: 'Every Occasion',
  sub: 'From intimate gatherings to grand celebrations, we offer comprehensive catering solutions tailored to make every occasion extraordinary.',
}

const DEFAULT_CTA: ServicesCta = {
  titleBefore: "Don't See Your Event Type? ",
  titleEmphasis: "Let's Talk.",
  description:
    "We cater every kind of occasion — just reach out and we'll customise a package for you.",
  buttonText: 'Get a Custom Quote',
}

export default function Services() {
  const { settings, loading: settingsLoading } = useSiteSettings()
  const [services, setServices] = useState<Service[]>([])
  const [servicesLoading, setServicesLoading] = useState(true)

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get<Service[]>(`${API_URL}/services`, {
        params: { _t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      })
      setServices(response.data.filter((s) => s.active))
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setServicesLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchServices()
  }, [fetchServices])

  useRefetchOnFocus(fetchServices, { pollMs: 12_000 })

  const hero = {
    ...DEFAULT_HERO,
    ...parseJson<Partial<ServicesHero>>(settings.services_hero_json, {}),
  }
  const heroSub = hero.sub || settings.services_subtitle || DEFAULT_HERO.sub

  const cta = parseJson<ServicesCta>(settings.services_cta_json, DEFAULT_CTA)

  if ((settingsLoading && Object.keys(settings).length === 0) || servicesLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <section className="page-hero">
        <p className="hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="hero-title">
          {hero.titleBefore}
          <em>{hero.titleEmphasis}</em>
        </h1>
        <p className="hero-description">{heroSub}</p>
      </section>

      <section className="services-detail">
        <div className="section-inner">
          {services.map((service) => {
            const IconComponent = service.icon ? iconMap[service.icon] || Utensils : Utensils
            const featuresList = service.features.split('\n').filter((f) => f.trim())

            return (
              <div key={service.id} className="service-detail-card">
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
                        {featuresList.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                        {service.capacity && <li>Capacity: {service.capacity}</li>}
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

      <section className="cta">
        <div className="section-inner">
          <h2>
            {cta.titleBefore || DEFAULT_CTA.titleBefore}
            <em>{cta.titleEmphasis || DEFAULT_CTA.titleEmphasis}</em>
          </h2>
          <p>{cta.description || DEFAULT_CTA.description}</p>
          <Link to="/contact" className="btn-gold">
            {cta.buttonText || DEFAULT_CTA.buttonText} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
