// import axios from 'axios'

import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_URL 

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
    addTopic, 
    deleteTopic,
    updateTopicName
}