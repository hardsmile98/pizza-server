import { Request, Response, Router } from 'express'
import Product from '../models/Product'

const router = Router()

router.get('/:category', async (req: Request, res: Response) => {
  try {
    const category = req.params.category
    const products = await Product.find({ category: category })
    res.json(products)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

export default router
