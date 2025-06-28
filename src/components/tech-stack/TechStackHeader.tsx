import { motion } from 'motion/react'

export default function TechStackHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className='text-center py-16 sm:py-24 relative overflow-hidden'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)] -z-10' />
      <motion.h1 
        className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Tech Stack
      </motion.h1>
      <motion.p 
        className='text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        A comprehensive overview of the technologies and tools I use to build
        modern, scalable applications.
      </motion.p>
    </motion.header>
  )
}
