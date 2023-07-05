import db from '../db/connect.mjs'
import { ObjectId } from 'mongodb'

const dateCollection = db.collection('dates')

const getAllDates = () => {
  try {
    let results = dateCollection.find({}).toArray()
    return results
  } catch (error) {
    throw { status: 500, message: error }
  }
}

const getOneDate = dateId => {
  try {
    let query = { _id: new ObjectId(dateId) }
    let result = dateCollection.findOne(query)
    if (!result) {
      throw {
        status: 400,
        message: `Can't find date with the id '${dateId}'`,
      }
    }
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error getting date: ${error?.message}` || error,
    }
  }
}

const createNewDate = newDate => {
  try {
    let result = dateCollection.insertOne(newDate)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error creating new date: ${error?.message}` || error,
    }
  }
}

const updateOneDate = (dateId, changes) => {
  const query = { _id: new ObjectId(dateId) }
  if (!query._id) {
    throw {
      status: 400,
      message: `Can't find date with the id '${dateId}'`,
    }
  }
  const updates = {
    $set: {
      date: changes.date,
      meal: changes.meal,
      foodItems: changes.foodItems,
      stat: changes.stat,
    },
  }
  try {
    let result = dateCollection.updateOne(query, updates)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error updating date data: ${error?.message}` || error,
    }
  }
}

const deleteOneDate = dateId => {
  try {
    const query = { _id: new ObjectId(dateId) }
    if (!query._id) {
      throw {
        status: 400,
        message: `Can't find date with the id '${dateId}'`,
      }
    }
    const collection = db.collection('dates')
    let result = dateCollection.deleteOne(query)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error deleting date: ${error?.message}` || error,
    }
  }
}

export default {
  getAllDates,
  createNewDate,
  getOneDate,
  updateOneDate,
  deleteOneDate,
}
