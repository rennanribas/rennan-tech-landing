import { motion } from 'motion/react'
import { useActionState, useEffect, useRef } from 'react'
import { submitContactForm, type FormState } from '../../actions/contactActions'
import { SubmitButton } from '../SubmitButton'

const initialState: FormState = {
  status: 'idle',
  message: '',
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state])

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