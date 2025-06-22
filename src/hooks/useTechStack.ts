import { Zap, Cloud, Server, Code } from 'lucide-react'
import type { TechCategory } from '../types'

const techCategories: TechCategory[] = [
  {
    icon: Code,
    title: 'Frontend',
    description:
      'Experience in creating modern and responsive user interfaces.',
    color: 'text-sky-400',
    technologies: [
      {
        name: 'React',
        level: 'expert',
        description: 'Component-based UI library',
      },
      {
        name: 'TypeScript',
        level: 'advanced',
        description: 'Type-safe JavaScript',
      },
      {
        name: 'Next.js',
        level: 'advanced',
        description: 'Full-stack React framework',
      },
      {
        name: 'JavaScript',
        level: 'expert',
        description: 'The programming language of the web',
      },
      {
        name: 'HTML5',
        level: 'expert',
        description: 'Standard markup language for documents',
      },
      { name: 'CSS3', level: 'expert', description: 'Style sheet language' },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    description: 'Development of robust and scalable APIs.',
    color: 'text-emerald-400',
    technologies: [
      {
        name: 'Node.js',
        level: 'advanced',
        description: 'JavaScript runtime environment',
      },
      {
        name: 'Python',
        level: 'intermediate',
        description: 'High-level programming language',
      },
      {
        name: 'Golang',
        level: 'beginner',
        description: 'Statically typed, compiled language',
      },
      {
        name: 'GraphQL',
        level: 'advanced',
        description: 'Query language for APIs',
      },
      {
        name: 'REST',
        level: 'expert',
        description: 'Architectural style for distributed systems',
      },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Infrastructure as code, CI/CD, and automation.',
    color: 'text-amber-400',
    technologies: [
      {
        name: 'AWS',
        level: 'advanced',
        description: 'Cloud computing platform',
      },
      {
        name: 'Docker',
        level: 'advanced',
        description: 'Containerization platform',
      },
      {
        name: 'Terraform',
        level: 'intermediate',
        description: 'Infrastructure as Code',
      },
      {
        name: 'Kubernetes',
        level: 'beginner',
        description: 'Container orchestration system',
      },
    ],
  },
  {
    icon: Zap,
    title: 'Architecture',
    description: 'Design of distributed systems and microservices.',
    color: 'text-rose-400',
    technologies: [
      {
        name: 'Microservices',
        level: 'advanced',
        description: 'Architectural style',
      },
      {
        name: 'Event-Driven',
        level: 'intermediate',
        description: 'Architectural pattern',
      },
      {
        name: 'Serverless',
        level: 'advanced',
        description: 'Cloud-native development model',
      },
      {
        name: 'SOLID',
        level: 'expert',
        description: 'Principles of object-oriented design',
      },
    ],
  },
]

export const useTechStack = () => {
  return { categories: techCategories, learning: [] }
}
