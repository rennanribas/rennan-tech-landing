import { motion } from 'motion/react'
import { Code, Database, Cloud, Layers, Zap } from 'lucide-react'
import Navigation from '../components/Navigation'

export default function TechStack() {
  const techCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Modern, responsive user interfaces',
      color: 'dusk',
      technologies: [
        { name: 'React', level: 95, description: 'Component-based UI library' },
        {
          name: 'React Native',
          level: 90,
          description: 'Cross-platform mobile development',
        },
        {
          name: 'NextJS',
          level: 85,
          description: 'Full-stack React framework',
        },
        { name: 'TypeScript', level: 95, description: 'Type-safe JavaScript' },
        {
          name: 'Tailwind CSS',
          level: 90,
          description: 'Utility-first CSS framework',
        },
        {
          name: 'Flutter',
          level: 80,
          description: 'Cross-platform UI toolkit',
        },
      ],
    },
    {
      icon: Database,
      title: 'Backend & Databases',
      description: 'Scalable server-side solutions',
      color: 'lavender',
      technologies: [
        {
          name: 'NestJS',
          level: 95,
          description: 'Enterprise Node.js framework',
        },
        { name: 'Express', level: 90, description: 'Minimal web framework' },
        {
          name: 'PostgreSQL',
          level: 95,
          description: 'Advanced relational database',
        },
        { name: 'Prisma', level: 85, description: 'Next-generation ORM' },
        { name: 'TypeORM', level: 80, description: 'TypeScript ORM' },
        {
          name: 'Redis',
          level: 85,
          description: 'In-memory data structure store',
        },
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure',
      color: 'mocha',
      technologies: [
        { name: 'AWS', level: 90, description: 'ECS, Fargate, Lambda, EC2' },
        {
          name: 'Google Cloud',
          level: 85,
          description: 'Cloud Functions, Compute Engine',
        },
        { name: 'Docker', level: 90, description: 'Containerization platform' },
        { name: 'GitHub Actions', level: 85, description: 'CI/CD automation' },
        {
          name: 'NGINX',
          level: 80,
          description: 'Reverse proxy & load balancer',
        },
        {
          name: 'Bitbucket Pipelines',
          level: 75,
          description: 'CI/CD pipelines',
        },
      ],
    },
    {
      icon: Layers,
      title: 'Architecture & Design',
      description: 'Scalable system design patterns',
      color: 'dusk',
      technologies: [
        {
          name: 'Microservices',
          level: 90,
          description: 'Distributed system architecture',
        },
        {
          name: 'Event-Driven Design',
          level: 85,
          description: 'Asynchronous communication',
        },
        {
          name: 'Clean Architecture',
          level: 90,
          description: 'Maintainable code structure',
        },
        {
          name: 'Domain-Driven Design',
          level: 80,
          description: 'Business-focused modeling',
        },
        {
          name: 'ACID Optimization',
          level: 85,
          description: 'Database performance tuning',
        },
        {
          name: 'API Design',
          level: 95,
          description: 'RESTful & GraphQL APIs',
        },
      ],
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      dusk: {
        bg: 'bg-dusk-50',
        border: 'border-dusk-200',
        icon: 'text-dusk-600',
        progress: 'bg-dusk-500',
        progressBg: 'bg-dusk-100',
      },
      lavender: {
        bg: 'bg-lavender-50',
        border: 'border-lavender-200',
        icon: 'text-lavender-600',
        progress: 'bg-lavender-500',
        progressBg: 'bg-lavender-100',
      },
      mocha: {
        bg: 'bg-mocha-100',
        border: 'border-mocha-300',
        icon: 'text-mocha-600',
        progress: 'bg-mocha-500',
        progressBg: 'bg-mocha-200',
      },
    }
    return colors[color as keyof typeof colors] || colors.dusk
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-mocha-50 to-lavender-50'>
      <Navigation currentPage='tech-stack' />

      <main className='pt-24 pb-16'>
        <div className='max-w-6xl mx-auto px-6'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h1 className='text-5xl md:text-6xl font-bold mb-6 text-mocha-900'>
              Tech Stack
            </h1>
            <p className='text-xl text-mocha-600 max-w-2xl mx-auto leading-relaxed'>
              A comprehensive overview of the technologies and tools I use to
              build modern, scalable applications.
            </p>
          </motion.div>

          {/* Tech Categories */}
          <div className='space-y-12'>
            {techCategories.map((category, categoryIndex) => {
              const colorClasses = getColorClasses(category.color)
              const IconComponent = category.icon

              return (
                <motion.section
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                  className='bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'
                >
                  <div className='flex items-center gap-4 mb-8'>
                    <div
                      className={`p-3 ${colorClasses.bg} rounded-xl border ${colorClasses.border}`}
                    >
                      <IconComponent className={colorClasses.icon} size={32} />
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold text-mocha-900'>
                        {category.title}
                      </h2>
                      <p className='text-mocha-600'>{category.description}</p>
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>
                    {category.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.2 + techIndex * 0.1,
                        }}
                        className='p-4 bg-mocha-50 rounded-xl border border-mocha-200'
                      >
                        <div className='flex justify-between items-center mb-2'>
                          <h3 className='font-semibold text-mocha-900'>
                            {tech.name}
                          </h3>
                          <span className='text-sm font-medium text-mocha-600'>
                            {tech.level}%
                          </span>
                        </div>
                        <p className='text-sm text-mocha-600 mb-3'>
                          {tech.description}
                        </p>
                        <div
                          className={`w-full ${colorClasses.progressBg} rounded-full h-2`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.level}%` }}
                            transition={{
                              duration: 1,
                              delay:
                                categoryIndex * 0.2 + techIndex * 0.1 + 0.5,
                            }}
                            className={`${colorClasses.progress} h-2 rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )
            })}
          </div>

          {/* Additional Info */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className='mt-16 bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'
          >
            <div className='flex items-center gap-4 mb-6'>
              <div className='p-3 bg-dusk-50 rounded-xl border border-dusk-200'>
                <Zap className='text-dusk-600' size={32} />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-mocha-900'>
                  Continuous Learning
                </h2>
                <p className='text-mocha-600'>
                  Always exploring new technologies and best practices
                </p>
              </div>
            </div>

            <p className='text-mocha-600 leading-relaxed'>
              Technology evolves rapidly, and I'm committed to staying current
              with the latest developments. I regularly explore emerging
              frameworks, attend conferences, and contribute to open-source
              projects to ensure I'm delivering solutions using the most
              effective and modern approaches available.
            </p>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
