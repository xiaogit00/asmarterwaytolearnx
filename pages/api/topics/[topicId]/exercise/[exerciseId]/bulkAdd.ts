import type { NextApiRequest, NextApiResponse } from "next"
const mongoose = require('mongoose')
const Topic = require('../../../../../../models/topic')
import { Topic as TopicType, Question, Exercise } from "../../../../../../types/topics"
import { toQuestions } from "../../../../../../utils/typeguards"
import produce from "immer"
import { getToken } from 'next-auth/jwt'
import mongooseConnect from '../../../../../../lib/mongooseConnect'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    await mongooseConnect()

    const { topicId, exerciseId } = req.query

    const topicData = await Topic.find({_id: topicId})
    // console.log(topicData[0].exercises)
    const exercise = topicData[0].exercises.find(exercise => exercise._id == exerciseId)
    const secret = process.env.SECRET
    const token = await getToken({req, secret})
    if (token) {
        if (req.method === 'POST') { // Post many questions
            // Receives JSON object with an array of questions
            const newQuestions: Question[] = toQuestions(req.body)
            // console.log(exercise)
            const newExerciseData: Exercise = {
                ...exercise.toObject(), 
                questions: newQuestions
            }
            const exerciseList = produce(topicData[0].exercises, draft => {
                const exerciseIndex = topicData[0].exercises.findIndex(exercise => exercise._id == exerciseId)
                // console.log(exerciseIndex)
                draft[exerciseIndex] = newExerciseData
            })
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: exerciseList
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Questions successfully uploaded!`)
            res.status(204).end()
        }
    } else {
        res.status(401).end()
    }
}