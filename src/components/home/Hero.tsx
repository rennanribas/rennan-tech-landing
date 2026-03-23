import { MdEmail } from 'react-icons/md'
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
            delay: 0.1,
          }}
        >
          <motion.h1
            className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 tracking-tight'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
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
            Architecting enterprise-grade solutions with 10+ years of expertise
            in TypeScript, React, and cloud-native technologies. Delivering
            scalable systems that drive business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className='flex items-center justify-center gap-4 sm:gap-6'
          >
            {[
              {
                href: 'mailto:rennanrr@gmail.com',
                icon: MdEmail,
                label: 'Email',
              },
              {
                href: 'https://github.com/rennanribas',
                icon: FaGithub,
                label: 'GitHub',
                external: true,
              },
              {
                href: 'https://linkedin.com/in/rennan-ribas',
                icon: FaLinkedin,
                label: 'LinkedIn',
                external: true,
              },
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
                    transition: { type: 'spring', stiffness: 400, damping: 10 },
                  }}
                >
                  <Icon
                    size={24}
                    className='transition-transform duration-300 group-hover:scale-110'
                  />
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
