import { motion } from 'motion/react'
import type { Technology } from '../types'

const proficiencyLevels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const levelWidth = {
  beginner: 'w-1/4',
  intermediate: 'w-2/4',
  advanced: 'w-3/4',
  expert: 'w-4/4',
}

const levelColor = {
  beginner: 'bg-red-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-green-500',
  expert: 'bg-blue-500',
}

interface TechnologyItemProps {
  tech: Technology
  categoryIndex: number
  techIndex: number
}

export default function TechnologyItem({
  tech,
  categoryIndex,
  techIndex,
}: TechnologyItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: categoryIndex * 0.2 + techIndex * 0.1,
      }}
      className='p-4 bg-mocha-50 rounded-xl border border-mocha-200'
    >
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold text-mocha-900'>{tech.name}</h3>
        <span className='text-sm font-medium text-mocha-600'>
          {proficiencyLevels[tech.level]}
        </span>
      </div>
      <p className='text-sm text-muted-foreground mb-2'>{tech.description}</p>

      <div className='w-full bg-gray-200 rounded-full h-2'>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: levelWidth[tech.level] }}
          transition={{
            duration: 1,
            delay: categoryIndex * 0.2 + techIndex * 0.1 + 0.5,
          }}
          className={`${levelColor[tech.level]} h-2 rounded-full`}
        />
      </div>
    </motion.div>
  )
}
