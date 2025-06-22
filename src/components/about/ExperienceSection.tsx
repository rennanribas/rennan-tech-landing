import { motion } from 'motion/react'
import { Calendar } from 'lucide-react'

interface Experience {
  title: string
  period: string
  description: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
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
  )
}