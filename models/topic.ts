import mongoose from "mongoose"
import { topicSchema } from "./schema"


module.exports = mongoose.models.Topic || mongoose.model("Topic", topicSchema)

