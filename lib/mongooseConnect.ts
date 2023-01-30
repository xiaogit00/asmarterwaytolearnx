import { genPreviewOperationsStyle } from "antd/es/image/style";

const mongoose = require('mongoose')

const mongooseConnect = async () => {
    const url = process.env.MONGODB_URI + process.env.MONGODB_DBNAME
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, { useNewUrlParser: true })
}

export default mongooseConnect