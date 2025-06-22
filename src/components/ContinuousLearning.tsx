import { motion } from 'motion/react'
import { Zap } from 'lucide-react'

export default function ContinuousLearning() {
  return (
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
        Technology evolves rapidly, and I'm committed to staying current with
        the latest developments. I regularly explore emerging frameworks,
        attend conferences, and contribute to open-source projects to ensure
        I'm delivering solutions using the most effective and modern
        approaches available.
      </p>
    </motion.section>
  )
}