import { MongoClient } from 'mongodb'

const connectionString = process.env.ATLAS_URI || ''
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let connection

try {
  connection = await client.connect()
  console.dir('connection established')
} catch (error) {
  console.error(error)
}

let db = connection.db('diet_db')

export default db
