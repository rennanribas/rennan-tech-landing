import { motion } from 'motion/react'
import TechnologyItem from './TechnologyItem'
import type { TechCategory as Category } from '../types'

interface TechCategoryProps {
  category: Category
  categoryIndex: number
}

export default function TechCategory({
  category,
  categoryIndex,
}: TechCategoryProps) {
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
          className={`p-3 rounded-xl border ${category.color.replace(
            'text',
            'border'
          )}`}
        >
          <IconComponent className={category.color} size={32} />
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
          <TechnologyItem
            key={techIndex}
            tech={tech}
            categoryIndex={categoryIndex}
            techIndex={techIndex}
          />
        ))}
      </div>
    </motion.section>
  )
}
