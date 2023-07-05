import express from 'express'
import datesController from '../controllers/datesController.mjs'
const router = express.Router()

// Avoid verbs in endpoint names: each URL should point towards a resource & the HTTP verb itself already indicates the action.

// TODO: implement API cache (https://www.npmjs.com/package/apicache)
router.get('/', datesController.getAllDates)

router.get('/:dateId', datesController.getOneDate)

router.post('/', datesController.createNewDate)

router.patch('/:dateId', datesController.updateOneDate)

// router.delete('/:dateId', (req, res) => {
//   res.send('Delete an existing date')
// })
router.delete('/:dateId', datesController.deleteOneDate)

export default router
