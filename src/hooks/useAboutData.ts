export interface Experience {
  title: string
  company: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
}

export interface Capability {
  title: string
  description: string
  focus: string[]
  tools: string[]
}

export function useAboutData() {
  const experiences: Experience[] = [
    {
      title: 'Senior Software Engineer',
      company: 'Trio (StudyLog)',
      period: 'Oct 2024 - Present',
      summary:
        'Own backend architecture for production platforms in scientific research and healthcare, leading delivery across NestJS, GraphQL, and AWS, with a focus on scalable APIs, data-intensive workflows, and AI-assisted product features.',
      highlights: [
        'Architect and ship backend services on NestJS, GraphQL, Redis, and AWS supporting two production systems.',
        'Define service boundaries, repository abstractions, and clean architecture patterns that keep a multi-version codebase maintainable.',
        'Design asynchronous processing pipelines and export workflows with BullMQ, Docker, and GitHub Actions.',
        'Collaborate with stakeholders to translate business requirements into system design decisions and delivery roadmaps.',
      ],
      stack: [
        'TypeScript',
        'NestJS',
        'GraphQL',
        'Next.js',
        'React',
        'Redis',
        'Prisma',
        'PostgreSQL',
        'AWS',
        'BullMQ',
        'Docker',
      ],
    },
    {
      title: 'Product Engineering Consultant',
      company: 'Independent Consulting Engagements',
      period: 'Aug 2023 - Sep 2024',
      summary:
        'Designed and built a data-intensive platform integrating mobile applications, backend services, and AI-assisted features, working directly with founders on technical direction and MVP definition.',
      highlights: [
        'Developed an LLM-based assistant using locally hosted models to deliver contextual insights grounded in structured user data.',
        'Architected ingestion and processing pipelines with queue-based workers (BullMQ, Redis) for high-throughput workloads.',
        'Built time-series data systems on PostgreSQL and TimescaleDB for efficient querying and analytics.',
        'Owned cloud infrastructure on AWS (ECS, Fargate, Lambda) with Terraform, Docker, and CI/CD pipelines.',
        'Delivered React Native, Flutter, and native iOS (Swift) applications with secure background data collection.',
      ],
      stack: [
        'TypeScript',
        'NestJS',
        'LLM',
        'RAG',
        'PostgreSQL',
        'TimescaleDB',
        'Redis',
        'BullMQ',
        'AWS',
        'Terraform',
        'Docker',
        'React Native',
        'Flutter',
        'Swift',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Intive',
      period: 'Nov 2021 - Jun 2023',
      summary:
        'Delivered backend services and web applications across media and fintech initiatives for distributed product teams.',
      highlights: [
        'Built NestJS microservices for a live-streaming platform, bridging legacy workflows with an event-driven architecture on GCP.',
        'Delivered React and TypeScript web interfaces for a U.S. tech banking MVP.',
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
        'Built frontend features for a high-traffic European camper-rental marketplace using Vue, Nuxt, and TypeScript.',
      highlights: [
        'Delivered account-area features in Nuxt.js, Vue.js, and TypeScript, shipping production-ready flows.',
        'Contributed end-to-end to the marketplace MVP, handling frontend alongside backend service and schema work.',
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
        'Designed and implemented an API gateway and authentication systems using Node.js, Express, and JWT, establishing secure access flows and service orchestration across backend and frontend layers.',
      highlights: [
        'Built an API gateway that centralized request handling, routing, and service access across backend APIs.',
        'Implemented JWT-based authentication and authorization flows across the application and backend services.',
      ],
      stack: ['Node.js', 'Express', 'React', 'JWT', 'API Gateway'],
    },
    {
      title: 'Full-Stack Engineer',
      company: 'Bten US',
      period: 'May 2019 - Feb 2020',
      summary:
        'Developed backend services and REST APIs for SaaS platforms using Node.js, Express, Sequelize, and TypeScript, while delivering customer-facing product features across the web stack.',
      highlights: [
        'Implemented backend services and data-access layers with Express, Sequelize, and TypeScript.',
        'Delivered product features across customer experience flows, integrating frontend interfaces with backend APIs.',
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
        'Built educational platforms and internal systems using C#, ASP.NET, and JavaScript, contributing to web interfaces and application features used across academic workflows.',
      highlights: [
        'Developed education-focused product features across backend and frontend layers with C#, ASP.NET, JavaScript, HTML, and CSS.',
        'Built a teacher portal used by instructors and administrators, delivering the web layer and supporting academic operations.',
      ],
      stack: ['C#', 'ASP.NET', 'JavaScript', 'HTML', 'CSS'],
    },
  ]

  const capabilities: Capability[] = [
    {
      title: 'Backend Architecture & Distributed Systems',
      description:
        'Most of my recent work is in service design, API contracts, and asynchronous workflows that need to stay reliable and maintainable as products scale.',
      focus: [
        'Node.js and NestJS services following clean architecture, dependency injection, and clear service boundaries.',
        'REST and GraphQL APIs, queue-based processing with BullMQ and Redis, exporter flows, and integration layers.',
        'Relational and time-series data with PostgreSQL, TimescaleDB, Redis, Prisma, Sequelize, and TypeORM.',
      ],
      tools: [
        'TypeScript',
        'Node.js',
        'NestJS',
        'GraphQL',
        'PostgreSQL',
        'TimescaleDB',
        'Redis',
        'BullMQ',
      ],
    },
    {
      title: 'AI, LLMs & Data-Intensive Systems',
      description:
        'I build AI-assisted features and data-driven systems grounded in real product context, connecting LLM-based components to structured data and production backends.',
      focus: [
        'LLM integrations using locally hosted and hosted models, prompt engineering, and RAG-style retrieval over structured user data.',
        'Ingestion and processing pipelines for high-throughput workloads, combining queue-based workers with time-series storage.',
        'AI-assisted application design decisions that keep latency, cost, and data boundaries under control.',
      ],
      tools: [
        'LLM',
        'RAG',
        'Embeddings',
        'PostgreSQL',
        'TimescaleDB',
        'BullMQ',
      ],
    },
    {
      title: 'Cloud & DevOps',
      description:
        'I own software beyond the feature itself, including how it is built, released, and kept dependable in real environments.',
      focus: [
        'AWS (ECS, Fargate, Lambda, ECR, EC2) and GCP environments for application delivery and supporting infrastructure.',
        'CI/CD pipelines with GitHub Actions and Bitbucket Pipelines, containerized services, release automation, and production operations.',
        'Infrastructure as Code with Terraform and cost-aware decisions that reuse existing systems when it leads to a better delivery path.',
      ],
      tools: [
        'AWS',
        'GCP',
        'Docker',
        'Terraform',
        'GitHub Actions',
        'Bitbucket Pipelines',
      ],
    },
    {
      title: 'Web & Mobile Product Engineering',
      description:
        'Extensive experience delivering React-centered web applications and selective mobile work, moving products from requirements and designs into reliable, maintainable interfaces.',
      focus: [
        'Production features and MVPs across React, Next.js, Vue, and Nuxt, in close collaboration with founders, product, and design.',
        'React Native and Flutter applications for MVPs and mobile-facing features.',
        'Swift bridge layers for iOS-specific flows, background execution, and native integrations when framework-level solutions are not enough.',
      ],
      tools: [
        'React',
        'Next.js',
        'Vue.js',
        'Nuxt.js',
        'React Native',
        'Flutter',
        'Swift',
      ],
    },
  ]

  return { experiences, capabilities }
}
