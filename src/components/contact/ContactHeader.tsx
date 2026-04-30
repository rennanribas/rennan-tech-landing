import { useI18n } from '@/i18n'

export function ContactHeader() {
  const { messages } = useI18n()
  const { header } = messages.contact

  return (
    <section className='text-center py-16 sm:py-24 relative overflow-hidden'>
      <div className='absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10' />

      <p className='text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4'>
        {header.eyebrow}
      </p>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight'>
        {header.title}
      </h1>
      <p className='text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed'>
        {header.description}
      </p>
    </section>
  )
}
