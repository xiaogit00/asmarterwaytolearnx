import { ObjectFlags } from "typescript"
import { NewTopic, Exercise, Question } from "../types/topics"
const mongoose = require('mongoose')

const parseUserId = (userId: unknown): string => {
    if (!userId || typeof userId !== 'string') {
        throw new Error("Incorrect or missing UserId")
    }
    return userId
}

export const parseName = (name: unknown): string => {
    if (!name || typeof name !== 'string') {
        throw new Error("Incorrect or missing name")
    }
    return name
}

export const parseString = (text: unknown): string => {
    if (!text || typeof text !== 'string') {
        throw new Error("Incorrect or missing string")
    }
    return text
}


export const toNewTopic = (body: any): NewTopic => {
    const newTopic: NewTopic = {
        userId: parseUserId(body.userId),
        name: parseName(body.name),
        exercises: []
    }

    return newTopic
}

export const toExercise = (body: any): Exercise => {
    const newExercise: Exercise = {
        _id: mongoose.Types.ObjectId(),
        name: parseString(body.name),
        questions: []
    }

    return newExercise
}

export const toQuestion = (body: any): Question => {
    const newQuestion: Question = {
        _id: mongoose.Types.ObjectId(),
        question: parseString(body.question),
        code: parseString(body.code),
        answer: parseString(body.answer)
    }

    return newQuestion
}

export const toExistingQuestion = (body: any): Question => {
    const newQuestion: Question = {
        question: parseString(body.question),
        code: parseString(body.code),
        answer: parseString(body.answer)
    }

    return newQuestion
}

export const toQuestions = (body: any) : Question[] => {
    const newQuestions: Question[] = []
    body.map(item => {
        const newQuestion = {
            question: parseString(item.question),
            code: parseString(item.code),
            answer: parseString(item.answer)
        }
        newQuestions.push(newQuestion)
    })
    
    return newQuestions
}