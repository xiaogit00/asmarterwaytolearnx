import type { NextApiRequest, NextApiResponse } from "next"
import mongooseConnect from '../../../../../../lib/mongooseConnect'
import questionRoutes from "../../../../../../routes/questionRoutes"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    await mongooseConnect()
    switch (req.method) {
        case "POST": 
            await questionRoutes.bulkAdd(req, res)
            break;
    }
}