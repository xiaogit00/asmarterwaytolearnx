import { useRouter } from 'next/router'
import ExerciseLandingPage from '../../../components/ExerciseLanding'
import { useTopicStore } from '../../../store'


const Exercise = () => {
  const router = useRouter()
  const exerciseName = router.query.exerciseName
  return (
      <>
        <div className='text-center mb-24'>
            <h2 className='font-sans text-4xl font-semibold'>{exerciseName}</h2>
        </div>
          <ExerciseLandingPage exerciseName={exerciseName}/>
      </>
  )

  }

export default Exercise


