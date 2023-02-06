import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ExerciseList from '../../components/exercisesPage/ExerciseList'
import EmptyContainer from '../../components/EmptyContainer'
import { Topic, Exercise } from '../../types/topics'
import { useTopicStore } from '../../store'

//This is essentially the topics page, displaying the exercises. 

const TopicName = () => {
    const router = useRouter()
    const { topicName } = router.query
    const topicsData = useTopicStore(state => state.topics)
    

    if (topicName && topicsData.length > 0) {
        const exercises: Exercise[] = topicsData.filter(topic => topic.name === topicName)[0].exercises
        const topicId: string = topicsData.filter(topic => topic.name === topicName)[0]._id
        console.log("topicId from within TopicName",topicId)
        return (
            <MainLayout title={ topicName }>
                {exercises.length > 0 ? (<ExerciseList exercises={exercises} topicId={topicId}/>) : <EmptyContainer exercise topicId={topicId}/>}
            </MainLayout>
        )
    }

}

export default TopicName

