import type { ComponentType } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export interface ContactMethod {
  title: string
  value: string
  href: string
  description: string
  icon: ComponentType<{ className?: string; size?: number }>
  external?: boolean
}

export function useContactData(): { methods: ContactMethod[] } {
  const methods: ContactMethod[] = [
    {
      title: 'Email',
      value: 'rennanrr@gmail.com',
      href: 'mailto:rennanrr@gmail.com',
      description:
        'Best place for project inquiries, consulting, or anything that needs more than a few lines.',
      icon: MdEmail,
    },
    {
      title: 'GitHub',
      value: 'github.com/rennanribas',
      href: 'https://github.com/rennanribas',
      description:
        'Where I keep open-source work, experiments, and the source for this site itself.',
      icon: FaGithub,
      external: true,
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/rennan-ribas',
      href: 'https://linkedin.com/in/rennan-ribas',
      description:
        'Professional network, role history, and the easiest place to start a conversation about work.',
      icon: FaLinkedin,
      external: true,
    },
  ]

  return { methods }
}
