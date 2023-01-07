import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router'
import ExerciseLandingPage from '../../../components/ExerciseLanding'


const Exercise = () => {
  const router = useRouter()
  const exerciseName = router.query.exerciseName

  return (
      <MainLayout>
          <ExerciseLandingPage exerciseName={exerciseName}/>
      </MainLayout>
  )

  }

export default Exercise


