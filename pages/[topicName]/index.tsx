import React from 'react'
import ExerciseList from '../../components/exercisesPage/ExerciseList'
import EmptyContainer from '../../components/EmptyContainer'
import { Topic, Exercise } from '../../types/topics'
import { useTopicStore, useTopicIdStore } from '../../store'


//This is essentially the topics page, displaying the exercises. 

const TopicName = () => {
    const topicId = useTopicIdStore((state) => state.topicId)
    const topicsData = useTopicStore(state => state.topics)
    console.log(topicsData)
    


    if (topicId && topicsData.length > 0) {
        const exercises: Exercise[] = topicsData.filter(topic => topic._id === topicId)[0].exercises
        return (
            <>
                <div className='text-center mb-24'>
                    <h2 className='font-sans text-4xl font-semibold'>{}</h2>
                </div>
                {exercises.length > 0 ? (<ExerciseList exercises={exercises} topicId={topicId}/>) : <EmptyContainer exercise topicId={topicId}/>}
            </>
            
        )
    }

}

export default TopicName

