// import axios from 'axios'

import axios from "axios"

const baseUrl = process.env.NODE_ENV === 'production' ? `https://asmarterwaytolearnx.vercel.app/api` : process.env.NEXT_PUBLIC_API_DEV_URL

const getAllTopics = async () => {
    try {
        const res = await axios.get(baseUrl + '/topics')
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const addTopic = async (topic: string, userId: string) => {
    try {
        const res = await axios.post(baseUrl + '/topics', {
            name: topic,
            userId: userId
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const deleteTopic = async (topicId: string) => {
    try {
        const res = await axios.delete(baseUrl + `/topics/${topicId}`)
        return res.status
    } catch (err) {
        console.log(err)
    }
}

const updateTopicName = async (topicId: string, topicName: string) => {
    try {
        const res = await axios.put(baseUrl + `/topics/${topicId}`, { name: topicName })
    } catch (err) {
        console.log(err)
    }
}

export {
    getAllTopics,
    addTopic, 
    deleteTopic,
    updateTopicName
}