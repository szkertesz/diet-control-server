// Load environment variables
import express from 'express'
import cors from 'cors'
import './loadEnvironment.mjs'
import datesRouter from './routes/datesRoutes.mjs'
// import datesRouter from './routes/datesRouter.mjs'
import foodRouter from './routes/foodRoutes.mjs'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/dates', datesRouter)
// app.use('/dates/', datesRouter)
app.use('/api/food', foodRouter)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
})
