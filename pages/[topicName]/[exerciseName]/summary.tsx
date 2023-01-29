import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router'
import ExerciseLandingPage from '../../../components/ExerciseLanding'
import { useTopicStore } from '../../../store'
import { withRouter } from 'next/router'


const Summary = () => {
  const router = useRouter()
  const exerciseName = router.query.exerciseName
  return (
      <MainLayout>
          <p>End of Exercise. You got: {router.query.numCorrect}/{router.query.maxQuestions} correct</p>
      </MainLayout>
  )

  }

export default withRouter(Summary)


