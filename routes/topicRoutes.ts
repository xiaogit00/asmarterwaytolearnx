import type { NextApiRequest, NextApiResponse } from 'next'
import { NewTopic, Topic as TopicType } from '../types/topics'
const Topic = require('../models/topic')
import { toNewTopic } from '../utils/typeguards'
import { getToken } from 'next-auth/jwt'
import { parseName } from "../utils/typeguards"
import { authenticate } from './routesHelper'

const env = process.env.NODE_ENV 
const secret = process.env.SECRET
        

const postSingleTopic = async (req: NextApiRequest, res: NextApiResponse) => {
    if (env === "development" || env === "production") {
        const token = await getToken({req, secret})
        if (token) {
            const newTopic: NewTopic = toNewTopic(req.body)
            const topic = new Topic(newTopic)
            const addedTopic = await topic.save()
            console.log(`Topic: ${addedTopic.name} successfully created`)
            // console.log(addedTopic)
            res.status(200).json(addedTopic)
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        const newTopic: NewTopic = toNewTopic(req.body)
        const topic = new Topic(newTopic)
        const addedTopic = await topic.save()
        res.status(200).json(addedTopic)
    }
}
  

const getAllUserTopic = async (req: NextApiRequest, res: NextApiResponse) => {
    if (env === "development" || env === "production") {
        const token = await getToken({req, secret})
        if (token) {
            const topics = await Topic.find({userId: token.id})
            res.status(200).json(topics)
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        const topics = await Topic.find()
        res.status(200).json(topics)
    }
    
}

const deleteTopic = async (topicId: string, req: NextApiRequest, res: NextApiResponse) => {
    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, topicId)
        if (isUser) {
            console.log("topicId",topicId)
            await Topic.deleteOne({_id: topicId})
            console.log(`Topic: ${topicId} successfully deleted`)
            res.status(204).end()
        } else {
            res.status(401).send("You are not authorized to delete this topic.")
        }
    } else if (env === "test") {
        await Topic.deleteOne({_id: topicId})
        console.log(`Topic: ${topicId} successfully deleted`)
        res.status(204).end()
    }
}

const updateTopic = async (req: NextApiRequest, res: NextApiResponse, topicId: string) => {
    const topicName = parseName(req.body.name)
    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, topicId)
        if (isUser) {
            await Topic.updateOne({_id: topicId}, {name: topicName})
            console.log(`Topic: ${topicId} successfully updated`)
            res.status(204).end()
        } else {
            res.status(401).send("You are not authorized to update this topic.")
        }
    } else if (env === "test") {
        await Topic.updateOne({_id: topicId}, {name: topicName})
        console.log(`Topic: ${topicId} successfully updated`)
        res.status(204).end()
    }
}


export default {
    getAllUserTopic,
    postSingleTopic,
    deleteTopic,
    updateTopic,
}