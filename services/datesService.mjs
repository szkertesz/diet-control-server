import Dates from '../db/dates.mjs'

const getAllDates = () => {
  try {
    const allDates = Dates.getAllDates()
    return allDates
  } catch (error) {
    throw error
  }
}

const getOneDate = dateId => {
  try {
    const date = Dates.getOneDate(dateId)
    return date
  } catch (error) {
    throw error
  }
}

const createNewDate = dateData => {
  try {
    const newDate = Dates.createNewDate(dateData)
    return newDate
  } catch (error) {
    throw error
  }
}

const updateOneDate = (dateId, dateDataChanges) => {
  try {
    const updatedDate = Dates.updateOneDate(dateId, dateDataChanges)
    return updatedDate
  } catch (error) {
    throw error
  }
}

const deleteOneDate = dateId => {
  try {
    Dates.deleteOneDate(dateId)
  } catch (error) {
    throw error
  }
}

export default {
  getAllDates,
  getOneDate,
  createNewDate,
  updateOneDate,
  deleteOneDate,
}
