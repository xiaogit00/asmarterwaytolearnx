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

beforeEach(async () => {
  const url = 'mongodb://127.0.0.1:27017/asmarterwaytolearnx'
  mongoose.set('strictQuery', false);
  await mongoose.connect(url, { useNewUrlParser: true })
  await Topic.deleteMany({})
  await Topic.insertMany(data.topics)
  await User.deleteMany({})
  await User.insertMany(data.users)
})

describe('Topic Routes', () => {

  
  it.only('GET: api/topics succeeds [All Topics]', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })
    await topicHandler(req, res)
    expect(JSON.parse(res._getData())).toHaveLength(3)
  })

  it('POST: api/topics succeeds [Add New Topic]', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        userId: '63b15184daae2f5af31faa71',
        name: 'Python'
      }
    })
    
    await topicHandler(req, res)

    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        name: 'Python', 
        userId: expect.anything()
      })
    )
  })

  it('DELETE: api/topics/{topicId}/index.js successfully deletes topic', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()

    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        topicId
      }
    })

    await exerciseHandler(req, res)
    expect(res._getStatusCode()).toBe(204)
    const finalTopics = await Topic.find()
    expect(finalTopics.length).toBe(2)
  })

  it('PUT: api/topics/[topicId]/index.js successfully updates topic', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        topicId
      }, 
      body: {
        name: "Advanced Solidity"
      }
    })

    await exerciseHandler(req, res)
    expect(res._getStatusCode()).toBe(204)
    const newSolidityTopic = await Topic.find({name: "Advanced Solidity"})
    expect(newSolidityTopic.length).toBe(1)
  })
})

describe('Exercise Routes', () => {
  it('GET: api/topics/{topicId} succeeds [All exercises]', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        topicId
      }
    })

    await exerciseHandler(req, res)
  })

  it('POST: api/topics/{topicId} successfully adds new exercise', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        topicId
      }, 
      body: {
        name: "Advanced ML"
      }
    })
    await exerciseHandler(req, res)
    
    const newSolidityTopic = await Topic.find({name: 'Solidity'})
    // console.log(solidityTopic)
    expect(newSolidityTopic[0].exercises.length - solidityTopic[0].exercises.length).toBe(1)
  })

  it('DELETE: api/topics/{topicId}/exercise/{exerciseId} successfully deletes exercise', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const exerciseId = solidityTopic[0].exercises[0]._id.toString()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        topicId,
        exerciseId
      }
    })

    await questionHandler(req, res)
    const solidityTopicAtEnd = await Topic.find({name: 'Solidity'})
    expect(solidityTopic[0].exercises.length - solidityTopicAtEnd[0].exercises.length).toBe(1)
  })

  it('PUT: api/topics/{topicId}/exercise/{exerciseId} successfully updates exercise name', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const exerciseId = solidityTopic[0].exercises[0]._id.toString()
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        topicId,
        exerciseId
      }, 
      body: {
        name: "Advanced Classes"
      }
    })

    await questionHandler(req, res)
    // const solidityTopicAtEnd = await Topic.find({name: 'Solidity'})
    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        name: "Advanced Classes"
      })
    )
    
  })
})

describe('Question Routes', () => {
  it('GET: api/topics/{topicId}/exercise/{exerciseId} succeeds [All Questions]', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const exerciseId = solidityTopic[0].exercises[0]._id.toString()
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        topicId,
        exerciseId
      }
    })

    await questionHandler(req, res)
    expect(res._getJSONData()[0].questions.length).toBe(12)
  }), 

  it('POST: api/topics/{topicId}/exercise/{exerciseId} successfully adds new question', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const exerciseId = solidityTopic[0].exercises[0]._id.toString()
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        topicId,
        exerciseId
      }, 
      body: {
        question: "What is the name of Sam?",
        code: "var Sam = name;",
        answer: "Sam"
      }
    })

    await questionHandler(req, res)

    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        question: "What is the name of Sam?"
      })
    )
  })

  it('DELETE: api/topics/{topicId}/exercise/{exerciseId}/{questionId} successfully deletes new question', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const exerciseId = solidityTopic[0].exercises[0]._id.toString()
    const questionId = solidityTopic[0].exercises[0].questions[0]._id.toString()
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        topicId,
        exerciseId, 
        questionId
      }
    })

    await singleQuestionHandler(req, res)
    
    const solidityTopicAtEnd = await Topic.find({name: 'Solidity'})
    const questionsAtStart = solidityTopic[0].exercises[0].questions
    const questionsAtEnd = solidityTopicAtEnd[0].exercises[0].questions
    expect(questionsAtStart.length - questionsAtEnd.length).toBe(1)
  })

  it('PUT: api/topics/{topicId}/exercise/{exerciseId}/{questionId} successfully updates question', async () => {
    const solidityTopic = await Topic.find({name: 'Solidity'})
    const topicId = solidityTopic[0]._id.toString()
    const exerciseId = solidityTopic[0].exercises[0]._id.toString()
    const questionId = solidityTopic[0].exercises[0].questions[0]._id.toString()
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        topicId,
        exerciseId, 
        questionId
      }, 
      body: {
        question: "What is the name of Sam?",
        code: "var Sam = name;",
        answer: "Sam"
      }
    })

    await singleQuestionHandler(req, res)
    
    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        code: "var Sam = name;"
      })
    )
  })
})