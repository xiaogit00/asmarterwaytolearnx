import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { TopicsContext } from '../../contexts/TopicsContext'
import ExerciseList from '../../components/ExerciseList'
import EmptyContainer from '../../components/EmptyContainer'
import { Topic, Exercise } from '../../types/topics'

//This is essentially the topics page, displaying the exercises. 

const TopicName = () => {
    const router = useRouter()
    const { topicName } = router.query
    const topicsData = useContext(TopicsContext)

    if (topicName && topicsData) {
        
        const exercises: Exercise[] = topicsData.filter(topic => topic.name === topicName)[0].exercises
        const topicId: string = topicsData.filter(topic => topic.name === topicName)[0]._id
        
        return (
            <MainLayout title={ topicName }>
                {exercises.length > 0 ? (<ExerciseList exercises={exercises} topicId={topicId}/>) : <EmptyContainer exercise/>}
            </MainLayout>
        )
    }

}

export default TopicName

