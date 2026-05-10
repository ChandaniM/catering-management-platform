import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Tasnim Eran',
      event: 'Multiple Corporate Events',
      rating: 5,
      text: 'I have used their services on multiple occasions and was never left disappointed. Very professional and accommodating whether the catering is required for a small or large group. Their menu is constantly updated as per season and trends in the culinary space. Highly recommend them for any scale events and you will surely be in for some rollicking feast.'
    },
    {
      name: 'Kainaz Motiwala',
      event: 'Office Party',
      rating: 5,
      text: 'Excellent continental food and good portions. Very prompt service too. Highly recommend their baked fillet of fish! The presentation was stunning and our guests were thoroughly impressed.'
    },
    {
      name: 'Siddanth Pillai',
      event: 'Wedding Catering',
      rating: 5,
      text: 'One of my long-term vendors. We go way back and have hosted several events together. Their food is of great quality and tastes fantastic. I would always recommend them for events or functions, big or small. They can support you with an event of any scale.'
    },
    {
      name: 'Jashk Prajapati',
      event: 'Pooja Function',
      rating: 5,
      text: 'This was my first experience with them and must say it was a memorable experience. The food and services were excellent. Catering staff was well mannered, professional, and polite. Overall it was a wonderful experience. We highly recommend them.'
    },
    {
      name: 'Kunal Tendulkar',
      event: 'Corporate Event',
      rating: 5,
      text: 'We booked their services for a corporate event. They are very good in understanding the needs and execute the plan with great sophistication. They even make suggestions according to the nature of event, weather and location. Food items have original taste and flavours. Presentation is very good.'
    },
    {
      name: 'Mahek Rathod',
      event: 'House Party',
      rating: 5,
      text: 'Best catering service available in Mumbai! Their staff is amazing. They update and enhance their cuisine to provide fresh variety of dishes. You name any cuisine and they will serve you with the best! I will highly recommend to everyone.'
    },
    {
      name: 'Chaitali Devkate',
      event: 'Wedding Party',
      rating: 5,
      text: 'A very fabulous experience to have their services in our wedding party. All the staff were so polite and professional in their work. We got so many compliments about the catering and arrangements. One will never regret hiring their service.'
    },
    {
      name: 'Zeshah Davar',
      event: 'Birthday Party',
      rating: 5,
      text: 'The food is super hygienic and extremely delicious. They have an excellent variety of options to choose from. The order experience too was brilliant! The food has never disappointed me and has always been above my expectations. Everything is made to perfection.'
    },
    {
      name: 'Harshad Panchal',
      event: 'Corporate Events',
      rating: 5,
      text: 'We have taken their services multiple times for our corporate events. We have experienced excellent food service and great service by their staff. The food was delicious and they have got all the traditional and modern varieties.'
    },
    {
      name: 'Niraj Dubey',
      event: 'House Party',
      rating: 5,
      text: 'I had a seamless experience. Great services, well mannered staff, reliable customer care, we had a pleasant experience. I would highly recommend them for house parties and any other events.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="testimonials-hero-luxury">
        <div className="testimonials-hero-bg"></div>
        <div className="container">
          <div className="testimonials-hero-content">
            <div className="decorative-accent"></div>
            <p className="testimonials-label-luxury">Client Stories</p>
            <h1 className="testimonials-title-luxury">
              Voices of <em>Excellence</em>
            </h1>
            <p className="testimonials-description-luxury">
              Over 26 years of culinary artistry, creating memories that last a lifetime. 
              Discover why discerning clients trust us with their most precious moments.
            </p>
            <div className="testimonials-stats-luxury">
              <div className="stat-item-luxury">
                <span className="stat-number">26+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-luxury">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Events Catered</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-luxury">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-section-luxury">
        <div className="container">
          <div className="section-intro-luxury">
            <h2>What Makes Us Different</h2>
            <p>Every testimonial represents a relationship built on trust, quality, and exceptional service</p>
          </div>
          
          <div className="testimonials-grid-luxury">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-luxury">
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
                <p className="testimonial-text-luxury">{testimonial.text}</p>
                <div className="testimonial-author-luxury">
                  <div className="author-avatar-luxury">
                    <span>{testimonial.name.charAt(0)}</span>
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

      {/* CTA Section */}
      <section className="testimonials-cta-luxury">
        <div className="cta-overlay-pattern"></div>
        <div className="container">
          <div className="cta-content-center">
            <div className="cta-badge">Join Our Story</div>
            <h2 className="cta-title-luxury">
              Your Success Story <em>Begins Here</em>
            </h2>
            <p className="cta-description-luxury">
              Join our distinguished family of satisfied clients who have experienced 
              the perfect blend of culinary excellence and impeccable service
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-cta-primary-luxury">
                Start Your Journey
              </a>
              <a href="/gallery" className="btn-cta-secondary-luxury">
                View Our Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
