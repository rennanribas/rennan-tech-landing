import { motion } from 'motion/react'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContactForm, type FormState } from '../../actions/contactActions'
import { Button } from '../ui/Button'
import { MdSend, MdPerson, MdEmail, MdSubject, MdMessage } from 'react-icons/md'

const initialState: FormState = {
  status: 'idle',
  message: '',
}

interface ContactFormProps {
  isLoading?: boolean
}

const ContactFormSkeleton = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className='relative overflow-hidden rounded-2xl glass-surface glass-refraction glass-dispersion shadow-glass'
  >
    {/* Apple Liquid Glass 2025 Effects */}
    <div className='absolute inset-0 glass-highlight opacity-40' />
    <div className='absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8' />

    {/* Dynamic Light Reflections - Apple 2025 Style */}
    <motion.div
      className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent'
      animate={{ x: [-100, 100] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className='absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent'
      animate={{ y: [-50, 50] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />

    <div className='relative z-20 p-8 space-y-6'>
      {/* Form Fields Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <div className='h-4 bg-muted/30 rounded animate-pulse' />
          <div className='h-12 glass-subtle rounded-lg animate-pulse' />
        </div>
        <div className='space-y-2'>
          <div className='h-4 bg-muted/30 rounded animate-pulse' />
          <div className='h-12 glass-subtle rounded-lg animate-pulse' />
        </div>
      </div>

      <div className='space-y-2'>
        <div className='h-4 bg-muted/30 rounded animate-pulse' />
        <div className='h-12 glass-subtle rounded-lg animate-pulse' />
      </div>

      <div className='space-y-2'>
        <div className='h-4 bg-muted/30 rounded animate-pulse' />
        <div className='h-32 glass-subtle rounded-lg animate-pulse' />
      </div>

      <div className='h-12 glass rounded-lg animate-pulse' />
    </div>
  </motion.section>
)

function FormContent() {
  const { pending } = useFormStatus()

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border transition-all duration-300 ease-out
    glass-surface backdrop-blur-md relative z-10
    text-foreground placeholder:text-muted-foreground
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
    hover:glass-highlight hover:shadow-soft
    disabled:opacity-50 disabled:cursor-not-allowed
    before:absolute before:inset-0 before:glass-refraction before:opacity-30
  `

  const labelClasses = `
    block text-sm font-medium text-foreground mb-2
    transition-colors duration-200 relative z-10
  `

  return (
    <>
      <motion.div
        className='grid sm:grid-cols-2 gap-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className='relative'
        >
          <label htmlFor='name' className={labelClasses}>
            <MdPerson className='w-4 h-4 text-primary inline mr-2' />
            Name
          </label>
          <div className='relative'>
            <input
              type='text'
              id='name'
              name='name'
              required
              disabled={pending}
              className={inputClasses}
              placeholder='Your full name'
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className='relative'
        >
          <label htmlFor='email' className={labelClasses}>
            <MdEmail className='w-4 h-4 text-primary inline mr-2' />
            Email
          </label>
          <div className='relative'>
            <input
              type='email'
              id='email'
              name='email'
              required
              disabled={pending}
              className={inputClasses}
              placeholder='your.email@example.com'
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
        className='relative'
      >
        <label htmlFor='subject' className={labelClasses}>
          <MdSubject className='w-4 h-4 text-primary inline mr-2' />
          Subject
        </label>
        <div className='relative'>
          <input
            type='text'
            id='subject'
            name='subject'
            required
            disabled={pending}
            className={inputClasses}
            placeholder="What's this about?"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className='relative'
      >
        <label htmlFor='message' className={labelClasses}>
          <MdMessage className='w-4 h-4 text-primary inline mr-2' />
          Message
        </label>
        <div className='relative'>
          <textarea
            id='message'
            name='message'
            required
            disabled={pending}
            rows={6}
            className={inputClasses}
            placeholder='Tell me about your project, ideas, or how we can work together...'
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button type='submit' isLoading={pending} variant='glass'>
          <MdSend size={20} />
          Send Message
        </Button>
      </motion.div>
    </>
  )
}

export function ContactForm({ isLoading = false }: ContactFormProps) {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state])

  if (isLoading) {
    return <ContactFormSkeleton />
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className='lg:col-span-3 relative overflow-hidden rounded-[28px] '
    >
      {/* Apple Liquid Glass 2025 Container */}
      <div className='relative glass-surface glass-refraction glass-dispersion rounded-[28px] p-8 sm:p-10 shadow-glass hover:shadow-elevated transition-all duration-700'>
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
            Send a Message
          </motion.h2>

          <motion.form
            ref={formRef}
            action={formAction}
            className='space-y-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FormContent />

            {state.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-2xl border backdrop-blur-sm ${
                  state.status === 'error'
                    ? 'bg-red-500/10 border-red-500/20 text-red-600'
                    : 'bg-green-500/10 border-green-500/20 text-green-600'
                }`}
              >
                <p className='text-sm font-medium'>{state.message}</p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </motion.section>
  )
}
