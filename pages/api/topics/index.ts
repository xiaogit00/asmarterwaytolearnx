// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const Topic = require('../../../models/topic')
import { NewTopic, Topic as TopicType } from '../../../types/topics'
import { toNewTopic } from '../../../utils/typeguards'
const mongoose = require('mongoose')
import { addTopic } from '../../../services/questionService'

export default async function topicHandler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'mongodb://127.0.0.1:27017/flashcards'
  mongoose.set('strictQuery', false);
  await mongoose.connect(url, { useNewUrlParser: true })

  if (req.method === 'POST') {
    const newTopic: NewTopic = toNewTopic(req.body)
    const topic = new Topic(newTopic)
    const addedTopic = await topic.save()
    console.log("topic:",topic)
    res.status(200).json(addedTopic)

  } else {
    const topics = await Topic.find()
    res.status(200).json(topics)
  }
  
}

//In this case, when I send a post request to /api/topics, the body would contain:
