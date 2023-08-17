
import AddQuestionForm from '../../../../../../components/addQuestionPage/AddQuestionForm'
import { useRouter } from 'next/router'
import { useTopicStore } from '../../../../../../store'
import QuestionList from '../../../../../../components/QuestionList'
import Navigator from '../../../../../../components/Navigator'



const ViewQuestions = () => {
    const router = useRouter()
    const { topicId, exerciseId } = router.query
    const topics = useTopicStore(state => state.topics)
    const topic = topics.find(topic => topic._id === topicId)
    if (!topic) return null
    const exercise = topic.exercises.find(exercise => exercise._id === exerciseId)
    if (!exercise) return null
  return (
      <>
        <div className='text-center mb-8'>
            <h2 className='font-sans text-4xl font-semibold'>{exercise.name}</h2>
        </div>
        <div className='container mx-auto bg-white rounded-md w-3/4 p-8'>
            <QuestionList questions={exercise.questions}/>
        </div>
        <Navigator />
      </>
  )

  }

export default ViewQuestions


