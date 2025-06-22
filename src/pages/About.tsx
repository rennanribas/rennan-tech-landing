import { motion } from 'motion/react'
import { Award, Calendar, User } from 'lucide-react'
import { useAboutData } from '../hooks/useAboutData'

export default function About() {
  const { experiences, skills } = useAboutData()

  return (
    <div className='space-y-16'>
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center'
      >
        <h1 className='text-5xl md:text-6xl font-bold mb-6 text-foreground'>
          About Me
        </h1>
        <p className='text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed'>
          I'm a passionate software developer with a focus on creating elegant,
          efficient, and user-friendly solutions.
        </p>
      </motion.header>

      <div className='space-y-12'>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className='text-3xl font-bold text-foreground mb-8 flex items-center gap-3'>
            <Calendar className='text-primary' />
            Work Experience
          </h2>
          <div className='space-y-8 border-l-2 border-border pl-8 relative'>
            {experiences.map((exp, index) => (
              <div key={index} className='relative'>
                <div className='absolute -left-10 h-4 w-4 bg-primary rounded-full top-1.5' />
                <h3 className='text-2xl font-semibold text-foreground'>
                  {exp.title}
                </h3>
                <p className='text-md text-foreground/70 mt-1 mb-3'>
                  {exp.period}
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className='text-3xl font-bold text-foreground mb-8 flex items-center gap-3'>
            <Award className='text-primary' />
            Skills & Expertise
          </h2>
          <div className='space-y-8'>
            {skills.map((skillCategory, index) => (
              <div
                key={index}
                className='bg-card border border-border rounded-xl p-6'
              >
                <h3 className='text-xl font-semibold text-card-foreground mb-4 flex items-center gap-3'>
                  <User className='text-primary/90' />
                  {skillCategory.category}
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {skillCategory.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className='bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
