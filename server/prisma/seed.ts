import { PrismaClient } from '@prisma/client';
import { FALLBACK_PROJECTS } from '../src/data/fallbackData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Prisma database seeding for Subhabrata Dey Portfolio...');
  console.log('🔒 Note: Using clearly identified academic and demonstration sample projects.');

  // 1. Seed Projects
  for (let i = 0; i < FALLBACK_PROJECTS.length; i++) {
    const item = FALLBACK_PROJECTS[i];
    await prisma.project.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        summary: item.summary,
        description: item.description,
        category: item.category,
        technologies: item.technologies || item.tags,
        imageUrls: item.imageUrls || (item.imageUrl ? [item.imageUrl] : []),
        featured: item.featured,
        published: item.published,
        githubUrl: item.githubUrl,
        liveDemoUrl: item.liveDemoUrl || item.liveUrl,
        sortOrder: i,
      },
      create: {
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        description: item.description,
        category: item.category,
        technologies: item.technologies || item.tags,
        imageUrls: item.imageUrls || (item.imageUrl ? [item.imageUrl] : []),
        featured: item.featured,
        published: item.published,
        githubUrl: item.githubUrl,
        liveDemoUrl: item.liveDemoUrl || item.liveUrl,
        sortOrder: i,
      },
    });
    console.log(`  ✓ Project seeded: "${item.title}" (${item.slug})`);
  }

  // 2. Seed Sample Contact Message (for verification)
  const sampleMessage = {
    senderName: 'Alex Mercer (Sample Recruiter)',
    email: 'alex.mercer.sample@example.com',
    subject: 'Academic Collaboration Inquiry',
    message: 'Hello Subhabrata, reviewing your portfolio and distributed systems projects. Impressive work on the 3D parallax interface and backend architecture!',
    status: 'unread',
  };

  const existingMsg = await prisma.contactMessage.findFirst({
    where: { email: sampleMessage.email },
  });

  if (!existingMsg) {
    await prisma.contactMessage.create({
      data: sampleMessage,
    });
    console.log(`  ✓ Sample contact message seeded from ${sampleMessage.senderName}`);
  }

  // 3. Seed Site Metrics
  await prisma.siteMetric.upsert({
    where: { key: 'projects_completed' },
    update: { value: '10+', label: 'Projects Engineered' },
    create: { key: 'projects_completed', value: '10+', label: 'Projects Engineered' },
  });

  console.log('✅ Prisma database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
