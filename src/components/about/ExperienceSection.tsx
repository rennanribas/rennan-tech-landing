import type { Experience } from '../../hooks/useAboutData'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className='space-y-6'>
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className='relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-6 sm:p-7 shadow-soft'
          >
            <div className='absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-primary/70 to-transparent' />

            <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
              <div className='sm:pr-8'>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary/70'>
                  {experience.company}
                </p>
                <h3 className='mt-2 text-2xl font-semibold text-card-foreground'>
                  {experience.title}
                </h3>
              </div>

              <p className='inline-flex w-fit items-center rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground/70'>
                {experience.period}
              </p>
            </div>

            <p className='mt-5 text-foreground/80 leading-relaxed'>
              {experience.summary}
            </p>

            {experience.highlights.length > 0 && (
              <ul className='mt-5 space-y-3'>
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className='flex items-start gap-3 text-foreground/80 leading-relaxed'
                  >
                    <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/70' />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className='mt-5 flex flex-wrap gap-2'>
              {experience.stack.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary'
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
    </section>
  )
}
