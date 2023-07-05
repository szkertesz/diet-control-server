import datesService from '../services/datesService.mjs'

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

const getOneDate = (req, res) => {
  try {
    const {
      params: { dateId },
    } = req
    if (!dateId) return
    const date = datesService.getOneDate(dateId)
    res.send({ status: 'OK', data: date })
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
  const newDate = {
    date: body.date,
    meal: body.meal,
    foodItems: body.foodItems,
    stat: body.stat,
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

const updateOneDate = (req, res) => {
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
    const updatedDate = datesService.updateOneDate(dateId, body)
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
