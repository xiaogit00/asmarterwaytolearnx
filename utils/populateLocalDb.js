const data = require('../db.json')
const mongoose = require('mongoose')


main().catch(err => console.log(err))

async function main() {
    const url = 'mongodb://127.0.0.1:27017/flashcards'
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })
    console.log("Connection to db successful")

    // Creating a topics schema (with only userId, topicId, topicName)
    
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

    const Topic = mongoose.model("Topic", topicSchema)
    const Exercise = mongoose.model("Exercise", exerciseSchema)
    const Question = mongoose.model("Question", questionSchema)
    console.log(typeof data.topics)
    await Topic.insertMany(data.topics)
    console.log("Topics inserted")
    return null
}


