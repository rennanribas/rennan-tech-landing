import { motion } from 'motion/react'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContactForm, type FormState } from '../../actions/contactActions'
import { Button } from '../ui/Button'
import { MdSend } from 'react-icons/md'

const initialState: FormState = {
  status: 'idle',
  message: '',
}

interface ContactFormProps {
  isLoading?: boolean
}

function ContactFormSkeleton() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='lg:col-span-3 glass rounded-3xl p-6 sm:p-8 shadow-modern-lg border-modern'
    >
      {/* Header skeleton */}
      <div className='h-8 bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 bg-[length:200%_100%] animate-shimmer rounded-lg w-48 mb-8' />

      <div className='space-y-6'>
        {/* Name and Email row */}
        <div className='grid sm:grid-cols-2 gap-4 sm:gap-6'>
          <div className='space-y-2'>
            <div className='h-4 bg-muted/40 rounded w-16' />
            <div className='h-12 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 bg-[length:200%_100%] animate-shimmer rounded-xl' />
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-muted/40 rounded w-16' />
            <div className='h-12 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 bg-[length:200%_100%] animate-shimmer rounded-xl' />
          </div>
        </div>

        {/* Subject field */}
        <div className='space-y-2'>
          <div className='h-4 bg-muted/40 rounded w-20' />
          <div className='h-12 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 bg-[length:200%_100%] animate-shimmer rounded-xl' />
        </div>

        {/* Message field */}
        <div className='space-y-2'>
          <div className='h-4 bg-muted/40 rounded w-20' />
          <div className='h-32 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 bg-[length:200%_100%] animate-shimmer rounded-xl' />
        </div>

        {/* Submit button */}
        <div className='h-12 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:200%_100%] animate-shimmer rounded-xl w-32' />
      </div>
    </motion.section>
  )
}

function FormContent() {
  const { pending } = useFormStatus()

  return (
    <>
      <div className='grid sm:grid-cols-2 gap-4 sm:gap-6'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-foreground/80 mb-2'
          >
            Name *
          </label>
          <input
            type='text'
            id='name'
            name='name'
            required
            disabled={pending}
            className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 outline-none placeholder:text-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='Your Name'
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-foreground/80 mb-2'
          >
            Email *
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            disabled={pending}
            className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 outline-none placeholder:text-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='your.email@example.com'
          />
        </div>
      </div>

      <div>
        <label
          htmlFor='subject'
          className='block text-sm font-medium text-foreground/80 mb-2'
        >
          Subject *
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          required
          disabled={pending}
          className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 outline-none placeholder:text-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed'
          placeholder='What can I help you with?'
        />
      </div>

      <div>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-foreground/80 mb-2'
        >
          Message *
        </label>
        <textarea
          id='message'
          name='message'
          rows={5}
          required
          disabled={pending}
          className='w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 outline-none resize-none placeholder:text-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed'
          placeholder='Your message...'
        />
      </div>

      <Button type='submit' isLoading={pending}>
        Send Message <MdSend size={20} />
      </Button>
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
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='lg:col-span-3 glass rounded-3xl p-6 sm:p-8 shadow-modern-lg border-modern'
    >
      <motion.h2
        className='text-3xl sm:text-4xl font-bold text-foreground mb-6 sm:mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Send a Message
      </motion.h2>

      <motion.form
        ref={formRef}
        action={formAction}
        className='space-y-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <FormContent />
        {state.message && (
          <p
            className={`text-sm mt-2 ${
              state.status === 'error' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {state.message}
          </p>
        )}
      </motion.form>
    </motion.section>
  )
}
