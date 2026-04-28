import { MessageSquare } from 'lucide-react'
import type { ContactMethod } from '../../hooks/useContactData'

interface ContactDetailsProps {
  methods: ContactMethod[]
}

export function ContactDetails({ methods }: ContactDetailsProps) {
  return (
    <section className='space-y-8 py-4'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3'>
          Channels
        </p>
        <h2 className='text-3xl font-bold text-foreground mb-4 flex items-center gap-3'>
          <MessageSquare className='text-primary' />
          Where to find me
        </h2>
        <p className='text-lg text-foreground/75 leading-relaxed'>
          Pick whichever channel fits the conversation. Email is the most
          reliable for anything substantive; the others are great for
          short-form context or to see what I&apos;ve been building.
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        {methods.map((method) => {
          const Icon = method.icon
          return (
            <a
              key={method.title}
              href={method.href}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noopener noreferrer' : undefined}
              className='group flex h-full flex-col rounded-2xl border border-border/70 bg-card/90 p-6 sm:p-7 shadow-soft transition-colors hover:border-primary/40'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='text-2xl font-semibold text-card-foreground'>
                  {method.title}
                </h3>
              </div>

              <p className='mt-5 text-foreground/80 leading-relaxed'>
                {method.description}
              </p>

              <p className='mt-6 break-all text-sm font-mono text-primary/90'>
                {method.value}
              </p>
            </a>
          )
        })}
      </div>
    </section>
  )
}
