'use client'

import { useFormStatus } from 'react-dom'
import { motion } from 'motion/react'
import { MdSend } from 'react-icons/md'
import type { FormState } from '../actions/contactActions'

export function SubmitButton({ formState }: { formState: FormState }) {
  const { pending } = useFormStatus()

  const getButtonClass = () => {
    if (pending) {
      return 'bg-mocha-300 text-mocha-600 cursor-not-allowed'
    }
    switch (formState.status) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      default:
        return 'bg-dusk-600 hover:bg-dusk-700 text-white shadow-lg hover:shadow-xl'
    }
  }

  const getButtonText = () => {
    if (pending) {
      return 'Sending...'
    }
    if (formState.status === 'success') {
      return 'Message Sent!'
    }
    if (formState.status === 'error') {
      return 'Error - Try Again'
    }
    return (
      <>
        Send Message <MdSend size={20} />
      </>
    )
  }

  return (
    <motion.button
      type='submit'
      disabled={pending}
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: pending ? 1 : 0.98 }}
      className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${getButtonClass()}`}
    >
      {getButtonText()}
    </motion.button>
  )
}