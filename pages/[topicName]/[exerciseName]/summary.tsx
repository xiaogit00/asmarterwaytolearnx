import { useRouter } from 'next/router'
import { withRouter } from 'next/router'


const Summary = () => {
  const router = useRouter()
  const exerciseName = router.query.exerciseName
  return (
      <>
        <p>End of Exercise. You got: {router.query.numCorrect}/{router.query.maxQuestions} correct</p>
      </>
          
  )

  }

export default withRouter(Summary)


