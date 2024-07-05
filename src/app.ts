import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', ProductRoutes)
app.use('/api', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
