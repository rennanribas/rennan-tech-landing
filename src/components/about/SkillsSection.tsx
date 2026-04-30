import {
  Award,
  Blocks,
  Cloud,
  Layers3,
  Smartphone,
} from 'lucide-react'
import { useI18n } from '@/i18n'
import type { Capability } from '../../hooks/useAboutData'

interface SkillsSectionProps {
  capabilities: Capability[]
}

const capabilityIcons = [Blocks, Layers3, Smartphone, Cloud]

export function SkillsSection({ capabilities }: SkillsSectionProps) {
  const { messages } = useI18n()
  const { capabilitiesSection } = messages.about

  return (
    <section className='space-y-8 py-4'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3'>
          {capabilitiesSection.eyebrow}
        </p>
        <h2 className='text-3xl font-bold text-foreground mb-4 flex items-center gap-3'>
          <Award className='text-primary' />
          {capabilitiesSection.title}
        </h2>
        <p className='text-lg text-foreground/75 leading-relaxed'>
          {capabilitiesSection.description}
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        {capabilities.map((capability, index) => {
          const Icon = capabilityIcons[index] ?? Award

          return (
            <article
              key={capability.title}
              className='rounded-2xl border border-border/70 bg-card/90 p-6 sm:p-7 shadow-soft'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='text-2xl font-semibold text-card-foreground'>
                  {capability.title}
                </h3>
              </div>

              <p className='mt-5 text-foreground/80 leading-relaxed'>
                {capability.description}
              </p>

              <ul className='mt-5 space-y-3'>
                {capability.focus.map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-3 text-foreground/80 leading-relaxed'
                  >
                    <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/70' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className='mt-6 flex flex-wrap gap-2'>
                {capability.tools.map((tool) => (
                  <span
                    key={tool}
                    className='rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary'
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>

      <div className='rounded-2xl border border-border/70 bg-muted/40 p-6 sm:p-7'>
        <p className='text-foreground/75 leading-relaxed'>
          {capabilitiesSection.closing}
        </p>
      </div>
    </section>
  )
}
