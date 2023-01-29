import create from 'zustand'
import produce from 'immer'
import { topics } from './data/topics'

const useTopicStore = create((set) => ({
    topics: [],
    fetchTopics: async () => {
      const res = await fetch('http://localhost:3000/api/topics')
      if (res.status === 200) {
        set({ topics: await res.json()})
      }
    },
    addTopic: (topicData: any) => 
      set(
        produce((draft) => {
          draft.topics.push({
            _id: topicData._id,
            userId: topicData.userId,
            name: topicData.name,
            exercises: topicData.exercises
          })
        })
      ), 
    deleteTopic: (topicId: string) =>
      set(
        produce((draft) => {
          const topicIndex = draft.topics.findIndex(item => item._id === topicId)
          draft.topics.splice(topicIndex, 1)
        })
      ),
    updateTopicName: (topicId: string, topicName: string) => 
      set(
        produce((draft) => {
          const topic = draft.topics.find((topic => topic._id === topicId))
          topic.name = topicName
        })
      ), 
    addExercise: (topicId:string, exerciseData: any) => 
      set(
        produce((draft) => {
          const topic = draft.topics.find(topic => topic._id === topicId)
          console.log("topic._id",topic._id)
          console.log("topicId",topicId)
          topic.exercises.push({
            _id: exerciseData._id,
            name: exerciseData.name,
            questions: exerciseData.questions
          })
        })
      ),
    deleteExercise: (topicId:string, exerciseId: string) =>
      set(
        produce((draft) => {
          const topic = draft.topics.find(topic => topic._id === topicId)
          const exerciseIndex = topic.exercises.findIndex(item => item._id === exerciseId)
          topic.exercises.splice(exerciseIndex, 1)
        })
    ),
    updateExercise: (topicId: string, exerciseId: string, exerciseName: string) => 
      set(
        produce((draft) => {
          const topic = draft.topics.find(topic => topic._id === topicId)
          const exercise = topic.exercises.find(exercise => exercise._id === exerciseId)
          exercise.name = exerciseName
        })
      )
  }))


  export { useTopicStore }