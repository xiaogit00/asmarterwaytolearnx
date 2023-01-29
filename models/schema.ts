const mongoose = require('mongoose')

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
    userId: mongoose.ObjectId,
    name: String,
    exercises: [exerciseSchema]
})

const userSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    email: String,
})

export {
    questionSchema,
    exerciseSchema,
    topicSchema,
    userSchema
}