import { useTechStack } from '../hooks/useTechStack'
import TechCategory from '../components/tech-stack/TechCategory'
import TechStackTitle from '../components/tech-stack/TechStackTitle'
import ContinuousLearning from '../components/ContinuousLearning'

export default function TechStack() {
  const { categories } = useTechStack()

  return (
    <div className='space-y-8 sm:space-y-12'>
      <TechStackTitle />
      <section className='space-y-8 sm:space-y-12'>
        {categories.map((category, categoryIndex) => (
          <TechCategory
            key={categoryIndex}
            category={category}
            categoryIndex={categoryIndex}
          />
        ))}
      </section>
      <ContinuousLearning />
    </div>
  )
}
