import db from '../db/connect.mjs'
import { ObjectId } from 'mongodb'

const foodCollection = db.collection('food')

const getAllFoodItems = () => {
  try {
    let results = foodCollection.find({}).toArray()
    return results
  } catch (error) {
    throw { status: 500, message: error }
  }
}

const getOneFoodItem = foodItemId => {
  try {
    let query = { _id: new ObjectId(foodItemId) }
    let result = foodCollection.findOne(query)
    if (!result) {
      throw {
        status: 400,
        message: `Can't find food item with the id '${foodItemId}'`,
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

const createNewFoodItem = newFoodItemData => {
  try {
    let result = foodCollection.insertOne(newFoodItemData)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error creating new date: ${error?.message}` || error,
    }
  }
}

const updateOneFoodItem = (foodItemId, changes) => {
  const query = { _id: new ObjectId(foodItemId) }
  if (!query._id) {
    throw {
      status: 400,
      message: `Can't find food item with the id '${foodItemId}'`,
    }
  }
  const updates = {
    $set: {
      name: changes.name,
      energy: changes.energy,
      protein: changes.protein,
      fat: changes.fat,
      ch: changes.ch,
      note: changes.note,
    },
  }
  try {
    let result = foodCollection.updateOne(query, updates)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error updating food item data: ${error?.message}` || error,
    }
  }
}

const deleteOneFoodItem = foodItemId => {
  try {
    const query = { _id: new ObjectId(foodItemId) }
    if (!query._id) {
      throw {
        status: 400,
        message: `Can't find food item with the id '${foodItemId}'`,
      }
    }
    let result = foodCollection.deleteOne(query)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error deleting date: ${error?.message}` || error,
    }
  }
}

export default {
  getAllFoodItems,
  createNewFoodItem,
  getOneFoodItem,
  updateOneFoodItem,
  deleteOneFoodItem,
}
