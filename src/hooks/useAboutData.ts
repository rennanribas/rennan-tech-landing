export interface Experience {
  title: string
  company: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export function useAboutData() {
  const experiences: Experience[] = [
    {
      title: 'Senior Software Engineer',
      company: 'Trio (StudyLog)',
      period: 'Oct 2024 - Present',
      summary:
        'Owning backend and application architecture in a multi-version product environment, working across NestJS, GraphQL, Next.js, and React.',
      highlights: [
        'Build and maintain services backed by Sequelize, Prisma, Redis, and AWS.',
        'Define backend contracts, service boundaries, and integration patterns that keep product changes manageable.',
        'Develop asynchronous and export flows with BullMQ and Docker while contributing to GitHub Actions and database versioning.',
      ],
      stack: [
        'TypeScript',
        'NestJS',
        'GraphQL',
        'Next.js',
        'React',
        'Redis',
        'Prisma',
        'AWS',
      ],
    },
    {
      title: 'Product Engineering Consultant',
      company: 'Independent Consulting Engagements',
      period: 'Aug 2023 - Sep 2024',
      summary:
        'Delivered short-term product and platform engagements across mobile applications, backend services, and cloud operations, with most of the work centered on iOS-first, data-heavy experiences.',
      highlights: [
        'Built React Native and Flutter applications from early product concepts into testable MVPs, translating Figma designs into flows used by internal and external testers.',
        'Designed native iOS bridge layers in Swift to support background health-data collection, secure transport, queue-based processing, and reliable synchronization with backend services.',
        'Owned architecture and operations across legacy and new systems, spanning NestJS APIs, PostgreSQL and TimescaleDB, Redis queues, AWS delivery pipelines, Docker, ECR, EC2, Terraform, and App Store release workflows.',
        'Worked closely with founders on product direction, investor-facing iterations, and hiring, including technical interviews and coordination with data specialists and engineers.',
      ],
      stack: [
        'React Native',
        'Flutter',
        'iOS',
        'TypeScript',
        'Swift',
        'NestJS',
        'PostgreSQL',
        'TimescaleDB',
        'AWS',
        'Terraform',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Intive',
      period: 'Nov 2021 - Jun 2023',
      summary:
        'Worked across media and fintech initiatives for distributed product teams, balancing backend delivery with frontend execution.',
      highlights: [
        'Built NestJS services for a live-streaming platform, connecting legacy scheduling workflows to a newer microservice architecture.',
        'Contributed to a U.S. tech banking MVP by delivering React and TypeScript web interfaces.',
      ],
      stack: [
        'NestJS',
        'React',
        'TypeScript',
        'Microservices',
        'GCP',
        'Cloud Functions',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Indie Campers',
      period: 'Mar 2021 - Oct 2021',
      summary:
        'Worked deeply in the client area of a European camper-rental platform while helping shape the first marketplace capabilities that expanded the product beyond a purely B2C model.',
      highlights: [
        'Delivered account-area features in Nuxt.js, Vue.js, and TypeScript, translating product and operational requirements into production-ready flows.',
        'Improved day-to-day engineering workflow with stronger linting, pre-commit hooks, and faster local build and hot-reload feedback loops.',
        'Contributed end-to-end to marketplace MVP implementation, handling frontend delivery alongside backend service, controller, and schema work needed to support new rental flows.',
      ],
      stack: [
        'Vue.js',
        'Nuxt.js',
        'TypeScript',
        'Marketplace',
        'Developer Tooling',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Kaffa Mobile',
      period: 'Mar 2020 - Mar 2021',
      summary:
        'Worked across backend and frontend layers to establish secure access flows and API orchestration with Node.js, Express, and React.',
      highlights: [
        'Built an API gateway that centralized request handling and service access.',
        'Implemented JWT-based authentication flows across the application and backend APIs.',
      ],
      stack: ['Node.js', 'Express', 'React', 'JWT', 'API Gateway'],
    },
    {
      title: 'Full-Stack Engineer',
      company: 'Bten US',
      period: 'May 2019 - Feb 2020',
      summary:
        'Built customer-facing SaaS features while implementing Node.js and Express APIs backed by Sequelize and TypeScript.',
      highlights: [
        'Delivered product features across customer experience flows and backend services.',
        'Implemented API and data-access layers with Express, Sequelize, and TypeScript.',
      ],
      stack: [
        'Node.js',
        'Express',
        'Sequelize',
        'TypeScript',
        'SaaS',
      ],
    },
    {
      title: 'Software Developer',
      company: 'CETEC Educacional',
      period: 'Jan 2013 - Dec 2017',
      summary:
        'Built educational software and a teacher portal, working across web interfaces and application features used in academic workflows.',
      highlights: [
        'Developed education-focused product features in C#, JavaScript, HTML, and CSS.',
        'Built a teacher portal with ASP.NET, contributing to the web layer used by instructors and administrators.',
      ],
      stack: ['C#', 'JavaScript', 'ASP.NET', 'HTML', 'CSS'],
    },
  ]

  const skills: SkillCategory[] = [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Dart', 'Swift', 'C#'],
    },
    {
      category: 'Backend & APIs',
      items: [
        'Node.js',
        'NestJS',
        'Express',
        'REST APIs',
        'GraphQL',
        'Microservices',
      ],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'React Native', 'Vue.js', 'Nuxt.js', 'Flutter'],
    },
    {
      category: 'Data & Persistence',
      items: [
        'PostgreSQL',
        'MS SQL Server',
        'Redis',
        'Prisma',
        'Sequelize',
        'TypeORM',
        'TimescaleDB',
      ],
    },
    {
      category: 'Cloud & Delivery',
      items: [
        'AWS',
        'Google Cloud',
        'Docker',
        'ECS/Fargate',
        'Lambda',
        'Terraform',
        'GitHub Actions',
        'Bitbucket Pipelines',
        'NGINX',
      ],
    },
    {
      category: 'Architecture & Execution',
      items: [
        'Distributed Systems',
        'CI/CD Automation',
        'Dependency Injection',
        'Clean Architecture',
        'Performance Optimization',
        'Platform Tooling',
      ],
    },
  ]

  return { experiences, skills }
}
