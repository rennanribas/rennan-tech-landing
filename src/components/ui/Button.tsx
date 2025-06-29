import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { HTMLMotionProps } from 'motion/react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'glass'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'group relative font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70'

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-white/20 shadow-lg hover:shadow-xl',
    secondary:
      'bg-white/10 border border-white/20 text-foreground backdrop-blur-md hover:backdrop-blur-lg hover:bg-white/20 shadow-lg hover:shadow-xl',
    glass:
      'bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)]',
  }

  return (
    <motion.button
      whileHover={{
        scale: isLoading ? 1 : 1.02,
        y: isLoading ? 0 : -2,
        boxShadow: isLoading
          ? '0 8px 25px rgba(31, 38, 135, 0.37)'
          : '0 12px 35px rgba(31, 38, 135, 0.5)',
      }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      disabled={isLoading || props.disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      )}
      {variant === 'glass' && (
        <div className='absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      )}
      <span className='relative z-10 flex items-center gap-2'>
        {isLoading ? 'Sending...' : children}
      </span>
    </motion.button>
  )
}
