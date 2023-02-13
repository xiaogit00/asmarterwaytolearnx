import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ExerciseList from '../../components/exercisesPage/ExerciseList'
import EmptyContainer from '../../components/EmptyContainer'
import { Topic, Exercise } from '../../types/topics'
import { useTopicStore, useTopicIdStore } from '../../store'

//This is essentially the topics page, displaying the exercises. 

const TopicName = () => {
    const topicId = useTopicIdStore((state) => state.topicId)
    const topicsData = useTopicStore(state => state.topics)
    

    if (topicId && topicsData.length > 0) {
        const exercises: Exercise[] = topicsData.filter(topic => topic._id === topicId)[0].exercises
        console.log("topicId from within TopicName",topicId)
        return (
            <MainLayout title={ topicsData.filter(topic => topic._id === topicId)[0].name }>
                {exercises.length > 0 ? (<ExerciseList exercises={exercises} topicId={topicId}/>) : <EmptyContainer exercise topicId={topicId}/>}
            </MainLayout>
        )
    }

}

export default TopicName

