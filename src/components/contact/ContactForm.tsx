import { motion } from 'motion/react'
import { useActionState, useEffect, useRef } from 'react'
import { submitContactForm, type FormState } from '../../actions/contactActions'
import { SubmitButton } from '../SubmitButton'

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
      className='lg:col-span-3 bg-card rounded-2xl p-8 shadow-sm border border-border'
    >
      {/* Header skeleton */}
      <div className='h-8 bg-gradient-to-r from-muted/40 via-muted/60 to-muted/40 bg-[length:200%_100%] animate-shimmer rounded-lg w-48 mb-8' />

      <div className='space-y-6'>
        {/* Name and Email row */}
        <div className='grid md:grid-cols-2 gap-6'>
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
      className='lg:col-span-3 bg-card rounded-2xl p-8 shadow-sm border border-border'
    >
      <h2 className='text-3xl font-bold text-card-foreground mb-8'>
        Send a Message
      </h2>

      <form ref={formRef} action={formAction} className='space-y-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-card-foreground/80 mb-2'
            >
              Name *
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              className='w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors'
              placeholder='Your name'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-card-foreground/80 mb-2'
            >
              Email *
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              className='w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors'
              placeholder='your.email@example.com'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='subject'
            className='block text-sm font-medium text-card-foreground/80 mb-2'
          >
            Subject *
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            required
            className='w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors'
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-card-foreground/80 mb-2'
          >
            Message *
          </label>
          <textarea
            id='message'
            name='message'
            required
            rows={6}
            className='w-full px-4 py-3 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none'
            placeholder='Tell me about your project or inquiry...'
          />
        </div>

        <SubmitButton formState={state} />
        {state.message && (
          <p
            className={`text-sm mt-2 ${
              state.status === 'error' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </motion.section>
  )
}
