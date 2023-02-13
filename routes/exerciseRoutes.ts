import type { NextApiRequest, NextApiResponse } from 'next'
import { Topic as TopicType, Exercise } from '../types/topics'
import { parseName, toQuestion, toExercise } from '../utils/typeguards'
import { getToken } from 'next-auth/jwt'
import { authenticate } from './routesHelper'
const Topic = require('../models/topic')

const env = process.env.NODE_ENV 
const secret = process.env.SECRET

const getAllExercises = async (req: NextApiRequest, res: NextApiResponse) => {
    const { topicId } = req.query
    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const topicData = await Topic.find({_id: topicId})
        res.status(200).json(topicData[0].exercises)
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        const topicData = await Topic.find({_id: topicId})
        res.status(200).json(topicData[0].exercises)
    }
}

const postSingleExercise = async (req: NextApiRequest, res: NextApiResponse) => {
    const { topicId } = req.query

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const topicData = await Topic.find({_id: topicId})
            const newExercise: Exercise = toExercise(req.body)
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: [
                    ...topicData[0].exercises,
                    newExercise
                ]
            }
            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            res.status(200).json(newExercise)
        } else {
            res.status(401).send("You are not authorized to post an exercise.")
        }
    } else if (env === "test") {
        const topicData = await Topic.find({_id: topicId})
        const newExercise: Exercise = toExercise(req.body)
        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: [
                ...topicData[0].exercises,
                newExercise
            ]
        }
        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        res.status(200).json(newExercise)
    }
}

const deleteExercise = async (req: NextApiRequest, res: NextApiResponse) => {
    const { topicId, exerciseId } = req.query
    const topicData = await Topic.find({_id: topicId})

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const newExerciseData = topicData[0].exercises.filter((exercise: Exercise) => exercise._id != exerciseId)
            // console.log(newExerciseData)
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: newExerciseData
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Exercise ${exerciseId} sucessfully deleted`)
            // console.log(newTopic)
            res.status(204).end()
        } else {
            res.status(401).send("You are not authorized to post an exercise.")
        }
    } else if (env === "test") {
        const newExerciseData = topicData[0].exercises.filter((exercise: Exercise) => exercise._id != exerciseId)
        // console.log(newExerciseData)
        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Exercise ${exerciseId} sucessfully deleted`)
        // console.log(newTopic)
        res.status(204).end()
    }
}

const updateExercise = async (req: NextApiRequest, res: NextApiResponse) => {
    const { topicId, exerciseId } = req.query
    const topicData = await Topic.find({_id: topicId})
    const questions = topicData[0].exercises.filter((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
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
        } else {
            res.status(401).send("You are not authorized to update this exercise.")
        }
    } else if (env === "test") {
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
    }
}



export default {
    getAllExercises,
    postSingleExercise,
    deleteExercise,
    updateExercise
}

