// import axios from 'axios'

import axios from "axios"


const addTopic = async (topic: string, userId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
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

export {
    addTopic
}