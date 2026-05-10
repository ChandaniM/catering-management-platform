import { useState } from 'react'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const categories = ['All', 'Corporate', 'House Parties', 'Outdoor Events', 'Special Events', 'Private Party']
  
  const images = [
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', category: 'Corporate', alt: 'caterers for small house party' },
    { url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', category: 'House Parties', alt: 'house party catering service' },
    { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', category: 'Outdoor Events', alt: 'outdoor catering' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', category: 'Special Events', alt: 'outdoor caterers' },
    { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', category: 'Private Party', alt: 'outdoor catering service' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', category: 'Corporate', alt: 'catering for business meetings' },
    { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80', category: 'House Parties', alt: 'caterers for house party' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', category: 'Outdoor Events', alt: 'small house party catering in mumbai' },
    { url: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=600&q=80', category: 'Special Events', alt: 'house catering services' },
    { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', category: 'Private Party', alt: 'best catering for corporate events' },
    { url: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=600&q=80', category: 'Corporate', alt: 'best corporate catering' },
    { url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80', category: 'House Parties', alt: 'caterers for corporate events' },
    { url: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&q=80', category: 'Outdoor Events', alt: 'catering corporate' },
    { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', category: 'Special Events', alt: 'catering corporate lunch' },
    { url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80', category: 'Private Party', alt: 'catering for corporate' },
    { url: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&q=80', category: 'Corporate', alt: 'catering for corporate companies' },
    { url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80', category: 'House Parties', alt: 'house party catering ideas' },
    { url: 'https://images.unsplash.com/photo-1529417305485-480f579e1129?w=600&q=80', category: 'Outdoor Events', alt: 'catering for corporate events' },
    { url: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80', category: 'Special Events', alt: 'catering for corporate lunch' },
    { url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80', category: 'Private Party', alt: 'catering for corporate party' },
    { url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80', category: 'Corporate', alt: 'catering service for corporate' },
    { url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80', category: 'House Parties', alt: 'house party food catering' },
    { url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80', category: 'Outdoor Events', alt: 'catering service for corporate event in mumbai' },
    { url: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=600&q=80', category: 'Special Events', alt: 'food for house party' },
    { url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80', category: 'Private Party', alt: 'catering services for house party' },
    { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', category: 'Corporate', alt: 'food delivery for house party' },
    { url: 'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?w=600&q=80', category: 'House Parties', alt: 'catering services for corporate' },
    { url: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80', category: 'Outdoor Events', alt: 'corporate catering' },
    { url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80', category: 'Special Events', alt: 'catering for house party' },
    { url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&q=80', category: 'Private Party', alt: 'catering for house parties' },
    { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', category: 'Corporate', alt: 'house party catering mumbai' },
    { url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80', category: 'House Parties', alt: 'corporate catering service' },
    { url: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600&q=80', category: 'Outdoor Events', alt: 'corporate catering services in india' },
    { url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', category: 'Special Events', alt: 'corporate catering services in mumbai' },
    { url: 'https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?w=600&q=80', category: 'Private Party', alt: 'caterers for house party in mumbai' },
    { url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80', category: 'Corporate', alt: 'corporate food services for business' },
  ]

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="gallery-hero-luxury">
        <div className="gallery-hero-overlay"></div>
        <div className="container">
          <div className="gallery-hero-content">
            <div className="decorative-line-gallery"></div>
            <p className="gallery-label-luxury">Our Portfolio</p>
            <h1 className="gallery-title-luxury">
              Where Artistry Meets <em>Culinary Excellence</em>
            </h1>
            <p className="gallery-description-luxury">
              Each creation tells a story of passion, precision, and the pursuit of perfection. 
              From intimate gatherings to grand celebrations, witness the elegance we bring to every table.
            </p>
            <div className="decorative-line-gallery"></div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="gallery-filters-section-luxury">
        <div className="container">
          <div className="filters-intro">
            <h3>Explore Our Work</h3>
            <p>Select a category to view our specialized creations</p>
          </div>
          <div className="gallery-filters-luxury">
            {categories.map((cat) => (
              <button 
                key={cat} 
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

      {/* Gallery Grid */}
      <section className="gallery-grid-section-luxury">
        <div className="container">
          <div className="gallery-grid-luxury">
            {filteredImages.map((img, i) => (
              <div 
                key={i} 
                className={`gallery-item-luxury ${i % 7 === 0 ? 'tall' : ''} ${i % 11 === 0 ? 'wide' : ''}`}
              >
                <div className="image-wrapper-luxury">
                  <img src={img.url} alt={img.alt} loading="lazy" />
                  <div className="image-overlay-luxury">
                    <div className="overlay-content">
                      <p className="category-badge">{img.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="gallery-cta-luxury">
        <div className="container">
          <div className="cta-content-luxury">
            <h2>Ready to Create Your Own Masterpiece?</h2>
            <p>Let's discuss how we can make your event unforgettable</p>
            <a href="/contact" className="btn-cta-luxury">Plan Your Event</a>
          </div>
        </div>
      </section>
    </>
  )
}
