import create from 'zustand'
import produce from 'immer'
import { topics } from './data/topics'

const useTopicStore = create((set) => ({
    topics: [],
    setTopics: (data: any) => set({ topics: data}),
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
      )
  }))

  export { useTopicStore }