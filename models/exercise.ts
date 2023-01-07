
import mongoose from "mongoose"

import { exerciseSchema } from "./schema"

module.exports = mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema)

