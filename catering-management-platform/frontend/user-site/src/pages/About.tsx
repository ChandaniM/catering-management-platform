export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <p className="hero-eyebrow">Our Story</p>
          <h1 className="hero-title">About <span className="gold">Saffron & Sage</span></h1>
          <p className="hero-description">
            26 years of crafting unforgettable culinary experiences
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Our Journey</h2>
            <p>
              Since 2000, Saffron & Sage has been at the forefront of premium pure vegetarian 
              catering in India. What started as a small catering service in Mumbai has grown 
              into one of India's most trusted names for luxury events.
            </p>
            <p>
              We've had the honor of serving over 5,000 events across 15+ cities, from intimate 
              family gatherings to grand weddings with 5,000+ guests. Every event is a canvas 
              where we paint unforgettable culinary experiences.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Philosophy</h2>
            <p>
              <strong>Pure Vegetarian Excellence:</strong> We believe that vegetarian cuisine 
              can be extraordinary, elegant, and utterly delicious. No compromises, ever.
            </p>
            <p>
              <strong>Uncompromising Quality:</strong> From sourcing the finest ingredients to 
              the final presentation, we maintain the highest standards at every step.
            </p>
            <p>
              <strong>Personalized Service:</strong> Every event is unique, and so should be 
              the menu. We work closely with you to design experiences that reflect your vision.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <div className="why-choose-grid">
              <div className="why-card">
                <h3>🏆 26+ Years Experience</h3>
                <p>Over two decades of mastering the art of catering</p>
              </div>
              <div className="why-card">
                <h3>🌿 100% Pure Vegetarian</h3>
                <p>No compromises on our vegetarian commitment</p>
              </div>
              <div className="why-card">
                <h3>🎯 Custom Menus</h3>
                <p>Tailored to your preferences and event theme</p>
              </div>
              <div className="why-card">
                <h3>👨‍🍳 Expert Chefs</h3>
                <p>Team of experienced culinary professionals</p>
              </div>
              <div className="why-card">
                <h3>🇮🇳 PAN India Service</h3>
                <p>We cater across 15+ cities in India</p>
              </div>
              <div className="why-card">
                <h3>💎 Premium Quality</h3>
                <p>Only the finest ingredients and presentation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
