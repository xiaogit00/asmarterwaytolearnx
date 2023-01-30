import clientPromise from '../lib/mongodb'

it("Can create a new topic in MongoDB", async() => {
    const client = await clientPromise

    const db = client.db('asmarterwaytolearnx_test')
    const topics = db.collection('topics')
    const found = await topics.find({})
    console.log(Object.keys(found))
})