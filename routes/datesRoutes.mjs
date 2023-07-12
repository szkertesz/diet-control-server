import express from 'express'
import datesController from '../controllers/datesController.mjs'
const router = express.Router()

// Avoid verbs in endpoint names: each URL should point towards a resource & the HTTP verb itself already indicates the action.

// TODO: implement API cache (https://www.npmjs.com/package/apicache)
router.get('/', datesController.getAllDates)

router.get('/:isoDate', datesController.getOneDate)

router.post('/', datesController.createNewDate)

router.patch('/:isoDate', datesController.updateOneDate)

// router.delete('/:isoDate', (req, res) => {
//   res.send('Delete an existing date')
// })
router.delete('/:isoDate', datesController.deleteOneDate)

export default router
