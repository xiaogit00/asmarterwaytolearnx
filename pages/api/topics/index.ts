// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const Topic = require('../../../models/topic')
import { NewTopic, Topic as TopicType } from '../../../types/topics'
import { toNewTopic } from '../../../utils/typeguards'
import mongooseConnect from '../../../lib/mongooseConnect'
import topicRoutes from '../../../routes/topicRoutes'


export default async function topicHandler(req: NextApiRequest, res: NextApiResponse) {
  
  await mongooseConnect()
  
  switch (req.method) {
    case "POST": 
      await topicRoutes.postSingleTopic(req, res)
      break;
    case "GET":
      await topicRoutes.getAllUserTopic(req, res)
      break;
  }
  
}
