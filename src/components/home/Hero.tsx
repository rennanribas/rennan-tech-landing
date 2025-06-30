import { MdEmail, MdArrowForward } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion, useScroll, useTransform } from 'motion/react'

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  return (
            <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden p-4'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]' />
      
      <motion.div 
        style={{ y, opacity }}
        className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 20,
            delay: 0.1 
          }}
        >
                              <motion.h1 
            className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 tracking-tight'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className='bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent'>
              Rennan Ribas
            </span>
          </motion.h1>
          
                              <motion.p 
            className='text-lg sm:text-2xl md:text-3xl text-foreground/90 mb-4 font-medium tracking-wide'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Senior Software Engineer
          </motion.p>
          
                              <motion.p 
            className='text-base sm:text-lg mb-8 text-foreground/80 max-w-3xl mx-auto leading-relaxed font-normal'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Architecting enterprise-grade solutions with 10+ years of expertise in 
            TypeScript, React, and cloud-native technologies. 
            Delivering scalable systems that drive business growth.
          </motion.p>

                    <motion.div 
            className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.95 }}
                            href='/contact'
              className='group relative bg-primary text-primary-foreground font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <span className='relative z-10'>Let's Collaborate</span>
              <MdArrowForward size={20} className='relative z-10 group-hover:translate-x-1 transition-transform duration-300' />
            </motion.a>

            <motion.a
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
              whileTap={{ scale: 0.95 }}
                            href='/about'
              className='inline-flex items-center gap-2 sm:gap-3 bg-transparent border-2 border-border/30 hover:border-primary/50 text-foreground px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-md w-full sm:w-auto justify-center'
            >
              View Portfolio
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className='flex items-center justify-center gap-4 sm:gap-6'
          >
            {[
              { href: 'mailto:rennanrr@gmail.com', icon: MdEmail, label: 'Email' },
              { href: 'https://github.com/rennanribas', icon: FaGithub, label: 'GitHub', external: true },
              { href: 'https://linkedin.com/in/rennan-ribas', icon: FaLinkedin, label: 'LinkedIn', external: true }
            ].map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  className='group relative p-4 text-foreground/60 hover:text-primary rounded-2xl transition-all duration-300 hover:bg-primary/5 hover:scale-110'
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    y: -2,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                >
                  <Icon size={24} className='transition-transform duration-300 group-hover:scale-110' />
                  <div className='absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10' />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
