import { Award, User } from 'lucide-react'

interface SkillCategory {
  category: string
  items: string[]
}

interface SkillsSectionProps {
  skills: SkillCategory[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section>
      <h2 className='text-3xl font-bold text-foreground mb-8 flex items-center gap-3'>
        <Award className='text-primary' />
        Skills & Expertise
      </h2>
      <div className='space-y-8'>
        {skills.map((skillCategory, index) => (
          <div
            key={index}
            className='bg-card border border-border rounded-xl p-6'
          >
            <h3 className='text-xl font-semibold text-card-foreground mb-4 flex items-center gap-3'>
              <User className='text-primary/90' />
              {skillCategory.category}
            </h3>
            <div className='flex flex-wrap gap-3'>
              {skillCategory.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className='bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}