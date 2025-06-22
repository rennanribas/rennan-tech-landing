import { useTechStack } from '../hooks/useTechStack'
import TechCategory from '../components/TechCategory'
import ContinuousLearning from '../components/ContinuousLearning'
import TechStackHeader from '../components/TechStackHeader'


export default function TechStack() {
  const { categories } = useTechStack()

  return (
    <>
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
    </>
  )
}
