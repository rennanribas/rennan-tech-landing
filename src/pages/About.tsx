import { motion } from 'motion/react'
import { Award, Calendar, User } from 'lucide-react'
import { useAboutData } from '../hooks/useAboutData'


export default function About() {
  const { experiences, skills } = useAboutData()

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-12'
      >
        <h1 className='text-4xl font-bold text-gray-800'>About Me</h1>
        <p className='mt-4 text-lg text-gray-600'>
          A brief overview of my professional journey and skills.
        </p>
      </motion.header>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-12'
      >
        <h2 className='text-3xl font-semibold text-gray-700 mb-6 flex items-center'>
          <Calendar className='mr-3 text-rose-500' />
          Experience
        </h2>
        <div className='space-y-8'>
          {experiences.map((exp, index) => (
            <div key={index} className='p-6 bg-white rounded-lg shadow-md'>
              <h3 className='text-xl font-bold text-gray-800'>{exp.title}</h3>
              <p className='text-sm text-gray-500 mt-1'>{exp.period}</p>
              <p className='mt-4 text-gray-700'>{exp.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className='text-3xl font-semibold text-gray-700 mb-6 flex items-center'>
          <Award className='mr-3 text-rose-500' />
          Skills
        </h2>
        <div className='space-y-8'>
          {skills.map((skillCategory, index) => (
            <div key={index} className='p-6 bg-white rounded-lg shadow-md'>
              <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center'>
                <User className='mr-3 text-rose-500' />
                {skillCategory.category}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {skillCategory.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className='bg-rose-100 text-rose-800 text-sm font-medium px-3 py-1 rounded-full'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  )
}
