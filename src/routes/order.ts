import { Response, Router } from 'express'
import auth from '../middleware/auth'
import Order from '../models/Order'

const router = Router()

router.post('/add', auth, async (req: any, res: Response) => {
  try {
    const id = req.id
    const order = {
      owner: id,
      ...req.body,
    }
    await Order.create(order)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.get('/', auth, async (req: any, res: Response) => {
  try {
    const id = req.id
    const orders = await Order.find({ owner: id })
    res.json(orders)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

export default router
