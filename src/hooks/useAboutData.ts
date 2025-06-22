export function useAboutData() {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      period: '10+ years',
      description:
        'Delivering scalable, cloud-native applications with deep expertise in modern web technologies and cloud architectures.',
    },
  ]

  const skills = [
    {
      category: 'Languages & Runtime',
      items: ['TypeScript', 'JavaScript', 'Dart', 'C#'],
    },
    {
      category: 'Frameworks & Libraries',
      items: [
        'NestJS',
        'Express',
        'React',
        'React Native',
        'Flutter',
        'NextJS',
      ],
    },
    {
      category: 'Databases & Caching',
      items: [
        'PostgreSQL',
        'MS SQL Server',
        'Prisma',
        'TypeORM',
        'Sequelize',
        'Timescale with Postgres',
        'Redis',
      ],
    },
    {
      category: 'DevOps & Cloud',
      items: [
        'Docker',
        'AWS ECS/Fargate/ECR/EC2/Lambda',
        'Google Cloud',
        'Cloud Functions',
        'Bitbucket Pipelines',
        'GitHub Actions',
        'NGINX reverse proxy',
      ],
    },
    {
      category: 'Architecture & Practices',
      items: [
        'Micro-services',
        'Event-Driven Design',
        'Clean Architecture',
        'Domain-Driven Design',
        'ACID & indexing optimization',
        'Automated Testing',
        'Agile/Scrum',
        'Code Review & Mentoring',
      ],
    },
  ]

  return { experiences, skills }
}