import { Request, Response, Router } from 'express'
import validate from '../middleware/validate'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from 'config'
import User from '../models/User'
import { sendConfirmedEmail } from '../utils/utils'
import { IUser } from '../interfaces/interfaces'

const router = Router()

router.post('/register', validate, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const candidateEmail = await User.findOne({ email })
    if (candidateEmail) {
      return res.status(400).json({ message: 'Такой email занят' })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user: IUser = new User({ email, password: hashedPassword })
    await user.save()

    const conf = jwt.sign({ id: user.id }, config.get('confSecret'), {
      expiresIn: '30d',
    })

    sendConfirmedEmail(email, password, conf)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.post('/login', validate, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user: IUser | null = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    if (!user.confirmed) {
      return res.status(400).json({ message: 'Email не подтвержден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' })
    }
    const token = jwt.sign({ id: user.id }, config.get('tokenSecret'), {
      expiresIn: '7d',
    })

    res.json({ token })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

export default router
