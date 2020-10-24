import { Request, Response, NextFunction } from 'express'
import { validateEmail } from '../utils/utils'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Невалидный email' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Короткий пароль' })
    }
    next()
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
