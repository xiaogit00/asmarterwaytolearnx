import { create } from 'zustand'
import produce from 'immer'
import { topics } from './data/topics'
import { Topic, Question } from './types/topics'
import { Exercise } from './types/topics'
import { deleteExercise } from './services/exerciseService'
import { persist, createJSONStorage } from 'zustand/middleware'

interface TopicState {
  topics: Topic[],
  selectedTopicId: string,
  setSelectedTopicId: (topicId: string) => void,
  fetchTopics: () => void,
  addTopic: (topicData: any) => void,
  deleteTopic: (topicId: string) => void,
  updateTopicName: (topicId: string, topicName: string) => void,
  addExercise: (topicId:string, exerciseData: any) => void,
  deleteExercise: (topicId:string, exerciseId: string) => void,
  updateExercise: (topicId: string, exerciseId: string, exerciseName: string) => void,
  bulkAddQuestions: (topicId: string, exerciseId: string, questions: Question[]) => void
}

const useTopicStore = create<TopicState>((set) => ({
    topics: [],
    selectedTopicId: '',
    setSelectedTopicId: (topicId: string) => set({selectedTopicId: topicId}),
    fetchTopics: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/topics')
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
          const topicIndex = draft.topics.findIndex((topic: Topic) => topic._id === topicId)
          draft.topics.splice(topicIndex, 1)
        })
      ),
    updateTopicName: (topicId: string, topicName: string) => 
      set(
        produce((draft) => {
          const topic = draft.topics.find(((topic: Topic) => topic._id === topicId))
          topic.name = topicName
        })
      ), 
    addExercise: (topicId:string, exerciseData: any) => 
      set(
        produce((draft) => {
          const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
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
          const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
          const exerciseIndex = topic.exercises.findIndex((exercise: Exercise) => exercise._id === exerciseId)
          topic.exercises.splice(exerciseIndex, 1)
        })
    ),
    updateExercise: (topicId: string, exerciseId: string, exerciseName: string) => 
      set(
        produce((draft) => {
          const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
          const exercise = topic.exercises.find((exercise: Exercise) => exercise._id === exerciseId)
          exercise.name = exerciseName
        })
      ),
      bulkAddQuestions: (topicId: string, exerciseId: string, questions: Question[]) => {
        set(
          produce((draft) => {
            const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
            const exercise = topic.exercises.find((exercise: Exercise) => exercise._id === exerciseId)
            exercise.questions = questions
          })
        )
      }
  }))

  interface TopicIdState {
    topicId: string,
    setTopicId: (topicId: string) => void
  }

 const useTopicIdStore = create<TopicIdState>()(
    persist(
      (set, get) => ({
        topicId: '',
        setTopicId: (topicId: string) => set({ topicId: topicId }),
      }),
      {
        name: 'selectedTopicId', // name of item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage) // (optional) by default the 'localStorage' is used
      }
    )
  )


  


  export { useTopicStore, useTopicIdStore }