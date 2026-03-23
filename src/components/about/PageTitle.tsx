export function PageTitle() {
  return (
    <section className='text-center py-16 sm:py-24 relative overflow-hidden'>
      <div className='absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10' />

      <p className='text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4'>
        About
      </p>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight'>
        Backend depth, product context, and pragmatic delivery.
      </h1>
      <p className='text-lg sm:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed'>
        I work across services, web applications, and delivery workflows,
        helping teams ship reliable software without adding unnecessary
        complexity. Most of my recent work centers on TypeScript, Node.js,
        NestJS, React, PostgreSQL, and AWS.
      </p>
    </section>
  )
}
