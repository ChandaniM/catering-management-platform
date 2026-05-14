import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { parseJson } from '../lib/parseJson'
import { useRefetchOnFocus } from '../lib/useRefetchOnFocus'
import { API_URL } from '../apiConfig'

interface GalleryRow {
  id: number
  url: string
  title?: string | null
  category?: string | null
  active: boolean
}

type GalleryHero = {
  label?: string
  titleBefore?: string
  titleEmphasis?: string
  description?: string
}

type GalleryFiltersIntro = {
  title?: string
  subtitle?: string
}

type GalleryCta = {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
}

const DEFAULT_HERO: GalleryHero = {
  label: 'Our Portfolio',
  titleBefore: 'Where Artistry Meets ',
  titleEmphasis: 'Culinary Excellence',
  description:
    'Each creation tells a story of passion, precision, and the pursuit of perfection. From intimate gatherings to grand celebrations, witness the elegance we bring to every table.',
}

const DEFAULT_FILTERS: GalleryFiltersIntro = {
  title: 'Explore Our Work',
  subtitle: 'Select a category to view our specialized creations',
}

const DEFAULT_CTA: GalleryCta = {
  title: 'Ready to Create Your Own Masterpiece?',
  subtitle: "Let's discuss how we can make your event unforgettable",
  buttonText: 'Plan Your Event',
  buttonHref: '/contact',
}

export default function Gallery() {
  const { settings, loading: settingsLoading } = useSiteSettings()
  const [images, setImages] = useState<GalleryRow[]>([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  const fetchGallery = useCallback(async () => {
    try {
      const res = await axios.get<GalleryRow[]>(`${API_URL}/gallery`, {
        params: { _t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      })
      setImages(res.data.filter((img) => img.active))
    } catch (e) {
      console.error('Failed to fetch gallery:', e)
      setImages([])
    } finally {
      setGalleryLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchGallery()
  }, [fetchGallery])

  useRefetchOnFocus(fetchGallery, { pollMs: 12_000 })

  const hero = {
    ...DEFAULT_HERO,
    ...parseJson<Partial<GalleryHero>>(settings.gallery_hero_json, {}),
  }
  const filtersIntro = {
    ...DEFAULT_FILTERS,
    ...parseJson<Partial<GalleryFiltersIntro>>(settings.gallery_filters_json, {}),
  }
  const cta = { ...DEFAULT_CTA, ...parseJson<Partial<GalleryCta>>(settings.gallery_cta_json, {}) }

  const categories = useMemo(() => {
    const set = new Set<string>()
    images.forEach((img) => set.add((img.category || 'General').trim() || 'General'))
    return ['All', ...Array.from(set).sort()]
  }, [images])

  const filteredImages =
    activeCategory === 'All' ? images : images.filter((img) => (img.category || 'General') === activeCategory)

  if ((settingsLoading && Object.keys(settings).length === 0) || galleryLoading) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <section className="gallery-hero-luxury">
        <div className="gallery-hero-overlay"></div>
        <div className="container">
          <div className="gallery-hero-content">
            <div className="decorative-line-gallery"></div>
            <p className="gallery-label-luxury">{hero.label}</p>
            <h1 className="gallery-title-luxury">
              {hero.titleBefore}
              <em>{hero.titleEmphasis}</em>
            </h1>
            <p className="gallery-description-luxury">{hero.description}</p>
            <div className="decorative-line-gallery"></div>
          </div>
        </div>
      </section>

      <section className="gallery-filters-section-luxury">
        <div className="container">
          <div className="filters-intro">
            <h3>{filtersIntro.title}</h3>
            <p>{filtersIntro.subtitle}</p>
          </div>
          <div className="gallery-filters-luxury">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn-luxury ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span className="filter-text">{cat}</span>
                {activeCategory === cat && <span className="filter-line"></span>}
              </button>
            ))}
          </div>
          <div className="filter-count">
            Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
          </div>
        </div>
      </section>

      <section className="gallery-grid-section-luxury">
        <div className="container">
          {filteredImages.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem 1rem', opacity: 0.85 }}>
              No gallery images yet. Add images in the admin Gallery section.
            </p>
          ) : (
            <div className="gallery-grid-luxury">
              {filteredImages.map((img, i) => (
                <div
                  key={img.id}
                  className={`gallery-item-luxury ${i % 7 === 0 ? 'tall' : ''} ${i % 11 === 0 ? 'wide' : ''}`}
                >
                  <div className="image-wrapper-luxury">
                    <img
                      src={img.url}
                      alt={img.title || img.category || 'Gallery'}
                      loading="lazy"
                    />
                    <div className="image-overlay-luxury">
                      <div className="overlay-content">
                        <p className="category-badge">{img.category || 'General'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="gallery-cta-luxury">
        <div className="container">
          <div className="cta-content-luxury">
            <h2>{cta.title}</h2>
            <p>{cta.subtitle}</p>
            {cta.buttonHref?.startsWith('/') ? (
              <Link to={cta.buttonHref} className="btn-cta-luxury">
                {cta.buttonText}
              </Link>
            ) : (
              <a href={cta.buttonHref || '/contact'} className="btn-cta-luxury">
                {cta.buttonText}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
