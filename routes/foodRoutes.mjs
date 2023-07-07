import express from 'express'
import foodController from '../controllers/foodController.mjs'
const router = express.Router()

// Avoid verbs in endpoint names: each URL should point towards a resource & the HTTP verb itself already indicates the action.

// TODO: implement API cache (https://www.npmjs.com/package/apicache)
router.get('/', foodController.getAllFoodItems)

router.get('/:foodId', foodController.getOneFoodItem)

router.post('/', foodController.createNewFoodItem)

router.post('/seed', foodController.createNewFoodItems)

router.patch('/:foodId', foodController.updateOneFoodItem)

// router.delete('/:foodId', (req, res) => {
//   res.send('Delete an existing date')
// })
router.delete('/:foodId', foodController.deleteOneFoodItem)

export default router
