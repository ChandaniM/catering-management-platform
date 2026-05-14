import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Seed Website Settings
  console.log('📝 Seeding website settings...');
  const settings = [
    // Hero Section
    { key: 'hero_label', value: 'Mumbai · PAN India · Est. 2000', category: 'hero', description: 'Hero section location label' },
    { key: 'hero_title', value: 'Pure Veg Catering Crafted for Unforgettable Celebrations', category: 'hero', description: 'Main hero heading' },
    { key: 'hero_description', value: 'From intimate house parties to grand weddings, we bring premium vegetarian catering experiences to every corner of India — with 26 years of culinary excellence.', category: 'hero', description: 'Hero description text' },
    
    // Stats
    { key: 'stat_years', value: '26+', category: 'stats', description: 'Years of experience' },
    { key: 'stat_years_label', value: 'YEARS OF MASTERY', category: 'stats', description: 'Years stat label' },
    { key: 'stat_events', value: '5000+', category: 'stats', description: 'Number of events' },
    { key: 'stat_events_label', value: 'EVENTS CURATED', category: 'stats', description: 'Events stat label' },
    { key: 'stat_vegetarian', value: '100%', category: 'stats', description: 'Pure vegetarian commitment' },
    { key: 'stat_vegetarian_label', value: 'PURE VEGETARIAN', category: 'stats', description: 'Vegetarian stat label' },
    
    // About Page
    { key: 'about_title', value: 'About Saffron & Sage', category: 'about', description: 'About page title' },
    { key: 'about_subtitle', value: '26 years of crafting unforgettable culinary experiences', category: 'about', description: 'About page subtitle' },
    { key: 'about_journey', value: 'Since 2000, Saffron & Sage has been at the forefront of premium pure vegetarian catering in India. What started as a small catering service in Mumbai has grown into one of India\'s most trusted names for luxury events.\n\nWe\'ve had the honor of serving over 5,000 events across 15+ cities, from intimate family gatherings to grand weddings with 5,000+ guests. Every event is a canvas where we paint unforgettable culinary experiences.', category: 'about', description: 'About journey (use blank line between paragraphs)' },
    {
      key: 'about_pillars_json',
      value: JSON.stringify([
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
      ]),
      category: 'about',
      description: 'About “Our Philosophy” pillars: JSON array of { heading, body }',
    },
    {
      key: 'about_why_json',
      value: JSON.stringify([
        { title: '🏆 26+ Years Experience', text: 'Over two decades of mastering the art of catering' },
        { title: '🌿 100% Pure Vegetarian', text: 'No compromises on our vegetarian commitment' },
        { title: '🎯 Custom Menus', text: 'Tailored to your preferences and event theme' },
        { title: '👨‍🍳 Expert Chefs', text: 'Team of experienced culinary professionals' },
        { title: '🇮🇳 PAN India Service', text: 'We cater across 15+ cities in India' },
        { title: '💎 Premium Quality', text: 'Only the finest ingredients and presentation' },
      ]),
      category: 'about',
      description: 'About page “Why choose us” cards: JSON array of { title, text }',
    },
    
    // Contact Info
    { key: 'contact_location', value: 'Sion, Mumbai, Maharashtra', category: 'contact', description: 'Business location' },
    { key: 'contact_phone', value: '+91 99999 99999', category: 'contact', description: 'Contact phone number' },
    { key: 'contact_email', value: 'catering.services@gmail.com', category: 'contact', description: 'Contact email' },
    { key: 'contact_hours', value: 'Available daily, 9:00 AM – 9:00 PM', category: 'contact', description: 'Business hours' },
    { key: 'contact_whatsapp', value: '919999999999', category: 'contact', description: 'WhatsApp number (digits only, no +)' },
    { key: 'contact_nav_tagline', value: 'Pure Veg Catering · Est. 2000', category: 'contact', description: 'Shown under the logo in the main navigation' },
    { key: 'contact_footer_blurb', value: '26 years of crafting unforgettable vegetarian catering experiences across India. From weddings to corporate galas — we bring passion to every plate.', category: 'contact', description: 'Short blurb in the site footer' },
    {
      key: 'contact_page_json',
      value: JSON.stringify({
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
      }),
      category: 'contact',
      description: 'Contact page hero, sidebar, and form headings (JSON)',
    },
    
    // Services Page
    { key: 'services_title', value: 'Curated Catering for Every Occasion', category: 'services', description: 'Services page title' },
    { key: 'services_subtitle', value: 'From intimate gatherings to grand celebrations, we offer comprehensive catering solutions tailored to make every occasion extraordinary.', category: 'services', description: 'Services page subtitle' },
    {
      key: 'services_hero_json',
      value: JSON.stringify({
        eyebrow: 'Our Services',
        titleBefore: 'Curated Catering for ',
        titleEmphasis: 'Every Occasion',
        sub: 'From intimate gatherings to grand celebrations, we offer comprehensive catering solutions tailored to make every occasion extraordinary.',
      }),
      category: 'services',
      description: 'Services page hero (JSON): eyebrow, titleBefore, titleEmphasis, sub',
    },
    {
      key: 'services_cta_json',
      value: JSON.stringify({
        titleBefore: "Don't See Your Event Type? ",
        titleEmphasis: "Let's Talk.",
        description:
          'We cater every kind of occasion — just reach out and we\'ll customise a package for you.',
        buttonText: 'Get a Custom Quote',
      }),
      category: 'services',
      description: 'Services page bottom CTA (JSON)',
    },

    // Home page — full-width sections (JSON). Edit under Website Settings → Home → Edit Content.
    {
      key: 'home_stats_grid_json',
      value: JSON.stringify([
        { value: '5000+', label: 'Events Worldwide', sublabel: 'Across 15+ cities' },
        { value: '26+', label: 'Years of Mastery', sublabel: 'Since 2000' },
        { value: '100%', label: 'Pure Vegetarian', sublabel: 'No compromises ever' },
        { value: 'PAN India', label: 'Service Reach', sublabel: 'Trusted nationwide' },
      ]),
      category: 'home',
      description: 'Home stats row: JSON array of { value, label, sublabel }',
    },
    {
      key: 'home_services_json',
      value: JSON.stringify({
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
      }),
      category: 'home',
      description: 'Home services preview block (JSON): label, titleBefore, titleEmphasis, sub, cards[{ title, description, icon?, imageUrl? }]',
    },
    {
      key: 'home_cta_json',
      value: JSON.stringify({
        titleBefore: 'Ready to Plan Your ',
        titleEmphasis: 'Perfect Event?',
        description: 'Get a free consultation and custom quote within 48 hours. No commitment needed.',
        buttonText: 'Request a Quote',
      }),
      category: 'home',
      description: 'Home bottom CTA (JSON): titleBefore, titleEmphasis, description, buttonText',
    },
    {
      key: 'hero_background_image',
      value: '',
      category: 'hero',
      description: 'Optional hero background image URL (overlays the pattern)',
    },

    {
      key: 'gallery_hero_json',
      value: JSON.stringify({
        label: 'Our Portfolio',
        titleBefore: 'Where Artistry Meets ',
        titleEmphasis: 'Culinary Excellence',
        description:
          'Each creation tells a story of passion, precision, and the pursuit of perfection. From intimate gatherings to grand celebrations, witness the elegance we bring to every table.',
      }),
      category: 'gallery',
      description: 'Gallery page hero (JSON)',
    },
    {
      key: 'gallery_filters_json',
      value: JSON.stringify({
        title: 'Explore Our Work',
        subtitle: 'Select a category to view our specialized creations',
      }),
      category: 'gallery',
      description: 'Gallery filters intro (JSON)',
    },
    {
      key: 'gallery_cta_json',
      value: JSON.stringify({
        title: 'Ready to Create Your Own Masterpiece?',
        subtitle: "Let's discuss how we can make your event unforgettable",
        buttonText: 'Plan Your Event',
        buttonHref: '/contact',
      }),
      category: 'gallery',
      description: 'Gallery bottom CTA (JSON)',
    },

    {
      key: 'testimonials_hero_json',
      value: JSON.stringify({
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
      }),
      category: 'testimonials',
      description: 'Testimonials hero + stats row (JSON)',
    },
    {
      key: 'testimonials_mid_json',
      value: JSON.stringify({
        title: 'What Makes Us Different',
        subtitle:
          'Every testimonial represents a relationship built on trust, quality, and exceptional service',
      }),
      category: 'testimonials',
      description: 'Testimonials section intro (JSON)',
    },
    {
      key: 'testimonials_cta_json',
      value: JSON.stringify({
        badge: 'Join Our Story',
        titleBefore: 'Your Success Story ',
        titleEmphasis: 'Begins Here',
        description:
          'Join our distinguished family of satisfied clients who have experienced the perfect blend of culinary excellence and impeccable service',
        primaryLabel: 'Start Your Journey',
        primaryHref: '/contact',
        secondaryLabel: 'View Our Portfolio',
        secondaryHref: '/gallery',
      }),
      category: 'testimonials',
      description: 'Testimonials bottom CTA (JSON)',
    },
  ];

  for (const setting of settings) {
    await prisma.websiteSettings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }

  // Seed Services
  console.log('🍽️  Seeding services...');
  const services = [
    {
      title: 'Wedding Catering',
      description: 'Your wedding deserves a feast that matches the grandeur of the occasion. From traditional thalis to pan-Indian buffets, live chaat and dessert stations.',
      icon: '💒',
      features: 'Multi-cuisine live counters\nCustom bridal menus\nJain-friendly options\nRoyal table setup\nTrained banquet staff',
      capacity: '50 - 5000+ guests',
      active: true,
    },
    {
      title: 'Corporate Catering',
      description: 'From boardroom lunches and team meetings to product launches and annual gala dinners - we deliver corporate catering that reflects your brand.',
      icon: '🏢',
      features: 'Working lunch setups\nGala dinner service\nHealth-conscious menus\nBranded presentations\nPunctual delivery',
      capacity: '25 - 2000+ guests',
      active: true,
    },
    {
      title: 'Birthday Parties',
      description: 'From intimate soirees to lavish milestone celebrations - every detail food-forward with customized themes and menus.',
      icon: '🎂',
      features: 'Themed party menus\nBirthday cake specials\nInteractive food stations\nKids-friendly options\nDessert bars',
      capacity: '25 - 500 guests',
      active: true,
    },
    {
      title: 'Outdoor Catering',
      description: 'Curated evening spreads with premium canapes, mocktails and live stations perfect for garden parties and outdoor events.',
      icon: '🌳',
      features: 'Mobile kitchen setup\nWeather-proof arrangements\nBBQ and grill stations\nScenic presentation\nOpen-air dining',
      capacity: '50 - 1000+ guests',
      active: true,
    },
    {
      title: 'Film and Media Catering',
      description: 'Keep your cast and crew energized through long shooting days. Hygienic, delicious meal services for productions across India.',
      icon: '🎬',
      features: 'Bulk meal production\nMultiple shift timings\nOn-set setup and service\nSpecial dietary options\nHygienically packed',
      capacity: '50 - 500+ crew',
      active: true,
    },
    {
      title: 'Yacht Catering',
      description: 'Mumbai harbour as the backdrop. Curated spreads with elegant canapes, mezze stations, and premium live cooking for floating soirees.',
      icon: '⚓',
      features: 'Canape and mezze spreads\nLive cooking stations\nMaritime-safe packaging\nWhite-glove service\nMocktail pairings',
      capacity: '25 - 150 guests',
      active: true,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // Seed Testimonials
  console.log('⭐ Seeding testimonials...');
  const testimonials = [
    {
      name: 'Tasnim Eran',
      event: 'Multiple Corporate Events',
      rating: 5,
      content: 'I have used their services on multiple occasions and was never left disappointed. Very professional and accommodating whether the catering is required for a small or large group. Their menu is constantly updated as per season and trends in the culinary space. Highly recommend them for any scale events and you will surely be in for some rollicking feast.',
      active: true,
    },
    {
      name: 'Kainaz Motiwala',
      event: 'Office Party',
      rating: 5,
      content: 'Excellent continental food and good portions. Very prompt service too. Highly recommend their baked fillet of fish! The presentation was stunning and our guests were thoroughly impressed.',
      active: true,
    },
    {
      name: 'Siddanth Pillai',
      event: 'Wedding Catering',
      rating: 5,
      content: 'One of my long-term vendors. We go way back and have hosted several events together. Their food is of great quality and tastes fantastic. I would always recommend them for events or functions, big or small. They can support you with an event of any scale.',
      active: true,
    },
    {
      name: 'Jashk Prajapati',
      event: 'Pooja Function',
      rating: 5,
      content: 'This was my first experience with them and must say it was a memorable experience. The food and services were excellent. Catering staff was well mannered, professional, and polite. Overall it was a wonderful experience. We highly recommend them.',
      active: true,
    },
    {
      name: 'Kunal Tendulkar',
      event: 'Corporate Event',
      rating: 5,
      content: 'We booked their services for a corporate event. They are very good in understanding the needs and execute the plan with great sophistication. They even make suggestions according to the nature of event, weather and location. Food items have original taste and flavours. Presentation is very good.',
      active: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
