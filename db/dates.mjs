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

const getDatesOfMonth = isoDate => {
  const date = new Date(isoDate)
  // TODO: refactor date calculations
  const year = date.getFullYear()
  const month = date.getMonth()
  const lastDayOfPrevMonth = new Date(Date.UTC(year, month, 1) - 1)
  const firstDayOfNextMonth = new Date(Date.UTC(year, month + 1, 0) + 1)

  try {
    let results = dateCollection
      .find({
        // $and: [
        //   { date: { $gt: new Date(startIsoDate), $lt: new Date(endIsoDate) } },
        //   {'sum.energy' : {$gt: 0}},
        // ],
        date: { $gt: lastDayOfPrevMonth, $lt: firstDayOfNextMonth },
      })
      .toArray()
    return results
  } catch (error) {
    throw { status: 500, message: error }
  }
}

const getOneDate = isoDate => {
  try {
    let query = { date: new Date(isoDate) }
    let result = dateCollection.findOne(query)
    if (!result) {
      throw {
        status: 400,
        message: `Can't find date with the ISO date '${isoDate}'`,
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

const updateOneDate = (isoDate, changes) => {
  const query = { date: isoDate }
  if (!query.date) {
    throw {
      status: 400,
      message: `Can't find date with the ISO date '${isoDate}'`,
    }
  }
  const updates = {
    $set: {
      meals: changes.meals,
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

const deleteOneDate = isoDate => {
  try {
    const query = { _id: new ObjectId(isoDate) }
    if (!query._id) {
      throw {
        status: 400,
        message: `Can't find date with the id '${isoDate}'`,
      }
    }
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
  getDatesOfMonth,
  getOneDate,
  createNewDate,
  updateOneDate,
  deleteOneDate,
}
