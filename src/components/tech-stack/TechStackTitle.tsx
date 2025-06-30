export default function TechStackTitle() {
  return (
    <section className='text-center py-16 sm:py-24 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)] -z-10' />
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight'>
        Tech Stack
      </h1>
      <p className='text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed'>
        A comprehensive overview of the technologies and tools I use to build
        modern, scalable applications.
      </p>
    </section>
  )
}
