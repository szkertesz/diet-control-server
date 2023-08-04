import Dates from '../db/dates.mjs'

const getAllDates = () => {
  try {
    const allDates = Dates.getAllDates()
    return allDates
  } catch (error) {
    throw error
  }
}

const getDatesOfMonth = isoDate => {
  try {
    const dates = Dates.getDatesOfMonth(isoDate)
    return dates
  } catch (error) {
    throw error
  }
}

const getOneDate = isoDate => {
  try {
    const date = Dates.getOneDate(isoDate)
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

const updateOneDate = (isoDate, dateDataChanges) => {
  try {
    const updatedDate = Dates.updateOneDate(isoDate, dateDataChanges)
    return updatedDate
  } catch (error) {
    throw error
  }
}

const deleteOneDate = isoDate => {
  try {
    Dates.deleteOneDate(isoDate)
  } catch (error) {
    throw error
  }
}

export default {
  getAllDates,
  getDatesOfMonth,
  getOneDate,
  createNewDate,
  updateOneDate,
  deleteOneDate,
}
