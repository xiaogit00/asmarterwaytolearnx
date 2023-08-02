import type { NextApiRequest, NextApiResponse } from 'next'
import { Topic as TopicType, Exercise as ExerciseType, NewExercise } from '../types/topics'
import { parseName, toQuestion, toExercise } from '../utils/typeguards'
import { getToken } from 'next-auth/jwt'
import { authenticate } from './routesHelper'
import produce from "immer"
const Topic = require('../models/topic')
const Exercise = require('../models/exercise')

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
            const newExercise: NewExercise = toExercise(req.body)
            
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: [
                    ...topicData[0].exercises,
                    newExercise
                ]
            }
            const newTopicRes = await Topic.findOneAndUpdate({_id: topicId}, newTopic, {
                new: true
              })
            const newExerciseRes = newTopicRes.exercises.slice(-1)[0]
            res.status(200).json(newExerciseRes)
        } else {
            res.status(401).send("You are not authorized to post an exercise.")
        }
    } else if (env === "test") {
        const topicData = await Topic.find({_id: topicId})
        const newExercise: NewExercise = toExercise(req.body)
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
            const newExerciseData = topicData[0].exercises.filter((exercise: ExerciseType) => String(exercise._id) !== exerciseId)
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
        const newExerciseData = topicData[0].exercises.filter((exercise: ExerciseType) => exercise._id != exerciseId)
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
    const exercise = topicData[0].exercises.find((exercise: ExerciseType) => String(exercise._id) == exerciseId)
    // console.log("exercise",exercise)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const exerciseName = parseName(req.body.name)
            
            const newExerciseData = {
                ...exercise.toObject(),
                name: exerciseName
            }

            const exerciseList = produce(topicData[0].exercises, (draft: any) => {
                const exerciseIndex = topicData[0].exercises.findIndex((exercise: ExerciseType) => exercise._id == exerciseId)
                // console.log(exerciseIndex)
                draft[exerciseIndex] = newExerciseData
            })
            
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: exerciseList
            }


            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Exercise ${exercise.name} sucessfully changed to ${exerciseName}`)
            res.status(200).json(newExerciseData)
        } else {
            res.status(401).send("You are not authorized to update this exercise.")
        }
    } else if (env === "test") {
        const exerciseName = parseName(req.body.name)
        const newExerciseData = {
            ...topicData[0].toObject(),
            name: exerciseName
        }

        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Exercise ${topicData[0].name} sucessfully changed to ${exerciseName}`)
        res.status(204).json(newExerciseData)
    }
}



export default {
    getAllExercises,
    postSingleExercise,
    deleteExercise,
    updateExercise
}

