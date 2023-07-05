import express from 'express'
import db from '../db/connect.mjs'
import { ObjectId } from 'mongodb'

const router = express.Router()
const foodItemsCollection = db.collection('foodItems')

// This section will help you get a list of all the records.
router.get('/dates/', async (req, res) => {
  let dateCollection = await db.collection('dates')
  let results = await dateCollection.find({}).toArray()
  res.send(results).status(200)
})

// This section will help you get a single record by id
router.get('/dates/:id', async (req, res) => {
  let dateCollection = await db.collection('dates')
  let query = { _id: new ObjectId(req.params.id) }
  let result = await dateCollection.findOne(query)

  if (!result) res.send('Not found').status(404)
  else res.send(result).status(200)
  // Find the food items with the date document ID
  const foodItems = await foodItemsCollection
    .find({ dateId: result._id })
    .toArray()

  console.log('Date:', result.date)
  console.log('Food items:', foodItems)
})

// This section will help you create a new record.
router.post('/dates/', async (req, res) => {
  try {
    let dateCollection = await db.collection('dates')
    let newDocument = {
      date: req.body.date,
      meal: req.body.meal,
      foodItems: req.body.foodItems,
      stat: req.body.stat,
    }
    let result = await dateCollection.insertOne(newDocument)
    const dateId = result.insertedId

    // Insert the food items with the date document ID
    const foodItemsWithDateId = newDocument.foodItems.map(foodItem => ({
      ...foodItem,
      dateId,
    }))

    await foodItemsCollection.insertMany(foodItemsWithDateId)

    res.send(result).status(204)
  } catch (error) {
    console.error('Error inserting date:', error)
  }
})

// This section will help you update a record by id.
router.patch('/dates/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const updates = {
    $set: {
      date: req.body.date,
      meal: req.body.meal,
      foodItems: req.body.foodItems,
      stat: req.body.stat,
    },
  }
  let dateCollection = await db.collection('dates')
  let result = await dateCollection.updateOne(query, updates)

  res.send(result).status(200)
})

// This section will help you delete a record
router.delete('/dates/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const collection = db.collection('dates')
  let result = await dateCollection.deleteOne(query)

  res.send(result).status(200)
})

export default router
