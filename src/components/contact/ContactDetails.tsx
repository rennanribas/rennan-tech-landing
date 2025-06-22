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
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className='lg:col-span-2 space-y-8'
    >
      <div className='bg-card rounded-2xl p-8 shadow-sm border border-border h-full'>
        <h2 className='text-3xl font-bold text-card-foreground mb-8'>
          Contact Details
        </h2>

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
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className='flex items-start gap-4 p-4 rounded-xl hover:bg-background transition-colors group'
              >
                <div className='p-3 bg-primary/10 rounded-xl border border-primary/20 transition-colors'>
                  <IconComponent className='text-primary' size={24} />
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold text-card-foreground mb-1'>
                    {method.title}
                  </h3>
                  <p className='text-primary font-medium mb-1 break-all'>
                    {method.value}
                  </p>
                  <p className='text-sm text-card-foreground/70'>
                    {method.description}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}