import { motion } from 'motion/react'

export function AboutHeader() {
  return (
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
  )
}