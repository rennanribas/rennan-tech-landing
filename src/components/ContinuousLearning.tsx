import { motion } from 'motion/react'
import { Zap } from 'lucide-react'

export default function ContinuousLearning() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className='mt-16 bg-card rounded-2xl p-8 shadow-sm border border-border'
    >
      <div className='flex items-center gap-4 mb-6'>
        <div className='p-3 bg-primary/10 rounded-xl border border-primary/20'>
          <Zap className='text-primary' size={32} />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-card-foreground'>
            Continuous Learning
          </h2>
          <p className='text-card-foreground/60'>
            Always exploring new technologies and best practices
          </p>
        </div>
      </div>

      <p className='text-card-foreground/60 leading-relaxed'>
        Technology evolves rapidly, and I'm committed to staying current with
        the latest developments. I regularly explore emerging frameworks, attend
        conferences, and contribute to open-source projects to ensure I'm
        delivering solutions using the most effective and modern approaches
        available.
      </p>
    </motion.section>
  )
}
