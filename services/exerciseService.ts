// import axios from 'axios'

import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_URL 

const addExercise = async (topicId: string, exerciseName: string) => {
    try {
        const res = await axios.post(baseUrl + '/topics/' + topicId, {
            name: exerciseName
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const deleteExercise = async (topicId: string, exerciseId: string) => {
    try {
        const res = await axios.delete(baseUrl + '/topics/' + topicId + '/exercise/' + exerciseId)
        return res.status
    } catch (err) {
        console.log(err)
    }
}

const updateExercise = async (topicId: string, exerciseId: string, exerciseName: string) => {
    try {
        const res = await axios.put(baseUrl + '/topics/' + topicId + '/exercise/' + exerciseId, {
            name: exerciseName
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}


export {
    addExercise, 
    deleteExercise,
    updateExercise
}