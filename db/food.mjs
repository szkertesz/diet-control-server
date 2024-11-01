import db from '../db/connect.mjs'
// import { ObjectId } from 'mongodb'

// const foodCollection = db.collection('food')

const getAllFoodItems = () => {
  try {
    let results = db.prepare('SELECT * FROM foodData').all();
    return results
  } catch (error) {
    throw { status: 500, message: error }
  }
}

const getOneFoodItem = foodItemId => {
  try {
    let result = db.prepare('SELECT * FROM foodData WHERE id = ? ').get(foodItemId);
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
      message: `Error getting food item: ${error?.message}` || error,
    }
  }
}

const createNewFoodItem = newFoodItemData => {
  try {
    const { name, energy_value, protein, fat, saturates, carbohydrate, sugar, fiber, salt, notes } = newFoodItemData;
    const stmt = db.prepare('INSERT INTO foodData (name, energy_value, protein, fat, saturates, carbohydrate, sugar, fiber, salt, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, energy_value, protein, fat, saturates, carbohydrate, sugar, fiber, salt, notes);
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error creating new foodItem: ${error?.message}` || error,
    }
  }
}

const createNewFoodItems = newFoodData => {
  try {
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true }
    let result = foodCollection.insertMany(newFoodData, options)
    console.log(`${result.insertedCount} documents were inserted`)
    return result
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: `Error uploading new food data: ${error?.message}` || error,
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
      notes: changes.notes,
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
  createNewFoodItems,
  getOneFoodItem,
  updateOneFoodItem,
  deleteOneFoodItem,
}
