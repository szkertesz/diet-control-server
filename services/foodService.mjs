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

const createNewFoodItem = foodItemData => {
  try {
    const newFoodItem = Food.createNewFoodItem(foodItemData)
    return newFoodItem
  } catch (error) {
    throw error
  }
}

const createNewFoodItems = foodData => {
  try {
    const newFoodItems = Food.createNewFoodItems(foodData)
    return newFoodItems
  } catch (error) {
    throw error
  }
}

const updateOneFoodItem = (foodId, foodItemDataChanges) => {
  try {
    const updatedFoodItem = Food.updateOneFoodItem(foodId, foodItemDataChanges)
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
  createNewFoodItems,
  updateOneFoodItem,
  deleteOneFoodItem,
}
