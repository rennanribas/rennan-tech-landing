import { useAboutData } from '../hooks/useAboutData'
import { AboutHeader } from '../components/about/AboutHeader'
import { ExperienceSection } from '../components/about/ExperienceSection'
import { SkillsSection } from '../components/about/SkillsSection'

export default function About() {
  const { experiences, skills } = useAboutData()

  return (
    <div className='space-y-12 sm:space-y-16'>
      <AboutHeader />
      <div className='space-y-8 sm:space-y-12'>
        <ExperienceSection experiences={experiences} />
        <SkillsSection skills={skills} />
      </div>
    </div>
  )
}
