import { Button } from 'antd'
import { useRouter } from 'next/router'
import { RouterQueryString } from '../types/router';
import { useTopicStore } from '../store';
import { filterExerciseQuestions } from './exercisePageHelpers';
import { Exercise } from '../types/topics';
import Link from 'next/link'
import EmptyContainer from './EmptyContainer';

const ExerciseLandingPage = ({ exercise }: {exercise : Exercise}): JSX.Element => {
    const router = useRouter()
    const { topicId, exerciseId } = router.query
    
    
    if (exercise.questions && exercise.questions.length > 0) {
        return (
            <>
                <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 pt-64'>
                    <p className='w-3/4 text-5xl text-center mb-32 font-semibold'>Are you ready to begin your journey with {exercise.name}??</p>
                    <Link href={'/topic/' + topicId + '/ex/' + exerciseId + '/qn/' + 1}><Button size={'large'}> Begin</Button></Link>
                    <div className='mt-32'>No. of qns in this exercise: {exercise.questions.length}</div>
                    <div className='m-16 flex gap-8'>
                        <Link href={'/topic/' + topicId + '/ex/' + exerciseId + '/qn/add-questions'}><Button> Add Question</Button></Link>
                        <Link href={'/topic/' + topicId + '/ex/' + exerciseId + '/qn/view-questions' }><Button> View Questions</Button></Link>
                    </div>
                    
                </div>

                
            </>
            
        )
    } else {
        return (
            <>
                <EmptyContainer question/>
            </>
            
        )
    }
}

export default ExerciseLandingPage