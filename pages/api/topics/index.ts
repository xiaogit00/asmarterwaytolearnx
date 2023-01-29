// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const Topic = require('../../../models/topic')
import { NewTopic, Topic as TopicType } from '../../../types/topics'
import { toNewTopic } from '../../../utils/typeguards'
import mongooseConnect from '../../../lib/mongooseConnect'
import { getToken } from 'next-auth/jwt'


export default async function topicHandler(req: NextApiRequest, res: NextApiResponse) {
  
  await mongooseConnect()
  const secret = process.env.SECRET
  const token = await getToken({req, secret})
  if (token) {
    if (req.method === 'POST') { // Post a single Topic
      const newTopic: NewTopic = toNewTopic(req.body)
      const topic = new Topic(newTopic)
      const addedTopic = await topic.save()
      console.log("topic:",topic)
      res.status(200).json(addedTopic)
  
    } else if (req.method === 'GET') { // Get all topics
      const topics = await Topic.find({userId: token.id})
      res.status(200).json(topics)
    }
  } else {
    res.status(401).end()
  }
  
  
}

//In this case, when I send a post request to /api/topics, the body would contain:
