//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
const mongoose = require('mongoose')
const Topic = require('../../../../../../models/topic')
const Exercise = require('../../../../../../models/exercise')
import { Topic as TopicType, Question } from "../../../../../../types/topics"
import { parseName, toQuestion } from "../../../../../../utils/typeguards"

export default async function questionHandler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'mongodb://127.0.0.1:27017/flashcards'
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })

    const { topicId, exerciseId } = req.query
    
    const topicData = await Topic.find({_id: topicId})

    const questions = topicData[0].exercises.filter(exercise => exercise._id == exerciseId)
    // console.log(topicData[0].exercises.filter(exercise => console.log(exercise._id==exerciseId)))
    
    if (req.method === 'GET') {
        //Get all questions
        res.status(200).json(questions)

    } else if (req.method === 'DELETE') {
        //Deleting an exercise 

        const newExerciseData = topicData[0].exercises.filter(exercise => exercise._id != exerciseId)
        // console.log(newExerciseData)
        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Exercise ${exerciseId} sucessfully deleted`)
        // console.log(newTopic)
        res.status(204).end()

    } else if (req.method === 'PUT') {
        //Updating exercise name

        const exerciseName = parseName(req.body.name)
        const newExerciseData = {
            ...questions[0].toObject(),
            name: exerciseName
        }

        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Exercise ${questions[0].name} sucessfully changed to ${exerciseName}`)
        res.status(204).json(newExerciseData)
    } else if (req.method === 'POST') {
        //Add new question

        const newQuestion: Question = toQuestion(req.body)
        const newExerciseData = {
            ...questions[0].toObject(), 
            questions: [
                ...questions[0].questions,
                newQuestion
            ]
        }
        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`New question ${newQuestion.id} successfully added`)
        res.status(204).json(newQuestion)
        
    }
}