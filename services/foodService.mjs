import Food from '../db/food.mjs'

const getAllFoodItems = () => {
  try {
    const allFoodItems = Food.getAllFoodItems()
    return allFoodItems
  } catch (error) {
    throw error
  }
}

const getOneFoodItem = foodId => {
  try {
    const foodItem = Food.getOneFoodItem(foodId)
    return foodItem
  } catch (error) {
    throw error
  }
}

const createNewFoodItem = dateData => {
  try {
    const newFoodItem = Food.createNewFoodItem(dateData)
    return newFoodItem
  } catch (error) {
    throw error
  }
}

const updateOneFoodItem = (foodId, dateDataChanges) => {
  try {
    const updatedFoodItem = Food.updateOneFoodItem(foodId, dateDataChanges)
    return updatedFoodItem
  } catch (error) {
    throw error
  }
}

const deleteOneFoodItem = foodId => {
  try {
    Food.deleteOneFoodItem(foodId)
  } catch (error) {
    throw error
  }
}

export default {
  getAllFoodItems,
  getOneFoodItem,
  createNewFoodItem,
  updateOneFoodItem,
  deleteOneFoodItem,
}
