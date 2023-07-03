import { MongoClient } from 'mongodb'

const connectionString = process.env.ATLAS_URI || ''
const client = new MongoClient(connectionString)

async function connect() {
  let connection
  try {
    connection = await client.connect()
  } finally {
    await client.close()
  }
  let db = connection.db('diet_db')
  return db
}
connect().catch(console.dir)
export default db
