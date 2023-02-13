//Within this file, you return the Exercises associated with this topic. 

import type { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from '../../../../../../lib/mongooseConnect'
import questionRoutes from "../../../../../../routes/questionRoutes"

export default async function singleQuestionHandler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect()
    switch (req.method) {
        case "DELETE": 
            await questionRoutes.deleteQuestion(req, res)
            break;
        case "PUT":
            await questionRoutes.updateQuestion(req, res)
            break; 
    }
}