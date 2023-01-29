//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
const mongoose = require('mongoose')
const Topic = require('../../../../models/topic')
const Exercise = require('../../../../models/exercise')
import { toNewTopic, toExercise } from '../../../../utils/typeguards'
import { NewTopic, Topic as TopicType, Exercise } from '../../../../types/topics'
import { parseName } from "../../../../utils/typeguards"
import { getToken } from 'next-auth/jwt'
import mongooseConnect from '../../../../lib/mongooseConnect'

export default async function exerciseHandler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect()

    const { topicId } = req.query
    
    const targetTopic: TopicType[] = await Topic.find({_id: topicId})

    const secret = process.env.SECRET
    const token = await getToken({req, secret})
    if (token) {

        if (req.method === 'DELETE') {
            await Topic.deleteOne({_id: topicId})
            console.log(`Topic: ${topicId} successfully deleted`)
            res.status(204).end()
        } else if (req.method === 'GET') {
            res.status(200).json(targetTopic[0].exercises)
        } else if (req.method === 'PUT') {
            const topicName = parseName(req.body.name)
            await Topic.updateOne({_id: topicId}, {name: topicName})
            console.log(`Topic: ${topicId} successfully updated`)
            res.status(204).end()

        } else if (req.method === 'POST') {
            const newExercise: Exercise = toExercise(req.body)
            const newTopic: TopicType = {
                ...targetTopic[0].toObject(),
                exercises: [
                    ...targetTopic[0].exercises,
                    newExercise
                ]
            }
            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            res.status(200).json(newExercise)
        }
    } else {
        res.status(401).end()
    }
}