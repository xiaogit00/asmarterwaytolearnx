import { useRouter } from 'next/router'
import ExerciseLandingPage from '../../../../../components/ExerciseLanding'
import { Exercise as ExerciseType, Topic } from '../../../../../types/topics'
import { useTopicStore } from '../../../../../store'
import Navigator from '../../../../../components/Navigator'


const ExercisePage = () => {
  const router = useRouter()
  const { topicId, exerciseId } = router.query
  const topics = useTopicStore(state => state.topics)
  const topic = topics.filter(topic => topic._id === topicId)[0]  

  if (!topic?.exercises) return null
  const exercise = topic.exercises.filter(exercise => exercise._id === exerciseId)[0]
  return (
    <>
      <div className='text-center mb-8'>
          <h2 className='font-sans text-4xl font-semibold'>{topic.name}</h2>
      </div>
      <ExerciseLandingPage exercise={exercise}/>
      <Navigator />
    </>
)

  

  }

export default ExercisePage


