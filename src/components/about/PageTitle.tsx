export function PageTitle() {
  return (
    <section className='text-center py-16 sm:py-24 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)] -z-10' />
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight'>
        About Me
      </h1>
      <p className='text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed'>
        I'm a passionate software developer with a focus on creating elegant,
        efficient, and user-friendly solutions that make a real impact.
      </p>
    </section>
  )
}
