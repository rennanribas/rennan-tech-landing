import {
  Award,
  Blocks,
  Cloud,
  Layers3,
  Smartphone,
} from 'lucide-react'
import type { Capability } from '../../hooks/useAboutData'

interface SkillsSectionProps {
  capabilities: Capability[]
}

const capabilityIcons = [Blocks, Layers3, Smartphone, Cloud]

export function SkillsSection({ capabilities }: SkillsSectionProps) {
  return (
    <section className='space-y-8 py-4'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3'>
          Core Capabilities
        </p>
        <h2 className='text-3xl font-bold text-foreground mb-4 flex items-center gap-3'>
          <Award className='text-primary' />
          The work I am usually brought in to do
        </h2>
        <p className='text-lg text-foreground/75 leading-relaxed'>
          I prefer showing capabilities over listing every tool I have touched.
          The recurring pattern in my career is helping teams design
          maintainable systems, ship product deliberately, and stay close to
          delivery from implementation through release.
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
          The exact stack changes by product, team, and stage. What stays
          consistent is the kind of work: clarifying architecture, closing the
          gap between product and implementation, and taking responsibility for
          how software behaves once it is actually in use.
        </p>
      </div>
    </section>
  )
}
