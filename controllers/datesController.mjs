import { ObjectId } from 'mongodb'
import datesService from '../services/datesService.mjs'
import db from '../db/connect.mjs'
const foodCollection = db.collection('food')

const getAllDates = async (req, res) => {
  try {
    const allDates = await datesService.getAllDates()
    res.send({ status: 'OK', data: allDates })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

async function getFoodItemInfo(foodItemId) {
  const foodItemInfo = await foodCollection.findOne({ _id: foodItemId })
  return foodItemInfo
}

// Function to transform the foodItems array
async function transformFoodItems(foodItems) {
  const transformedFoodItems = []

  for (const foodItem of foodItems) {
    const { _id, qty } = foodItem

    // Query the additional food item info
    const foodItemInfo = await getFoodItemInfo(_id)

    // Create the transformed food item object with the additional info
    const transformedFoodItem = {
      _id,
      qty,
      ...foodItemInfo,
    }

    transformedFoodItems.push(transformedFoodItem)
  }

  return transformedFoodItems
}

// Function to transform the main document
async function transformDocument(document) {
  const transformedMeals = []

  for (const meal of document.meals) {
    const transformedFoodItems = await transformFoodItems(meal.foodItems)

    const transformedMeal = {
      ...meal,
      foodItems: transformedFoodItems,
    }
    transformedMeals.push(transformedMeal)
  }

  const transformedDocument = {
    ...document,
    meals: transformedMeals,
  }

  return transformedDocument
}

const getOneDate = async (req, res) => {
  try {
    const {
      params: { dateId },
    } = req
    if (!dateId) return
    const date = await datesService.getOneDate(dateId)
    const transformedDate = await transformDocument(date)
    res.send({ status: 'OK', data: transformedDate })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewDate = async (req, res) => {
  const { body } = req
  if (!body.date) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "the following key is missing or is empty in request body: 'date'",
      },
    })
    return
  }

  const transformedMeals = body.meals.map(meal => ({
    ...meal,
    foodItems: meal.foodItems.map(foodItem => ({
      ...foodItem,
      _id: new ObjectId(foodItem._id),
    })),
  }))

  const newDate = {
    date: body.date,
    meals: transformedMeals,
    sum: body.sum,
  }

  try {
    const createdDate = await datesService.createNewDate(newDate)
    res.status(201).send({ status: 'OK', data: createdDate })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneDate = async (req, res) => {
  const {
    body,
    params: { dateId },
  } = req
  if (!dateId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':dateId' can not be empty" },
    })
    return
  }
  try {
    const updatedDate = await datesService.updateOneDate(dateId, body)
    res.send({ status: 'OK', data: updatedDate })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneDate = (req, res) => {
  const {
    params: { dateId },
  } = req
  if (!dateId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':dateId' can not be empty" },
    })
    return
  }
  try {
    datesService.deleteOneDate(dateId)
    res.status(204).send({ status: 'OK' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default {
  getAllDates,
  getOneDate,
  createNewDate,
  updateOneDate,
  deleteOneDate,
}
