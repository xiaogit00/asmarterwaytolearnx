import type { NextApiRequest, NextApiResponse } from "next"
const mongoose = require('mongoose')
const Topic = require('../../../../../../models/topic')
import { Topic as TopicType, Question } from "../../../../../../types/topics"
import { toQuestions } from "../../../../../../utils/typeguards"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'mongodb://127.0.0.1:27017/flashcards'
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })
    const { topicId, exerciseId } = req.query

    const topicData = await Topic.find({_id: topicId})

    const exercise = topicData[0].exercises.filter(exercise => exercise._id == exerciseId)

    if (req.method === 'POST') {
        // Receives JSON object with an array of questions
        const newQuestions: Question[] = toQuestions(req.body)

        const newExerciseData = {
            ...exercise[0].toObject(), 
            questions: newQuestions
        }

        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Questions successfully uploaded!`)
        res.status(204).end()
    }
}