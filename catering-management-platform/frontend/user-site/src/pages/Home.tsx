import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Utensils, Building2, Cake, Sunset, type LucideIcon } from 'lucide-react'
import axios from 'axios'
import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { parseJson, parseJsonField } from '../lib/parseJson'
import { useRefetchOnFocus } from '../lib/useRefetchOnFocus'
import { API_URL } from '../apiConfig'

type StatGridItem = { value: string; label: string; sublabel: string }

type ServiceCard = {
  title: string
  description: string
  icon?: string
  imageUrl?: string
}

type HomeServicesConfig = {
  label?: string
  titleBefore?: string
  titleEmphasis?: string
  sub?: string
  cards?: ServiceCard[]
}

type HomeCtaConfig = {
  titleBefore?: string
  titleEmphasis?: string
  description?: string
  buttonText?: string
}

interface PageSection {
  id: number
  pageSlug: string
  sectionType: string
  title?: string
  content: string
  images?: string
  order: number
  isVisible: boolean
}

const DEFAULT_STATS_GRID: StatGridItem[] = [
  { value: '5000+', label: 'Events Worldwide', sublabel: 'Across 15+ cities' },
  { value: '26+', label: 'Years of Mastery', sublabel: 'Since 2000' },
  { value: '100%', label: 'Pure Vegetarian', sublabel: 'No compromises ever' },
  { value: 'PAN India', label: 'Service Reach', sublabel: 'Trusted nationwide' },
]

const DEFAULT_SERVICES: HomeServicesConfig = {
  label: 'What We Offer',
  titleBefore: 'Catering Services for ',
  titleEmphasis: 'Every Occasion',
  sub: 'From a 25-guest house dinner to a 5,000-person outdoor wedding — we scale, plan and execute with the same passion for detail.',
  cards: [
    {
      title: 'Wedding Catering',
      description:
        'Grand ceremonies deserve grand spreads. Multi-cuisine menus, live counters & flawless banquet service.',
      icon: 'utensils',
    },
    {
      title: 'Corporate Events',
      description:
        'Elevate every meeting, lunch and gala with curated menus tailored to your brand\'s standards.',
      icon: 'building2',
    },
    {
      title: 'Birthday Parties',
      description:
        'From intimate soirées to lavish milestone celebrations — every detail food-forward.',
      icon: 'cake',
    },
    {
      title: 'Outdoor Catering',
      description:
        'Curated evening spreads with premium canapés, mocktails and live stations as the sun sets.',
      icon: 'sunset',
    },
  ],
}

const DEFAULT_CTA: HomeCtaConfig = {
  titleBefore: 'Ready to Plan Your ',
  titleEmphasis: 'Perfect Event?',
  description:
    'Get a free consultation and custom quote within 48 hours. No commitment needed.',
  buttonText: 'Request a Quote',
}

const ICON_MAP: Record<string, LucideIcon> = {
  utensils: Utensils,
  building2: Building2,
  cake: Cake,
  sunset: Sunset,
}

const EMPTY_SERVICES_BLOCK: HomeServicesConfig = {
  label: '',
  titleBefore: '',
  titleEmphasis: '',
  sub: '',
  cards: [],
}

const EMPTY_CTA_BLOCK: HomeCtaConfig = {
  titleBefore: '',
  titleEmphasis: '',
  description: '',
  buttonText: '',
}

function firstNonEmpty(...parts: (string | undefined | null)[]): string | undefined {
  for (const p of parts) {
    if (p != null && String(p).trim() !== '') return String(p).trim()
  }
  return undefined
}

/** Section JSON wins; then flat setting if key exists in API (even when empty); else fallback. */
function layeredCopy(
  sectionVal: string | undefined,
  settings: Record<string, string>,
  key: string,
  fallback: string,
): string {
  const fromSection = firstNonEmpty(sectionVal)
  if (fromSection !== undefined) return fromSection
  if (key in settings) return (settings[key] ?? '').trim()
  return fallback
}

function layeredStat(
  sectionVal: string | undefined,
  settings: Record<string, string>,
  key: string,
  fallback: string,
): string {
  const fromSection = firstNonEmpty(sectionVal)
  if (fromSection !== undefined) return fromSection
  if (key in settings) return (settings[key] ?? '').trim()
  return fallback
}

export default function Home() {
  const { settings, loading: settingsLoading } = useSiteSettings()
  const [homeSections, setHomeSections] = useState<PageSection[]>([])

  const loadSections = useCallback(async () => {
    try {
      const pageRes = await axios.get(`${API_URL}/pages/home`, {
        params: { _t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      }).catch(() => ({
        data: { sections: [] as PageSection[] },
      }))
      const sections = (pageRes.data?.sections as PageSection[] | undefined)?.filter(
        (s) => s.isVisible,
      )
      setHomeSections(sections ?? [])
    } catch (error) {
      console.error('Failed to fetch home sections:', error)
    }
  }, [])

  useEffect(() => {
    void loadSections()
  }, [loadSections])

  useRefetchOnFocus(loadSections, { pollMs: 12_000 })

  const statsGrid = parseJsonField<StatGridItem[]>(
    settings.home_stats_grid_json,
    DEFAULT_STATS_GRID,
    [],
  )
  const servicesBlock = parseJsonField<HomeServicesConfig>(
    settings.home_services_json,
    DEFAULT_SERVICES,
    EMPTY_SERVICES_BLOCK,
  )
  const ctaBlock = parseJsonField<HomeCtaConfig>(
    settings.home_cta_json,
    DEFAULT_CTA,
    EMPTY_CTA_BLOCK,
  )

  const heroBgUrl = (settings.hero_background_image || '').trim()

  const heroSection = homeSections.find((s) => s.sectionType === 'hero')
  const statsSection = homeSections.find((s) => s.sectionType === 'stats')
  const heroFromSection = parseJson<{ label?: string; title?: string; description?: string }>(
    heroSection?.content,
    {},
  )
  const statsFromSection = parseJson<{
    years?: string
    yearsLabel?: string
    events?: string
    eventsLabel?: string
    vegetarian?: string
    vegetarianLabel?: string
  }>(statsSection?.content, {})

  const heroLabel = layeredCopy(
    heroFromSection.label,
    settings,
    'hero_label',
    'Mumbai · PAN India · Est. 2000',
  )
  const heroTitle = layeredCopy(
    heroFromSection.title,
    settings,
    'hero_title',
    'Pure Veg Catering Crafted for Unforgettable Celebrations',
  )
  const heroDescription = layeredCopy(
    heroFromSection.description,
    settings,
    'hero_description',
    'From intimate house parties to grand weddings, we bring premium vegetarian catering experiences to every corner of India — with 26 years of culinary excellence.',
  )

  const statYears = layeredStat(statsFromSection.years, settings, 'stat_years', '26+')
  const statYearsLabel = layeredStat(statsFromSection.yearsLabel, settings, 'stat_years_label', 'YEARS OF MASTERY')
  const statEvents = layeredStat(statsFromSection.events, settings, 'stat_events', '5000+')
  const statEventsLabel = layeredStat(statsFromSection.eventsLabel, settings, 'stat_events_label', 'EVENTS CURATED')
  const statVeg = layeredStat(statsFromSection.vegetarian, settings, 'stat_vegetarian', '100%')
  const statVegLabel = layeredStat(
    statsFromSection.vegetarianLabel,
    settings,
    'stat_vegetarian_label',
    'PURE VEGETARIAN',
  )

  const sectionHeroImage = (heroSection?.images || '').trim().split(/\n|,/).map((s) => s.trim()).find(Boolean)
  const effectiveHeroBg = sectionHeroImage || heroBgUrl

  const showStatsSection = statsGrid.length > 0
  const showServicesSection =
    (servicesBlock.cards?.length ?? 0) > 0 ||
    !!(
      servicesBlock.label?.trim() ||
      servicesBlock.titleBefore?.trim() ||
      servicesBlock.titleEmphasis?.trim() ||
      servicesBlock.sub?.trim()
    )
  const showCtaSection =
    !!(
      ctaBlock.titleBefore?.trim() ||
      ctaBlock.titleEmphasis?.trim() ||
      ctaBlock.description?.trim() ||
      ctaBlock.buttonText?.trim()
    )

  if (settingsLoading && Object.keys(settings).length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <section className="hero">
        <div className="hero-gold-bar"></div>
        <div
          className="hero-bg"
          style={effectiveHeroBg ? { position: 'relative' } : undefined}
        >
          {effectiveHeroBg ? (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.35)), url(${effectiveHeroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
              }}
            />
          ) : null}
          <svg
            viewBox="0 0 1400 900"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <pattern id="g" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.8" fill="#C4A46C" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#g)" opacity={effectiveHeroBg ? 0.25 : 1} />
          </svg>
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">{heroLabel}</div>
            <h1>{heroTitle}</h1>
            <p className="hero-description">{heroDescription}</p>
            <div className="hero-cta">
              <Link to="/contact" className="btn-gold">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="hero-stats-right">
            <div className="hero-stat-card">
              <div className="hero-stat-num">{statYears}</div>
              <div className="hero-stat-label">{statYearsLabel}</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-num">{statEvents}</div>
              <div className="hero-stat-label">{statEventsLabel}</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-num">{statVeg}</div>
              <div className="hero-stat-label">{statVegLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {showStatsSection ? (
        <section className="stats">
          <div className="stat-grid">
            {statsGrid.slice(0, 4).map((row, i) => (
              <div key={i} className="stat-card">
                <h3 className="stat-value">{row.value}</h3>
                <p className="stat-label">{row.label}</p>
                <p className="stat-sublabel">{row.sublabel}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {showServicesSection ? (
        <section className="services">
          <div className="section-inner">
            {(servicesBlock.label?.trim() ||
              servicesBlock.titleBefore?.trim() ||
              servicesBlock.titleEmphasis?.trim() ||
              servicesBlock.sub?.trim()) && (
              <div className="section-header">
                {servicesBlock.label?.trim() ? (
                  <p className="section-label">{servicesBlock.label}</p>
                ) : null}
                {(servicesBlock.titleBefore?.trim() || servicesBlock.titleEmphasis?.trim()) && (
                  <h2 className="section-title">
                    {servicesBlock.titleBefore}
                    {servicesBlock.titleEmphasis?.trim() ? (
                      <em>{servicesBlock.titleEmphasis}</em>
                    ) : null}
                  </h2>
                )}
                <div className="divider"></div>
                {servicesBlock.sub?.trim() ? <p className="section-sub">{servicesBlock.sub}</p> : null}
              </div>
            )}
            <div className="services-grid">
              {(servicesBlock.cards ?? []).map((card, idx) => {
                const Icon = (card.icon && ICON_MAP[card.icon]) || Utensils
                const img = (card.imageUrl || '').trim()
                return (
                  <div key={`${card.title}-${idx}`} className="service-card">
                    <div className="service-icon">
                      {img ? (
                        <img
                          src={img}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'inherit',
                          }}
                        />
                      ) : (
                        <Icon size={32} strokeWidth={1.5} />
                      )}
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/services" className="btn-primary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {showCtaSection ? (
        <section className="cta">
          <div className="section-inner">
            {(ctaBlock.titleBefore?.trim() || ctaBlock.titleEmphasis?.trim()) && (
              <h2>
                {ctaBlock.titleBefore}
                {ctaBlock.titleEmphasis?.trim() ? <em>{ctaBlock.titleEmphasis}</em> : null}
              </h2>
            )}
            {ctaBlock.description?.trim() ? <p>{ctaBlock.description}</p> : null}
            {ctaBlock.buttonText?.trim() ? (
              <Link to="/contact" className="btn-gold">
                {ctaBlock.buttonText} <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  )
}
