import { genPreviewOperationsStyle } from "antd/es/image/style";

const mongoose = require('mongoose')

const mongooseConnect = async () => {
    const uri = process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_DEV
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, { useNewUrlParser: true })
}

export default mongooseConnect