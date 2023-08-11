import foodService from '../services/foodService.mjs'

const getAllFoodItems = async (req, res) => {
  try {
    const allFoodItems = await foodService.getAllFoodItems()
    res.send({ status: 'OK', data: allFoodItems })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneFoodItem = async (req, res) => {
  try {
    const {
      params: { foodId },
    } = req
    if (!foodId) return
    const data = await foodService.getOneFoodItem(foodId)
    res.send({ status: 'OK', data: data })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewFoodItem = async (req, res) => {
  const { body } = req
  if (
    !body.name ||
    !body.energy ||
    !body.protein ||
    !body.fat ||
    !body.ch ||
    !body.notes
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          'One of the keys (name, energy, protein, fat, ch, note) is missing or is empty in request body',
      },
    })
    return
  }
  const newFoodItem = {
    name: body.name,
    energy: body.energy,
    protein: body.protein,
    fat: body.fat,
    ch: body.ch,
    notes: body.notes,
  }
  try {
    const createdFoodItem = await foodService.createNewFoodItem(newFoodItem)
    res.status(201).send({ status: 'OK', data: createdFoodItem })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewFoodItems = async (req, res) => {
  const { body } = req
  console.log(body)
  try {
    const createdFoodItems = await foodService.createNewFoodItems(body)
    res.status(201).send({ status: 'OK', data: createdFoodItems })
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: {
        error: `Bulk upload not succeeded: ${error?.message}` || error,
      },
    })
  }
}

const updateOneFoodItem = async (req, res) => {
  const {
    body,
    params: { foodId },
  } = req
  if (!foodId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':foodId' can not be empty" },
    })
    return
  }
  try {
    const updatedFoodItem = await foodService.updateOneFoodItem(foodId, body)
    res.send({ status: 'OK', data: updatedFoodItem })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneFoodItem = (req, res) => {
  const {
    params: { foodId },
  } = req
  if (!foodId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':foodId' can not be empty" },
    })
    return
  }
  try {
    foodService.deleteOneFoodItem(foodId)
    res.status(204).send({ status: 'OK' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
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
