//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
const mongoose = require('mongoose')
const Topic = require('../../../../models/topic')
const Exercise = require('../../../../models/exercise')
import { toNewTopic, toExercise } from '../../../../utils/typeguards'
import { NewTopic, Topic as TopicType, Exercise } from '../../../../types/topics'
import { parseName } from "../../../../utils/typeguards"


export default async function exerciseHandler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'mongodb://127.0.0.1:27017/flashcards'
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })

    const { topicId } = req.query
    
    const targetTopic: TopicType[] = await Topic.find({_id: topicId})

    if (req.method === 'DELETE') {
        await Topic.deleteOne({_id: topicId})
        console.log(`Topic: ${topicId} successfully deleted`)
        res.status(204).end()
    } else if (req.method === 'GET') {
        res.status(200).json(targetTopic[0].exercises)
    } else if (req.method === 'PUT') {
        // In this case, you don't need to parse the data, because you're just changing the topicName
        // I expect the body to only contain the updated name of the topic 
        const topicName = parseName(req.body.name)
        await Topic.updateOne({_id: topicId}, {name: topicName})
        console.log(`Topic: ${topicId} successfully updated`)
        res.status(204).end()

    } else if (req.method === 'POST') {
        // Here, we'll need to identify the topic in question, and construct the 
        // new object. We'll need to validate the req.body to ensure it is a newExercise
        // So, I'll need to create the newExercise type, a toNewExercise Function, call 
        // it here, recreate a new topic object containing the new exercise, and .save(). 
        const newExercise: Exercise = toExercise(req.body)
        const newTopic: TopicType = {
            ...targetTopic[0].toObject(),
            exercises: [
                ...targetTopic[0].exercises,
                newExercise
            ]
        }

        // console.log({...targetTopic[0]})

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Exercise newly added to topic: ${topicId}`)
        // console.log(newTopic)
        res.status(204).json(newExercise)
    }
}