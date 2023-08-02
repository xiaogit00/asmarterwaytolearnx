
import AddQuestionForm from '../../../../../../components/addQuestionPage/AddQuestionForm'
import { useRouter } from 'next/router'
import { useTopicStore } from '../../../../../../store'
import QuestionList from '../../../../../../components/QuestionList'



const ViewQuestions = () => {
    const router = useRouter()
    const { topicId, exerciseId } = router.query
    const topics = useTopicStore(state => state.topics)
    const topic = topics.filter(topic => topic._id === topicId)[0]
    const exercise = topic.exercises.filter(exercise => exercise._id === exerciseId)[0]
  return (
      <>
        <div className='text-center mb-8'>
            <h2 className='font-sans text-4xl font-semibold'>{exercise.name}</h2>
        </div>
        <div className='container mx-auto bg-white rounded-md w-3/4 p-8'>
            <QuestionList questions={exercise.questions}/>
        </div>
      </>
  )

  }

export default ViewQuestions


