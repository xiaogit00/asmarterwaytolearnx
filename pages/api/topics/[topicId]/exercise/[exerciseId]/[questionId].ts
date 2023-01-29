//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
const mongoose = require('mongoose')
const Topic = require('../../../../../../models/topic')
const Exercise = require('../../../../../../models/exercise')
import { Topic as TopicType, Question, Exercise } from "../../../../../../types/topics"
import { parseName, toQuestion, toExistingQuestion } from "../../../../../../utils/typeguards"
import mongooseConnect from '../../../../../../lib/mongooseConnect'
import { getToken } from 'next-auth/jwt'

export default async function singleQuestionHandler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect()

    const { topicId, exerciseId, questionId } = req.query
    
    const topicData = await Topic.find({_id: topicId})

    const exercise = topicData[0].exercises.filter(exercise => exercise._id == exerciseId)
    // console.log(topicData[0].exercises.filter(exercise => console.log(exercise._id==exerciseId)))
    const secret = process.env.SECRET
    const token = await getToken({req, secret})
    if (token) {
        if (req.method === 'DELETE') { //Delete Single Question
            
            const newQuestionsData = exercise[0].questions.filter(question => question._id != questionId)
            const newExerciseData: Exercise = {
                ...exercise[0].toObject(), 
                questions: newQuestionsData
            }
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: newExerciseData
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Question ${questionId} successfully deleted`)
            res.status(204).end()

        } else if (req.method === 'PUT') { //Change Single Question
            const newQuestion: Question = toExistingQuestion(req.body)
            const newExerciseData = {
                ...exercise[0].toObject(), 
                questions: [
                    ...exercise[0].questions,
                    newQuestion
                ]
            }
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: newExerciseData
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Question ${newQuestion.id} successfully updated`)
            res.status(204).json(newQuestion)
        }
    } else {
        res.status(401).end()
    }
}