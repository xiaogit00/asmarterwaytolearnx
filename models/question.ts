import mongoose from "mongoose"
import { questionSchema } from "./schema"

module.exports = mongoose.models.Question || mongoose.model("Question", questionSchema)
