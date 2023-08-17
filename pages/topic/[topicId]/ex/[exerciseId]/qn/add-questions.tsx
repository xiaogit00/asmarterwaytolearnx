import { useRouter } from 'next/router'
import ExerciseLandingPage from '../../../../../../components/ExerciseLanding'
import { useTopicStore } from '../../../../../../store'
import AddQuestionForm from '../../../../../../components/addQuestionPage/AddQuestionForm'
import Navigator from '../../../../../../components/Navigator'


const AddQuestions = () => {
  return (
      <>
        <div className='container mx-auto bg-white rounded-md w-3/4 py-40'>
            <AddQuestionForm />
        </div>
        <Navigator />
      </>
  )

  }

export default AddQuestions


