// PURPOSE OF THIS ROUTE 

// Get users credentials
// Validate
// Send error code if any
// Connect to database
// Check if any existing user is present with the same email address
// Hash password using bycrypt js

import { MongoClient } from 'mongodb'
import  { hash } from  'bcryptjs'
const mongoose = require('mongoose')
const User = require('../../../models/user')

export default async function handler(req, res) {
    console.log("this endpoint is hit")
    if (req.method === "POST") {
        const { email, password } = req.body

    if (!email || !email.includes('@') || !password) {
        res.status(422).json({ message: "Invalid Data" })
        return 
    }
    const url = 'mongodb://127.0.0.1:27017/flashcards'
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })

    const checkExisting = await User.findOne({ email: email })

    if (checkExisting) {
        res.status(422).json({ message: 'User already exists' });
        mongoose.connection.close()
        return;
    }

    const user = new User({
        email,
        password: await hash(password, 12),
    })
    const addedUser = await user.save()

    res.status(201).json({ message: 'User created', ...addedUser });
    
    mongoose.connection.close()
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
    
    
}
