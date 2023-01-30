import axios from 'axios'
import { Question } from '../types/topics'



const addBulkQuestions = async (topicId: string, exerciseId: string, questions: Question []) => {
    //Makes a call to api/topics/[topicId]/exercise/[exerciseId]

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}/exercise/${exerciseId}/bulkAdd`

    try {
        const res = await axios.post(endpoint, questions)
        return res.data
    } catch (e) {
        console.log(e)
    }

}

export {
    addBulkQuestions
}