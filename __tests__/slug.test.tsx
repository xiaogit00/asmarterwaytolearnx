import { createMocks } from 'node-mocks-http'
import topicHandler from '../pages/api/topics/index'
import exerciseHandler from '../pages/api/topics/[topicId]'
import questionHandler from '../pages/api/topics/[topicId]/exercise/[exerciseId]'
import singleQuestionHandler from '../pages/api/topics/[topicId]/exercise/[exerciseId]/[questionId]'
const data = require('../db.json')
const Topic = require('../models/topic')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// beforeEach(async () => {
//   // const url = 'mongodb://127.0.0.1:27017/asmarterwaytolearnx'
//   // mongoose.set('strictQuery', false);
//   // await mongoose.connect(url, { useNewUrlParser: true })
//   // await Topic.deleteMany({})
//   // await Topic.insertMany(data.topics)
//   // await User.deleteMany({})
//   // await User.insertMany(data.users)
// })

describe('Topic Routes', () => {

  it('POST: api/topics succeeds [Add New Topic]', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        userId: '63b15184daae2f5af31faa71',
        name: 'Python'
      }
    })
    
    await topicHandler(req, res)

    console.log(res._getJSONData())

    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        name: 'Python', 
        userId: expect.anything()
      })
    )
  })

  it.only('POST: api/topics/{topicId} successfully adds new exercise', async () => {
    const pythonTopic = await Topic.find({name: 'Python'})
    const topicSlug = pythonTopic[0].slug.toString()
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        topicSlug
      }, 
      body: {
        name: "Advanced ML"
      }
    })
    await exerciseHandler(req, res)

    console.log(res._getJSONData())
    
    // const newSolidityTopic = await Topic.find({name: 'Solidity'})
    // console.log(solidityTopic)
    // expect(newSolidityTopic[0].exercises.length - solidityTopic[0].exercises.length).toBe(1)
  })

})