import { authenticate } from './routesHelper'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Topic as TopicType, Exercise, Question, NewQuestion } from '../types/topics'
import { toQuestion, toQuestions } from '../utils/typeguards'
const Topic = require('../models/topic')
import produce from "immer"
import { toExistingQuestion } from '../utils/typeguards'

const env = process.env.NODE_ENV 
const secret = process.env.SECRET


const getAllQuestions = async (req: NextApiRequest, res: NextApiResponse) => {
    const { topicId, exerciseId } = req.query
    const topicData = await Topic.find({_id: topicId})
    const questions = topicData[0].exercises.filter((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            res.status(200).json(questions)
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        res.status(200).json(questions)
    }
}

const postSingleQuestion = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { topicId, exerciseId } = req.query
    const topicData = await Topic.find({_id: topicId})
    const exercise = topicData[0].exercises.filter((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const newQuestion: NewQuestion = toQuestion(req.body)
            // const newTopic: TopicType = produce((draft) => {
            //     const exercise = draft.exercises.find((exercise: Exercise) => exercise._id === exerciseId)
            //     exercise.push(newQuestion)
            // })

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
            console.log(newTopic)

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`New question successfully added`)
            res.status(200).json(newQuestion)
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        const newQuestion: NewQuestion = toQuestion(req.body)
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
        console.log(`New question successfully added`)
        res.status(204).json(newQuestion)
    }
}

const bulkAdd = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { topicId, exerciseId } = req.query
    const topicData = await Topic.find({_id: topicId})
    const exercise = topicData[0].exercises.find((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            // Receives JSON object with an array of questions
            const newQuestions: NewQuestion[] = toQuestions(req.body)
            // console.log(exercise)
            const newExerciseData: Exercise = {
                ...exercise.toObject(), 
                questions: newQuestions
            }
            const exerciseList = produce(topicData[0].exercises, (draft: any) => {
                const exerciseIndex = topicData[0].exercises.findIndex((exercise: Exercise) => exercise._id == exerciseId)
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
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        // Receives JSON object with an array of questions
        const newQuestions: NewQuestion[] = toQuestions(req.body)
        // console.log(exercise)
        const newExerciseData: Exercise = {
            ...exercise.toObject(), 
            questions: newQuestions
        }
        const exerciseList = produce(topicData[0].exercises, (draft: any) => {
            const exerciseIndex = topicData[0].exercises.findIndex((exercise: Exercise) => exercise._id == exerciseId)
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
}

const deleteQuestion = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { topicId, exerciseId, questionId } = req.query
    const topicData = await Topic.find({_id: topicId})
    const exercise = topicData[0].exercises.find((exercise: Exercise) => exercise._id == exerciseId)
    console.log("EXERCISE",exercise)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const newQuestionsData = exercise.questions.filter((question: Question) => question._id != questionId)
            const newExerciseData: Exercise = {
                ...exercise.toObject(), 
                questions: newQuestionsData
            }
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: newExerciseData
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Question ${questionId} successfully deleted`)
            res.status(204).end()
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        const newQuestionsData = exercise.questions.filter((question: Question) => question._id != questionId)
        const newExerciseData: Exercise = {
            ...exercise.toObject(), 
            questions: newQuestionsData
        }
        const newTopic: TopicType = {
            ...topicData[0].toObject(),
            exercises: newExerciseData
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Question ${questionId} successfully deleted`)
        res.status(204).end()
    }
}

const updateQuestion = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { topicId, exerciseId } = req.query
    const topicData = await Topic.find({_id: topicId})
    const exercise = topicData[0].exercises.find((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            const newQuestion: Question = toExistingQuestion(req.body)
            const newExerciseData = {
                ...exercise[0].toObject(), 
                questions: [
                    ...exercise.questions,
                    newQuestion
                ]
            }
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: newExerciseData
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Question ${newQuestion._id} successfully updated`)
            res.status(204).json(newQuestion)
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        const newQuestion: Question = toExistingQuestion(req.body)
            const newExerciseData = {
                ...exercise.toObject(), 
                questions: [
                    ...exercise.questions,
                    newQuestion
                ]
            }
            const newTopic: TopicType = {
                ...topicData[0].toObject(),
                exercises: newExerciseData
            }

            await Topic.findOneAndUpdate({_id: topicId}, newTopic)
            console.log(`Question ${newQuestion._id} successfully updated`)
            res.status(204).json(newQuestion)
    }
}

export default {
    getAllQuestions,
    postSingleQuestion,
    bulkAdd,
    deleteQuestion,
    updateQuestion
}

