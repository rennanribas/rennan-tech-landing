import type { ElementType } from 'react'

export interface Technology {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  description: string
}

export interface TechCategory {
  icon: ElementType
  title: string
  description: string
  color: string
  technologies: Technology[]
}
