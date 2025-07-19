import { motion } from 'motion/react'
import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const contactMethods = [
  {
    icon: MdEmail,
    title: 'Email',
    value: 'rennanrr@gmail.com',
    href: 'mailto:rennanrr@gmail.com',
    description: 'Best way to reach me for professional inquiries',
  },
  {
    icon: FaGithub,
    title: 'GitHub',
    value: 'github.com/rennanribas',
    href: 'https://github.com/rennanribas',
    description: 'Check out my open source projects and contributions',
  },
  {
    icon: FaLinkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/rennan-ribas',
    href: 'https://linkedin.com/in/rennan-ribas',
    description: 'Connect with me professionally',
  },
]

export function ContactDetails() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className='relative overflow-hidden'
    >
      {/* Apple Liquid Glass 2025 Container */}
      <div className='relative glass-surface glass-refraction glass-dispersion rounded-[28px] p-8 sm:p-12 shadow-glass hover:shadow-elevated transition-all duration-700'>
        {/* Apple 2025 Glass Highlight */}
        <div className='absolute inset-0 glass-highlight opacity-30 rounded-[28px]' />
        
        {/* Dynamic light reflections - Apple 2025 Style */}
        <motion.div
          className='absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent'
          animate={{ x: [-20, 20] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent'
          animate={{ y: [-10, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className='relative z-10'>
          <motion.h2 
            className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent mb-8 sm:mb-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Let's Connect
          </motion.h2>

          <div className='space-y-6'>
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    method.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className='flex items-start gap-6 p-6 rounded-2xl glass-subtle hover:glass-highlight transition-all duration-300 group border border-white/10 hover:border-white/20'
                >
                  <motion.div 
                    className='p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl border border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20'
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className='text-primary' size={28} />
                  </motion.div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-foreground mb-2 text-lg group-hover:text-primary transition-colors'>
                      {method.title}
                    </h3>
                    <p className='text-primary font-semibold mb-2 break-all text-base'>
                      {method.value}
                    </p>
                    <p className='text-foreground/70 leading-relaxed'>
                      {method.description}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
