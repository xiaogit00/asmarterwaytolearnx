import { ObjectFlags } from "typescript"
import { NewTopic, Exercise, Question, NewExercise, NewQuestion } from "../types/topics"
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

export const toExercise = (body: any): NewExercise => {
    const newExercise: NewExercise = {
        name: parseString(body.name),
        questions: []
    }

    return newExercise
}

export const toQuestion = (body: any): NewQuestion => {
    const newQuestion: NewQuestion = {
        question: parseString(body.question),
        code: body.code,
        answer: parseString(body.answer)
    }
    return newQuestion
}

export const toExistingQuestion = (body: any): Question => {
    const newQuestion: Question = {
        _id: parseString(body._id),
        question: parseString(body.question),
        code: parseString(body.code),
        answer: parseString(body.answer)
    }

    return newQuestion
}

export const toQuestions = (body: any) : NewQuestion[] => {
    const newQuestions: NewQuestion[] = []
    body.map((item: NewQuestion) => {
        const newQuestion = {
            question: parseString(item.question),
            code: parseString(item.code),
            answer: parseString(item.answer)
        }
        newQuestions.push(newQuestion)
    })
    
    return newQuestions
}