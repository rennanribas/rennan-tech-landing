import { motion } from 'motion/react'
import { Award, Calendar, User } from 'lucide-react'
import Navigation from '../components/Navigation'

export default function About() {
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-mocha-50 to-lavender-50'>
      <Navigation currentPage='about' />

      <main className='pt-24 pb-16'>
        <div className='max-w-4xl mx-auto px-6'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h1 className='text-5xl md:text-6xl font-bold mb-6 text-mocha-900'>
              About Me
            </h1>
            <p className='text-xl text-mocha-600 max-w-2xl mx-auto leading-relaxed'>
              Passionate about building scalable solutions and leading
              distributed teams to deliver exceptional results.
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-white rounded-2xl p-8 mb-12 shadow-sm border border-mocha-200'
          >
            <div className='flex items-start gap-4 mb-6'>
              <div className='p-3 bg-dusk-100 rounded-xl'>
                <User className='text-dusk-600' size={24} />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-mocha-900 mb-2'>
                  Professional Summary
                </h2>
                <p className='text-mocha-600 leading-relaxed'>
                  Senior Software Engineer with 10+ years delivering scalable,
                  cloud-native applications. Deep expertise in TypeScript,
                  NestJS, React / React Native, Flutter and PostgreSQL. Proven
                  in designing microservice architectures, optimizing
                  high-volume databases, and automating CI/CD pipelines on both
                  AWS and Google Cloud. Adept at leading distributed teams and
                  translating complex requirements into maintainable,
                  high-performance solutions.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-12'
          >
            <h2 className='text-3xl font-bold text-mocha-900 mb-8 flex items-center gap-3'>
              <Calendar className='text-dusk-600' size={32} />
              Experience
            </h2>

            <div className='space-y-6'>
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className='bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'
                >
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                    <h3 className='text-xl font-bold text-mocha-900'>
                      {exp.title}
                    </h3>
                    <span className='text-dusk-600 font-medium'>
                      {exp.period}
                    </span>
                  </div>
                  <p className='text-mocha-600 leading-relaxed'>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Core Skills */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className='text-3xl font-bold text-mocha-900 mb-8 flex items-center gap-3'>
              <Award className='text-dusk-600' size={32} />
              Core Skills
            </h2>

            <div className='grid gap-6'>
              {skills.map((skillGroup, index) => (
                <div
                  key={index}
                  className='bg-white rounded-2xl p-8 shadow-sm border border-mocha-200'
                >
                  <h3 className='text-xl font-bold text-mocha-900 mb-4'>
                    {skillGroup.category}
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className='px-4 py-2 bg-dusk-50 text-dusk-700 rounded-lg font-medium text-sm border border-dusk-200'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
