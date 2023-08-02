const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const questionSchema = new mongoose.Schema({
    question: String,
    slug: { type: String, slug: "question", unique: true },
    code: String,
    answer: String
})

const exerciseSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, slug: "name", unique: true },
    questions: [questionSchema]
})

const topicSchema = new mongoose.Schema({
    userId: mongoose.ObjectId,
    name: String,
    slug: { type: String, slug: "name", unique: true },
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