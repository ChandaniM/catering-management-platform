import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { parseJson } from '../lib/parseJson'

type WhyCard = { title: string; text: string }

type Pillar = { heading: string; body: string }

const DEFAULT_PILLARS: Pillar[] = [
  {
    heading: 'Pure Vegetarian Excellence:',
    body: 'We believe that vegetarian cuisine can be extraordinary, elegant, and utterly delicious. No compromises, ever.',
  },
  {
    heading: 'Uncompromising Quality:',
    body: 'From sourcing the finest ingredients to the final presentation, we maintain the highest standards at every step.',
  },
  {
    heading: 'Personalized Service:',
    body: 'Every event is unique, and so should be the menu. We work closely with you to design experiences that reflect your vision.',
  },
]

const DEFAULT_WHY: WhyCard[] = [
  { title: '🏆 26+ Years Experience', text: 'Over two decades of mastering the art of catering' },
  { title: '🌿 100% Pure Vegetarian', text: 'No compromises on our vegetarian commitment' },
  { title: '🎯 Custom Menus', text: 'Tailored to your preferences and event theme' },
  { title: '👨‍🍳 Expert Chefs', text: 'Team of experienced culinary professionals' },
  { title: '🇮🇳 PAN India Service', text: 'We cater across 15+ cities in India' },
  { title: '💎 Premium Quality', text: 'Only the finest ingredients and presentation' },
]

export default function About() {
  const { settings, loading } = useSiteSettings()

  const title = settings.about_title || 'About Saffron & Sage'
  const subtitle =
    settings.about_subtitle || '26 years of crafting unforgettable culinary experiences'
  const journeyParagraphs = (settings.about_journey || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  const pillars = parseJson<Pillar[]>(settings.about_pillars_json, DEFAULT_PILLARS)
  const whyCards = parseJson<WhyCard[]>(settings.about_why_json, DEFAULT_WHY)

  if (loading && Object.keys(settings).length === 0) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="hero-eyebrow">Our Story</p>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-description">{subtitle}</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Our Journey</h2>
            {journeyParagraphs.length > 0 ? (
              journeyParagraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>
                Since 2000, Saffron & Sage has been at the forefront of premium pure vegetarian catering
                in India.
              </p>
            )}
          </div>

          <div className="about-section">
            <h2>Our Philosophy</h2>
            {pillars.map((pillar, i) => (
              <p key={i}>
                <strong>{pillar.heading}</strong> {pillar.body}
              </p>
            ))}
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <div className="why-choose-grid">
              {whyCards.map((card, i) => (
                <div key={i} className="why-card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
