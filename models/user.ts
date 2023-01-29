import mongoose from "mongoose"
import { userSchema } from "./schema"


module.exports = mongoose.models.User || mongoose.model("User", userSchema)

