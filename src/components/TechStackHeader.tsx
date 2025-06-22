import { motion } from 'motion/react'

export default function TechStackHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='text-center mb-16'
    >
      <h1 className='text-5xl md:text-6xl font-bold mb-6 text-foreground'>
        Tech Stack
      </h1>
      <p className='text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed'>
        A comprehensive overview of the technologies and tools I use to build
        modern, scalable applications.
      </p>
    </motion.div>
  )
}
