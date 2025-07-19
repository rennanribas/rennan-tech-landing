export function useAboutData() {
  const experiences = [
    {
      title: 'Senior Full Stack Engineer',
      period: '2020 - Present',
      description:
        'Leading development of enterprise-grade SecretOps and DevOps platforms. Architecting scalable Node.js/React applications with PostgreSQL, implementing secure secrets management systems, and optimizing CI/CD pipelines for high-availability environments.',
    },
    {
      title: 'Full Stack Developer',
      period: '2018 - 2020',
      description:
        'Built and maintained cloud-native applications using TypeScript, React, and Node.js. Developed RESTful APIs, implemented automated testing strategies, and collaborated with cross-functional teams in agile environments.',
    },
    {
      title: 'Software Engineer',
      period: '2015 - 2018',
      description:
        'Focused on backend development with emphasis on database optimization, microservices architecture, and security best practices. Contributed to developer tooling and infrastructure automation projects.',
    },
  ]

  const skills = [
    {
      category: 'Languages & Runtime',
      items: ['TypeScript', 'JavaScript', 'Node.js', 'Python'],
    },
    {
      category: 'Frontend & Frameworks',
      items: [
        'React',
        'Next.js',
        'Redux',
        'HTML5/CSS3',
        'Responsive Design',
        'Component Libraries',
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        'Express.js',
        'NestJS',
        'RESTful APIs',
        'GraphQL',
        'Microservices',
        'Event-Driven Architecture',
      ],
    },
    {
      category: 'Databases & Storage',
      items: [
        'PostgreSQL',
        'Redis',
        'Database Design',
        'Query Optimization',
        'Prisma',
        'TypeORM',
      ],
    },
    {
      category: 'DevOps & Security',
      items: [
        'Docker',
        'Kubernetes',
        'AWS (ECS/Lambda/RDS)',
        'CI/CD Pipelines',
        'Secrets Management',
        'Infrastructure as Code',
        'Monitoring & Logging',
      ],
    },
    {
      category: 'Development Practices',
      items: [
        'Test-Driven Development',
        'Code Review',
        'Agile/Scrum',
        'Git Workflows',
        'Performance Optimization',
        'Security Best Practices',
      ],
    },
  ]

  return { experiences, skills }
}