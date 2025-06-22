import { useTechStack } from '../hooks/useTechStack'
import TechCategory from '../components/tech-stack/TechCategory'
import TechStackHeader from '../components/tech-stack/TechStackHeader'
import ContinuousLearning from '../components/ContinuousLearning'

export default function TechStack() {
  const { categories } = useTechStack()

  return (
    <div className='min-h-screen'>
      <div className='space-y-12'>
        <TechStackHeader />
        <div className='space-y-12'>
          {categories.map((category, categoryIndex) => (
            <TechCategory
              key={categoryIndex}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
        <ContinuousLearning />
      </div>
    </div>
  )
}
