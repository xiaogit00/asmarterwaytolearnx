import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'
const Topic = require('../models/topic')

const env = process.env.NODE_ENV 
const secret = process.env.SECRET

export const authenticate = async (req: NextApiRequest, topicId: string): Promise<boolean> => {
    const token = await getToken({req, secret})
    const topic = await Topic.find({_id: topicId})
    if (token) {
        if (String(topic[0].userId) === token.id) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
    
}

