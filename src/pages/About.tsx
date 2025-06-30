import { motion } from 'motion/react'
import { useAboutData } from '../hooks/useAboutData'
import { PageTitle } from '../components/about/PageTitle'
import { ExperienceSection } from '../components/about/ExperienceSection'
import { SkillsSection } from '../components/about/SkillsSection'

export default function About() {
  const { experiences, skills } = useAboutData()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skills={skills} />
    </motion.div>
  )
}
