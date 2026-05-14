import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding pages...');

  const pages = [
    { name: 'Home', title: 'Home Page', slug: 'home', description: 'Main landing page', isEnabled: true, order: 1 },
    { name: 'About', title: 'About Us', slug: 'about', description: 'Company information', isEnabled: true, order: 2 },
    { name: 'Services', title: 'Our Services', slug: 'services', description: 'Catering services offered', isEnabled: true, order: 3 },
    { name: 'Gallery', title: 'Photo Gallery', slug: 'gallery', description: 'Event photos', isEnabled: true, order: 4 },
    { name: 'Testimonials', title: 'Client Reviews', slug: 'testimonials', description: 'Customer testimonials', isEnabled: true, order: 5 },
    { name: 'Contact', title: 'Contact Us', slug: 'contact', description: 'Get in touch', isEnabled: true, order: 6 },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }

  // Seed page sections for Home page
  const homeSections = [
    {
      pageSlug: 'home',
      sectionType: 'hero',
      title: 'Hero Section',
      content: JSON.stringify({
        label: 'Mumbai · PAN India · Est. 2000',
        title: 'Pure Veg Catering Crafted for Unforgettable Celebrations',
        description: 'From intimate house parties to grand weddings, we bring premium vegetarian catering experiences to every corner of India — with 26 years of culinary excellence.',
      }),
      order: 1,
      isVisible: true,
    },
    {
      pageSlug: 'home',
      sectionType: 'stats',
      title: 'Statistics',
      content: JSON.stringify({
        years: '26+',
        yearsLabel: 'YEARS OF MASTERY',
        events: '5000+',
        eventsLabel: 'EVENTS CURATED',
        vegetarian: '100%',
        vegetarianLabel: 'PURE VEGETARIAN',
      }),
      order: 2,
      isVisible: true,
    },
  ];

  for (const section of homeSections) {
    await prisma.pageSection.create({ data: section });
  }

  console.log('✅ Pages seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
