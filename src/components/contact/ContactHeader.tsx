import { motion } from 'motion/react'

export function ContactHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='text-center mb-16'
    >
      <h1 className='text-5xl md:text-6xl font-bold mb-6 text-foreground'>
        Get In Touch
      </h1>
      <p className='text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed'>
        Ready to discuss your next project? I'd love to hear from you. Let's
        build something amazing together.
      </p>
    </motion.div>
  )
}