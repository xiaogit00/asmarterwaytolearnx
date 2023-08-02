import React from 'react'
import ExerciseList from '../../../components/exercisesPage/ExerciseList'
import EmptyContainer from '../../../components/EmptyContainer'
import { Topic, Exercise } from '../../../types/topics'
import { useTopicStore } from '../../../store'
import { useRouter } from 'next/router'


//This is essentially the topics page, displaying the exercises. 

const TopicsPage = () => {
    const router = useRouter()
    const { topicId } = router.query
    const topics = useTopicStore(state => state.topics)
    const topic = topics.filter(topic => topic._id === topicId)[0]

    if (topicId && topics.length > 0) {
        const exercises: Exercise[] = topic.exercises
        console.log("exercises",exercises)
        return (
            <>
                <div className='text-center mb-24'>
                    <h2 className='font-sans text-4xl font-semibold'>{topic.name}</h2>
                </div>
                {exercises.length > 0 ? (<ExerciseList exercises={exercises} />) : <EmptyContainer exercise />}
            </>
            
        )
    }

}

export default TopicsPage

