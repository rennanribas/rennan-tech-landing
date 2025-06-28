import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function Button({ 
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props 
}: ButtonProps) {

  const baseClasses = 'group relative font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70'

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-transparent border-2 border-border/30 hover:border-primary/50 text-foreground backdrop-blur-sm hover:backdrop-blur-md'
  }

  return (
    <motion.button
      whileHover={{ 
        scale: isLoading ? 1 : 1.05, 
        y: isLoading ? 0 : -3,
        boxShadow: isLoading ? '0 10px 20px rgba(0,0,0,0.1)' : '0 20px 40px rgba(0,0,0,0.15)'
      }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      disabled={isLoading || props.disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <div className='absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      )}
      <span className='relative z-10 flex items-center gap-2'>
        {isLoading ? 'Sending...' : children}
      </span>
    </motion.button>
  )
}
