import { create } from 'zustand'
import produce from 'immer'
import { topics } from './data/topics'
import { Topic, Question, NewQuestion } from './types/topics'
import { Exercise } from './types/topics'
import { deleteExercise } from './services/exerciseService'
import { persist, createJSONStorage } from 'zustand/middleware'

interface TopicState {
  topics: Topic[],
  fetchTopics: () => void,
  addTopic: (topicData: any) => void,
  deleteTopic: (topicId: string) => void,
  updateTopicName: (topicId: string, topicName: string) => void,
  addExercise: (topicId:string, exerciseData: any) => void,
  deleteExercise: (topicId:string, exerciseId: string) => void,
  updateExercise: (topicId: string, exerciseId: string, exerciseName: string) => void,
  bulkAddQuestions: (topicId: string, exerciseId: string, questions: Question[]) => void,
  addQuestion: (topicId: string, exerciseId: string, question: NewQuestion) => void,
  updateQuestion: (topicId: string, exerciseId: string, questionId: string, question: Question) => void,
  deleteQuestion: (topicId: string, exerciseId: string, questionId: string) => void
}

const useTopicStore = create<TopicState>((set) => ({
    topics: [],
    fetchTopics: async () => {
      const res = await fetch(window.location.origin+'/api/topics')
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
    },
    addQuestion: (topicId:string, exerciseId: string, question: NewQuestion) => 
    set(
      produce((draft) => {
        const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
        const exerciseIndex = topic.exercises.findIndex((exercise: Exercise) => exercise._id === exerciseId)
        topic.exercises[exerciseIndex].questions.push(question)
      })
    ),
    updateQuestion: (topicId: string, exerciseId: string, questionId: string, question: Question) => {
      set(
        produce((draft) => {
          const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
          const exerciseIndex = topic.exercises.findIndex((exercise: Exercise) => exercise._id === exerciseId)
          const questionIndex = topic.exercises[exerciseIndex].questions.findIndex((question: Question) => question._id === questionId)
          topic.exercises[exerciseIndex].questions[questionIndex] = question
        })
      )
    },
    deleteQuestion: (topicId: string, exerciseId: string, questionId: string) => {
      set(
        produce((draft) => {
          const topic = draft.topics.find((topic: Topic) => topic._id === topicId)
          const exerciseIndex = topic.exercises.findIndex((exercise: Exercise) => exercise._id === exerciseId)
          const questionIndex = topic.exercises[exerciseIndex].questions.findIndex((question: Question) => question._id === questionId)
          topic.exercises[exerciseIndex].questions.splice(questionIndex, 1)
        })
      )
    }
  }))

  interface TopicIdState {
    topicId: string,
    setTopicId: (topicId: string) => void
  }



  


  export { useTopicStore }