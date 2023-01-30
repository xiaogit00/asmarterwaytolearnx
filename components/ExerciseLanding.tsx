import { Button } from 'antd'
import { useRouter } from 'next/router'
import { RouterQueryString } from '../types/router';
import { useTopicStore } from '../store';
import { filterExerciseQuestions } from './exercisePageHelpers';

const ExerciseLandingPage = ({ exerciseName }: {exerciseName : string | string[] | undefined}): JSX.Element => {
    const router = useRouter()
    const topicName: RouterQueryString = router.query.topicName
    const questionNumberMinusOne: RouterQueryString = router.query.questionId
    const questionNumber = Number(questionNumberMinusOne) - 1
    
    const topics = useTopicStore(state => state.topics)
    const exerciseQuestions = filterExerciseQuestions(topics, topicName, exerciseName)
    
    if (exerciseQuestions && exerciseQuestions.length > 0) {
        return (
            <>
                <p>Alright, are you ready to start your journey with {exerciseName}??</p>
                <Button href={'./' + exerciseName + '/' + 1}> Begin</Button>
            </>
            
        )
    } else {
        return (
            <>
                <p>There are no questions in this exercise. Pls upload some questions.</p>
            </>
            
        )
    }
}

export default ExerciseLandingPage