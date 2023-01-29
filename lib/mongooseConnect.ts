const mongoose = require('mongoose')

const mongooseConnect = async () => {
    const url = 'mongodb://127.0.0.1:27017/flashcards'
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })
}

export default mongooseConnect