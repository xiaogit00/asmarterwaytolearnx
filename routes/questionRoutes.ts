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
    let topicData = await Topic.findOne({_id: topicId})
    const exercise = topicData.exercises.find((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (!isUser) res.status(401).send("You are not authorized.")

        const newQuestion: NewQuestion = toQuestion(req.body)
        if (!newQuestion) res.status(401).send("Error in req body.")
        
        const exerciseIndex = topicData.exercises.findIndex((exercise: Exercise) => exercise._id == exerciseId)
        //Create a new questionList containing all the questions for this exercise. 
        const questionList = produce(exercise.questions, (draft: any) => {
            draft.push(newQuestion)
        })

        const newExerciseData = {
            ...exercise.toObject(), 
            questions: questionList
        }

        const exerciseList = produce(topicData.exercises, (draft: any) => {
            draft[exerciseIndex] = newExerciseData
        })
        
        
        const newTopic: TopicType = {
            ...topicData.toObject(),
            exercises: exerciseList
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`New question successfully added`)
        res.status(200).json(newQuestion)

    } else if (env === "test") {
        const newQuestion: NewQuestion = toQuestion(req.body)
        const exerciseIndex = topicData.exercises.findIndex((exercise: Exercise) => exercise._id == exerciseId)
        topicData.exercises[exerciseIndex].questions.push(newQuestion)

        await Topic.findOneAndUpdate({_id: topicId}, topicData)
        console.log(`New question successfully added`)
        res.status(200).json(newQuestion)
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
    const topicData = await Topic.findOne({_id: topicId})
    const exerciseIndex = topicData.exercises.findIndex((exercise: Exercise) => exercise._id == exerciseId)
    const questionIndex = topicData.exercises[exerciseIndex].questions.findIndex((question: Question) => question._id == questionId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (isUser) {
            topicData.exercises[exerciseIndex].questions.splice(questionIndex, 1)

            await Topic.findOneAndUpdate({_id: topicId}, topicData)
            console.log(`Question ${questionId} successfully deleted`)
            res.status(204).end()
        } else {
            res.status(401).send("You are not authorized.")
        }
    } else if (env === "test") {
        topicData.exercises[exerciseIndex].questions.splice(questionIndex, 1)

        await Topic.findOneAndUpdate({_id: topicId}, topicData)
        console.log(`Question ${questionId} successfully deleted`)
        res.status(204).end()
    }
}

const updateQuestion = async (req: NextApiRequest, res: NextApiResponse) => { 
    const { topicId, exerciseId, questionId } = req.query
    const topicData = await Topic.findOne({_id: topicId})
    const exercise = topicData.exercises.find((exercise: Exercise) => exercise._id == exerciseId)

    if (env === "development" || env === "production") {
        const isUser = await authenticate(req, String(topicId))
        if (!isUser) res.status(401).send("You are not authorized.")
        
        const newQuestion: Question = toExistingQuestion(req.body)
        if (!newQuestion) res.status(401).send("Error in req body.")
        
        console.log("newQuestion", newQuestion)
        const exerciseIndex = topicData.exercises.findIndex((exercise: Exercise) => exercise._id == exerciseId)

        const questionList = produce(exercise.questions, (draft: any) => {
            const questionIndex = exercise.questions.findIndex((question: any) => question._id.toString() === questionId)
            draft[questionIndex] = newQuestion
        })
        console.log("questionList",questionList)
        const newExerciseData = {
            ...exercise.toObject(), 
            questions: questionList
        }
        const exerciseList = produce(topicData.exercises, (draft: any) => {
            draft[exerciseIndex] = newExerciseData
        })
        
        const newTopic: TopicType = {
            ...topicData.toObject(),
            exercises: exerciseList
        }

        await Topic.findOneAndUpdate({_id: topicId}, newTopic)
        console.log(`Question ${questionId} successfully updated`)
        res.status(200).json(newQuestion)

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

