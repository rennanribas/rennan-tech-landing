import { MdEmail, MdArrowForward } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'motion/react'

export function Hero() {
  return (
    <section className='flex-1 flex items-center justify-center bg-background p-6'>
      <div className='max-w-4xl mx-auto px-6 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
        >
          <h1 className='text-5xl md:text-7xl font-bold text-foreground mb-4'>
            Rennan Ribas
          </h1>
          <p className='text-lg md:text-2xl text-foreground/80 mb-8'>
            Senior Software Engineer
          </p>
          <p className='text-lg mb-8 text-foreground/60 max-w-2xl mx-auto leading-relaxed'>
            10+ years delivering scalable, cloud-native applications with
            expertise in TypeScript, React, NestJS, and modern cloud
            architectures
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-12'>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='/contact'
              className='bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2'
            >
              Let's Talk <MdArrowForward size={20} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href='/about'
              className='inline-flex items-center gap-2 bg-card hover:bg-card/90 text-card-foreground px-8 py-3 rounded-lg font-semibold transition-colors border border-border shadow-sm'
            >
              Learn More
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='flex items-center justify-center gap-6'
          >
            <a
              href='mailto:rennanrr@gmail.com'
              className='p-3 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-200 shadow-sm hover:shadow-md'
              aria-label='Email'
            >
              <MdEmail size={24} />
            </a>
            <a
              href='https://github.com/rennanribas'
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-200 shadow-sm hover:shadow-md'
              aria-label='GitHub'
            >
              <FaGithub size={24} />
            </a>
            <a
              href='https://linkedin.com/in/rennan-ribas'
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-200 shadow-sm hover:shadow-md'
              aria-label='LinkedIn'
            >
              <FaLinkedin size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
