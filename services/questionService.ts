import axios from 'axios'
import { Question, NewQuestion } from '../types/topics'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_DEV_URL

const addQuestion = async (topicId: string, exerciseId: string, question: Question ) => {
    const endpoint = `${baseUrl}/topics/${topicId}/exercise/${exerciseId}`

    try {
        const res = await axios.post(endpoint, question)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

const addBulkQuestions = async (topicId: string, exerciseSlug: string, questions: Question []) => {
    //Makes a call to api/topics/[topicId]/exercise/[exerciseId]

    const endpoint = `${baseUrl}/topics/${topicId}/exercise/${exerciseSlug}/bulkAdd`

    try {
        const res = await axios.post(endpoint, questions)
        return res.data
    } catch (e) {
        console.log(e)
    }

}

const updateQuestion = async (topicId: string, exerciseId: string, questionId: string, question: NewQuestion ) => {
    const endpoint = `${baseUrl}/topics/${topicId}/exercise/${exerciseId}/${questionId}`
    console.log("question:", question)
    try{
        const res = await axios.put(endpoint, question)
        return res
    } catch (e) {
        console.log(e)
    }

}

export {
    addBulkQuestions,
    addQuestion,
    updateQuestion
}