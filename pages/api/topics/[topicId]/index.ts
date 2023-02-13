//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from '../../../../lib/mongooseConnect'
import topicRoutes from "../../../../routes/topicRoutes"
import exerciseRoutes from "../../../../routes/exerciseRoutes"

export default async function exerciseHandler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect()

    const { topicId } = req.query
    
    switch (req.method) {
        case "PUT": 
            await topicRoutes.updateTopic(req, res, String(topicId))
            break;
        case "DELETE":
            await topicRoutes.deleteTopic(String(topicId), req, res)
            break; 
        case "GET":
            await exerciseRoutes.getAllExercises(req, res)
            break;
        case "POST": 
            await exerciseRoutes.postSingleExercise(req, res) 
            break;
    }
}
