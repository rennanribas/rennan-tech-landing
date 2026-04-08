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
      company: 'Trio',
      period: 'Oct 2024 - Present',
      summary:
        'Work across multiple production platforms as a full-stack engineer with strong frontend and backend depth, taking part in architectural decisions, leading technical delivery on one of the products, and owning critical backend and infrastructure work across the others.',
      highlights: [
        'Led technical delivery of a React and Next.js application integrated with a NestJS BFF through GraphQL and Apollo, shaping the architecture, component model, and data layer from greenfield into production.',
        'Drove architecture decisions on a NestJS API platform alongside the tech lead, designing the connectors and adapters layer and a type-safe dynamic mapping system in TypeScript that keeps domain and integration boundaries clean.',
        'Migrated a large NestJS codebase from Prisma to Sequelize, coordinating schema, repository, and query-layer changes without disrupting production workflows.',
        'Built an asynchronous export system on NestJS, BullMQ, and Redis for data-heavy operations, from job orchestration to delivery of generated artifacts.',
        'Hardened platform security and delivery, configuring an Nginx reverse proxy, Docker services, and Redis wiring end to end for production environments.',
        'Deliver frontend features as a full-stack engineer on a healthcare product, working across a React and NestJS codebase with Swagger-driven contracts, TanStack tooling, and production-grade UI flows.',
      ],
      stack: [
        'TypeScript',
        'NestJS',
        'GraphQL',
        'Apollo',
        'React',
        'Next.js',
        'TanStack Query',
        'Prisma',
        'Sequelize',
        'PostgreSQL',
        'Redis',
        'BullMQ',
        'Docker',
        'Nginx',
        'AWS',
      ],
    },
    {
      title: 'Product Engineering Consultant',
      company: 'Independent Consulting Engagements',
      period: 'Aug 2023 - Sep 2024',
      summary:
        'Acted as the core engineering team for an early-stage health product, owning architecture, delivery, and operations end to end across backend, web, mobile, data, and cloud, working directly with founders on product direction and technical evolution.',
      highlights: [
        'Built and maintained a React web application with TypeScript and Redux, delivering features from design to production alongside the NestJS backend.',
        'Designed backend services on NestJS and AWS Lambda with PostgreSQL and TimescaleDB, and architected ingestion pipelines with queue-based workers (BullMQ, Redis) for high-throughput health data.',
        'Developed Flutter and native iOS (Swift) applications integrating deeply with HealthKit, handling background refresh, delta synchronization with anchors, streaming, compression, queue-based async refresh, and push-notification-driven updates.',
        'Engineered the data layer around Protocol Buffers, data lake storage, and efficient serialization to move health telemetry reliably between mobile devices and backend services.',
        'Built an LLM-based assistant using locally hosted models to deliver contextual insights grounded in structured user data.',
        'Owned cloud infrastructure on AWS (ECS, Fargate, Lambda, ECR, EC2) with Terraform, Docker, and CI/CD pipelines, and partnered with founders on technical hiring and investor-facing iterations.',
      ],
      stack: [
        'TypeScript',
        'React',
        'Redux',
        'NestJS',
        'AWS Lambda',
        'PostgreSQL',
        'TimescaleDB',
        'Redis',
        'BullMQ',
        'Flutter',
        'Swift',
        'HealthKit',
        'Protocol Buffers',
        'Terraform',
        'LLM',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Intive',
      period: 'Nov 2021 - Jun 2023',
      summary:
        'Delivered backend services and web applications across media and fintech initiatives for distributed product teams, contributing to system design decisions and working close to product on both server and client sides.',
      highlights: [
        'Built NestJS microservices on GCP for a live-streaming media platform, bridging legacy scheduling workflows with an event-driven architecture based on Cloud Functions and message-driven integrations.',
        'Designed service boundaries and API contracts to replace monolithic scheduling logic, keeping legacy consumers working while the new architecture grew around them.',
        'Delivered React and TypeScript web interfaces for a U.S. tech banking MVP that evolved into a production product, working closely with product and design stakeholders.',
        'Participated in architecture discussions and code reviews across distributed teams, covering both backend service design and frontend implementation patterns.',
      ],
      stack: [
        'NestJS',
        'TypeScript',
        'React',
        'Microservices',
        'GCP',
        'Cloud Functions',
        'Event-Driven',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Indie Campers',
      period: 'Mar 2021 - Oct 2021',
      summary:
        'Delivered production features for a high-traffic European camper-rental platform, working end to end across frontend and backend while the product expanded from a purely B2C model into its first marketplace capabilities.',
      highlights: [
        'Shipped production features in the client area using Nuxt.js, Vue.js, and TypeScript, translating product and operational requirements into live user flows.',
        'Contributed end to end to the marketplace capability, starting from early proof-of-concept work and following it through into the production-facing product, handling frontend delivery alongside backend services, controllers, and schema changes.',
        'Worked across ephemeral review environments, containerized workflows, and CI/CD pipelines to keep branches shippable and reduce friction between product iterations.',
        'Improved developer experience with stronger linting, pre-commit hooks, and faster local build and hot-reload feedback loops.',
      ],
      stack: [
        'Vue.js',
        'Nuxt.js',
        'TypeScript',
        'Node.js',
        'CI/CD',
        'Ephemeral Environments',
      ],
    },
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Kaffa Mobile',
      period: 'Mar 2020 - Mar 2021',
      summary:
        'Worked across backend microservices, a React web client, and a Kotlin mobile client for a location-based product, focusing on geospatial data and efficient synchronization of map content between server and clients.',
      highlights: [
        'Designed and implemented NestJS microservices backed by PostGIS, handling spatial queries and geographic data for mapping features.',
        'Built hash-based delta synchronization on the backend to detect, compare, and ship only the map regions that changed, keeping the React web app and the Kotlin Android client up to date with minimal bandwidth.',
        'Implemented an API gateway and JWT-based authentication layer centralizing access control and service routing across backend APIs and clients.',
        'Contributed to the React web application, integrating map rendering and sync flows with the backend services.',
      ],
      stack: [
        'NestJS',
        'Node.js',
        'TypeScript',
        'PostGIS',
        'PostgreSQL',
        'React',
        'Kotlin',
        'Microservices',
        'JWT',
      ],
    },
    {
      title: 'Full-Stack Engineer',
      company: 'Bten US',
      period: 'May 2019 - Feb 2020',
      summary:
        'Delivered product features end to end for a SaaS platform, working across a TypeScript Angular frontend and Node.js, Express, and Sequelize backend services.',
      highlights: [
        'Built and maintained features in an Angular (v8/9) application with TypeScript, shipping customer-facing flows into production.',
        'Implemented backend services, REST APIs, and data-access layers with Express, Sequelize, and TypeScript against a relational database.',
        'Integrated frontend components with backend APIs, taking features from design through implementation and release.',
      ],
      stack: [
        'Angular',
        'TypeScript',
        'Node.js',
        'Express',
        'Sequelize',
        'REST APIs',
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
        'I care about the product as much as the architecture behind it. I have delivered production features end to end across web and mobile, taking ownership of how something feels in front of the user, not only how it runs on the server.',
      focus: [
        'Production web applications across React (including React 19 with TanStack Query, TanStack Router, and Zod), Next.js, Vue, Nuxt, and Angular.',
        'Flutter and native iOS (Swift) development, including HealthKit integrations, background refresh, and delta-based synchronization with backend services.',
        'Close collaboration with founders, product, and design to ship features that stay maintainable and match real user needs.',
      ],
      tools: [
        'React',
        'Next.js',
        'TanStack Query',
        'Vue.js',
        'Nuxt.js',
        'Angular',
        'Flutter',
        'Swift',
        'HealthKit',
      ],
    },
  ]

  return { experiences, capabilities }
}
