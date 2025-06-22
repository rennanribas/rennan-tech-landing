import { motion } from 'motion/react'
import type { Technology } from '../../types'

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
  beginner: 'bg-primary/40',
  intermediate: 'bg-primary/60',
  advanced: 'bg-primary/80',
  expert: 'bg-primary',
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
      className='p-4 bg-card-foreground/5 rounded-xl border border-border'
    >
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold text-card-foreground'>{tech.name}</h3>
        <span className='text-sm font-medium text-card-foreground/60'>
          {proficiencyLevels[tech.level]}
        </span>
      </div>
      <p className='text-sm text-card-foreground/80 mb-2'>{tech.description}</p>

      <div className='w-full bg-muted rounded-full h-2'>
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
