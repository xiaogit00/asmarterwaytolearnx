import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    question: String,
    code: String,
    answer: String
})

const exerciseSchema = new mongoose.Schema({
    name: String,
    questions: [questionSchema]
})

const topicSchema = new mongoose.Schema({
    userId: String,
    name: String,
    exercises: [exerciseSchema]
})

export {
    questionSchema,
    exerciseSchema,
    topicSchema
}