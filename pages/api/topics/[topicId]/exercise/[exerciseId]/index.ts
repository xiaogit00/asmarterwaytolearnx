//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from '../../../../../../lib/mongooseConnect'
import exerciseRoutes from "../../../../../../routes/exerciseRoutes"
import questionRoutes from "../../../../../../routes/questionRoutes"

export default async function questionHandler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect()
    
    const { exerciseId } = req.query

    switch (req.method) {
        case "GET": 
            await questionRoutes.getAllQuestions(req, res)
            break;
        case "DELETE":
            await exerciseRoutes.deleteExercise(req, res)
            break; 
        case "PUT":
            await exerciseRoutes.updateExercise(req, res)
            break;
        case "POST": 
            await questionRoutes.postSingleQuestion(req, res) 
            break;
    }
    
}